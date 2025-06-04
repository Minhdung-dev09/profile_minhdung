import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const limit = searchParams.get("limit")

    let cursor = db.collection("blog").find({}).sort({ publishedAt: -1 })

    if (limit) {
      cursor = cursor.limit(Number.parseInt(limit))
    }

    const posts = await cursor.toArray()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const post = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: body.publishedAt || new Date().toISOString(),
    }

    const result = await db.collection("blog").insertOne(post)

    return NextResponse.json({ _id: result.insertedId, ...post })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
