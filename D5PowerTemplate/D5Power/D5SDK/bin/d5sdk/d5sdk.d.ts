declare function trace(...args: any[]): void;
declare module d5power {
    /**
     * 使用要求：必须使用getInstance获得实例，等待onSpriteSheepReady回叫，确保素材加载完毕。
     * 当不再使用时，需要使用unlink断开引用，对象将自动等待重用
     */
    class D5SpriteSheet implements IDisplayer {
        private static _unknow;
        static setupUnknow(data: egret.Texture): void;
        /**
         * 对象池最大容量
         * @type {number}
         */
        static MAX_IN_JALE: number;
        private static _pool_inuse;
        private static _pool_jale;
        private loadID;
        static getInstance(res: string, getObj: ISpriteSheetWaiter): D5SpriteSheet;
        private static back2pool(data);
        private _link;
        private _name;
        private _sheet;
        private _renderTime;
        private _totalFrame;
        private _shadowX;
        private _shadowY;
        private _totalDirection;
        private _waiterList;
        private _gX;
        private _gY;
        private _frameW;
        private _frameH;
        private _uvList;
        constructor();
        name: string;
        renderTime: number;
        totalFrame: number;
        totalDirection: number;
        shadowX: number;
        shadowY: number;
        gX: number;
        gY: number;
        uvList: Array<any>;
        frameWidth: number;
        frameHeight: number;
        addWaiter(waiter: ISpriteSheetWaiter): void;
        setup(res: string): void;
        unlink(): void;
        private onTextureComplete(data);
        getTexture(dir: number, frame: number): egret.Texture;
        private onDataComplate(data);
    }
}
declare module d5power {
    interface IDisplayer {
        /**
         * 渲染

        render():void;
        /**
         * 更换素材

        change(f:string,onloaded:Function=null,frame:number=-1,framebak:Function=null):void;
        /**
         * 是否循环动作

        loop:void
        /**
         * 更换动作接口

        action:void;
        /**
         * 更换方向接口

        direction:void;
        
        /**
         * 获得位图显示对象

        monitor:egret.DisplayObject
        
        shadow:egret.Shape;
        
        renderDirection:number;
        
        effectDirection:number
        
        playFrame:number;
        
        totalFrame:number;
        /**
         * 重置播放帧数

        resetFrame():void;

        dispose();
         */
        getTexture(dir: number, frame: number): egret.Texture;
        setup(res: string): void;
        unlink(): void;
        name: string;
        renderTime: number;
        totalFrame: number;
        totalDirection: number;
        shadowX: number;
        shadowY: number;
        uvList: Array<any>;
        /**
         * 重心坐标X
         */
        gX: number;
        /**
         * 重心坐标Y
         */
        gY: number;
        /**
         * 帧宽
         */
        frameWidth: number;
        /**
         * 帧高
         */
        frameHeight: number;
    }
}
declare module d5power {
    interface ISpriteSheetWaiter {
        onSpriteSheepReady(data: IDisplayer): void;
        loadID: number;
    }
}
declare module d5power {
    interface IUserInfoContainer {
        addDisplayer(ui: IUserInfoDisplayer): void;
        removeDisplayer(ui: IUserInfoDisplayer): void;
        getPro(name: string): any;
    }
}
declare module d5power {
    interface IUserInfoDisplayer {
        update(): void;
    }
}
declare module d5power {
    /**
     * 用于处理UI素材的贴图数据
     * 本数据仅供D5BitmapUI使用
     * D5Rpg中的贴图数据直接调用Json中的uv对象，未进行结构化
     */
    class UVData {
        /**
         * 贴图的偏移坐标
         */
        offX: number;
        /**
         * 贴图的偏移坐标
         */
        offY: number;
        /**
         * 贴图宽度
         */
        width: number;
        /**
         * 贴图高度
         */
        height: number;
        /**
         * 贴图uv
         */
        u: number;
        /**
         * 贴图uv
         */
        v: number;
        /**
         * 素材宽度
         */
        w: number;
        /**
         * 素材高度
         */
        h: number;
        /**
         * 贴图的起始坐标
         */
        x: number;
        /**
         * 贴图的起始坐标
         */
        y: number;
        /**
         * 格式化数据
         */
        format(data: any): void;
    }
}
