import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { searchParams } = new URL(request.url)

    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    let query = {}
    if (featured === "true") {
      query = { featured: true }
    }

    let cursor = db.collection("projects").find(query).sort({ createdAt: -1 })

    if (limit) {
      cursor = cursor.limit(Number.parseInt(limit))
    }

    const projects = await cursor.toArray()

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()

    const project = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection("projects").insertOne(project)

    return NextResponse.json({ _id: result.insertedId, ...project })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
