/**
 * @desc Response 相关定义
 * @author DuanaoiOS
 */

import { Result } from './result';

/**
 * 接口响应数据
 */
export interface Response<T> {
    /** 响应code */
    code: string | number;
    /** 响应业务数据 */
    data: T;
}

export interface Error {
    /** 响应code */
    code: string | number;
    /** 错误消息 */
    error?: {
        code: string;
        message?: string;
        detail?: any;
    };
    /** 响应业务数据 */
    data?: any;
}

export type ResultData<S> = Result<Response<S>, Error>;
