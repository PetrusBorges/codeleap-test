"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CreatePostSchema, createPostSchema } from "./schema";

interface ICreatePostFormProps {
  username: string;
}

export function CreatePostForm({ username }: ICreatePostFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formCreatePost = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const handleSubmit = formCreatePost.handleSubmit(
    async (data) => {
      try {
        setIsLoading(true);

        const response = await fetch("/api/careers/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, username }),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        toast.success("Post created");
        router.refresh();
      } catch {
        toast.error("Failed to create post");
      } finally {
        setIsLoading(false);
      }
    },
    (erros) => {
      toast.error(erros.title?.message || erros.content?.message);
    },
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>What&apos;s on your mind?</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-create-post" onSubmit={handleSubmit}>
          <FieldGroup>
            <Controller
              name="title"
              control={formCreatePost.control}
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
              control={formCreatePost.control}
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
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => formCreatePost.reset()}
            className="cursor-pointer"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="form-create-post"
            className="cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
