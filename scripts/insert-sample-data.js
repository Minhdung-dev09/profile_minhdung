// Script to insert sample data into MongoDB
// This will connect to your MongoDB Atlas database and insert sample projects and blog posts

const { MongoClient } = require("mongodb")

const uri =
  "mongodb+srv://minhdung09:minhdung09@social-media.zswsltz.mongodb.net/?retryWrites=true&w=majority&appName=social-media"

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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

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
    publishedAt: new Date().toISOString(),
    tags: ["Node.js", "Express", "API", "Backend", "Tutorial"],
    author: "Developer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Machine Learning cơ bản với Python và Scikit-learn",
    excerpt: "Khám phá thế giới Machine Learning qua các ví dụ thực tế với Python và thư viện Scikit-learn phổ biến.",
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
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ["Python", "Machine Learning", "Scikit-learn", "Data Science", "AI"],
    author: "Developer",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

async function insertSampleData() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB Atlas!")

    const db = client.db("portfolio")

    // Insert projects
    const projectsResult = await db.collection("projects").insertMany(sampleProjects)
    console.log(`${projectsResult.insertedCount} projects inserted`)

    // Insert blog posts
    const blogResult = await db.collection("blog").insertMany(sampleBlogPosts)
    console.log(`${blogResult.insertedCount} blog posts inserted`)

    // Create indexes
    await db.collection("projects").createIndex({ featured: 1 })
    await db.collection("projects").createIndex({ createdAt: -1 })
    await db.collection("blog").createIndex({ slug: 1 }, { unique: true })
    await db.collection("blog").createIndex({ publishedAt: -1 })
    await db.collection("blog").createIndex({ tags: 1 })

    console.log("Indexes created successfully!")
    console.log("Sample data insertion completed!")
  } catch (error) {
    console.error("Error inserting sample data:", error)
  } finally {
    await client.close()
  }
}

insertSampleData()
