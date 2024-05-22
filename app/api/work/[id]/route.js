import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const work = await Work.findById(params.id).populate("creator");
    if (!work) {
      return new Response("The Work Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(work), { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
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
      if (photo instanceof Object) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const workImagePath = `C:/Users/DELL/Documents/GitHub/artify/public/uploads/${photo.name}`;
        await writeFile(workImagePath, buffer);
        workPhotoPaths.push(`/uploads/${photo.name}`);
      } else {
        workPhotoPaths.push(photo);
      }
    }

    const existingWork = await Work.findById(params.id);
    if (!existingWork) {
      return new Response("The Work Not Found", { status: 404 });
    }
    //Update the work
    existingWork.category = category;
    existingWork.title = title;
    existingWork.price = price;
    existingWork.description = description;
    existingWork.workPhotoPaths = workPhotoPaths;
    await existingWork.save();
    return new Response("successfully updated", { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error updating work", { status: 500 });
  }
};

export const DELETE= async(req,{params})=>{
    try{
        await connectToDB()
        await Work.findByIdAndDelete(params.id)
        return new Response("successfully deleted", { status: 200 });

    }catch(err){
        return new Response("deletion failed", { status: 500 });

    }
}