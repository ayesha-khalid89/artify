import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { query } = params;
    let works = [];
    if (query.toLowerCase() === "all") {
      works = await Work.find().populate("creator");
    } else {
      works = await Work.find({
        $or: [
          { category: { $regex: query, $options: "i" } },
          { title: { $regex: query, $options: "i" } },
        ],
      }).populate("creator");
    }
    if (!works) {
      return new Response("No work found", { status: 404 });
    }
    return new Response(JSON.stringify(works), { status: 202 });
  } catch (err) {
    console.log(err.message);
    return new Response("Internal error", { status: 500 });
  }
};
