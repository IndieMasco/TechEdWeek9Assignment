import { db } from "@/utils/dbConnection";
import React from "react";
import "./PostFeed.css";
import Link from "next/link";

export default async function AllPostsFeed() {
  let posts = [];

  try {
    const postsResult = await db.query(
      `
      SELECT
        p.id AS post_id,
        p.post,
        u.firstname,
        u.lastname
      FROM posts2 p
      JOIN users u ON p.clerkid_id = u.clerkid
      ORDER BY p.id DESC
      `
    );
    posts = postsResult.rows.map((row) => ({
      id: row.post_id,
      authorName: `${row.firstname} ${row.lastname}`,
      content: row.post,
    }));
  } catch (error) {
    console.error(
      "Error loading global feed posts (check JOIN query and table schema):",
      error
    );
  }

  return (
    <section className="all-posts-container">
      <h2 className="global-feed">Global Feed ({posts.length})</h2>
      {posts.length > 0 ? (
        <div className="post-card">
          {posts.map((post) => (
            <div key={post.id} className="single-post">
              <p>— {post.authorName}</p>
              <p>{post.content}</p>
              <div className="all-post-buttons">
                <Link href={`/posts/edit/${post.id}`}>
                  <button className="all-posts-edit-button">Edit Post</button>
                </Link>
                <Link href={`/posts/delete/${post.id}`}>
                  <button className="all-post-delete-button">
                    Delete Post
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts have been shared yet. Start the conversation!</p>
      )}
    </section>
  );
}
