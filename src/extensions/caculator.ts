/**
 * @desc 运算协议
 * @author DuanaoiOS
 */

export interface Caculator {
    add(arg: number | string, decimal?: number): number;
    subst(arg: number | string, decimal?: number): number;
    multiply(by: number | string, decimal?: number): number;
    divide(by: number | string, decimal?: number): number;
    keep(digit?: number, intercept?: boolean): string;
    percentage(digit?: number, intercept?: boolean): string;
}
