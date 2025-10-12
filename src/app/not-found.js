import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="main-content">
      <div className="not-found-containter">
        <Image
          src="/not-found.gif"
          alt="404-gif"
          width={700}
          height={700}
          unoptimized
          className="not-gif"
        />
        <div className="not-test-container">
          <p className="not-p">
            Oops! The page you are looking for does not exist on Hivemind. It
            might have been moved or deleted.
          </p>
          <Link className="not-link" href="/">
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
