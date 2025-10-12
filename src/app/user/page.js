import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import "./user.css";

export default async function UserProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const clerkId = user.id;

  let profile;
  let posts = [];

  try {
    const profileResult = await db.query(
      `SELECT * FROM users WHERE clerkId = $1`,
      [clerkId]
    );
    profile = profileResult.rows[0];

    if (!profile) {
      redirect("/sign-up/createProfile");
    }

    const postsResult = await db.query(
      `SELECT * FROM posts2 WHERE clerkid_id = $1 ORDER BY id DESC`,
      [clerkId]
    );
    posts = postsResult.rows;
  } catch (error) {
    if (error.message !== "NEXT_REDIRECT") {
      console.error("Error loading profile or posts:", error);
    }
  }

  if (!profile) {
    redirect("/sign-up/createProfile");
  }

  const displayName = user.username;

  return (
    <div className="main-content">
      <div className="profile-container">
        <h2 className="username">{displayName}&apos;s Profile</h2>

        <section className="bio-container">
          <h3 className="h3-bio">Bio:</h3>
          <p className="p-bio">{profile.bio}</p>
        </section>

        <section className="pro-post-container">
          <h2>Posts ({posts.length})</h2>
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <p>{post.post}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven&apos;t posted anything yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
