"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Code,
  Database,
  Brain,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
}

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  tags: string[]
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, blogRes] = await Promise.all([
          fetch("/api/projects?featured=true"),
          fetch("/api/blog?limit=3"),
        ])

        let projectsData = []
        let blogData = []

        if (projectsRes.ok) {
          projectsData = await projectsRes.json()
        }

        if (blogRes.ok) {
          blogData = await blogRes.json()
        }

        // Nếu chưa có dữ liệu, tự động tạo dữ liệu mẫu
        if (projectsData.length === 0) {
          await createSampleProjects()
          const newProjectsRes = await fetch("/api/projects?featured=true")
          if (newProjectsRes.ok) {
            projectsData = await newProjectsRes.json()
          }
        }

        if (blogData.length === 0) {
          await createSampleBlogPosts()
          const newBlogRes = await fetch("/api/blog?limit=3")
          if (newBlogRes.ok) {
            blogData = await newBlogRes.json()
          }
        }

        setProjects(projectsData)
        setBlogPosts(blogData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Thêm các function helper để tạo dữ liệu mẫu
  const createSampleProjects = async () => {
    const sampleProjects = [
      {
        title: "E-commerce Platform",
        description:
          "Một nền tảng thương mại điện tử hiện đại được xây dựng với React và Node.js, tích hợp thanh toán và quản lý kho hàng.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        githubUrl: "https://github.com/username/ecommerce-platform",
        liveUrl: "https://ecommerce-demo.com",
        imageUrl: "/placeholder.svg?height=300&width=500",
        featured: true,
        category: "Web Development",
      },
      {
        title: "AI Image Classifier",
        description:
          "Ứng dụng phân loại hình ảnh sử dụng TensorFlow và Python, có thể nhận diện và phân loại hơn 1000 loại đối tượng khác nhau.",
        technologies: ["Python", "TensorFlow", "Flask", "OpenCV", "NumPy"],
        githubUrl: "https://github.com/username/ai-image-classifier",
        liveUrl: "https://ai-classifier-demo.com",
        imageUrl: "/placeholder.svg?height=300&width=500",
        featured: true,
        category: "Machine Learning",
      },
      {
        title: "Task Management App",
        description:
          "Ứng dụng quản lý công việc với giao diện trực quan, hỗ trợ làm việc nhóm và theo dõi tiến độ real-time.",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.io"],
        githubUrl: "https://github.com/username/task-manager",
        liveUrl: "https://taskmanager-demo.com",
        imageUrl: "/placeholder.svg?height=300&width=500",
        featured: false,
        category: "Web Development",
      },
      {
        title: "Weather Prediction ML Model",
        description:
          "Mô hình machine learning dự đoán thời tiết sử dụng dữ liệu lịch sử và các thuật toán deep learning tiên tiến.",
        technologies: ["Python", "PyTorch", "Pandas", "Matplotlib", "FastAPI"],
        githubUrl: "https://github.com/username/weather-prediction",
        liveUrl: "https://weather-ml-demo.com",
        imageUrl: "/placeholder.svg?height=300&width=500",
        featured: true,
        category: "Machine Learning",
      },
      {
        title: "Real-time Chat Application",
        description: "Ứng dụng chat real-time với tính năng nhóm, chia sẻ file, emoji và notification push.",
        technologies: ["React", "Socket.io", "Node.js", "Redis", "MongoDB"],
        githubUrl: "https://github.com/username/realtime-chat",
        liveUrl: "https://chat-app-demo.com",
        imageUrl: "/placeholder.svg?height=300&width=500",
        featured: false,
        category: "Web Development",
      },
    ]

    for (const project of sampleProjects) {
      try {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project),
        })
      } catch (error) {
        console.error("Error creating sample project:", error)
      }
    }
  }

  const createSampleBlogPosts = async () => {
    const sampleBlogPosts = [
      {
        title: "Hướng dẫn xây dựng API RESTful với Node.js và Express",
        excerpt:
          "Tìm hiểu cách tạo một API RESTful hoàn chỉnh từ đầu, bao gồm authentication, validation và error handling.",
        content: `
        <h2>Giới thiệu</h2>
        <p>Trong bài viết này, chúng ta sẽ cùng nhau xây dựng một API RESTful hoàn chỉnh sử dụng Node.js và Express framework.</p>
        
        <h2>Cài đặt môi trường</h2>
        <p>Đầu tiên, chúng ta cần cài đặt các package cần thiết:</p>
        <pre><code>npm init -y
npm install express mongoose bcryptjs jsonwebtoken
npm install -D nodemon</code></pre>
        
        <h2>Tạo server cơ bản</h2>
        <p>Tạo file server.js với nội dung cơ bản:</p>
        <pre><code>const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});</code></pre>
        
        <h2>Kết luận</h2>
        <p>Chúng ta đã tạo thành công một API RESTful cơ bản. Trong các bài viết tiếp theo, chúng ta sẽ mở rộng thêm các tính năng như authentication và database integration.</p>
      `,
        slug: "huong-dan-xay-dung-api-restful-nodejs-express",
        tags: ["Node.js", "Express", "API", "Backend", "Tutorial"],
        author: "Minh Dung",
      },
      {
        title: "Machine Learning cơ bản với Python và Scikit-learn",
        excerpt:
          "Khám phá thế giới Machine Learning qua các ví dụ thực tế với Python và thư viện Scikit-learn phổ biến.",
        content: `
        <h2>Machine Learning là gì?</h2>
        <p>Machine Learning (ML) là một nhánh của trí tuệ nhân tạo (AI) cho phép máy tính học hỏi và đưa ra quyết định từ dữ liệu mà không cần được lập trình cụ thể.</p>
        
        <h2>Cài đặt môi trường</h2>
        <p>Để bắt đầu với ML, chúng ta cần cài đặt các thư viện cần thiết:</p>
        <pre><code>pip install numpy pandas scikit-learn matplotlib seaborn jupyter</code></pre>
        
        <h2>Ví dụ đầu tiên: Phân loại Iris</h2>
        <p>Chúng ta sẽ sử dụng dataset Iris nổi tiếng để thực hiện bài toán phân loại:</p>
        <pre><code>from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
iris = datasets.load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Predict and evaluate
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')</code></pre>
        
        <h2>Kết luận</h2>
        <p>Đây chỉ là bước đầu tiên trong hành trình khám phá Machine Learning. Hãy tiếp tục thực hành với nhiều dataset và thuật toán khác nhau!</p>
      `,
        slug: "machine-learning-co-ban-python-scikit-learn",
        tags: ["Python", "Machine Learning", "Scikit-learn", "Data Science", "AI"],
        author: "Minh Dung",
      },
      {
        title: "Tối ưu hóa hiệu suất React với React.memo và useMemo",
        excerpt:
          "Tìm hiểu cách sử dụng React.memo, useMemo và useCallback để tối ưu hóa hiệu suất ứng dụng React của bạn.",
        content: `
        <h2>Tại sao cần tối ưu hóa React?</h2>
        <p>Khi ứng dụng React phát triển, việc tối ưu hóa hiệu suất trở nên quan trọng để đảm bảo trải nghiệm người dùng mượt mà.</p>
        
        <h2>React.memo</h2>
        <p>React.memo là một Higher Order Component giúp tránh re-render không cần thiết:</p>
        <pre><code>import React from 'react';

const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    &lt;div&gt;
      {data.map(item =&gt; (
        &lt;div key={item.id}&gt;{item.name}&lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
});

export default ExpensiveComponent;</code></pre>
        
        <h2>useMemo Hook</h2>
        <p>useMemo giúp cache kết quả của các phép tính phức tạp:</p>
        <pre><code>import React, { useMemo } from 'react';

function DataProcessor({ items, filter }) {
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return items
      .filter(item => item.category === filter)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, filter]);

  return (
    &lt;ul&gt;
      {processedData.map(item => (
        &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>
        
        <h2>Kết luận</h2>
        <p>Việc sử dụng đúng các kỹ thuật tối ưu hóa sẽ giúp ứng dụng React của bạn chạy nhanh hơn và mượt mà hơn. Tuy nhiên, hãy nhớ rằng không phải lúc nào cũng cần tối ưu hóa - chỉ tối ưu khi thực sự cần thiết!</p>
      `,
        slug: "toi-uu-hoa-hieu-suat-react-memo-usememo",
        tags: ["React", "Performance", "Optimization", "JavaScript", "Frontend"],
        author: "Minh Dung",
      },
      {
        title: "Xây dựng Chatbot AI với Python và OpenAI GPT",
        excerpt: "Hướng dẫn chi tiết cách tạo một chatbot thông minh sử dụng OpenAI GPT API và Python Flask.",
        content: `
        <h2>Giới thiệu về Chatbot AI</h2>
        <p>Chatbot AI đang trở thành xu hướng phổ biến trong việc tự động hóa customer service và tương tác với người dùng.</p>
        
        <h2>Chuẩn bị môi trường</h2>
        <p>Cài đặt các thư viện cần thiết:</p>
        <pre><code>pip install openai flask python-dotenv</code></pre>
        
        <h2>Tạo chatbot cơ bản</h2>
        <p>Code Python để tạo chatbot:</p>
        <pre><code>import openai
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "Bạn là một assistant hữu ích."},
            {"role": "user", "content": user_message}
        ]
    )
    
    return jsonify({
        'response': response.choices[0].message.content
    })

if __name__ == '__main__':
    app.run(debug=True)</code></pre>
        
        <h2>Kết luận</h2>
        <p>Với OpenAI GPT API, việc tạo chatbot AI trở nên đơn giản và mạnh mẽ. Bạn có thể mở rộng thêm nhiều tính năng như memory, context awareness, và integration với database.</p>
      `,
        slug: "xay-dung-chatbot-ai-python-openai-gpt",
        tags: ["Python", "AI", "Chatbot", "OpenAI", "Flask"],
        author: "Minh Dung",
      },
      {
        title: "Next.js 14 App Router: Hướng dẫn toàn diện",
        excerpt:
          "Khám phá tất cả tính năng mới của Next.js 14 App Router, từ Server Components đến Streaming và Suspense.",
        content: `
        <h2>Next.js 14 App Router là gì?</h2>
        <p>App Router là cách mới để xây dựng ứng dụng Next.js với nhiều tính năng mạnh mẽ như Server Components, Streaming, và improved routing.</p>
        
        <h2>Cấu trúc thư mục mới</h2>
        <p>App Router sử dụng cấu trúc thư mục app/ thay vì pages/:</p>
        <pre><code>app/
  layout.tsx      # Root layout
  page.tsx        # Home page
  about/
    page.tsx      # About page
  blog/
    page.tsx      # Blog listing
    [slug]/
      page.tsx    # Blog post detail</code></pre>
        
        <h2>Server Components</h2>
        <p>Server Components chạy trên server và giúp giảm bundle size:</p>
        <pre><code>// app/blog/page.tsx
async function BlogPage() {
  // Fetch data trực tiếp trong component
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())
  
  return (
    &lt;div&gt;
      &lt;h1&gt;Blog Posts&lt;/h1&gt;
      {posts.map(post =&gt; (
        &lt;article key={post.id}&gt;
          &lt;h2&gt;{post.title}&lt;/h2&gt;
          &lt;p&gt;{post.excerpt}&lt;/p&gt;
        &lt;/article&gt;
      ))}
    &lt;/div&gt;
  )
}

export default BlogPage</code></pre>
        
        <h2>Kết luận</h2>
        <p>Next.js 14 App Router mang lại nhiều cải tiến về performance và developer experience. Đây là tương lai của React development!</p>
      `,
        slug: "nextjs-14-app-router-huong-dan-toan-dien",
        tags: ["Next.js", "React", "App Router", "Server Components", "Web Development"],
        author: "Minh Dung",
      },
    ]

    for (const post of sampleBlogPosts) {
      try {
        await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        })
      } catch (error) {
        console.error("Error creating sample blog post:", error)
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-effect z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-gradient"
            >
              DevPortfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Projects", "Blog", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden">
                Admin
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative inline-block mb-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 p-1 shadow-glow animate-float">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                  <Code className="w-20 h-20 text-blue-600" />
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-10 h-10 text-yellow-500" />
              </motion.div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="text-gradient">Full Stack</span>
              <br />
              <span className="text-slate-800 dark:text-white">Developer</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Chuyên về <span className="text-blue-600 font-semibold">Web Development</span> &{" "}
              <span className="text-purple-600 font-semibold">Machine Learning Python</span>.
              <br />
              Tạo ra những sản phẩm công nghệ hiện đại và sáng tạo.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 rounded-xl shadow-glow"
                onClick={() => scrollToSection("projects")}
              >
                Xem Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                onClick={() => scrollToSection("contact")}
              >
                Liên hệ
              </Button>
            </div>

            <div className="flex justify-center space-x-8">
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Github className="w-7 h-7 group-hover:text-blue-600 transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Linkedin className="w-7 h-7 group-hover:text-blue-600 transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mail className="w-7 h-7 group-hover:text-blue-600 transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="mt-20"
          >
            <ChevronDown
              className="w-10 h-10 mx-auto text-slate-400 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => scrollToSection("about")}
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black mb-6 text-gradient">Về tôi</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Tôi là một Full Stack Developer với niềm đam mê về công nghệ và sáng tạo.
              <br />
              Chuyên về phát triển web hiện đại và ứng dụng Machine Learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="space-y-8">
                <div className="flex items-center space-x-6 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Web Development</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">React, Next.js, Node.js, TypeScript</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Machine Learning</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">
                      Python, TensorFlow, PyTorch, Scikit-learn
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Database & Cloud</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-lg">MongoDB, PostgreSQL, AWS, Docker</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-6">👨‍💻</div>
                    <p className="text-2xl font-bold text-gradient">Passionate Developer</p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">Building the future with code</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black mb-6 text-gradient">Kỹ năng</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">Công nghệ và công cụ tôi sử dụng hàng ngày</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
                color: "from-blue-500 to-blue-600",
                icon: Code,
              },
              {
                category: "Backend",
                skills: ["Node.js", "Python", "MongoDB", "PostgreSQL", "REST APIs"],
                color: "from-purple-500 to-purple-600",
                icon: Database,
              },
              {
                category: "ML & Data",
                skills: ["TensorFlow", "PyTorch", "Pandas", "NumPy", "Jupyter"],
                color: "from-green-500 to-green-600",
                icon: Brain,
              },
            ].map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skillGroup.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}
                    >
                      <skillGroup.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 text-center">{skillGroup.category}</h3>
                    <div className="space-y-4">
                      {skillGroup.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700"
                        >
                          <span className="font-medium">{skill}</span>
                          <Badge variant="secondary" className="font-semibold">
                            {Math.floor(Math.random() * 20) + 80}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black mb-6 text-gradient">Dự án nổi bật</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">Một số dự án tôi đã thực hiện</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse border-0 shadow-lg">
                  <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-t-xl"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.imageUrl || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="font-medium">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" asChild className="flex-1">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size="sm" asChild className="flex-1">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 dark:text-slate-300">Chưa có dự án nào. Hãy thêm dự án từ trang admin!</p>
              </div>
            )}
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-2">
              <Link href="/projects">
                Xem tất cả dự án
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black mb-6 text-gradient">Blog</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">Chia sẻ kiến thức và kinh nghiệm</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="animate-pulse border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : blogPosts.length > 0 ? (
              blogPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 font-medium">
                        {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-600 dark:text-slate-300">
                  Chưa có bài viết nào. Hãy thêm bài viết từ trang admin!
                </p>
              </div>
            )}
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-2">
              <Link href="/blog">
                Xem tất cả bài viết
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-black text-white mb-6">Liên hệ</h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Bạn có dự án thú vị? Hãy cùng nhau tạo ra điều gì đó tuyệt vời!
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-xl font-semibold shadow-lg"
            >
              Gửi tin nhắn
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <p className="text-slate-400 text-lg">© 2024 DevPortfolio. Made with ❤️ using Next.js & MongoDB</p>
        </div>
      </footer>
    </div>
  )
}
