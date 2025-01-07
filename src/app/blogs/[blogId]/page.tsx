import { getBlogs, getDetail } from "@/libs/client";

export async function generateStaticParams(){
const { contents } = await getBlogs();

const paths = contents.map((blog)=>{
    return {
        blogId: blog.id,
    };
});

return [...paths];
}

export default async function StaticDetailPage({
    params : { blogId },
}: {
    params: { blogId : string};
}) {
    const blog = await getDetail(blogId);

    return(
    <>
    <div className="h-screen pt-5">
        <div className="content">
            <h1>{blog.title}</h1>
            <div
            dangerouslySetInnerHTML={{
                __html: `${blog.body}`,
            }}
            />
            </div>
            </div>
            </>
            )
        }