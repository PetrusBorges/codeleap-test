"use client";

import { loginAction } from "@/app/actions/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { signInSchema } from "./schema";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SignInCard() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const formSignIn = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleSubmit = formSignIn.handleSubmit(
    async (data) => {
      try {
        setIsLoading(true);

        await loginAction(data.username);
        router.push("/");
      } catch {
        toast.error("Failed to login");
      } finally {
        setIsLoading(false);
      }
    },
    (erros) => {
      toast.error(erros.username?.message);
    },
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Welcome to CodeLeap network!</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="sign-in-form" onSubmit={handleSubmit}>
          <Controller
            name="username"
            control={formSignIn.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">
                  Please enter your username
                </FieldLabel>
                <Input
                  {...field}
                  id="username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Username"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          form="sign-in-form"
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}
