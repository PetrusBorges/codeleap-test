"use client";

import { IPost } from "@/@types/post";
import { Input } from "@/components/ui/input";
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from "lucide-react";
import { PostCard } from "../PostCard";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface IListPostsProps {
  postsList: IPost[];
}

export function ListPosts({ postsList }: IListPostsProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const filteredPosts = useMemo(() => {
    return postsList
      .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === "asc") {
          return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
      });
  }, [postsList, search, sort]);

  return (
    <>
      {filteredPosts.length > 0 && (
        <>
          <div className="flex items-center gap-2 border rounded-md p-2">
            <Input
              placeholder="Search for a post"
              className="w-full border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <SearchIcon className="w-4 h-4" />

            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer"
              onClick={() =>
                setSort((prevState) => (prevState === "asc" ? "desc" : "asc"))
              }
            >
              {sort === "asc" ? (
                <ArrowUpIcon className="w-4 h-4" />
              ) : (
                <ArrowDownIcon className="w-4 h-4" />
              )}
            </Button>
          </div>

          {filteredPosts.map((post: IPost) => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </>
  );
}
