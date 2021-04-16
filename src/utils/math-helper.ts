/**
 * @desc 数学运算方法-解决浮点数运算不精准问题
 * @author DuanaoiOS
 */

import { isEmpty } from './data-helper';

/**
 * 加法函数
 * @param arg1 被加数
 * @param arg2 加数
 * @param decimal 指定精度
 * @return 相加后的结果
 */
export function addOperation(arg1: number | string, arg2: number | string, decimal?: number) {
    arg1 = arg1.toString();
    arg2 = arg2.toString();
    const arg1Arr = arg1.split('.');
    const arg2Arr = arg2.split('.');
    const d1 = arg1Arr.length === 2 ? arg1Arr[1] : '';
    const d2 = arg2Arr.length === 2 ? arg2Arr[1] : '';

    const maxLen = Math.max(d1.length, d2.length);
    const m = 10 ** maxLen;
    const result = Number((((arg1 as any) * m + (arg2 as any) * m) / m).toFixed(maxLen));
    return typeof decimal === 'number' ? Number(result.toFixed(decimal)) : result;
}

/**
 * 减法函数
 * @param arg1 被减数
 * @param arg2 减数
 * @param decimal 指定精度
 * @return 想减后的结果
 */
export function subOperation(arg1: number | string, arg2: number | string, decimal?: number) {
    return addOperation(arg1, -Number(arg2), decimal);
}

/**
 * 乘法函数
 * @param arg1 被乘数
 * @param arg2 乘数
 * @param decimal 指定精度
 * @return 相乘后的结果
 */
export function mulOperation(arg1: number | string, arg2: number | string, decimal?: number) {
    const r1 = arg1.toString();
    const r2 = arg2.toString();
    const m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0);
    const resultVal = (Number(r1.replace('.', '')) * Number(r2.replace('.', ''))) / 10 ** m;
    return typeof decimal !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(decimal as any, 10)));
}

/**
 * 除法函数
 * @param arg1 被除数
 * @param arg2 除数
 * @param decimal 指定精度
 * @return 相除后的结果
 */
export function divOperation(arg1: number | string, arg2: number | string, decimal?: number) {
    const r1 = arg1.toString();
    const r2 = arg2.toString();
    const m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0);
    const resultVal = (Number(r1.replace('.', '')) / Number(r2.replace('.', ''))) * 10 ** m;
    return typeof decimal !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(decimal as any, 19)));
}

/**
 * @desc 保留指定位数小数
 * @param {number | string} num 原始值
 * @param {number} digit 指定保留的小数位数
 * @param {number} intercept 截尾方式，默认四舍五入
 * @return {string} numberStr 结果字符串
 */
export function keepDecimal(num: number | string, digit: number = 2, intercept: boolean = false): string {
    let numberFloat = parseFloat(`${num}`);
    if (isNaN(numberFloat)) {
        return '';
    }
    let flagStr = '1';
    for (let i = 0; i < digit; i++) {
        flagStr += '0';
    }
    const flagNumber = parseFloat(flagStr);
    if (intercept) {
        let isNegative = false;
        if (numberFloat < 0) {
            isNegative = true;
            numberFloat = Math.abs(numberFloat);
        }
        numberFloat = Math.floor(mulOperation(numberFloat, flagNumber)) / flagNumber;
        isNegative && (numberFloat = -1 * numberFloat);
    } else {
        numberFloat = Math.round(mulOperation(numberFloat, flagNumber)) / flagNumber;
    }
    if (digit === 0) {
        return `${numberFloat}`;
    }
    let numberStr = numberFloat.toString();
    let posDecimal = numberStr.indexOf('.');
    if (posDecimal < 0) {
        posDecimal = numberStr.length;
        numberStr += '.';
    }
    while (numberStr.length <= posDecimal + digit) {
        numberStr += '0';
    }
    return numberStr;
}

/**
 * @desc 数字百分化并保留指定位数小数
 * @param {number | string} num 原始值
 * @param {number} digit 指定保留的小数位数
 * @param {number} intercept 截尾方式，默认四舍五入
 * @return {string} numberStr 结果字符串
 */
export function percentage(num: number | string, digit: number = 2, intercept: boolean = false): string {
    if (isEmpty(num)) return '';
    return `${keepDecimal(Number(num) * 100, digit, intercept)}%`;
}

/**
 * 为给定数值保留指定范围的小数点
 * @param value 数值
 * @param minDigit 最少保留小数位（default: 2）
 * @param maxDigit 最多保留小数位（default: 4）
 * @returns 保留小数后得到的字符串
 */
export function numberWithDigitRange(value: number | string, minDigit: number = 2, maxDigit: number = 4) {
    if (isEmpty(value) || isNaN(Number(value))) return '';
    const desc = value.toString();
    if (desc.indexOf('.') >= 0) {
        const float = desc.replace(/\d*\./, '').length;
        return Number(value).toFixed(Math.min(Math.max(minDigit, float), maxDigit));
    } else {
        return Number(value).toFixed(minDigit);
    }
}

/**
 * 将给定数值转化为百分比并保留指定范围的小数点
 * @param percent 分度值（0.245 == 24.50%）
 * @param minDigit 最少保留小数位（default: 2）
 * @param maxDigit 最多保留小数位（default: 4）
 * @returns 保留小数后得到的百分比字符串
 */
export function percentWithDigitRange(percent: number | string, minDight: number = 2, maxDight: number = 4) {
    const numDesc = numberWithDigitRange(Number((Number(percent) * 100).toFixed(maxDight)), minDight, maxDight);
    return numDesc === '' ? '' : numDesc + '%';
}

/**
 * 浮点数据展示精度处理
 * @param num 需展示的数值
 * @param precision 处理精度 默认12
 * @returns {number} 返回数值 例：1.4000000000000001 => 1.4
 */
export function strip(num: number, precision: number = 12) {
    return parseFloat(num.toPrecision(precision));
}
