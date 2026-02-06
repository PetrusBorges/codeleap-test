import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://dev.codeleap.co.uk/careers/", {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to list comments" },
        { status: 500 },
      );
    }

    const commentsList = await response.json();

    return NextResponse.json(commentsList, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to list comments" },
      { status: 500 },
    );
  }
}
