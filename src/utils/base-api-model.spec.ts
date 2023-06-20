import { BaseApiModel } from './base-api-model';

describe('BaseApiModel', () => {
    it('should create an instance', () => {
        expect(new BaseApiModel({}, undefined)).toBeTruthy();
    });
});
