import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import "./delete.css";

export default async function DeletePage({ params }) {
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

  async function handleDelete() {
    "use server";

    try {
      await db.query(`DELETE FROM posts2 WHERE id = $1`, [postId]);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="main-content">
      <div className="delete-confirmation-container">
        <h2 className="delete-title">
          Confirm that you want to delete this post
        </h2>
        <p className="delete-p">
          Are you absolutely sure you want to delete the following post? This
          action cannot be undone.
        </p>
        <blockquote className="post-to-delete">{post.post}</blockquote>
        <form className="delete-form" action={handleDelete}>
          <Link href="/posts" passHref>
            <button type="button" className="delete-button">
              Cancel
            </button>
          </Link>
          <button type="submit" className="delete-button">
            Yes, Delete This Post
          </button>
        </form>
      </div>
    </div>
  );
}
