export class Contact {
    constructor(
        public id: number,
        public objectTypeId: number,
        public firstName: string | null,
        public lastName: string | null,
        public emailAddress: string | null,
        public phoneNumber: string | null,
        public source: string | null,
        public createdAt: Date,
        public updatedAt: Date | null
    ) { }

    get fullName() {
        return [this.firstName, this.lastName].filter(Boolean).join(' ')
    }
}

export type CreateContactRequest = {
    email_address: string | null
    phone_number: string | null
    first_name: string | null
    last_name: string | null
}