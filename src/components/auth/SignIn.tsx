"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button variant={"destructive"} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <div>Not signed in</div>
      <Button onClick={() => signIn().catch(console.error)}>Sign in</Button>
    </div>
  );
}
