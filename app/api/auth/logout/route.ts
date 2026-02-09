export async function POST() {
  return Response.json(
    { success: true },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          "sessionToken=; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=0",
          "userRole=; Path=/; SameSite=Lax; Secure; Max-Age=0",
        ].join(", "),
      },
    },
  );
}
