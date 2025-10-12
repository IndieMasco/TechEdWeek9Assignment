import NewPosts from "@/components/postfeed/NewPosts";
import AllPostsFeed from "@/components/postfeed/AllPostsFeed";
import "./posts.css";

export default async function PostsPage() {
  return (
    <div className="main-content">
      <div className="main-content-layout">
        <NewPosts />
        <AllPostsFeed />
      </div>
    </div>
  );
}
