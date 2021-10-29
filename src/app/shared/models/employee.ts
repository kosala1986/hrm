/** Employee model */
export interface Employee {
    id: number;
    name: string;
    email: string;
    location: string;
    status: string;
    image: string;
}

/** Readable names for employee fields displayed in the app. */
export enum EmployeeLabel {
    NAME = 'Name',
    EMAIL_ADDRESS = 'Email address',
    LOCATION = 'Location',
    STATUS = 'Status',
}

/** Filters */
export enum SearchParamLabel {
    PAGE = '_page',
    LIMIT = '_limit',
    SORT = '_sort',
    ORDER = '_order',
}