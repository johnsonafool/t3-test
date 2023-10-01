export default function DocumentLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto flex flex-col">
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>

        <section className="mt-12 mb-24 grid grid-cols-1 gap-12 px-8 sm:mt-24 sm:grid-cols-2">
          <div className="flex flex-col gap-4">{children}</div>
        </section>
      </section>
    </main>
  );
}
