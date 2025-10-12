export default function Footer() {
  return (
    <footer className="bg-black text-white p-4 flex justify-center items-center border-t border-white">
      <div className="flex space-x-6 items-center">
        <p className="text-sm">Made by S P J Clark</p>
        <span className="text-white">|</span>
        <a
          href="https://github.com/IndieMasco"
          className="text-white hover:text-red-800 transition-colors text-sm"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/sam-p-j-clark/"
          className="text-white hover:text-red-800 transition-colors text-sm"
        >
          Linkedin
        </a>
      </div>
    </footer>
  );
}
