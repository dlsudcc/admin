export class UserListingOption {
    search: string;
    name: string;
    email: string;
    sort: string;
    page: string;
    status: string;
    get sortDirection () {
        return this.sort && this.sort[0] == '-' ? '-' : '+';
    }
}
export enum UserListingOptionStatus {
    STATUS_ACTIVE = 'activ',
    STATUS_INACTIVE = 'inact'
}