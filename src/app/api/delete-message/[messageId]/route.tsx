import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    const messageId = params.messageid
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Error deleting message"
        }, {
            status: 401
        })
    }

    try {

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: user._id },
            { $pull: { messages: { _id: messageId } } },
            { new: true }
        );

        if (!updatedUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "User not found or message not deleted"
            }), {
                status: 404
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Message Deleted",
            messages: updatedUser.messages,
        }), {
            status: 200
        });
    } catch (error) {
        return Response.json({
            success: false,
            message: "failed to update user status to accept message"
        }, {
            status: 500
        })
    }
}