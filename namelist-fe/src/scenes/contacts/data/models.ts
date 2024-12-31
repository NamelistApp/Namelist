export type CreateContactRequest = {
    email_address: string | null
    phone_number: string | null
    first_name: string | null
    last_name: string | null
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