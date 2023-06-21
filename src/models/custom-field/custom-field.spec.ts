import { CustomField } from './custom-field';
import { DateTime } from 'luxon';
import { CustomFieldBase } from '../custom-field-base';
import {mockCustomField} from './custom-field.mock';
import {BusinessDate} from '../../utils/business-date';

describe('CustomField', () => {
    it('should create an instance', () => {
        expect(mockCustomField()).toBeTruthy();
    });

    describe(`creatable`, function() {
        it(`should be creatable if there is no value`, function() {
            expect(mockCustomField({ value: null }).creatable).toBe(true);
        });

        it(`should be creatable if there is a value but the field has interval set to true`, function() {
            expect(mockCustomField({ value: '9001' }, { has_interval: true }).creatable).toBe(true);
        });

        it(`should not be creatable if there's a value and interval is false`, function() {
            expect(mockCustomField({ value: '9001' }, { has_interval: false }).creatable).toBe(false);
        });
    });

    describe(`editable`, function() {
        it(`should be editable if there's a value`, function() {
            expect(mockCustomField({ value: '9001' }).editable).toBe(true);
        });

        it(`should not be editable if there's no value`, function() {
            expect(mockCustomField({ value: null }).editable).toBe(false);
        });
    });

    describe(`deletable`, function() {
        it(`should be deletable if there's a value and the field is not required`, function() {
            expect(mockCustomField({ value: '9001' }, { required: false }).deletable).toBe(true);
        });

        it(`should not be deletable if there's no value`, function() {
            expect(mockCustomField({ value: null }).deletable).toBe(false);
        });

        it(`should not be deletable if the field is required`, function() {
            expect(mockCustomField({ value: '9001' }, { required: true }).deletable).toBe(false);
        });
    });

    describe(`toString()`, function() {
        it(`should return null if the value is null`, function() {
            expect(mockCustomField({ value: null }).toString()).toBeNull();
        });

        it(`should return false as the string 0`, function() {
            const field = mockCustomField();
            field.value = false;
            expect(field.toString()).toBe('0');
        });

        it(`should return true as the string 1`, function() {
            const field = mockCustomField();
            field.value = true;
            expect(field.toString()).toBe('1');
        });

        it(`should return a string as a string`, function() {
            const field = mockCustomField();
            field.value = '9001';
            expect(field.toString()).toBe('9001');
        });

        it(`should return an integer as a string`, function() {
            const field = mockCustomField();
            field.value = 9001;
            expect(field.toString()).toBe('9001');
        });

        it(`should return a decimal as a string`, function() {
            const field = mockCustomField();
            field.value = 9001.1;
            expect(field.toString()).toBe('9001.1');
        });

        it(`should convert a DateTime to a business date`, function() {
            const field = mockCustomField({ type: 'date' });
            field.value = DateTime.fromObject({ year: 2020, month: 10, day: 10 });

            expect(field.toString()).toBe('2020-10-10');
        });
    });

    describe(`clone()`, function() {
        it(`should return a new custom field`, function() {
            const field = mockCustomField();
            const clone = field.clone();

            expect(clone).not.toBe(field);
            expect(clone).toBeInstanceOf(CustomFieldBase);
        });
    });

    describe(`setNumberValue()`, function() {
        it(`should keep value as null if value is null`, function() {
            const field = mockCustomField({
                value: null,
                type: 'integer',
            });
            expect(field.value).toBeNull();
        });

        it(`should convert a string value to a number`, function() {
            const field = mockCustomField({
                value: '9001',
                type: 'integer',
            });
            expect(field.value).toBe(9001);
        });

        it(`should just assign the number if the value is a number`, function() {
            const field = mockCustomField({
                value: '9001',
                type: 'integer',
            });
            field.value = 9001;
            expect(field.value).toBe(9001);
        });
    });

    describe(`setBooleanValue()`, function() {
        it(`should keep value as null if value is null`, function() {
            const field = mockCustomField({
                value: null,
                type: 'boolean',
            });
            expect(field.value).toBeNull();
        });

        it(`should convert the string 1 to true`, function() {
            const field = mockCustomField({
                value: '1',
                type: 'boolean',
            });
            expect(field.value).toBe(true);
        });

        it(`should convert the string 0 to false`, function() {
            const field = mockCustomField({
                value: '0',
                type: 'boolean',
            });
            expect(field.value).toBe(false);
        });

        it(`should just assign the boolean if the value is a boolean`, function() {
            const field = mockCustomField({
                value: '1',
                type: 'boolean',
            });
            field.value = false;
            expect(field.value).toBe(false);
        });
    });

    describe(`setDateValue()`, function() {
        it(`should keep value as null if value is null`, function() {
            const field = mockCustomField({
                value: null,
                type: 'date',
            });
            expect(field.value).toBeNull();
        });

        it(`should convert a string to a business date`, function() {
            const field = mockCustomField({
                value: '2002-10-10',
                type: 'date',
            });
            expect(field.value).toBeInstanceOf(BusinessDate);
        });

        it(`should just assign the value if the value is an instanceof DateTime`, function() {
            const field = mockCustomField({
                value: '2002-10-10',
                type: 'date',
            });
            field.value = DateTime.now();
            expect(field.value).toBeInstanceOf(BusinessDate);
        });
    });

    describe(`value()`, function() {
        describe(`get`, function() {
            it(`should return the private _value`, function() {
                const field = mockCustomField({ value: '9001' });
                field['_value'] = 'overridden';
                expect(field.value).toBe('overridden');
            });
        });

        describe(`set`, function() {
            it(`should call setNumberValue if type is decimal`, function() {
                const field = mockCustomField({ type: 'decimal' });
                jest.spyOn(field as any, 'setNumberValue').mockImplementation(() => {});
                field.value = 9001;
                expect((field as any).setNumberValue).toHaveBeenCalledWith(9001);
            });

            it(`should call setNumberValue if type is integer`, function() {
                const field = mockCustomField({ type: 'integer' });
                jest.spyOn(field as any, 'setNumberValue').mockImplementation(() => {});
                field.value = 9001;
                expect((field as any).setNumberValue).toHaveBeenCalledWith(9001);
            });

            it(`should call setBooleanValue if type is boolean`, function() {
                const field = mockCustomField({ type: 'boolean' });
                jest.spyOn(field as any, 'setBooleanValue').mockImplementation(() => {});
                field.value = true;
                expect((field as any).setBooleanValue).toHaveBeenCalledWith(true);
            });

            it(`should call setDateValue if type is date`, function() {
                const field = mockCustomField({ type: 'date' });
                jest.spyOn(field as any, 'setDateValue').mockImplementation(() => {});
                field.value = '2002-10-10';
                expect((field as any).setDateValue).toHaveBeenCalledWith('2002-10-10');
            });
        });
    });

    describe(`isModified()`, function() {
        it(`should  return false if the original value and current value is null`, function() {
            const field = mockCustomField({ value: null });
            field.value = 2;
            field.value = null;
            expect(field.isModified).toBe(false);
        });

        it(`should return true if the original value differs from the current value`, function() {
            const field = mockCustomField({ value: '1' });
            field.value = 2;
            expect(field.isModified).toBe(true);
        });
    });

    describe(`active()`, function() {
        it(`should return true if from is not set`, function() {
            const field = mockCustomField({ from: null });
            expect(field.active).toBe(true);
        });

        it(`should return true if from is set and now is after from`, function() {
            const field = mockCustomField({ from: DateTime.now().minus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss') });
            expect(field.active).toBe(true);
        });

        it(`should return false if from is set and now is before from`, function() {
            const field = mockCustomField({ from: DateTime.now().plus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss') });
            expect(field.active).toBe(false);
        });

        it(`should return true if from and to is set and now is between those`, function() {
            const field = mockCustomField({
                from: DateTime.now().minus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss'),
                to: DateTime.now().plus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss'),
            });

            expect(field.active).toBe(true);
        });
    });
});
