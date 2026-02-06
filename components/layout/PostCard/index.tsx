"use client";

import { IPost } from "@/@types/post";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { TrashIcon, Loader2, SaveIcon } from "lucide-react";
import { DialogButton } from "../DialogButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import { EditPostSchema, editPostSchema } from "./schema";

interface IPostCardProps {
  post: IPost;
}

export function PostCard({ post }: IPostCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formEditPost = useForm<EditPostSchema>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const handleSubmit = formEditPost.handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/careers/${post.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Post updated");
      router.refresh();
    } catch {
      toast.error("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  });

  const handleDelete = async (id: number) => {
    try {
      setIsLoading(true);

      await fetch(`/api/careers/${id}/`, {
        method: "DELETE",
      });

      toast.success("Post deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>Username: {post.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <DialogButton
              title="Delete"
              variant="destructive"
              description="Are you sure you want to delete this post?"
              anotherFooterButtonElement={
                <Button
                  type="button"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(post.id)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <TrashIcon className="w-4 h-4" />
                  )}
                  Delete
                </Button>
              }
            />

            <DialogButton
              title="Edit"
              description="Are you sure you want to edit this post?"
              bodyElement={
                <form id="form-edit-post" onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Controller
                      name="title"
                      control={formEditPost.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-create-post-title">
                            Title
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-create-post-title"
                            aria-invalid={fieldState.invalid}
                            placeholder="Type your title here"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="content"
                      control={formEditPost.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-create-post-description">
                            Content
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="form-create-post-description"
                              placeholder="Type your content here"
                              rows={6}
                              className="min-h-24 resize-none"
                              aria-invalid={fieldState.invalid}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.value.length}/100 characters
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              }
              anotherFooterButtonElement={
                <Button
                  type="submit"
                  form="form-edit-post"
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <SaveIcon className="w-4 h-4" />
                  )}
                  Save
                </Button>
              }
            />
          </Field>
        </CardFooter>
      </Card>
    </>
  );
}
