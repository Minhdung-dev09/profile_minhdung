import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()

    // Try to find by slug first, then by ObjectId if slug doesn't work
    let post = await db.collection("blog").findOne({ slug: params.slug })

    if (!post && ObjectId.isValid(params.slug)) {
      post = await db.collection("blog").findOne({ _id: new ObjectId(params.slug) })
    }

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    let query = {}
    if (ObjectId.isValid(params.slug)) {
      query = { _id: new ObjectId(params.slug) }
    } else {
      query = { slug: params.slug }
    }

    const result = await db.collection("blog").updateOne(query, {
      $set: {
        ...body,
        updatedAt: new Date().toISOString(),
      },
    })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { db } = await connectToDatabase()

    let query = {}
    if (ObjectId.isValid(params.slug)) {
      query = { _id: new ObjectId(params.slug) }
    } else {
      query = { slug: params.slug }
    }

    const result = await db.collection("blog").deleteOne(query)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
