/**
 * @desc Number运算扩展 支持链式调用
 * @author DuanaoiOS
 */

import * as Math from '../utils/math-helper';
import { Caculator } from './caculator';

declare global {
    interface Number extends Caculator {}
}

// MARK: - Number
Number.prototype.add = function (arg, decimal): number {
    return Math.addOperation(this as number, arg, decimal);
};

Number.prototype.subst = function (arg, decimal): number {
    return Math.subOperation(this as number, arg, decimal);
};

Number.prototype.multiply = function (by, decimal): number {
    return Math.mulOperation(this as number, by, decimal);
};

Number.prototype.divide = function (by, decimal): number {
    return Math.divOperation(this as number, by, decimal);
};

Number.prototype.keep = function (digit, intercept): string {
    return Math.keepDecimal(this as number, digit || 2, intercept || false);
};

Number.prototype.percentage = function (digit, intercept): string {
    return Math.percentage(this as number, digit || 2, intercept || false);
};
