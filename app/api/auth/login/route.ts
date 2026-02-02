export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res?.accessToken;
  const role = res?.maLoaiNguoiDung;
  if (!sessionToken) {
    return Response.json("Session token not found", { status: 400 });
  }
  return Response.json({ res }, {
    status: 200, headers: {
      "Set-Cookie": [
        `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=31536000`,
        `userRole=${role}; Path=/; SameSite=Lax; Secure; Max-Age=31536000`,
      ].join(", "),
    }
  });
}