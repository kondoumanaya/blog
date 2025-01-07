import { getBlogs } from "@/libs/client";
import Link from "next/link";


export default async function StaticPage() {
    const { contents }  = await getBlogs();

    if (!contents) {
        return <h1 className="text-2xl font-bold text-center mt-20">No Contents</h1>;
    }
    return (
    <>
    <div className="h-screen container mx-auto mt-10">
            <ul className="space-y-10">
                {contents.map((blog) => (
                <li key={blog.id} className="p-5 rounded shadow-lg content flex justify-between items-center">
                    <h4>
                        {blog.title}
                    </h4>
                    <Link href={`/blogs/${blog.id}`}>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                            詳細
                        </button>
                    </Link>
                    </li>
                    ))}
            </ul>
        </div>
        </>
    );
}