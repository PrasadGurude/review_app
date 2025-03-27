import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Error login first"
        }, {
            status: 401
        })
    }
    const userId = user._id
    const acceptMessages = await request.json()
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, {
            isAcceptingMessage: acceptMessages
        }, {
            new: true
        }
        )

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept message"
            }, {
                status: 500
            })
        }

        return Response.json({
            success: true,
            message: "isAcceptingMessages status changed successfully",
            updatedUser
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "failed to update Acceptmessages status"
        }, {
            status: 500
        })
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Error login first"
        }, {
            status: 401
        })
    }
    const userId = user._id
    try {
        const foundUser = await UserModel.findById(userId)

        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User Not found"
            }, {
                status: 500
            })
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage 
        }, {
            status: 200
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "failed to fiend isAccepting messages"
        }, {
            status: 500
        })
    }
}
