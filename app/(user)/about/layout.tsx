export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full min-h-screen">
      <div className="">{children}</div>
    </section>
  );
}
