"use client";

import { logoutAction } from "@/app/actions/login";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface IHeaderProps {
  username: string;
}

export function Header({ username }: IHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full bg-blue-300 p-4">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold text-white">CodeLeap Network</h1>

        <div className="flex items-center gap-2">
          <p className="text-white font-bold">Hello, {username} 😊</p>
          <Button
            onClick={async () => {
              await logoutAction();
              router.push("/sign-in");
            }}
          >
            <LogOutIcon className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
