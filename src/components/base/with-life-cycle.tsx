/**
 * @desc 高阶视图组件
 * @author DuanaoiOS
 */

import * as React from 'react';

import { MainLifecycle } from '../../protocols/view-life-cycle';

/**
 * 创建一个有生命周期属性的高阶组件
 * @param WrappedComponent 普通组件
 * @returns 拥有生命周期的类组件
 */
function withMainLifecycle(WrappedComponent: React.ComponentClass | React.FunctionComponent) {
    return class extends React.Component<MainLifecycle> {
        componentDidMount() {
            const { onDidLoad } = this.props;
            onDidLoad && onDidLoad();
            this._onViewLife();
        }

        componentDidUpdate() {
            this._onViewLife();
        }

        componentWillUnmount() {
            const { onWillUnload } = this.props;
            onWillUnload && onWillUnload();
        }

        _onViewLife() {
            const { visible, onDidAppear, onDidDisappear } = this.props;
            if (visible) {
                onDidAppear && onDidAppear();
            } else if (visible === false) {
                onDidDisappear && onDidDisappear();
            }
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export { withMainLifecycle };
