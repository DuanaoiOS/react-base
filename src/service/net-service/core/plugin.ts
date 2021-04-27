/**
 * @desc Plugin
 * @author DuanaoiOS
 */

import { RequestType } from './request';
import { ResultData } from './response';
import { default as NetService } from './adapter';

/** 插件接口 */
export interface Plugin {
    /** 修改请求 */
    prepare(request: RequestType): RequestType;
    /** 处理返回数据 */
    process<S>(adapter: NetService, request: RequestType, result: ResultData<S>): Promise<ResultData<S>>;
}
