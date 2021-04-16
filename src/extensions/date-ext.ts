/**
 * @desc 日期类工具扩展
 * @author DuanaoiOS
 */

import * as DateUtil from '../utils/date-helper';

declare global {
    interface DateConstructor {
        formatter(time: string | number, fmt: string, isTimestamp?: boolean): string;
        weekDay(date: number | string): string;
        isLeap(year: number): boolean;
    }
}

Date.formatter = function (time, fmt, isTimestamp) {
    return DateUtil.dateTimeFilter(time, fmt, isTimestamp);
};

Date.weekDay = function (date) {
    return DateUtil.getWeekDay(date);
};

Date.isLeap = function (year) {
    return DateUtil.isLeap(year);
};
