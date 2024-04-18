import "./blog-section.css"
import { BlogPost } from "./BlogPost"

export const BlogSection = () => {
  return (
    <div className="py-5">
      <div className="container">
        <h2 className="post-title">Blog</h2>
        <h3 className="post-title-description">fique por dentro das novidades da plataforma!</h3>
        <div className="post-container d-flex justify-content-between my-4">
          <BlogPost />
          <BlogPost />
          <BlogPost />
        </div>
      </div>
    </div>
  )
}