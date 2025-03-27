import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { log } from "node:console";
import { z } from 'zod'

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ?
                    usernameErrors.join(',') :
                    "Username not valid"
            },{
                status:400
            })
        }
        const {username} = result.data

        const exhistingVerifiedUser = await UserModel.findOne({username,isVerified:true})

        if(exhistingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username is already taken",
            },{
                status:400
            })
        }
        return Response.json({
            success:true,
            message:"Username is unique"
        })
    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        }, {
            status: 500
        })
    }
}