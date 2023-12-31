"use client";

import { signOut, useSession } from "next-auth/react";
// import { useBuyCredits } from "@/hooks/use-buy-credits";
import { PrimaryLink } from "./primary-link";
import { Button } from "./ui/button";
import LoginButton from "./auth/login-button";
import { ModeToggle } from "./theme-toggle";
import { trpc } from "@/lib/trpc/client";

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  // const { buyCredits } = useBuyCredits();

  // const {data} = trpc.user.getCredits.useQuery(undefined, {
  //   enabled: isLoggedIn,
  // });

  const credits = { data: 0 };

  return (
    <header>
      <div className="dark:bg-gray-900 container mx-auto flex h-16 items-center justify-between bg-gray-300 px-4 py-8">
        <PrimaryLink href="/">Icon Generator</PrimaryLink>
        <ul className="flex gap-4">
          <li>
            <PrimaryLink href="/generate">Generate</PrimaryLink>
          </li>
          <li>
            <PrimaryLink href="/community">Community</PrimaryLink>
          </li>
          {isLoggedIn && (
            <li>
              <PrimaryLink href="/collection">Collection</PrimaryLink>
            </li>
          )}
        </ul>
        <ul className="flex gap-4">
          {isLoggedIn && (
            <>
              <div className="flex items-center">
                Credits remaining {credits.data}
              </div>
              <li>
                <Button
                  onClick={() => {
                    // buyCredits().catch(console.error);
                  }}
                >
                  Buy Credits
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  onClick={() => {
                    signOut().catch(console.error);
                  }}
                >
                  Logout
                </Button>
              </li>
            </>
          )}
          {!isLoggedIn && <LoginButton />}
          <ModeToggle />
        </ul>
      </div>
    </header>
  );
}
