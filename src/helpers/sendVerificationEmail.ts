import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: ' Review app verification code',
            react: VerificationEmail({username ,otp:verifyCode }),
          });
        console.log(result);
        return {success:true,message:"verification email send successfully"}
    } catch (emailError) {
        console.error("error sending verification email" , emailError);
        return {success:false,message:"Failed to send verification email"}
    }
}