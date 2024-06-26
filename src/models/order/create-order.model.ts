import { GetRecipientByEmailModel } from "../recipient/get-recipient-by-email.model"
import { getSession } from "../auth/auth"
import { api } from "../api"

interface CreateOrderResquest {
    recipientEmail: string,
    title: string
}

interface ICreateOrderModel {
    execute({ recipientEmail, title }: CreateOrderResquest): Promise<boolean>
}

export class CreateOrderModel implements ICreateOrderModel {
    constructor(private getRecipientByEmailModel: GetRecipientByEmailModel) {}

    async execute({ recipientEmail, title }: CreateOrderResquest): Promise<boolean> {
        const { token } = await getSession()

        const { recipient } = await this.getRecipientByEmailModel.execute(recipientEmail)

        if (!recipient) {
            return Promise.resolve(false)
        }

        const response = await api(`/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                recipientId: recipient.id
            })
        })
        
        if (response.ok) {
            return Promise.resolve(true)
        }

        return Promise.resolve(false)
    }
}