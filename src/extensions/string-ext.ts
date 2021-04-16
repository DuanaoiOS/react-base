/**
 * @desc String(数值)运算扩展 支持链式调用
 * @author DuanaoiOS
 */

import * as Math from '../utils/math-helper';
import { Caculator } from './caculator';

declare global {
    interface String extends Caculator {}
}

// MARK: - String
String.prototype.add = function (arg, decimal): number {
    return Math.addOperation(this as string, arg, decimal);
};

String.prototype.subst = function (arg, decimal): number {
    return Math.subOperation(this as string, arg, decimal);
};

String.prototype.multiply = function (by, decimal): number {
    return Math.mulOperation(this as string, by, decimal);
};

String.prototype.divide = function (by, decimal): number {
    return Math.divOperation(this as string, by, decimal);
};

String.prototype.keep = function (digit, intercept): string {
    return Math.keepDecimal(this as string, digit || 2, intercept || false);
};

String.prototype.percentage = function (digit, intercept): string {
    return Math.percentage(this as string, digit || 2, intercept || false);
};
