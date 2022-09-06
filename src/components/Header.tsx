import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="relative pt-5 pb-10 max-w-2xl mx-auto flex justify-between items-center">
      <div>
        <Link href="/">
          <a className="text-3xl font-bold">Lark Chat</a>
        </Link>
      </div>

      <nav>
        {loading && <p>Validating session...</p>}
        {!session && (
          <button onClick={() => signIn()} className="text-xl">
            Sign In
          </button>
        )}
        {session && (
          <div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex gap-2"
            >
              <img src={session.user?.image} className="rounded-full w-8 h-8" />
            </button>
            <div
              className={clsx(
                "absolute right-1 top-16 pl-3 pr-16 py-3 border rounded-lg flex flex-col items-start gap-3",
                {
                  hidden: !menuOpen,
                }
              )}
            >
              <Link href="/">
                <a className="text-slate-500 hover:text-slate-800">Dashboard</a>
              </Link>
              <Link href="/">
                <a className="text-slate-500 hover:text-slate-800">
                  Edit Profile
                </a>
              </Link>
              <button
                onClick={() => signOut()}
                className="text-slate-500 hover:text-slate-800"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
