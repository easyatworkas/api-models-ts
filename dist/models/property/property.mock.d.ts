import { Property, PropertyResponse } from './property';
export declare function mockPropertyResponse(data?: Partial<PropertyResponse>): {
    id: number;
    key: string;
    value: string;
    created_at: string;
    updated_at: string;
    from: string | null;
    to: string | null;
};
export declare function mockProperty(data?: Partial<PropertyResponse>): Property;
//# sourceMappingURL=property.mock.d.ts.map