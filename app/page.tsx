import { IPost } from "@/@types/post";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/layout/PostCard";
import { PostList } from "@/components/layout/PostList";
import { cookies, headers } from "next/headers";

async function getPostList() {
  const headersList = await headers();
  const host = headersList.get("host");

  const reponse = await fetch(`http://${host}/api/careers/list`);

  if (!reponse.ok) {
    throw new Error("Failed to get posts list");
  }

  return await reponse.json();
}

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("accessToken")?.value;
  const postsList = await getPostList();

  return (
    <>
      <Header username={username!} />

      <div className="max-w-[1200px] mx-auto py-4 space-y-4">
        <PostCard username={username!} />

        {postsList.results.map((post: IPost) => (
          <PostList key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
