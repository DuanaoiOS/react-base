/**
 * @desc 网络请求服务
 * @author DuanaoiOS
 */

import Axios, { AxiosStatic } from 'axios';

import { Method, RequestType, Parameter, Config } from './request';
import { ResultData, Error, Response } from './response';
import { Result, ok, err } from './result';
import { Plugin } from './plugin';

export interface ResponseParser {
    parser<S>(response: any): ResultData<S>;
}

export default class NetService {
    private adapter: AxiosStatic;
    private plugins: Plugin[];
    private parser?: ResponseParser;

    constructor(
        proxy:
            | string
            | {
                  site: string;
              },
        plugins: Plugin[] = [],
        parser?: ResponseParser,
    ) {
        this.adapter = Axios;
        this.plugins = plugins;
        this.parser = parser;
    }

    public async request<S>(type: RequestType): Promise<ResultData<S>> {
        const prepareType = this.plugins.reduce<RequestType>((preType, plugin) => {
            return plugin.prepare(preType);
        }, type);

        const method = prepareType.method;
        const params = prepareType.parameters;
        const config = prepareType.getConfigInfo();
        const url = prepareType.absoluteURL;

        const dispatch = () => {
            switch (method) {
                case Method.Get:
                    return this.get<S>(url, params);
                case Method.Post:
                    return this.post<S>(url, params, config);
                case Method.Put:
                    return this.put<S>(url, params, config);
                case Method.Delete:
                    return this.delete<S>(url, params);
            }
        };

        let result: Result<Response<S>, Error>;
        try {
            const response = (await dispatch()) as any;
            result = this.parser ? this.parser.parser(response) : ok({ ...response });
        } catch (error) {
            result = err({
                code: error.code,
                msg: `${error.msg}(错误码：${error.code})`,
            });
        }
        return this.plugins.reduce<Promise<ResultData<S>>>(
            async (pre, plugin) => {
                const preResult = await pre;
                return plugin.process(this, type, preResult);
            },
            new Promise((resolve) => {
                resolve(result);
            }),
        );
    }

    get = <S>(url: string, params?: Parameter) => this.adapter.get<S>(url, params);

    post = <S>(url: string, params?: Parameter, config?: Config) => this.adapter.post<S>(url, params, config);

    put = <S>(url: string, params?: Parameter, config?: Config) => this.adapter.put<S>(url, params, config);

    delete = <S>(url: string, params?: Parameter) => this.adapter.delete<S>(url, params);
}
