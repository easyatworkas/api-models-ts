// Anything returned from the API should be of this type
export type ApiResponse = {
    [key: string | number]:
        string |
        number |
        boolean |
        null |
        undefined |
        ApiResponse |
        Record<string | number, ApiResponse> |
        Array<string | number | boolean | null | undefined | ApiResponse>;
}
