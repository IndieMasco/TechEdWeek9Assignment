import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import "./edit.css";

export default async function EditPage({ params }) {
  const postId = params.postId;
  const user = await currentUser();

  const postResult = await db.query(
    `
    SELECT p.post, u.clerkid
    FROM posts2 p
    JOIN users u ON p.clerkid_id = u.clerkid
    WHERE p.id = $1
    `,
    [postId]
  );

  const post = postResult.rows[0];
  if (!user || !post || post.clerkid !== user.id) {
    redirect("/posts");
  }

  async function handleEdit(formData) {
    "use server";

    const newContent = formData.get("post-content");

    if (!newContent || newContent.trim().length === 0) {
      console.error("New post content is empty.");
      return;
    }

    try {
      await db.query(
        `UPDATE posts2 SET post = $1 WHERE id = $2 AND clerkid_id = $3`,
        [newContent, postId, user.id]
      );
    } catch (error) {
      console.error("Failed to update post:", error);
    }

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="main-content">
      <div className="edit-post-container">
        <h2 className="edit-post-title">Edit Your Post</h2>

        <form action={handleEdit} className="edit-post-form">
          <fieldset className="edit-post-fieldset">
            <label htmlFor="post-content" className="edit-post-label">
              Your New Content:
            </label>
            <textarea
              name="post-content"
              id="post-content"
              rows="8"
              maxLength="1000"
              required
              defaultValue={post.post}
              className="edit-post-textarea"
            ></textarea>
          </fieldset>

          <div className="form-actions">
            <Link href="/posts" passHref>
              <button type="button" className="edit-button">
                Cancel
              </button>
            </Link>

            <button type="submit" className="edit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
