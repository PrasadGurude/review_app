import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect()
    try {

        const { username, email, password } = await request.json()
        const exist = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (exist) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {
                status: 400
            })
        }

        const emailExhist = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (emailExhist) {
            if (emailExhist.isVerified) {
                return Response.json({
                    success: false,
                    message: "email already exhist with this email"
                }, {
                    status: 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours() + 1)

                emailExhist.password = hashedPassword;
                emailExhist.verifyCode = verifyCode ;
                emailExhist.verifyCodeExpiry = expiryDate;
                
                await emailExhist.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }

        // send verification email 

        const emailResponse = await sendVerificationEmail(email, username, verifyCode)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            })
        }

        return Response.json({
            success: true,
            message: "User registered successfully, please verify your email"
        })

    } catch (error) {
        console.log("Error registering user", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            }, {
            status: 500
        }
        )
    }
}