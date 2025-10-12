import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import React from "react";
import { revalidatePath } from "next/cache";
import "./PostFeed.css";

export default async function CreatePostForm() {
  const user = await currentUser();

  async function handleSubmit(formData) {
    "use server";

    const postValues = {
      clerkId: formData.get("clerkId"),
      post: formData.get("post"),
    };

    try {
      const sqlQuery = `INSERT INTO posts2 (clerkid_id, post) VALUES($1, $2)`;
      await db.query(sqlQuery, [postValues.clerkId, postValues.post]);
      redirect("/posts");
    } catch (error) {
      console.error("Database insertion failed:", error);
    }

    revalidatePath("/posts");
  }

  return (
    <div className="new-posts-container">
      <h2 className="new-posts-title">Create Your New Post</h2>
      <form action={handleSubmit}>
        <fieldset className="new-posts-fieldset">
          <legend className="new-posts-legend">Whats on your mind: </legend>
          <input type="hidden" name="clerkId" value={user.id} />
          <label className="new-posts-lable" htmlFor="post"></label>
          <textarea
            name="post"
            rows="6"
            maxLength="1000"
            required
            placeholder="Share your thoughts here (max 1000 characters)..."
            className="new-posts-textarea"
          ></textarea>
        </fieldset>
        <button className="new-posts-button" type="submit">
          Publish Post
        </button>
      </form>
    </div>
  );
}
