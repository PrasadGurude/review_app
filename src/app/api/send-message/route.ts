import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";


export async function POST(request:Request) {
    await dbConnect()
    const {username , content} = await request.json()

    try {
        const user  = await UserModel.findOne({username})
        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User Not found"
                },{
                    status:404
                }
            )
        }

        if(!user.isAcceptingMessage){
            return Response.json(
                {
                    success:false,
                    message:"User is not accepting the messages"
                },{
                    status:403
                }
            )
        }

        const newMessage = {content ,createdAt :new Date()}

        user.messages.push(newMessage as Message)

        await user.save()
         
        return Response.json(
            {
                success:true,
                message:"Message send successfully"
            },{
                status:200
            }
        )
    } catch (error) {
        return Response.json(
            {
                success:false,
                message:"Error while creating new message"
            },{
                status:404
            }
        )
    }
}
