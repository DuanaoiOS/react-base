/**
 * @description 网络库辅助工具
 * @author DuanaoiOS
 */

import { Component } from 'react';

/**
 * 绑定协议.
 */
export interface Subject<K, V> {
    // 绑定映射关系.
    attach(key: K, value: V): void;

    // 取消绑定
    detach(key: K): void;

    // 获取映射值
    getValue(key: K): V | undefined;

    // 检测是否包含
    contain(key: K): boolean;
}

/**
 * 字典容器: K -> V
 */
export class WeakDictionary<K extends Object, V> implements Subject<K, V> {
    private miniMap: WeakMap<K, V> = new WeakMap();
    /**
     * 绑定映射关系
     * @param key  字典key
     * @param value 字典value
     */
    public attach(key: K, value: V): void {
        this.miniMap.set(key, value);
    }

    /**
     * 解除映射关系
     * @param key  字典key
     */
    public detach(key: K): void {
        this.miniMap.delete(key);
    }

    /**
     * 获取映射值
     * @param key  字典key
     */
    public getValue(key: K): V | undefined {
        return this.miniMap.get(key);
    }

    /**
     * 判断是否包含映射关系
     * @param key  字典key
     */
    public contain(key: K): boolean {
        return this.miniMap.has(key);
    }
}

/**
 * 弹窗关系map: 弹窗container -> 弹窗实例
 */
export class ModalMap extends WeakDictionary<Element, any> {
    private static _instance: ModalMap;

    static get shared() {
        if (!this._instance) {
            this._instance = new ModalMap();
        }
        return this._instance;
    }
}

/**
 * Loaidng关系map: SpincontainerId -> Spin实例
 */
export class SpinMap extends WeakDictionary<string, Component> {
    private static _instance: SpinMap;

    static get shared() {
        if (!this._instance) {
            this._instance = new SpinMap();
        }
        return this._instance;
    }
}
