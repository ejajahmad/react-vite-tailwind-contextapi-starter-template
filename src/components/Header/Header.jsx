import React from "react";
import { Link, useLocation } from "react-router-dom";
import uuid from "react-uuid";

export default function Header() {
  const router = useLocation();

  const links = [
    {
      name: "Saved Posts",
      href: "saved-posts",
    },
    {
      name: "Your Subreddit's",
      href: "saved-subreddits",
    },
  ];

  return (
    <div className="p-5 flex flex-col sm:flex-row items-center justify-center text-center sm:justify-between gap-5 lg:px-20 shadow-lg border-b border-white ">
      <Link to="/">
        <p className="text-3xl text-rose-600 font-semibold ">Scroll Wall</p>
      </Link>
      <nav className="flex flex-col sm:flex-row gap-5">
        {links.map((link) => (
          <Link
            to={link.href}
            key={uuid()}
            className={` transition-all hover:scale-105 hover:underline underline-offset-4 ${
              router.pathname.includes(link.href) ? "underline" : ""
            } `}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
