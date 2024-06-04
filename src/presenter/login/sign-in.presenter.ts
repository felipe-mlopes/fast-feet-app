import { redirect } from "next/navigation";

import { SignInModel } from "@/models/login/sign-in.model";

import { formSchemaSignIn } from "@/presenter/validations/sign-in.validation";

import { FormStateTypes } from "@/view/ui-logic/types/form-state";

export class SignInFormPresenter {
    private signInFormModel: SignInModel;

    constructor() {
        this.signInFormModel = new SignInModel();
    }

    async handleFormSubmit(formData: FormData): Promise<FormStateTypes> {
        const rawFormData = Object.fromEntries(formData.entries());
        const result = formSchemaSignIn.safeParse(rawFormData);

        if (!result.success) {
            return { error: result.error.issues };
        }

        const { cpf, password } = result.data;

        const isAuthenticated = await this.signInFormModel.handle({
            cpf,
            password,
        });

        if (isAuthenticated) {
            redirect("/deliveries/pending");
            // return { data: "success", error: null };
        } else {
            return { data: null, error: [{ path: [], message: "Authentication failed" }] };
        }
    }
}