/**
 * @desc 业务网络请求服务
 * @author DuanaoiOS
 */

import NetService from '../core/adapter';
import { RequestType } from '../core/request';
import { ResultData } from '../core/response';

import { ErrorProcessPlugin } from '../plugins/error-process';

import { GatewayProxy } from './gateway';
import { BizDataParser } from './data-parser';

export default class BizService extends NetService {
    private static _instance: BizService;

    /** 默认单例 */
    static get shared() {
        if (!this._instance) {
            this._instance = new BizService(GatewayProxy.API, [new ErrorProcessPlugin()], new BizDataParser());
        }
        return this._instance;
    }

    public static async request<S>(type: RequestType): Promise<ResultData<S>> {
        return BizService.shared.request<S>(type);
    }
}
