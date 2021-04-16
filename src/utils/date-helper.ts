/**
 * @desc 日期类工具函数
 * @author DuanaoiOS
 */

/**
 * 日期时间格式化
 * @param time 时间，可是字符串，也可以是时间戳
 * @param fmt 指定格式，字符串：’YYYY-MM-DD hh:mm:ss:S‘
 * @param isTimestamp 是否是时间戳
 * @return 指定格式时间字符串
 */
export function dateTimeFilter(time: string | number, fmt?: string, isTimestamp: boolean = false) {
    if (!time) {
        return '';
    }
    let res = fmt || 'YYYY-MM-DD hh:mm:ss:S';
    if (isTimestamp) {
        time = parseInt(`${time}`, 10);
    }
    const date = new Date(time);
    const o: any = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    if (/(Y+)/.test(res)) {
        res = res.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(res)) {
            res = res.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
        }
    });

    return res;
}

/**
 * 根据日期获取星期
 * @param date 日期字符串或时间戳
 * @return 星期（一、二、三、四、五、六、日）
 */
export function getWeekDay(date: number | string) {
    const weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    const week = new Date(date).getDay();
    return week !== undefined ? weekArray[week] : '';
}

/**
 * 判断是否为闰年
 * @param year 需要判断的年份
 * @return 是否为闰年结果
 */
export function isLeap(year: number) {
    if (year % 100 === 0) {
        return year % 400 === 0;
    }
    return year % 4 === 0;
}

/**
 * 格式化8位日期格式的字符串 ‘20200315’
 * @param dateStr 8位日期字符串
 * @param fmt 格式字符串
 * @return 格式化后的字符串
 */
export function formatEightDate(dateStr: string, fmt: string) {
    if (dateStr) {
        const date = new Date(`${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`).getTime();
        return dateTimeFilter(date, fmt);
    }
    return '';
}
