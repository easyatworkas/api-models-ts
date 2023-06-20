import { Language } from './language';

describe('Language', () => {
    it('should create an instance', () => {
        expect(
            new Language({
                code: '',
                created_at: '',
                ietf_bcp47_tag: '',
                iso639_1: '',
                name: '',
                updated_at: '',
            }),
        ).toBeTruthy();
    });
});
