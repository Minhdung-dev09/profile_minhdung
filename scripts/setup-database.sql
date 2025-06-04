-- MongoDB Collections Setup
-- This is a reference for the MongoDB collections structure

-- Projects Collection
-- Collection: projects
-- Sample document:
{
  "_id": ObjectId,
  "title": "Project Title",
  "description": "Project description",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/username/project",
  "liveUrl": "https://project.com",
  "imageUrl": "https://image.com/project.jpg",
  "featured": true,
  "category": "Web Development",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}

-- Blog Collection  
-- Collection: blog
-- Sample document:
{
  "_id": ObjectId,
  "title": "Blog Post Title",
  "excerpt": "Short description of the blog post",
  "content": "<p>Full HTML content of the blog post</p>",
  "slug": "blog-post-title",
  "publishedAt": "2024-01-01T00:00:00.000Z",
  "tags": ["JavaScript", "Tutorial"],
  "author": "Your Name",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}

-- Indexes to create for better performance:
-- db.projects.createIndex({ "featured": 1 })
-- db.projects.createIndex({ "createdAt": -1 })
-- db.blog.createIndex({ "slug": 1 }, { unique: true })
-- db.blog.createIndex({ "publishedAt": -1 })
-- db.blog.createIndex({ "tags": 1 })
