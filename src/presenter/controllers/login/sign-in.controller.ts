import { redirect } from "next/navigation";

import { SignInModel } from "@/models/login/sign-in.model";

import { formSchemaSignIn } from "@/presenter/validations/sign-in.validation";

import { FormStateTypes } from "@/view/ui-logic/types/form-state";

export class SignInController {
    private signInModel: SignInModel;

    constructor() {
        this.signInModel = new SignInModel();
    }

    async handle(formData: FormData): Promise<FormStateTypes> {
        const rawFormData = Object.fromEntries(formData.entries());
        const result = formSchemaSignIn.safeParse(rawFormData);

        if (!result.success) {
            return { error: result.error.issues };
        }

        const { cpf, password } = result.data;

        const isAuthenticated = await this.signInModel.execute({
            cpf,
            password,
        });

        if (isAuthenticated) {
            redirect("/deliveries/pending");
        } else {
            return { data: null, error: [{ path: [], message: "Authentication failed" }] };
        }
    }
}