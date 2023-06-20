import { Language } from './language';
import {mockLanguageResponse} from './language.mock';

describe('Language', () => {
    it('should create an instance', () => {
        expect(new Language(mockLanguageResponse())).toBeTruthy();
    });
});
