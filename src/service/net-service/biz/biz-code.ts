/**
 * @desc 业务状态定义
 * @author DuanaoiOS
 */

/** 业务响应码 */
export enum BizCode {
    /** 成功 */
    Success = '0',
    /** 未授权 */
    UnAuthorized = '401',
    /** 待复核 */
    PendingAudit = '3000006',
}
