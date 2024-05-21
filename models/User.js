import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: [true, "username already exists"],
      required: [true, "username is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
    },
    profileImagePath: {
      type: String,
      required: [true, "Profile Photo is required"],
    },
    wishList: {
      type: Array,
      default: [],
    },
    cart: {
      type: Array,
      default: [],
    },
    order: {
      type: Array,
      default: [],
    },
    work: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
module.exports = User;
