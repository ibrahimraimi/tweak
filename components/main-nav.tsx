"use client";

import Link from "next/link";
import { Icons } from "./icons";

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="font-bold sm:inline-block text-primary">Tweak</span>
      </Link>
    </div>
  );
}
