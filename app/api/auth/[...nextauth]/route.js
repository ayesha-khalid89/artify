import { connectToDB } from "@mongodb/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/User"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name:"Credentials",
      async authorize(credentials,req){
        await connectToDB()
        let user=await User.findOne({email: credentials.email})
        if(!user){
          throw new Error("Invalid email");
        }
        //compare password
        const isMatch= await compare(credentials.password,user.password)
        if(!isMatch){
          throw new Error("Invalid password");
        }
        return user
      }
    })
  ],
  secret:process.env.NEXTAUTH_SECRET,
  callbacks:{
    async session({session}){
        const sessionUser=await User.findOne({email:session.user.email})
        session.user.id=sessionUser._id.toString()
        return session
    },
    async signIn({account,profile}){
        if(account.provider==="google"){
            try{
                await connectToDB()
                //check user exists
                let user=await User.findOne({email: profile.email})
                if(!user){
                    user=await User.create({
                        email:profile.email,
                        userName:profile.name,
                        profileImagePath:profile.picture,
                        wishList:[],
                        cart:[],
                        order:[],
                        work:[]
                    })
                }
                return user
            }catch(err){
                console.log("Error checking if user exist", err.message)
            }
        }
        return true
    }
  }
});

export { handler as GET, handler as POST };
