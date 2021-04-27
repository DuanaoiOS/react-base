/**
 * @desc Request 相关定义
 * @author DuanaoiOS
 */

import { AxiosRequestConfig } from 'axios';

/** 参数 */
export declare type Parameter = { [x: string]: any };
/** 请求头 */
export declare type Header = { [x: string]: string };

/**
 * 请求方法
 */
export enum Method {
    Get,
    Post,
    Put,
    Delete,
}

/** 请求配置 */
export interface Config extends AxiosRequestConfig {
    /** 是否显示加载框（默认不显示）*/
    loading?: boolean;
    /** 是否显示错误弹窗（默认为true） */
    showErrModal?: boolean;
    /** 报错时提示框显示标题（默认为空） */
    errorTitle?: string;
    /** 是否显示页面加载中（默认为false） */
    showPageLoading?: boolean;
}

/** 请求 */
export interface RequestType {
    /** baseURL */
    base: string;
    /** 请求路径 */
    path: string;
    /** 请求url */
    readonly absoluteURL: string;
    /** 请求方法 */
    method: Method;
    /** 请求参数 */
    parameters: Parameter;
    /** 要忽略的错误码 */
    ignoredCodeList: Array<string>;
    /** 自定义配置信息 */
    configInfo?: Config;
    /** 请求配置 */
    getConfigInfo(): Config;
    /** 请求对象当前的rawVlaue */
    currentValue: RequestValue<any>;
}

export interface RequestValue<T> {
    /** 请求url路径 必填 */
    urlType: T;
    /** 请求参数 可选 */
    parameters?: Parameter;
}

/** 请求类: 抽象基类 */
export abstract class Request<T> implements RequestType {
    constructor(readonly value: RequestValue<T>) {}

    get currentValue(): RequestValue<T> {
        return this.value;
    }

    get base(): string {
        throw Error('PLEASE IMPLEMENTS BASE!');
    }

    get path(): string {
        throw Error('PLEASE IMPLEMENTS PATH!');
    }

    get absoluteURL(): string {
        return this.base + this.path;
    }

    get method(): Method {
        return Method.Post;
    }

    get parameters(): Parameter {
        return this.currentValue.parameters || {};
    }

    set parameters(v: Parameter) {
        this.currentValue.parameters = v;
    }

    get ignoredCodeList(): Array<string> {
        return [];
    }

    get configInfo(): Config | undefined {
        return {};
    }

    getConfigInfo = () => {
        return {
            loading: false,
            showErrModal: true,
            showPageLoading: false,
            errorTitle: undefined,
            ...this.configInfo,
        };
    };
}
