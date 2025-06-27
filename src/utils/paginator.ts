export type PaginationParams = {
    page: number;
    pageSize: number;
};

export function getPagination({ page, pageSize }: PaginationParams) {
    const limit = Math.max(pageSize, 1);
    const skip = Math.max(page - 1, 0) * limit;
    return { skip, limit };
}

export function getPaginationInfo(totalItems: number, page: number, pageSize: number) {
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
    };
}
