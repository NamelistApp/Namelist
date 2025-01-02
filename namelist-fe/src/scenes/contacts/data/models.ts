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

    get displayName(): string | null {
        const name = [this.firstName, this.lastName].filter(Boolean).join(' ')
        return name.trim() ? name : null
    }
}

export type CreateContactRequest = {
    email_address: string | null
    phone_number: string | null
    first_name: string | null
    last_name: string | null
}