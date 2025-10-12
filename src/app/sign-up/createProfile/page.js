import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import "./create.css";

export default async function createProfilePage() {
  const user = await currentUser();

  const existingUser = await db.query(
    `SELECT * FROM users WHERE clerkId = $1`,
    [user.id]
  );

  if (existingUser.rows.length > 0) {
    redirect("/posts");
  }

  async function handleSubmit(formData) {
    "use server";

    const formValues = {
      clerkId: formData.get("clerkId"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      bio: formData.get("bio"),
    };

    await db.query(
      `INSERT INTO users (clerkId, firstName, lastName, bio) VALUES($1, $2, $3, $4)`,
      [
        formValues.clerkId,
        formValues.firstName,
        formValues.lastName,
        formValues.bio,
      ]
    );

    redirect("/user");
  }

  return (
    <div className="main-content">
      <div className="create-container">
        <form action={handleSubmit}>
          <input type="hidden" name="clerkId" value={user.id} />
          <fieldset className="create-fieldset">
            <legend className="create-legend">Create your profile</legend>
            <label className="create-label" htmlFor="firstName">
              First Name:{" "}
            </label>
            <input type="text" id="firstName" name="firstName" required />
            <label className="create-label" htmlFor="lastName">
              Last Name:{" "}
            </label>
            <input type="text" id="lastName" name="lastName" required />
            <label className="create-label" htmlFor="bio">
              Bio:{" "}
            </label>
            <textarea
              className="create-textarea"
              type="text"
              name="bio"
              required
            />
          </fieldset>
          <button className="create-button" type="submit">
            Create profile
          </button>
        </form>
      </div>
    </div>
  );
}
