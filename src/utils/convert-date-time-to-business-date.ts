import {DateTime} from 'luxon';

export function convertDateTimeToBusinessDate(date: DateTime): string {
    if (!date.isValid) {
        throw Error('Invalid DateTime');
    }

    return date.toFormat('yyyy-MM-dd');
}
