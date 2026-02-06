import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const response = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
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

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const response = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to delete comment" },
        { status: response.status },
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
