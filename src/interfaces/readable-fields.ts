export interface ReadableFields<ModelResponse> {
    id: number;
    readonly _response: Readonly<ModelResponse & { [key: string]: any }>;

    getReadableFields(): (keyof ModelResponse & string)[];
}
