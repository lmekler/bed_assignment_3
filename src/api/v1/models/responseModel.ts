export interface ApiResponse<T> {
    status: string;
    count?: number,
    data?: T;
    message?: string;
    error?: string;
    code?: string;
}

export const successResponse = <T>(
    data?: T,
    message?: string,
    count?: number
): ApiResponse<T> => ({
    status: "success",
    count,
    data,
    message,
});