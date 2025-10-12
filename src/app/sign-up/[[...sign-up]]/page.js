import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="main-content">
        <div className="clerk">
          <SignUp />
        </div>
      </div>
    </>
  );
}
