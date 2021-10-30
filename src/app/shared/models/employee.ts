/** Employee model */
export interface Employee {
    id: number;
    name: string;
    email: string;
    location: string;
    status: EmployeeStatus;
    image: string;
}

/** Readable names for employee fields displayed in the app. */
export enum EmployeeLabel {
    EMAIL_ADDRESS = 'Email address',
    NAME = 'Name',
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

/** Employee status */
export enum EmployeeStatus {
    EMPLOYED = 'Employed',
    DISCARDED = 'DISCARDED',
}