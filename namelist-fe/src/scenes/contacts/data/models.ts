export class Contact {
    constructor(
        public id: number,
        public objectTypeId: string,
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
    emailAddress: string | null
    phoneNumber: string | null
    firstName: string | null
    lastName: string | null
}