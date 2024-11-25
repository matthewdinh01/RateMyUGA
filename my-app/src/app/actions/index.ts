"use server"
import { signIn, signOut } from "../../auth";

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        return response;
    } catch(err: any) {
        throw err;
    }
}