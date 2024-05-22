import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.formData();
    const creator = data.get("creator");
    const category = data.get("category");
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");

    const photos = data.getAll("workPhotoPaths");
    const workPhotoPaths = [];
    //process each photo
    for (const photo of photos) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const workImagePath = `C:/Users/DELL/Documents/GitHub/artify/public/uploads/${photo.name}`;
      await writeFile(workImagePath, buffer);
      workPhotoPaths.push(`/uploads/${photo.name}`);
    }
    const newWork = new Work({
      creator,
      category,
      title,
      description,
      price,
      workPhotoPaths,
    });
    await newWork.save();
    return new Response(JSON.stringify(newWork, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new work", { status: 500 });
  }
}
