export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex  items-center justify-center gap-4 py-4 md:py-6">
      {children}
    </section>
  );
}
