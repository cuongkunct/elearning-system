export default function ProfileGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      {children}
    </section>
  );
}
