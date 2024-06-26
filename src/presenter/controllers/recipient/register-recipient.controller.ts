import { redirect } from "next/navigation"

import { RegisterRecipientModel } from "@/models/recipient/register-recipient.model"

import { formSchemaRegisterRecipient } from "@/presenter/validations/register-recipient.validation"

import { ValidationError } from "@/view/ui-logic/types/form-state"

interface RegisterRecipientControllerResponse {
    data?: string | null
    error?: ValidationError[] | null
}

export class RegisterRecipientController {
    private registerRecipientModel: RegisterRecipientModel

    constructor() {
        this.registerRecipientModel = new RegisterRecipientModel()
    }

    async handle(formData: FormData): Promise<RegisterRecipientControllerResponse> {
        const rawFormData = Object.fromEntries(formData.entries())
        const result = formSchemaRegisterRecipient.safeParse(rawFormData)

        if (!result.success) {
            console.error(result.error.issues)
            return { error: result.error.issues }
        }

        const { clientName, clientEmail, address_street, address_number, address_complement, neighborhood, city, state, zipcode } = result.data

        const addressFormat = address_street + ', ' + address_number + ' ' + address_complement
        const transformedZipCode = zipcode.replace(/\D/g, '')
        const zipcodeFormat = parseInt(transformedZipCode)

        const isRegisteredRecipient = await this.registerRecipientModel.execute({
            clientName,
            clientEmail,
            address: addressFormat,
            neighborhood,
            city,
            state,
            zipcode: zipcodeFormat
        })

        if (isRegisteredRecipient) {
            redirect("/admin");
        } else {
            return { data: null, error: [{ path: [], message: "Register recipient failed." }] };
        }
    }
}