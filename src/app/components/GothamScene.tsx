'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const REMOTE_THREE = 'https://esm.sh/three@0.161.0'

type CategoryBuilding = {
  name: string
  slug: string
  position: [number, number, number]
  height: number
  color: string
  accent: string
  detail: string
}

type GothamSceneProps = {
  categories: CategoryBuilding[]
}

export default function GothamScene({ categories }: GothamSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cleanups: Array<() => void> = []
    let frameId: number | null = null

    const init = async () => {
      const THREE = await import(/* webpackIgnore: true */ REMOTE_THREE)
      if (!mountRef.current) return

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2('#04070f', 0.035)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(mountRef.current.clientWidth, 520)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setClearColor('#050810', 0.95)
      mountRef.current.appendChild(renderer.domElement)

      const camera = new THREE.PerspectiveCamera(
        48,
        mountRef.current.clientWidth / 520,
        0.1,
        1000,
      )
      camera.position.set(18, 14, 26)

      const clock = new THREE.Clock()
      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const cityGroup = new THREE.Group()

      const ambient = new THREE.AmbientLight('#7fc7ff', 0.4)
      const moonLight = new THREE.DirectionalLight('#9ec3ff', 0.7)
      moonLight.position.set(-12, 20, -6)
      const rimLight = new THREE.PointLight('#7ef2c1', 0.35, 50, 1.2)
      rimLight.position.set(14, 12, 12)
      scene.add(ambient, moonLight, rimLight)

      const groundGeo = new THREE.PlaneGeometry(80, 80)
      const groundMat = new THREE.MeshStandardMaterial({
        color: '#0a0f16',
        roughness: 0.8,
        metalness: 0.2,
        transparent: true,
        opacity: 0.95,
      })
      const ground = new THREE.Mesh(groundGeo, groundMat)
      ground.rotation.x = -Math.PI / 2
      ground.position.y = 0
      ground.receiveShadow = true
      scene.add(ground)

      const gridHelper = new THREE.GridHelper(80, 20, '#15303f', '#0f2030')
      gridHelper.position.y = 0.01
      scene.add(gridHelper)

      const buildings: any[] = []
      const signals: any[] = []
      const clouds: any[] = []

      categories.forEach((category, index) => {
        const { position, height, color, accent, name, slug } = category
        const buildingGeo = new THREE.BoxGeometry(2.6, height, 2.6)
        const buildingMat = new THREE.MeshStandardMaterial({
          color,
          emissive: accent,
          emissiveIntensity: 0.25,
          metalness: 0.6,
          roughness: 0.45,
        })

        const building = new THREE.Mesh(buildingGeo, buildingMat)
        building.position.set(position[0], height / 2, position[2])
        building.userData = { slug, name, accent }
        cityGroup.add(building)
        buildings.push(building)

        const frameGeo = new THREE.BoxGeometry(2.65, height + 0.25, 2.65)
        const frameEdges = new THREE.EdgesGeometry(frameGeo)
        const frameMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.25 })
        const frameWire = new THREE.LineSegments(frameEdges, frameMat)
        frameWire.position.copy(building.position)
        cityGroup.add(frameWire)

        const cloud = new THREE.Mesh(
          new THREE.SphereGeometry(1.5 + index * 0.2, 22, 22),
          new THREE.MeshStandardMaterial({
            color: '#cdd9f5',
            transparent: true,
            opacity: 0.15,
            roughness: 1,
            metalness: 0,
          }),
        )
        cloud.position.set(position[0] + 0.6, height + 1.2, position[2] - 0.6)
        clouds.push(cloud)
        cityGroup.add(cloud)

        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(1.8, 10, 32, 1, true),
          new THREE.MeshPhongMaterial({
            color: accent,
            emissive: accent,
            emissiveIntensity: 0.6,
            opacity: 0.3,
            transparent: true,
            side: THREE.DoubleSide,
            shininess: 120,
          }),
        )
        cone.position.set(position[0], height + 0.5, position[2])
        cone.rotation.x = Math.PI
        cone.visible = false

        const signal = new THREE.Mesh(
          new THREE.CircleGeometry(2.2, 40),
          new THREE.MeshBasicMaterial({
            color: '#fdf7e8',
            transparent: true,
            opacity: 0.86,
          }),
        )
        signal.position.set(position[0], height + 6.8, position[2])
        signal.rotation.x = -Math.PI / 2
        signal.visible = false

        const signalGroup = new THREE.Group()
        signalGroup.add(cone, signal)
        signals.push(signalGroup)
        cityGroup.add(signalGroup)
      })

      scene.add(cityGroup)

      const starsGeo = new THREE.BufferGeometry()
      const starVertices = []
      for (let i = 0; i < 500; i++) {
        const x = THREE.MathUtils.randFloatSpread(120)
        const y = THREE.MathUtils.randFloat(10, 60)
        const z = THREE.MathUtils.randFloatSpread(120)
        starVertices.push(x, y, z)
      }
      starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
      const starsMat = new THREE.PointsMaterial({ color: '#6fc4ff', size: 0.35, transparent: true, opacity: 0.75 })
      const stars = new THREE.Points(starsGeo, starsMat)
      scene.add(stars)

      const onPointerMove = (event: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect()
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      }

      const onClick = () => {
        if (hoveredBuilding?.userData?.slug) {
          router.push(`/category/${hoveredBuilding.userData.slug}`)
        }
      }

      let hoveredBuilding: any = null

      const animate = () => {
        frameId = requestAnimationFrame(animate)
        const elapsed = clock.getElapsedTime()

        cityGroup.rotation.y = Math.sin(elapsed * 0.12) * 0.08
        clouds.forEach((cloud: any, idx: number) => {
          cloud.position.y += Math.sin(elapsed * 0.6 + idx) * 0.0025
        })

        raycaster.setFromCamera(mouse, camera)
        const intersections = raycaster.intersectObjects(buildings)
        const nextHover = intersections[0]?.object || null

        if (hoveredBuilding !== nextHover) {
          buildings.forEach((b: any, idx: number) => {
            const active = b === nextHover
            b.material.emissiveIntensity = active ? 0.9 : 0.25
            b.material.color.set(active ? '#1ef2d0' : categories[idx].color)
            signals[idx].visible = active
            clouds[idx].visible = !active
          })
          hoveredBuilding = nextHover
        }

        renderer.render(scene, camera)
      }

      animate()

      const onResize = () => {
        if (!mountRef.current) return
        const { clientWidth } = mountRef.current
        camera.aspect = clientWidth / 520
        camera.updateProjectionMatrix()
        renderer.setSize(clientWidth, 520)
      }

      window.addEventListener('resize', onResize)
      renderer.domElement.addEventListener('pointermove', onPointerMove)
      renderer.domElement.addEventListener('click', onClick)

      cleanups = [
        () => window.removeEventListener('resize', onResize),
        () => renderer.domElement.removeEventListener('pointermove', onPointerMove),
        () => renderer.domElement.removeEventListener('click', onClick),
        () => renderer.dispose(),
      ]
    }

    init().catch((error) => {
      console.error('Three.js scene failed to load', error)
      setLoadError('夜空のレンダリングに失敗しました。ネットワーク接続を確認してください。')
    })

    return () => {
      cleanups.forEach((fn) => fn())
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [categories, router])

  return (
    <div className="relative w-full">
      <div
        ref={mountRef}
        className="w-full rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950/60 via-slate-900/60 to-slate-950/80 neon-border overflow-hidden"
        style={{ minHeight: 520 }}
      />
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-red-100 text-sm text-center px-6">
          {loadError}
        </div>
      )}
    </div>
  )
}
