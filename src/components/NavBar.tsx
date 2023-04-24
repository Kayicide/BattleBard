import { SignIn, UserButton, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const NavBar = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { signOut, openSignIn } = useClerk();
  const router = useRouter();
  return (
    <div className="lg:rounded-nav-reset flex justify-between bg-gray-900 px-2 py-2 sm:rounded-xl lg:flex-col lg:rounded-tl-xl lg:px-4 lg:py-10">
      <nav className="flex flex-row items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
        <Link
          className={`smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-gray-800 hover:text-white ${
            router.pathname == "/" ? "nav-active" : ""
          } `}
          href={"/"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>
        <Link
          className={`smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-gray-800 hover:text-white ${
            router.pathname == "/mygroups" ? "nav-active" : ""
          } `}
          href={"/mygroups"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 25 25"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
        </Link>
        <Link
          className={`smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-gray-800 hover:text-white ${
            router.pathname == "/mycharacters" ? "nav-active" : ""
          } `}
          href={"/mycharacters"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </nav>
      <div className="flex flex-row items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
        <a
          className="smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-gray-800 hover:text-white"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        {isSignedIn && (
          <div className="flex justify-center p-2">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: 40,
                    height: 40,
                  },
                },
              }}
            ></UserButton>
          </div>
        )}

        {!isSignedIn && (
          <button
            className="smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-gray-800 hover:text-white"
            onClick={() => openSignIn()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              viewBox="0 0 25 25"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
