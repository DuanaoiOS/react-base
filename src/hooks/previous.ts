/**
 * @desc 前驱状态自定义hook
 * @author DuanaoiOS
 */

import { useRef, useEffect } from 'react';

/**
 * 获取前驱状态
 * @param value 最新值
 * @returns 旧值
 */
export const usePrevious = <T>(value: T): T | null => {
    const ref = useRef<T>(null);
    useEffect(() => {
        // @ts-ignore
        ref.current = value;
    });
    return ref.current;
};

/**
 * 比较新旧值，判断是否发生改变
 * @param value props/state value
 * @returns 如果新旧值不相等，则返回为true
 */
export const useValueChanged = <T>(value: T): boolean => {
    const prevVal = usePrevious(value);
    return prevVal !== value;
};
