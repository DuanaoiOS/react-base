/**
 * @description 组件生命周期接口
 * @author DuanaoiOS
 */

/**
 * 视图生命周期
 */
interface MainLifecycle {
    /** 组件已经完成加载 */
    onDidLoad?: VoidFunction;
    /** DOM已经完成布局渲染 */
    onDidLayout?: VoidFunction;
    /** 组件即将销毁 */
    onWillUnload?: VoidFunction;
    /**
     * 针对有visible/hidden需求的组件(不卸载组件，通过CSS属性控制显隐)
     */
    visible?: boolean;
    /** 组件视图出现回调函数 */
    onDidAppear?: VoidFunction;
    /** 组件视图消失的回调函数 */
    onDidDisappear?: VoidFunction;
}

export type { MainLifecycle };
