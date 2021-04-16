/* eslint-disable no-restricted-properties */
/**
 * @desc 数据相关辅助方法
 * @author DuanaoiOS
 */

import { keepDecimal, mulOperation, strip } from './math-helper';
import '../extensions';

/**
 * @desc 去除对象中的空值
 * @param {object}
 * @return {object}
 */
export const shakeObject = (obj: { [key: string]: any }): object => {
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
        // 如果对象属性的值不为空，就保存该属性
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            // 记录属性
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

/**
 * 纯数量转换成金额型
 * @param {string|number} 9567.06
 * @returns {string} 9,567.06
 */
export const addDividedMark = (value: string | number): string => {
    if (isEmpty(value) || isNaN(Number(value))) {
        return '';
    }
    value = `${value}`;
    const temp = value.split('.');
    let result = '';
    let isNegative = false;
    temp[1] = temp.length === 1 ? '' : '.' + temp[1];
    if (temp[0].indexOf('-') === 0) {
        isNegative = true;
        temp[0] = temp[0].slice(1);
    }
    if (temp[0].length > 3) {
        const mod = temp[0].length % 3;
        let output = mod === 0 ? '' : temp[0].substring(0, mod);
        for (let i = 0; i < Math.floor(temp[0].length / 3); i++) {
            if (mod === 0 && i === 0) {
                output += temp[0].substring(mod + 3 * i, mod + 3 * i + 3);
            } else {
                output += ',' + temp[0].substring(mod + 3 * i, mod + 3 * i + 3);
            }
        }
        temp[0] = output;
    }
    result = temp[0] + temp[1];

    return isNegative ? '-' + result : result;
};

/**
 * 金额格式化，添加千分号并保留两位小数
 * @param {string|number} 9527
 * @returns {string} 9,527.00
 */
export const addDividedMarkAndKeepDecimal = (value: string | number): string => {
    return addDividedMark(keepDecimal(value));
};

/**
 * 数值转化成中文
 * @param {string|number} 10
 * @returns {string} 十
 */
export const numberFormatCC = (value: string | number): string => {
    switch (`${value}`) {
        case '1':
            return '一';
        case '10':
            return '十';
        case '100':
            return '百';
        case '1000':
            return '千';
        case '10000':
            return '万';
        case '100000':
            return '十万';
        case '1000000':
            return '百万';
        case '10000000':
            return '千万';
        case '100000000':
            return '亿';
        case '1000000000':
            return '十亿';
        default:
            return `${value}`;
    }
};

/**
 * 百分比转化
 * @param {string|number} 0.8624
 * @returns {string} 86.24%
 */
export const percentage = (value: string | number): string => {
    if (isEmpty(value)) return '';
    // 判断是否能转为数值
    const num = parseFloat(value.toString());
    if (isNaN(num)) return '';

    if (value) {
        const subStrs = value.toString().split('.');
        const numDigits = subStrs.length > 1 ? subStrs[1].length : 2;
        const result = (num * Math.pow(10, numDigits + 2)) / Math.pow(10, numDigits);
        return strip(result) + '%';
    } else {
        return '0%';
    }
};

/**
 * 纯数量转换成带单位表示
 * @param {number} value 原始值
 * @param {number} decimal 指定保留的小数位数
 * @param {number} base 缩写单位基准数
 * @returns {string} 单位
 */
export const unitConvert = (value: number, decimal: number = 2, base?: number): string => {
    const number = base ? Math.abs(base) : Math.abs(value);
    if (number >= 10e15) {
        return addDividedMark(keepDecimal(value / 10e15, decimal)) + '亿亿';
    } else if (number >= 10e11) {
        return addDividedMark(keepDecimal(value / 10e11, decimal)) + '万亿';
    } else if (number >= 10e7) {
        return addDividedMark(keepDecimal(value / 10e7, decimal)) + '亿';
    } else if (number >= 10e3) {
        return addDividedMark(keepDecimal(value / 10e3, decimal)) + '万';
    } else {
        return addDividedMark(keepDecimal(value / 1, decimal));
    }
};

/**
 * 获取缩写单位
 * @param value 浮点数
 */
export const getAbbrUnitText = (value: number) => {
    const number = Math.abs(value);
    if (number >= 10e15) {
        return '亿亿';
    } else if (number >= 10e11) {
        return '万亿';
    } else if (number >= 10e7) {
        return '亿';
    } else if (number >= 10e3) {
        return '万';
    } else {
        return '';
    }
};

/**
 * @param 判断是否为空（包括null,undefined,空字符串，不包括0）
 * @return 是否为空的结果
 */
export function isEmpty(data: any) {
    return data === null || data === undefined || data === '';
}
