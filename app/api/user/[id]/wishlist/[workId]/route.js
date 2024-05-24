import Work from "@models/Work";
import User from "@models/User";
import { connectToDB } from "@mongodb/database";

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = params.id;
    const workId = params.workId;
    const user = await User.findById(userId);
    const work = await Work.findById(workId).populate("creator");
    

    const favoriteWork = user.wishList.find(
      (item) => item._id.toString() === workId
    );
    if (favoriteWork) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== workId
      );
    } else {
      user.wishList.push(work);
    }
    await user.save();

    return new Response(
      JSON.stringify({ message: "wishList updated", wishList: user.wishList }),
      { status: 200 }
    );
  } catch (err) {
    console.log("failed to patch wishlist");
    return new Response("Failed to update wishlist by user", { status: 500 });
  }
};
