import { Button } from "../button/Button"
import "./blog-post.css"

export const BlogPost = () => {
  return (
    <div className="post">
      <div className="post-image"></div>
      <div className="p-3">
        <h3>Title</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam natus numquam eaque voluptatibus dolor culpa nobis vel saepe fugit beatae voluptas velit, doloremque qui unde doloribus officiis, vitae, commodi accusantium.</p>
        <Button text="LER MAIS" link="#nav" />
      </div>
    </div>
  )
}