export type CreateContactRequest = {
    email_address: string
    phone_number: string
    first_name: string
    last_name: string
}

export class Contact {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public phone: string,
        public created_at: Date
    ) { }
}