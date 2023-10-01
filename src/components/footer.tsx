import { PrimaryLink } from "./primary-link";

export function Footer() {
  return (
    <footer>
      <div className="fixed z-10 dark:bg-slate-700 bottom-0 container mx-auto grid h-24 grid-cols-3 items-center bg-slate-300 text-center">
        <PrimaryLink href="/">IconGenerator.com</PrimaryLink>
        <PrimaryLink href="/privacy-policy">Privacy Policy</PrimaryLink>
        <PrimaryLink href="/terms-of-service">Terms of Service</PrimaryLink>
      </div>
    </footer>
  );
}
