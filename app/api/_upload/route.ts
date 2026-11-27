import { put } from "@vercel/blob";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  const blob = await put(file.name, file, { access: "public" });
  return Response.json({ url: blob.url });
}
