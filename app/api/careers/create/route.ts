import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title, content, username } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const response = await fetch("https://dev.codeleap.co.uk/careers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, username }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create comment" },
        { status: 500 },
      );
    }

    const comment = await response.json();
    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
