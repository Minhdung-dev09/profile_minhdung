"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  FileText,
  FolderOpen,
  Users,
  TrendingUp,
  Plus,
  Settings,
  Eye,
  Edit,
  Lock,
  LogIn,
} from "lucide-react"
import Link from "next/link"

interface Stats {
  totalProjects: number
  totalBlogPosts: number
  featuredProjects: number
  publishedPosts: number
}

interface Project {
  _id: string
  title: string
  featured: boolean
  technologies: string[]
}

interface BlogPost {
  _id: string
  title: string
  publishedAt: string
  tags: string[]
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalBlogPosts: 0,
    featuredProjects: 0,
    publishedPosts: 0,
  })
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Kiểm tra xem đã đăng nhập chưa
    const authStatus = localStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (username === "admin" && password === "minhdung0903") {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
      fetchData()
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không đúng!")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
    setUsername("")
    setPassword("")
  }

  const fetchData = async () => {
    try {
      const [projectsRes, blogRes] = await Promise.all([fetch("/api/projects"), fetch("/api/blog")])

      if (projectsRes.ok) {
        const projects = await projectsRes.json()
        setRecentProjects(projects.slice(0, 5))
        setStats((prev) => ({
          ...prev,
          totalProjects: projects.length,
          featuredProjects: projects.filter((p: Project) => p.featured).length,
        }))
      }

      if (blogRes.ok) {
        const posts = await blogRes.json()
        setRecentPosts(posts.slice(0, 5))
        setStats((prev) => ({
          ...prev,
          totalBlogPosts: posts.length,
          publishedPosts: posts.length,
        }))
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient">Admin Login</CardTitle>
              <p className="text-slate-600 dark:text-slate-300">Đăng nhập để quản lý nội dung</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base font-semibold">
                    Tên đăng nhập
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-semibold">
                    Mật khẩu
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 text-base"
                  />
                </div>
                {loginError && (
                  <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{loginError}</div>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Đăng nhập
                </Button>
              </form>
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Tổng dự án",
      value: stats.totalProjects,
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Dự án nổi bật",
      value: stats.featuredProjects,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Tổng bài viết",
      value: stats.totalBlogPosts,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Bài đã xuất bản",
      value: stats.publishedPosts,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ]

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
            <div>
              <h1 className="text-5xl font-black mb-2">Admin Dashboard</h1>
              <p className="text-blue-100 text-xl">Quản lý nội dung portfolio của bạn</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="secondary" asChild className="text-lg px-6 py-3">
                <Link href="/">
                  <Eye className="w-5 h-5 mr-2" />
                  Xem trang web
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-6 py-3"
                onClick={handleLogout}
              >
                <Settings className="w-5 h-5 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">{stat.title}</p>
                      <p className="text-4xl font-black">{loading ? "..." : stat.value}</p>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bgColor}`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold">
                <Plus className="w-6 h-6 mr-3" />
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  asChild
                  className="h-auto p-6 flex-col bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Link href="/admin/projects/new">
                    <FolderOpen className="w-10 h-10 mb-3" />
                    <span className="text-lg font-semibold">Thêm dự án mới</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-6 flex-col border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Link href="/admin/blog/new">
                    <FileText className="w-10 h-10 mb-3" />
                    <span className="text-lg font-semibold">Viết bài mới</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-6 flex-col border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Link href="/admin/projects">
                    <Edit className="w-10 h-10 mb-3" />
                    <span className="text-lg font-semibold">Quản lý dự án</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto p-6 flex-col border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <Link href="/admin/blog">
                    <BarChart3 className="w-10 h-10 mb-3" />
                    <span className="text-lg font-semibold">Quản lý blog</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Dự án gần đây</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/projects">Xem tất cả</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-xl animate-pulse">
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                        </div>
                      </div>
                    ))
                  ) : recentProjects.length > 0 ? (
                    recentProjects.map((project) => (
                      <div
                        key={project._id}
                        className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{project.title}</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {project.featured && <Badge className="bg-yellow-500 text-yellow-900">Nổi bật</Badge>}
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 dark:text-slate-300 text-center py-8">Chưa có dự án nào</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Blog Posts */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Bài viết gần đây</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/blog">Xem tất cả</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-xl animate-pulse">
                        <div className="flex-1">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                  ) : recentPosts.length > 0 ? (
                    recentPosts.map((post) => (
                      <div
                        key={post._id}
                        className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{post.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-300">
                            <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                            <div className="flex flex-wrap gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 dark:text-slate-300 text-center py-8">Chưa có bài viết nào</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
