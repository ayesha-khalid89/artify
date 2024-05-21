import { connectToDB } from "@mongodb/database";
import User from "@models/User";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises";

//User register
export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.formData();
    
    //take info from the frontend form
    const userName = data.get("userName");
    const email = data.get("email");
    const password = data.get("password");
    const file = data.get("profileImage");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const profileImagePath = `C:/Users/DELL/Documents/GitHub/artify/public/uploads/${file.name}`;
    await writeFile(profileImagePath, buffer);
    console.log(`open ${profileImagePath} to see the uploaded files`);

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 409 }
      );
    }
    //hash the password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    //create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      profileImagePath: `uploads/${file.name}`,
    });

    //save user
    await newUser.save();

    //send success message
    return NextResponse.json(
      { message: "User Registered Successfully", user: newUser },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "user creation failed" },
      { status: 500 }
    );
  }
}
