import { Language } from './language';
import {mockLanguage} from './language.mock';

describe('Language', () => {
    it('should create an instance', () => {
        expect(mockLanguage()).toBeTruthy();
    });
});
