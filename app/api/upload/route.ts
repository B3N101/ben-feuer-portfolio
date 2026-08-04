import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase();
  const filename = `${Date.now()}.${ext}`;
  const dir = join(process.cwd(), "public", "blog-images");

  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, filename), buffer);

  return Response.json({ url: `/blog-images/${filename}` });
}
