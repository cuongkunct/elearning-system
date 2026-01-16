

export default function ProfileGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <section className="">
      <div className="">
        {children}
      </div>
    </section>
  );
}
