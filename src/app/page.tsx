import Link from 'next/link'
import GothamScene from './components/GothamScene'

const categories = [
  {
    name: 'Affiliate',
    slug: 'affiliate',
    position: [-8, 0, -2],
    height: 9,
    color: '#11202d',
    accent: '#8ce1ff',
    detail: '陰影の強い広告塔と雨粒のネオンサイン',
  },
  {
    name: 'Crypto Bot',
    slug: 'crypto-bot',
    position: [0, 0, 6],
    height: 11.5,
    color: '#0d1c18',
    accent: '#41f2c0',
    detail: '監視塔のようなタワーと緑のデジタル脈動',
  },
  {
    name: 'TechBlog',
    slug: 'techblog',
    position: [8, 0, -4],
    height: 10,
    color: '#12182e',
    accent: '#8f7bff',
    detail: '巨大スクリーンとアンテナで覆われた情報ビル',
  },
  {
    name: 'Profile',
    slug: 'profile',
    position: [2, 0, -10],
    height: 8,
    color: '#1b1b27',
    accent: '#f2dd7e',
    detail: '古い時計台の内部へ誘う静かな塔',
  },
]

const cloudMenu = [
  { label: 'Home', href: '/' },
  { label: 'カテゴリ一覧', href: '/' },
  { label: 'Affiliate', href: '/category/affiliate' },
  { label: 'Crypto Bot', href: '/category/crypto-bot' },
  { label: 'TechBlog', href: '/category/techblog' },
  { label: 'Profile', href: '/category/profile' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function Home() {
  return (
    <main className="relative min-h-screen text-slate-100">
      <div className="noise-overlay" />
      <section className="section-shell px-4 pt-16 pb-10 md:px-10 lg:px-16">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-slate-950/70 p-8 md:p-12 neon-border">
          <div className="absolute inset-x-0 -top-24 h-64 bg-[radial-gradient(circle_at_30%_20%,rgba(0,188,255,0.35),transparent_40%),radial-gradient(circle_at_70%_10%,rgba(112,82,255,0.3),transparent_45%)] blur-3xl opacity-60" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Gotham City Nightfall</p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                雨に濡れたゴッサムの夜空に、<br className="hidden md:block" />
                ブログの光を放つ。
              </h1>
              <p className="max-w-xl text-lg text-slate-200/85">
                Three.js で描くゴッサムシティの街並み。ビルに見立てたカテゴリを探索し、
                サーチライトの先でブログの物語を見つけてください。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  className="rounded-full bg-cyan-500/90 px-6 py-3 text-slate-950 font-semibold shadow-[0_0_25px_rgba(56,189,248,0.45)] hover:bg-cyan-300 transition"
                  href="/category/techblog"
                >
                  最新のテック記事へ
                </Link>
                <Link
                  className="rounded-full border border-cyan-200/30 px-6 py-3 text-cyan-100 hover:text-slate-950 hover:bg-cyan-100/80 transition"
                  href="/category/crypto-bot"
                >
                  夜のタワーを訪れる
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 pt-4">
                {cloudMenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="cloud-menu px-5 py-2 text-slate-100 text-sm cloud-text"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-[radial-gradient(circle_at_50%_50%,rgba(80,226,255,0.12),transparent_45%)] blur-3xl" />
              <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl">
                <GothamScene categories={categories} />
                <p className="mt-4 text-sm text-slate-200/80 text-center">
                  ホバーでサーチライト、クリックでカテゴリページへ遷移します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell px-4 pb-16 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.slug} className="gotham-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-cyan-100">{category.name}</h3>
                <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-wide text-slate-100">
                  {category.detail}
                </span>
              </div>
              <p className="mt-4 text-slate-200/85">
                {category.name} に紐づく記事をビル内部の「部屋」に見立て、前後記事への廊下ナビ、タグのネオンプレート、
                月光の差す窓辺を描いた詳細ページを用意します。
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-cyan-100/90">
                <span className="rounded-full border border-cyan-200/30 px-3 py-1">検索・タグ絞り込み</span>
                <span className="rounded-full border border-cyan-200/30 px-3 py-1">フロア型ページネーション</span>
                <span className="rounded-full border border-cyan-200/30 px-3 py-1">ネオン SNS シェア</span>
              </div>
              <Link
                href={`/category/${category.slug}`}
                className="mt-5 inline-block text-cyan-100 underline-offset-4 hover:text-slate-900 hover:bg-cyan-200/90 px-3 py-1 rounded"
              >
                ビルの入口へ向かう
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell px-4 pb-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-slate-950/70 p-8 md:p-12 gotham-card">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-semibold text-cyan-100">雲のメニュー</h3>
              <p className="mt-2 text-slate-200/80">
                固定位置で漂うクラウドリンク。ホバーで縁が揺らぎ、どのビルへもワンクリックで移動できます。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-100">ビル階層の一覧</h3>
              <p className="mt-2 text-slate-200/80">
                記事一覧はビルの窓を模したカードで表示し、Floor 1 / Floor 2 のフロア切替でページネーションを表現します。
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-100">室内の読書体験</h3>
              <p className="mt-2 text-slate-200/80">
                詳細ページは窓の向こうの月・雲・サーチライトを Three.js で演出し、タグや前後記事を廊下誘導の UI にしました。
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-shell border-t border-white/10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-6 py-10 text-sm text-slate-200/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-cyan-100">Gotham Nightfall Blog</p>
            <p className="text-slate-300/75">© 2025 Gotham Skyline Studio. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 footer-glow">
            <Link href="https://twitter.com" className="hover:text-cyan-100">
              X/Twitter
            </Link>
            <Link href="https://github.com" className="hover:text-cyan-100">
              GitHub
            </Link>
            <Link href="/contact" className="hover:text-cyan-100">
              お問い合わせ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
