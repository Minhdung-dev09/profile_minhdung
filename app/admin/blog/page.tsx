"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye, Calendar, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  content: string
  slug: string
  publishedAt: string
  tags: string[]
  author: string
  createdAt: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredPosts(filtered)
  }, [posts, searchTerm])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setPosts(posts.filter((p) => p._id !== id))
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-4xl font-bold">Quản lý Blog</h1>
                <p className="text-blue-100">Thêm, sửa và xóa các bài viết của bạn</p>
              </div>
            </div>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/admin/blog/new">
                <Plus className="w-5 h-5 mr-2" />
                Viết bài mới
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-full"></div>
                      <div className="flex space-x-2 mb-4">
                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 mr-6">
                        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                          </span>
                          <span>By {post.author}</span>
                          <span>Slug: /{post.slug}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/blog/edit/${post._id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePost(post._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
                {searchTerm ? "Không tìm thấy bài viết nào phù hợp." : "Chưa có bài viết nào."}
              </p>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Viết bài đầu tiên
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
