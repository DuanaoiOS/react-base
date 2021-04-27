/**
 * @desc ResultProcess
 * @author DuanaoiOS
 */

import { Plugin } from '../core/plugin';
import { RequestType } from '../core/request';
import { ResultData } from '../core/response';
import { default as NetService } from '../core/adapter';

import { BizCode } from '../biz/biz-code';

import { Modal } from 'antd';

export class ErrorProcessPlugin implements Plugin {
    prepare(request: RequestType): RequestType {
        return request;
    }

    async process<S>(adapter: NetService, request: RequestType, result: ResultData<S>): Promise<ResultData<S>> {
        return result.failure((error) => {
            const code = `${error.code}`;
            if (request.ignoredCodeList.includes(code)) {
                return result;
            }
            switch (code) {
                case BizCode.PendingAudit:
                    break;
                case BizCode.UnAuthorized:
                    Modal.destroyAll();
                    Modal.error({
                        centered: true,
                        title: '提示',
                        content: '登录态失效，请重试或刷新页面。',
                    });
                    break;
                default:
                    const config = request.getConfigInfo();
                    if (config && config.showErrModal) {
                        Modal.destroyAll();
                        Modal.error({
                            centered: true,
                            title: config.errorTitle || '提示',
                            content: error.error?.message,
                        });
                    }
                    break;
            }
        });
    }
}
