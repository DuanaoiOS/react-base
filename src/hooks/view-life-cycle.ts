/**
 * @description 组件生命周期公共钩子
 * @author DuanaoiOS
 */

import { useEffect, useLayoutEffect, useState } from 'react';

import { MainLifecycle } from '@protocols/view-life-cycle';

/**
 * 组件加载、显示/隐藏生命周期钩子
 * @param props 遵循MainLifecycle协议的组件参数
 */
function useMainLifecycle(props: MainLifecycle) {
    const { onDidLoad, onDidLayout, onWillUnload, visible, onDidAppear, onDidDisappear } = props;
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            setLoaded(true);
            onDidLoad && onDidLoad();
        }

        visible !== undefined && (visible ? onDidAppear && onDidAppear() : onDidDisappear && onDidDisappear());

        return () => {
            onWillUnload && onWillUnload();
        };
    }, [visible]);

    useLayoutEffect(() => {
        onDidLayout && onDidLayout();
    }, []);
}

export { useMainLifecycle };
