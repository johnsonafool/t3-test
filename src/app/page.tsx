import Image from "next/image";
import { PrimaryLinkButton } from "@/components/primary-link-button";

function HeroBanner() {
  return (
    <section className="mt-12 mb-24 grid grid-cols-1 gap-12 px-8 sm:mt-24 sm:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl">Generate icons with a click of a button</h1>
        <p className="text-2xl">
          Use AI to generate icons in seconds instead of paying a designer and
          waiting for them to create them for you.
        </p>
        <PrimaryLinkButton href="/generate" className="self-start">
          Generated your Icons
        </PrimaryLinkButton>
      </div>
      <Image
        src="/banner.png"
        alt="an image of a bunch of nice looking icons"
        width="400"
        height="300"
        className="order-first sm:-order-none"
      />
    </section>
  );
}

export default async function Home() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col">
      <HeroBanner />
    </main>
  );
}
