import { CommonStatus } from "src/app/shared/models/status";

export class DocumentListingOption {
    search: string;
    sort: string;
    page: string;
    status: CommonStatus = CommonStatus.ALL;
    get sortDirection () {
        return this.sort && this.sort[0] == '-' ? '-' : '+';
    }
}