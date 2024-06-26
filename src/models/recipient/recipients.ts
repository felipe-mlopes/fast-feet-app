'use server'

import { redirect } from "next/navigation"

import { api } from "../api";
import { getSession } from "../auth/auth";

import { formSchemaOutputRegisterRecipient } from "@/presenter/validations/register-recipient.validation";
import { FormStateTypes } from "@/view/ui-logic/types/form-state";

export async function registerRecipient(
    prevState: FormStateTypes,
    formData: FormData
    ): Promise<FormStateTypes> {
    const { token } = await getSession()

    const result = formSchemaOutputRegisterRecipient.safeParse(formData)
    
    if (!result.success) {
        console.error(result.error.issues)
        return { error: result.error.issues }
    }
    
    const { clientName, clientEmail, zipcode, address, neighborhood, city, state } = result.data

    const response = await api('/recipients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            address,
            zipcode,
            neighborhood,
            city,
            state
        })
    })

    if (response.ok) {
        redirect("/admin")

    } else {
        const data = await response.json()

        return { error: data.error }
     }
}

export async function getRecipientByEmail(email: string) {
    const { token } = await getSession()

    const response = await api(`/recipient?recipientEmail=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return {
            recipient: null
        }
    }

    const data = await response.json()

    return {
        recipient: data.recipient
    }
}

export async function fetchRecipientEmailsBySearch(search: string) {
    const { token } = await getSession()

    const response = await api(`/recipient-email?search=${search}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json()

    return {
        recipients: data.recipientEmails
    }
}