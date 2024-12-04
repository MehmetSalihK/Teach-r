export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
}
