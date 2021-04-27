/**
 * @desc 业务数据解析
 * @author DuanaoiOS
 */

import { ResultData } from '../core/response';
import { ok, err } from '../core/result';
import { ResponseParser } from '../core/adapter';

import { BizCode } from './biz-code';

export class BizDataParser implements ResponseParser {
    parser<S>(response: any): ResultData<S> {
        if (`${response.code}` === BizCode.Success) {
            return ok({
                data: response.result,
                code: response.code,
            });
        }
        return err({
            code: response.code,
            error: response.error,
            data: response.result,
        });
    }
}
