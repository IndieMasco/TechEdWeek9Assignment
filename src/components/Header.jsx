import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/Logo.png";

import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default async function Header() {
  return (
    <>
      <header className="bg-black text-white px-8 flex justify-between items-center h-20 border-b border-white">
        <div className="flex items-center space-x-4">
          <Image
            src={Logo}
            alt="Hivemind logo"
            height={100}
            width={100}
            className="h-15 w-15 object-cover rounded-full"
          />
          <h1 className="text-5xl font-extrabold tracking-tight">Hivemind</h1>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-6 text-lg">
            <Link href={"/"} className="hover:text-red-800 transition-colors">
              Home
            </Link>
            <Link
              href={"/posts"}
              className="hover:text-red-800 transition-colors"
            >
              Posts
            </Link>
            <Link
              href={"/user"}
              className="hover:text-red-800 transition-colors"
            >
              Profile
            </Link>
          </nav>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut className="flex space-x-4">
            <SignInButton>
              <button className="text-lg hover:text-red-800 transition-colors">
                Login
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-lg hover:text-red-800 transition-colors">
                Sign-up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </header>
    </>
  );
}
