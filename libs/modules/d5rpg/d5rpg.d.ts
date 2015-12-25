declare module d5power {
    interface ICamera {
        lookAt(px: number, py: number): void;
        reCut(): any;
        update(): any;
        setFocus(o: IGD): void;
        focus: IGD;
        zorderSpeed: number;
        zeroX: number;
        zeroY: number;
        moveNorth(k: number): void;
        moveSourth(k: number): void;
        moveWest(k: number): void;
        moveEast(k: number): void;
        move(xdir: number, ydir: number, k: number): void;
    }
}
/**
 * Created by Administrator on 2015/1/19.
 */
declare module d5power {
    interface ICharacterData {
        nickname: string;
        addDisplayer(ui: IUserInfoDisplayer): void;
        removeDisplayer(ui: IUserInfoDisplayer): void;
        updateDisplayers(): void;
    }
}
declare module d5power {
    interface IController {
        walkTo(posx: number, posy: number): void;
        unsetupListener(): void;
        setupListener(): void;
        clearPath(): void;
        dispose(): void;
        run(): void;
        changeDirectionByAngle(angle: number): void;
        pause(): void;
        start(): void;
    }
}
declare module d5power {
    /**
     *
     * @author
     *
     */
    interface IFightController {
        clear(): void;
        quitFight(f: IFighter): void;
        joinFight(doer: IFighter, target: IFighter): void;
        doHurt(doer: IFighter, target: IFighter): void;
        hurt_implements(doer: IFighter, target: IFighter, value: number): void;
        die(doer: d5power.IFighter, killer: d5power.IFighter): void;
    }
}
/**
 * Created by Administrator on 2015/5/29.
 */
declare module d5power {
    interface IFighter {
        pushTo(pushDis: number, pushA: number): void;
        setAtkSpeedTemp(value: number): void;
        setAtkSpeed(value: number): void;
        fightDis: number;
        Pos: egret.Point;
        setAction(v: number): void;
        atkSpeed: number;
        setAtkSpeed(v: number): void;
        lastAtk: number;
        atk: number;
        def: number;
        camp: number;
        vit: number;
        str: number;
        agi: number;
        dex: number;
        cri: number;
        job: number;
        luk: number;
        rpos: number;
        viewTarget: IFighter;
        setTarget(v: IFighter): void;
        target: IFighter;
        int: number;
        changeHp(): void;
        hurt(v: number, doer: IFighter): void;
        controller: any;
        removeAllBuff(): void;
        giveBuff(id: number, doer: IFighter): void;
        quiteFight(): void;
    }
}
declare module d5power {
    /**
     * 游戏对象基础数据
     */
    interface IGD {
        /**
         * 重算坐标
         */
        run(): void;
        /**
         * 当前坐标
         */
        $pos: egret.Point;
        /**
         * 当前X坐标
         */
        posX: number;
        /**
         * 当前Y坐标
         */
        posY: number;
        zOrder: number;
        linkMap: number;
        linkPosx: number;
        linkPosy: number;
        missionIndex: number;
        missionIndexList: Array<number>;
        /**
         * 设置坐标
         * @param px
         * @param py
         */
        setPos(px: number, py: number): void;
        /**
         * 控制器
         */
        controller: IController;
        setController(ctrl: IController): void;
        /**
         * 设置角色素材
         * @param v 要使用的角色素材
         */
        setRespath(v: string): void;
        respath: string;
        /**
         * 设置角色素材集
         * @param dir   素材集所在目录
         */
        setResStyle(dir: string): void;
        resStyle: string;
        setNickname(v: string): void;
        nickname: string;
        dispose(): void;
        deleting: boolean;
        setDeleting(v: boolean): void;
        setInScreen(v: boolean): void;
        inScreen: boolean;
        setDisplayer(data: IGO): void;
        displayer: IGO;
        setAI(data: BTTree): void;
        ai: BTTree;
        setAction(action: number): void;
        action: number;
        setDirection(direction: number): void;
        direction: number;
        speed: number;
        setSpeed(speed: number): void;
        camp: number;
        setCamp(value: number): void;
        setUid(id: number): void;
        uid: number;
        setMonsterid(id: number): void;
        monsterid: number;
        setSay(say: string): void;
        say: string;
        setScript(script: string): void;
        script: string;
        setJob(type: number, value: string, num: string): void;
        setLink(mapid: number, posx: number, posy: number): void;
        job_type: number;
        job_value: string;
        job_number: string;
        setWork(work: number): void;
        work: number;
        loadMission(): void;
        renderMe(): void;
        hp: number;
        setHp(value: number): void;
        maxHp: number;
        setMaxHp(value: number): void;
        inG: boolean;
        speedX: number;
        speedY: number;
        isDB: number;
        setIsDB(value: number): void;
        checktime: number;
        setChecktime(value: number): void;
        checksize: number;
        setChecksize(value: number): void;
        checkdel: number;
        setCheckdel(value: number): void;
    }
}
declare module d5power {
    interface IGO {
        renderMe(): void;
        deleteing: boolean;
        dispose(): void;
        inScreen: boolean;
        x: number;
        y: number;
        parent: egret.DisplayObjectContainer;
        setupSkin(res: string): any;
        spriteSheet: IDisplayer;
        setupData(data: any): any;
        hitTestArea(px: number, py: number): boolean;
        showMissionStatus(index: number): void;
        camp: number;
    }
}
declare module d5power {
    /**
     * 游戏地图
     */
    interface IMap {
        /**
         * 地图ID
         */
        id: number;
        setTileFormat(s: string): void;
        setContainer(container: egret.DisplayObjectContainer): void;
        /**
         * 初始化地图
         * @param id        地图ID
         * @param w         地图尺寸
         * @param h         地图尺寸
         * @param tw        地砖尺寸
         * @param th        地砖尺寸
         * @param onReady   地图准备回叫
         * @param onReadyThis 回叫对象
         */
        setup(id: number, w: number, h: number, tw: number, th: number, onReady: Function, onReadyThis: any): void;
        /**
         *初始化tiled地图
         * @param name tiled地图名
         * @param type tiled地图填充方式
         * @param container 容器
         */
        setupTiled(name: string, type: number, data: Array<any>, container: egret.DisplayObjectContainer): void;
        /**
         * 初始化远景地图
         * @param name 远景地图
         * @param type 远景填充方式
         * @param container 容器
         */
        setupFar(name: string, type: number, container: egret.DisplayObjectContainer, far_x: number, far_y: number): void;
        getWorldPostion(x: number, y: number): egret.Point;
        getScreenPostion(x: number, y: number): egret.Point;
        tile2WorldPostion(x: number, y: number): egret.Point;
        Postion2Tile(px: number, py: number): egret.Point;
        getPointAround(center: egret.Point, from: egret.Point, r: number): egret.Point;
        runPos(list: Array<IGD>): void;
        width: number;
        height: number;
        tileWidth: number;
        tileHeight: number;
        roadWidth: number;
        roadHeight: number;
        render(flush: boolean): void;
        clear(): void;
        reset(): void;
        /**
         * @param		xnow	当前坐标X(寻路格子坐标)
         * @param		ynow	当前坐标Y(寻路格子坐标)
         * @param		xpos	目标点X(寻路格子坐标)
         * @param		ypos	目标点Y(寻路格子坐标)
         */
        find(xnow: number, ynow: number, xpos: number, ypos: number): Array<any>;
        /**
         * 判断某一个路点是否可通过
         * @param px
         * @param py
         */
        getRoadPass(px: number, py: number): boolean;
        /**
         * 判断某一个点是否透明
         * @param px
         * @param py
         */
        isInAlphaArea(px: number, py: number): boolean;
        /**
         * 设置重力感应
         * @param  b   boolean
         */
        setDeviceorientation(b: boolean): void;
    }
}
/**
 * Created by Administrator on 2015/5/26.
 */
declare module d5power {
    class BTNode {
        name: string;
        protected _children: Array<BTNode>;
        children: Array<BTNode>;
        precondition: d5power.BTPrecondition;
        interval: number;
        private _lastTimeEvaluated;
        activated: boolean;
        constructor(precondition?: d5power.BTPrecondition);
        Activate(): void;
        Evaluate(): boolean;
        protected DoEvaluate(): boolean;
        Tick(): number;
        Clear(): void;
        AddChild(aNode: BTNode): void;
        RemoveChild(aNode: BTNode): void;
        private CheckTimer();
    }
}
/**
 * Created by Administrator on 2015/5/26.
 */
declare module d5power {
    class BTAction extends BTNode {
        private _status;
        constructor(precondition?: d5power.BTPrecondition);
        protected Enter(): void;
        protected Exit(): void;
        protected Execute(): number;
        Clear(): void;
        Tick(): number;
        AddChild(aNode: BTNode): void;
        RemoveChild(aNode: BTNode): void;
    }
}
/**
 * Created by Administrator on 2015/5/27.
 */
declare module d5power {
    class BTConst {
        static BTResult_Ended: number;
        static BTResult_Running: number;
        static BTActionStatus_Ready: number;
        static BTActionStatus_Running: number;
        static Parallel_And: number;
        static Parallel_Or: number;
        constructor();
    }
}
/**
 * Created by Administrator on 2015/5/27.
 */
declare module d5power {
    class BTParallel extends BTNode {
        _type: number;
        protected _results: Array<any>;
        constructor(type: number, precondition?: d5power.BTPrecondition);
        protected DoEvaluate(): boolean;
        Tick(): number;
        Clear(): void;
        AddChild(aNode: BTNode): void;
        RemoveChild(aNode: BTNode): void;
        private ResetResults();
    }
}
/**
 * Created by Administrator on 2015/5/27.
 */
declare module d5power {
    class BTParallelFlexible extends BTNode {
        private _activeList;
        constructor(precondition?: d5power.BTPrecondition);
        protected DoEvaluate(): boolean;
        Tick(): number;
        AddChild(aNode: BTNode): void;
        RemoveChild(aNode: BTNode): void;
        Clear(): void;
    }
}
/**
 * Created by Administrator on 2015/5/26.
 */
declare module d5power {
    class BTPrecondition extends BTNode {
        constructor();
        Check(): boolean;
        Tick(): number;
    }
}
/**
 * Created by Administrator on 2015/5/26.
 */
declare module d5power {
    class BTPrioritySelector extends BTNode {
        constructor(precondition?: d5power.BTPrecondition);
        private _activeChild;
        protected DoEvaluate(): boolean;
        Clear(): void;
        Tick(): number;
    }
}
/**
 * Created by Administrator on 2015/5/27.
 */
declare module d5power {
    class BTSequence extends BTNode {
        constructor(precondition?: d5power.BTPrecondition);
        private _activeChild;
        private _activeIndex;
        protected DoEvaluate(): boolean;
        Tick(): number;
        Clear(): void;
    }
}
/**
 * Created by Administrator on 2015/5/26.
 */
declare module d5power {
    class BTTree {
        constructor();
        _root: BTNode;
        isRunning: boolean;
        static RESET: string;
        private static _resetId;
        start(): void;
        Update(): void;
        OnDestroy(): void;
        protected Init(): void;
        protected Reset(): void;
    }
}
/**
 * Created by Administrator on 2015/6/5.
 */
declare module d5power {
    interface IBTData {
        setEnemyArray(value: Array<any>): void;
        /**
         * 周围敌人列表
         */
        enemyArray: Array<any>;
        /**
         * 攻击目标
         */
        target: IFighter;
        /**
         * 是否被攻击
         */
        hasBeATk: boolean;
    }
}
declare module d5power {
    class CharacterController implements IController {
        static TALK_DISTANCE: number;
        private static _me;
        static getInstance(igd: IGD): CharacterController;
        protected _endTarget: egret.Point;
        protected _nextTarget: egret.Point;
        protected _target: IGD;
        protected _path: Array<any>;
        protected _step: number;
        protected _onWalkComplate: Function;
        protected _onWalkComplateThisObj: any;
        protected _onWalkComplateParams: Array<any>;
        protected _isPause: boolean;
        constructor();
        pause(): void;
        start(): void;
        setupListener(): void;
        unsetupListener(): void;
        run(): void;
        /**
         * 根据角度值修改角色的方向
         */
        changeDirectionByAngle(angle?: number): void;
        dispose(): void;
        clearPath(): void;
        setComplateFun(fun: Function, thisObj?: any, ...params: any[]): void;
        onTouch(e: egret.TouchEvent): void;
        walkTo(posx: number, posy: number): void;
        clearWalkComplate(): void;
        /**
         * 控制角色走向某点
         * 请在本方法执行前设置_endTarget
         *
         * @return	移动成功，则返回true，移动失败返回false(目标点无法到达)
         */
        walk2Target(): boolean;
        tellServerMove(target: egret.Point): void;
        checkQuiteFight(): void;
        /**
         * 点击到了某对象
         * @param	o	触发点击事件的GameObject
         */
        clickSomeBody(o: IGD): void;
        getNeer(px: number, py: number, f: Function, targetObj: any, doer: IFighter, target: IFighter): void;
        private error();
    }
}
declare module d5power {
    class Actions {
        /**
         * 特殊状态：复活
         */
        static RELIVE: number;
        /**
         * Stop 停止
         * */
        static Stop: number;
        /**
         * Run 跑动
         * */
        static Run: number;
        /**
         * Attack 物理攻击
         * */
        static Attack: number;
        /**
         * 弓箭攻击
         * */
        static BowAtk: number;
        /**
         * 坐下
         */
        static Sit: number;
        /**
         * 死亡
         */
        static Die: number;
        /**
         * 拾取
         */
        static Pickup: number;
        /**
         * 被攻击
         */
        static BeAtk: number;
        /**
         * 等待（备战）
         */
        static Wait: number;
        constructor();
    }
}
/**
 * Created by Administrator on 2015/5/7.
 */
declare module d5power {
    class D5ConfigCenter {
        private _pickupTime;
        pickupTime: number;
        protected static _my: D5ConfigCenter;
        static my: D5ConfigCenter;
        private _parent;
        /**
         * 加载完成的回叫函数
         */
        protected _onComplate: Function;
        protected _baseitemList: Object;
        protected _baseskillList: Object;
        protected _monsterConf: Object;
        protected _npcList: Object;
        protected _jobList: Object;
        protected _userProList: Object;
        /**
         * 任务库
         */
        protected _missionLib: Object;
        /**
         * 任务节点
         */
        protected _missionList: Object;
        /**
         * 章节
         */
        protected _chapterList: Object;
        /**
        * 玩家等级配置
        */
        protected _userLvList: Object;
        maxChapter: number;
        constructor(callback: Function, parent: any);
        private loadConfigCenter();
        private onLoadComplete(event);
        parseData(): void;
        /**
         *任务库 解析
         */
        private parseMissionLib();
        getMissionData(id: number): d5power.MissionData;
        private parseMissionList();
        getChapterData(id: number): ChapterData;
        getMissionNode(chapterId: number, partId: number, id: number): MissionNode;
        /**
         *npc 配置相关
         */
        private parseNpcList();
        getNpcConf(id: number): d5power.NpcData;
        private parseMonsterConfigList();
        getMonsterConf(id: number): d5power.MonsterConfData;
        private parseUserProList();
        /**
         * 获得角色属性配置
         */
        getUserproConfig(filed: string): UserProData;
        /**
        *职业配置相关
        */
        private parseJobList();
        getJobType(job: number): JobData;
        /**
         *技能相关
         */
        private parseBaseSkillList();
        parseSkillList(): void;
        getBaseSkillData(id: number): BaseSkillData;
        /**
        * 武学数据库
        */
        baseskillList: Object;
        /**
         *物品基础数据
         */
        private parseBaseItemList();
        parseItemList(): void;
        getBaseItemData(id: number): BaseItemData;
        getBaseItemList(): Array<BaseItemData>;
        private D5error();
    }
}
declare module d5power {
    class Direction {
        static Down: number;
        static LeftDown: number;
        static Left: number;
        static LeftUp: number;
        static Up: number;
        static RightUp: number;
        static Right: number;
        static RightDown: number;
        constructor();
    }
}
declare module d5power {
    class GMath {
        constructor();
        /**
         * 获取某点的夹角
         * 返回为弧度值
         */
        static getPointAngle(x: number, y: number): number;
        /**
         * 弧度转角度
         */
        static R2A(r: number): number;
        /**
         * 角度转弧度
         */
        static A2R(a?: number): number;
    }
}
declare class Layer extends egret.DisplayObjectContainer {
    constructor();
}
declare module d5power {
    class D5ScriptCommand {
        /**
         * 普通命令
         */
        static COMMAND: number;
        /**
         * 条件判断
         */
        static IF: number;
        /**
         * 分支语句
         */
        static SWITCH: number;
        /**
         * 循环语句
         */
        static FOR: number;
        /**
         * 等待条件达成
         */
        static WAITFOR: number;
        private _type;
        private _command;
        private _params;
        private _commandList;
        constructor(type?: number);
        type: number;
        addCommand(data: D5ScriptCommand): void;
        command: string;
        commandList: Array<D5ScriptCommand>;
        params: Array<any>;
        toString(): string;
    }
}
declare module d5power {
    class D5ScriptParser {
        static _noticer: INoticer;
        /**
         * 变量集合
         */
        static _vars: any;
        /**
         * 默认运行时间间隔
         */
        private _runSpeed;
        /**
         * 上一次的运行时间
         */
        private _lastRunTime;
        private _nowUrl;
        /**
         * 脚本终止运行标签
         */
        private _break;
        /**
         * 命令集
         */
        private _command;
        /**
         * 解析前的脚本序列
         */
        private _scriptArr;
        /**
         * 解析行号
         */
        private _lineno;
        /**
         * 是否进入运行状态
         */
        _running: boolean;
        /**
         * 运行行号
         */
        private _runLine;
        stage: egret.Stage;
        constructor(stage: egret.Stage);
        number(name: string, value?: any): void;
        string(name: string, value: string): void;
        add(name: string): void;
        print(...params: any[]): void;
        /**
         * 等待
         */
        wait(sec?: number): void;
        /**
         * 跳转到指定行
         */
        goto(line?: number): void;
        /**
         * 从当前行开始跳转指定行
         */
        jump(number?: number): void;
        /**
         * 更新状态
         */
        runScript(url?: string): void;
        /**
         * 通过文本进行配置
         */
        configTxt(str: string): void;
        stop(): void;
        pause(): void;
        start(): void;
        runComplate(): void;
        /**
         * 执行程序
         */
        private running(e);
        private exec(command);
        /**
         * 脚本词法解析
         */
        private Parse(block?);
        private onComplate(data);
        /**
         * 脚本词法提取
         */
        private D5ScriptAt(arr);
        private error();
    }
}
declare module d5power {
    interface INoticer {
        notice(msg: string): void;
    }
}
declare module d5power {
    class SilzAstar {
        /**
         * 寻路方式，8方向和4方向，有效值为8和4
         */
        private static WorkMode;
        private _grid;
        private _index;
        private _path;
        private astar;
        /**
         * 地图显示尺寸
         */
        private _cellSize;
        /**
         * 路径显示器
         */
        private path;
        /**
         * 地图显示器
         */
        private image;
        /**
         * 显示容器
         */
        private imageWrapper;
        /**
         * 显示模式
         */
        private isDisplayMode;
        /**
         * @param    mapdata        地图数据
         * @param    container    显示容器，若为null则不显示地图
         */
        constructor(mapdata: Array<any>, container?: egret.DisplayObjectContainer);
        WORKMODE: number;
        /**
         * @param        xnow    当前坐标X(寻路格子坐标)
         * @param        ynow    当前坐标Y(寻路格子坐标)
         * @param        xpos    目标点X(寻路格子坐标)
         * @param        ypos    目标点Y(寻路格子坐标)
         */
        find(xnow: number, ynow: number, xpos: number, ypos: number): Array<any>;
        private makeGrid(data);
        private drawGrid();
        private getColor(node);
    }
    class AStar {
        private _open;
        private _grid;
        private _endNode;
        private _startNode;
        private _path;
        private _floydPath;
        heuristic: Function;
        private _straightCost;
        private _diagCost;
        private nowversion;
        constructor(grid: Grid);
        private justMin(x, y);
        findPath(): boolean;
        floyd(): void;
        private floydCrossAble(n1, n2);
        private bresenhamNodes(p1, p2);
        private floydVector(target, n1, n2);
        search(): boolean;
        private buildPath();
        path: Array<any>;
        floydPath: Array<any>;
        manhattan(node: SilzAstarNode): number;
        manhattan2(node: SilzAstarNode): number;
        euclidian(node: SilzAstarNode): number;
        private TwoOneTwoZero;
        chineseCheckersEuclidian2(node: SilzAstarNode): number;
        private sqrt(x);
        euclidian2(node: SilzAstarNode): number;
        diagonal(node: SilzAstarNode): number;
    }
    class BinaryHeap {
        a: Array<any>;
        justMinFun: Function;
        constructor(justMinFun?: Function);
        ins(value: any): void;
        pop(): any;
    }
    class Grid {
        private _startNode;
        private _endNode;
        private _nodes;
        private _numCols;
        private _numRows;
        private type;
        private _straightCost;
        private _diagCost;
        constructor(numCols: number, numRows: number);
        /**
         *
         * @param   type    0四方向 1八方向 2跳棋
         */
        calculateLinks(type?: number): void;
        getType(): number;
        /**
         *
         * @param   node
         * @param   type    0八方向 1四方向 2跳棋
         */
        private initNodeLink(node, type);
        getNode(x: number, y: number): SilzAstarNode;
        setEndNode(x: number, y: number): void;
        setStartNode(x: number, y: number): void;
        setWalkable(x: number, y: number, value: boolean): void;
        endNode: SilzAstarNode;
        numCols: number;
        numRows: number;
        startNode: SilzAstarNode;
    }
    class Link {
        node: SilzAstarNode;
        cost: number;
        constructor(node: SilzAstarNode, cost: number);
    }
    class SilzAstarNode {
        x: number;
        y: number;
        f: number;
        g: number;
        h: number;
        walkable: boolean;
        parent: SilzAstarNode;
        version: number;
        links: Array<any>;
        constructor(x: number, y: number);
        toString(): string;
    }
}
declare module d5power {
    class XML {
        constructor(data: any);
    }
}
declare module d5power {
    class D5Camera implements ICamera {
        /**
         * 分布渲染时间限制。每次渲染的最大允许占用时间，单位毫秒
         */
        static RenderMaxTime: number;
        /**
         * 摄像机可视区域
         */
        private static _cameraView;
        /**
         * 是否需要重新裁剪
         */
        static $needreCut: boolean;
        private _cameraCutView;
        private _zorderSpeed;
        /**
         * 视口左上角对应的世界坐标X
         */
        _zeroX: number;
        /**
         * 视口左上角对应的世界坐标Y
         */
        _zeroY: number;
        /**
         * 镜头注视
         */
        _focus: IGD;
        _timer: egret.Timer;
        _moveSpeed: number;
        private _moveStart;
        private _moveEnd;
        private _moveAngle;
        private _moveCallBack;
        static needreCut: boolean;
        constructor();
        zeroX: number;
        zeroY: number;
        setZero(x: number, y: number): void;
        update(): void;
        /**
         * 镜头注视
         */
        setFocus(o: IGD): void;
        focus: IGD;
        /**
         * 镜头移动速度
         */
        moveSpeed: number;
        /**
         * 镜头视野矩形
         * 返回镜头在世界地图内测区域
         */
        static cameraView: egret.Rectangle;
        /**
         * 镜头裁剪视野
         */
        cameraCutView: egret.Rectangle;
        /**
         * 镜头向上
         * @param    k    倍率
         */
        moveNorth(k?: number): void;
        /**
         * 镜头向下
         */
        moveSourth(k?: number): void;
        /**
         * 镜头向左
         */
        moveWest(k?: number): void;
        /**
         * 镜头向右
         */
        moveEast(k?: number): void;
        move(xdir: number, ydir: number, k?: number): void;
        /**
         * 镜头观察某点
         */
        lookAt(x: number, y: number): void;
        flyTo(x: number, y: number, callback?: Function): void;
        moveCamera(e: egret.TimerEvent): void;
        zorderSpeed: number;
        reCut(): void;
    }
}
declare module d5power {
    class D5Game extends egret.DisplayObjectContainer {
        /**
         * 游戏中的每“米”对应程序中的像素值
         */
        static MI: number;
        /**
         * 游戏资源服务器，留空则为本地素材相对路径
         */
        static RES_SERVER: string;
        /**
         * 游戏资源的保存目录
         */
        static ASSET_PATH: string;
        private _dataList;
        protected _screenList: Array<IGD>;
        private _g;
        private _characterData;
        private _missionDispatcher;
        protected _container_map: egret.DisplayObjectContainer;
        protected _container_far: egret.DisplayObjectContainer;
        protected _container_bottom: egret.DisplayObjectContainer;
        protected _container: egret.DisplayObjectContainer;
        protected _container_top: egret.DisplayObjectContainer;
        protected _touch_layer: egret.Sprite;
        fightController: IFightController;
        private _timer;
        private _readyBack;
        protected _map: IMap;
        protected _player: IGD;
        protected _startX: number;
        protected _startY: number;
        private _camera;
        private _screenW;
        private _screenH;
        private _lastZorder;
        protected _firstEnter: boolean;
        /**
         * 怪物刷新配置
         */
        protected _monsterConf: Array<MonsterFlushData>;
        /**
         * 当前的渲染进度
         */
        private _nowRend;
        private _runAction;
        private static _me;
        static me: D5Game;
        runScript(url: string): void;
        constructor(mapid: number, startx: number, starty: number, onReady?: Function);
        openGravity(): void;
        /**
         * 重力感应控制器
         */
        g: D5Gravity;
        setCharacterData(data: CharacterData): void;
        setMissionDispatcher(data: IMissionDispatcher): void;
        missionDispatcher: IMissionDispatcher;
        characterData: CharacterData;
        initUI(): void;
        showPackage(): void;
        showChapterWin(): void;
        showMission(): void;
        showScript(): void;
        notice(msg: string): void;
        collectionWithNPC(igd: IGD): void;
        pickupItem(): void;
        canclePickup(): void;
        pickup(time: number, callback: Function): void;
        scriptWithNPC(igd: d5power.IGD): void;
        talkWithNPC(igd: IGD): void;
        missionDialog(headurl: string, igd: IGD): void;
        onSelect(igd: IGD, index: number): void;
        showCheckMission(igd: IGD): void;
        dialog(url: string, nickname: string, say: string, igd?: IGD): void;
        closeDialog(): void;
        showNpcWindow(npc: IGD): void;
        alert(msg: string, ok: Function, cancle: Function, thisObj: any): void;
        timer: number;
        screenWidth: number;
        screenHeight: number;
        camera: ICamera;
        map: IMap;
        dataList: Array<IGD>;
        player: IGD;
        getIGDByUid(id: number): d5power.IGD;
        setPlayer(data: IGD): void;
        addObject(data: IGD): void;
        removeObject(index: number): void;
        getClicker(px: number, py: number): IGD;
        /**
         * 任务加载完成后触发
         */
        missionLoaded(): void;
        /**
         * 将某个角色添加进游戏场景
         * @param data          角色数据
         */
        add2Screen(data: IGD): void;
        remove4Screen(data: IGD): void;
        remove4ScreenByIndex(index: number): void;
        changeMap(tomap: number, tox: number, toy: number): void;
        /**
         * 创建NPC
         * @param    s            位图资源名
         * @param    resname        缓冲池资源名
         * @param    name        NPC姓名
         * @param    pos            目前所在位置
         */
        createNPC(s: string, nickname: string, pos: egret.Point): IGD;
        createRoad(s: string, pos: egret.Point): IGD;
        /**
         * 根据配置文件进行场景的数据初始化
         */
        setup(data: any): void;
        private _sound;
        private _soundChannel;
        private playMusic(data);
        private stopMusic();
        flushMoster(): void;
        init(): void;
        touchReciver: egret.Sprite;
        /**
         * 创建角色，请在子类中重写本方法，创建角色
         * 创建成功后，请通过setPlayer方法，设置为主角
         */
        buildPlayer(): void;
        play(): void;
        stop(): void;
        private run(e?);
        protected buildMap(id: number): void;
        private reset();
        private onResize(e);
        private install(e);
        private enterMap(mapid?);
        private error();
    }
}
declare module d5power {
    /**
     *
     * @author
     *
     */
    class D5Gravity {
        private JUMP_POWER;
        private JUMP_MAX;
        private _objects;
        private _gy;
        private _gx;
        constructor();
        initGravity(gy: number, gx?: number, jumppower?: number): void;
        addObject(e: IGD): void;
        removeObject(e: IGD): void;
        clearObject(): void;
        counts: number;
        run(): void;
    }
}
declare module d5power {
    /**
     * 横向地图
     */
    class D5HMap implements IMap {
        private static _pool;
        private static getTile();
        private static back2Pool(tile);
        private _mapid;
        private _mapWidth;
        private _mapHeight;
        private _tileW;
        private _tileH;
        private _onReady;
        private _onReadyThis;
        private _tempPoint;
        private _roadArr;
        private _roadW;
        private _roadH;
        private _sheet;
        private _layer_far;
        private _layer_middle;
        private _layer_neer;
        private _far;
        private _middle;
        private _neer;
        constructor(id: number);
        clear(): void;
        runPos(dataList: Array<IGD>): void;
        private _rightFar;
        private _rightMiddle;
        private _posX;
        private _speed;
        private _nowStartX;
        private _tileList;
        render(flush?: boolean): void;
        reset(): void;
        setContainer(container: egret.DisplayObjectContainer): void;
        setTileFormat(s: string): void;
        setup(id: number, w: number, h: number, tw: number, th: number, onReady: Function, onReadyThis: any): void;
        setupTiled(name: string, type: number, data: Array<any>, container: egret.DisplayObjectContainer): void;
        setupFar(name: string, type: number, container: egret.DisplayObjectContainer, far_x: number, far_y: number): void;
        id: number;
        width: number;
        height: number;
        tileWidth: number;
        tileHeight: number;
        roadWidth: number;
        roadHeight: number;
        find(xnow: number, ynow: number, xpos: number, ypos: number): Array<any>;
        getPointAround(center: egret.Point, from: egret.Point, r: number): egret.Point;
        getRoadPass(px: number, py: number): boolean;
        isInAlphaArea(px: number, py: number): boolean;
        /**
         * 根据世界坐标获取在屏幕内的坐标
         */
        getScreenPostion(x: number, y: number): egret.Point;
        /**
         * 根据屏幕某点坐标获取其在世界（全地图）内的坐标
         */
        getWorldPostion(x: number, y: number): egret.Point;
        /**
         * 根据路点获得世界（全地图）内的坐标
         */
        tile2WorldPostion(x: number, y: number): egret.Point;
        /**
         * 世界地图到路点的转换
         */
        Postion2Tile(px: number, py: number): egret.Point;
        private onResLoaded(data);
        private onDataComplate(data);
        resetRoad(): void;
        private _lastAdd;
        protected drawTile(y: number, x: number, arr: Array<number>): void;
        private _count;
        private _rline;
        private makeData(startx);
        setDeviceorientation(b: boolean): void;
    }
}
declare module d5power {
    /**
     * 2.5D透视地图
     */
    class D5Map implements d5power.IMap {
        /**
         * 在二进制文件中，由于需要1个字节表示多个状态。因此采用大于0的值表示可通过
         * 在导入后进行了转义
         */
        private static BIN_ALPHA_VALUE;
        private static BIN_CAN_VALUE;
        private static BIN_NO_VALUE;
        private static _tilePool;
        private static rebuildPool(num);
        private static back2pool(data);
        private static getTile();
        private _mapid;
        private _mapWidth;
        private _mapHeight;
        private _tileW;
        private _tileH;
        private _onReady;
        private _onReadyThis;
        private _mapResource;
        private _tileFormat;
        private _tempPoint;
        private _roadW;
        private _roadH;
        private _smallMap;
        private _roadArr;
        private _alphaArr;
        /**
         * 显示区域区块数量
         */
        private _areaX;
        private _areaY;
        private _nowStartX;
        private _nowStartY;
        /**
         * 当前屏幕正在渲染的坐标记录
         */
        private _posFlush;
        /**
         * 正常渲染层（与角色同层次）
         */
        private _dbuffer;
        private _astar;
        constructor(id: number);
        id: number;
        setContainer(container: egret.DisplayObjectContainer): void;
        setTileFormat(s: string): void;
        setup(id: number, w: number, h: number, tw: number, th: number, onReady: Function, onReadyThis: any): void;
        private createSmallData(smallW, smallH);
        width: number;
        height: number;
        tileWidth: number;
        tileHeight: number;
        roadWidth: number;
        roadHeight: number;
        runPos(dataList: Array<IGD>): void;
        render(flush?: boolean): void;
        resize(): void;
        /**
         * 重置地图数据
         */
        resetRoad(): void;
        /**
         * 设置地图数据
         * @param data
         */
        setRoad(data: Array<Array<number>>): void;
        isInAlphaArea(px: number, py: number): boolean;
        getPointAround(center: egret.Point, from: egret.Point, r: number): egret.Point;
        PointCanMove(p: egret.Point, n: egret.Point): Boolean;
        getRoadPass(px: number, py: number): boolean;
        find(xnow: number, ynow: number, xpos: number, ypos: number): Array<any>;
        /**
         * 根据屏幕某点坐标获取其在世界（全地图）内的坐标
         */
        getWorldPostion(x: number, y: number): egret.Point;
        /**
         * 根据世界坐标获取在屏幕内的坐标
         */
        getScreenPostion(x: number, y: number): egret.Point;
        /**
         * 根据路点获得世界（全地图）内的坐标
         */
        tile2WorldPostion(x: number, y: number): egret.Point;
        /**
         * 世界地图到路点的转换
         */
        Postion2Tile(px: number, py: number): egret.Point;
        reset(): void;
        /**
         * 设置路点。至此，地图准备完毕，通知主程序开始渲染
         * @param data
         */
        private setupRoad(res);
        private makeData(startx, starty, flush);
        clear(): void;
        private _nowName;
        private loadTiles(data?);
        private mod_buffer;
        private fillTile(tx, ty, data);
        /**
         * 绘制小地图
         */
        private fillSmallMap(startX, startY, tx, ty);
        /**
         * 加载 tiled配置文件
         */
        setupTiled(name: string, type: number, data: Array<any>, container: egret.DisplayObjectContainer): void;
        private tmx;
        private _tiledName;
        private _tiledBuff;
        private _tiledType;
        private _tiledLayerData;
        private _tiledResource;
        private tileset;
        private _nowTiledStartX;
        private _nowTiledStartY;
        private _tiledRows;
        private _tiledCols;
        /**
        * 显示区域区块数量
        */
        private _tiledareaX;
        private _tiledareaY;
        private _isReady;
        private _tiledLoad;
        private _tiledLoadNum;
        private _nowTiledSet;
        private onTiledLoaded(data);
        /**
         * 解析tiled 地图 元素
         */
        private loadTiled(data?);
        /**
         * 重置 刷新 tiled地图
         */
        private makeTiledData();
        /**
         * tiled 填充tiled地图
         */
        private fillTiledMap(tx, ty, tz);
        private _farName;
        private _farType;
        private _farBuff;
        private _farDisplayer;
        private _far_x;
        private _far_y;
        setupFar(name: string, type: number, container: egret.DisplayObjectContainer, far_x: number, far_y: number): void;
        private onFarLoaded(data);
        /**
        * 重置 刷新 tiled地图
        */
        private makeFarData();
        /**
        * 设置重力感应
        * @param  b   boolean
        */
        private _deviceorientation;
        setDeviceorientation(b: boolean): void;
        Deviceorientation: boolean;
        private ondeviceorientation(e);
    }
}
declare module d5power {
    class GameObject extends egret.DisplayObjectContainer implements IGO, ISpriteSheetWaiter {
        private static _missionIcon;
        static setupMissionIcon(res: egret.Texture): void;
        static MissionOver: egret.Texture;
        static MissionOver0: egret.Texture;
        static MissionStart: egret.Texture;
        static MissionStart0: egret.Texture;
        static MAX_POOL_NUM: number;
        private static _pool;
        static getInstance(): GameObject;
        private static back2pool(obj);
        ID: number;
        _spriteSheet: IDisplayer;
        /**
         * 是否在场景内
         */
        private _inScreen;
        private _camp;
        private _deleting;
        protected _data: IGD;
        protected _hpBar: d5power.HSpBar;
        protected _spBar: d5power.HSpBar;
        protected _monitor: egret.Bitmap;
        protected _missionIcon: egret.Bitmap;
        protected _shadow: egret.Shape;
        private _lastRender;
        protected _playFrame: number;
        protected _drawAction: Function;
        private _resReady;
        protected _nameShower: egret.TextField;
        private _alphaCheckTime;
        protected _loadID: number;
        private _flag;
        /**
         * @param    ctrl    控制器
         */
        constructor();
        loadID: number;
        inScreen: boolean;
        deleteing: boolean;
        camp: number;
        hitTestArea(px: number, py: number): boolean;
        /**
         * 渲染自己在屏幕上输出
         */
        renderMe(): void;
        spriteSheet: IDisplayer;
        setupData(data: IGD): void;
        dispose(): void;
        showMissionStatus(index: number): void;
        /**
         * 渲染动作
         */
        renderAction(): void;
        setupSkin(res: string): void;
        onSpriteSheepReady(data: IDisplayer): void;
        private showMissionIcon();
        /**
         * 设置HP条
         */
        setHpBar(bar: HSpBar): void;
        updateBar(): void;
        /**
         * 设置SP条
         */
        setSpBar(bar: HSpBar): void;
        showPos(): void;
        draw(): void;
    }
}
/**
 * Created by renhoward on 15/1/24.
 */
declare module d5power {
    class DoorObject extends GameObject {
        static MAX_POOL_NUM: number;
        private static _pool_door;
        static getDoor(): DoorObject;
        private static backDoor(obj);
        constructor();
        private _lastCheck;
        private _lock;
        renderAction(): void;
        dispose(): void;
    }
}
/**
 * Created by Administrator on 2015/9/24.
 */
declare module d5power {
    class EventObject extends GameObject {
        static MAX_POOL_NUM: number;
        private static _pool_event;
        static getEvent(): EventObject;
        private static backEvent(obj);
        constructor();
        private _lastCheck;
        private _lock;
        renderAction(): void;
        dispose(): void;
    }
}
/**
 * Created by Administrator on 2015/8/18.
 */
declare module d5power {
    class GameObjectDB extends egret.DisplayObjectContainer implements IGO, ISpriteSheetWaiter {
        static flag: boolean;
        static MAX_POOL_NUM: number;
        private static _pool;
        static getInstance(): GameObjectDB;
        private static back2pool(obj);
        ID: number;
        _spriteSheet: IDisplayer;
        /**
         * 是否在场景内
         */
        private _inScreen;
        private _camp;
        private _deleting;
        protected _data: IGD;
        protected _hpBar: d5power.HSpBar;
        protected _spBar: d5power.HSpBar;
        protected _missionIcon: egret.Bitmap;
        protected _shadow: egret.Shape;
        private _lastRender;
        private _playFrame;
        protected _drawAction: Function;
        private _resReady;
        protected _nameShower: egret.TextField;
        private _alphaCheckTime;
        protected _loadID: number;
        protected _skeletonData: any;
        protected _textureData: any;
        protected _texture: any;
        protected _armature: dragonBones.Armature;
        /**
         * @param    ctrl    控制器
         */
        constructor();
        loadID: number;
        inScreen: boolean;
        deleteing: boolean;
        camp: number;
        hitTestArea(px: number, py: number): boolean;
        /**
         * 渲染自己在屏幕上输出
         */
        renderMe(): void;
        spriteSheet: IDisplayer;
        setupData(data: IGD): void;
        private onDataComplate(data);
        private onTextureDataComplete(data);
        private onTextureComplete(data);
        private createDB();
        dispose(): void;
        showMissionStatus(index: number): void;
        /**
         * 渲染动作
         */
        renderAction(): void;
        setupSkin(res: string): void;
        onSpriteSheepReady(data: IDisplayer): void;
        private showMissionIcon();
        /**
         * 设置HP条
         */
        setHpBar(bar: HSpBar): void;
        updateBar(): void;
        /**
         * 设置SP条
         */
        setSpBar(bar: HSpBar): void;
        showPos(): void;
        private drawDB();
    }
}
/**
 * Created by Administrator on 2015/6/15.
 */
declare module d5power {
    class NumberBitmap extends egret.Sprite {
        private _content;
        private static NUMBERSTR;
        private static _sheet;
        constructor(value: string);
        private createTexture();
        private buildBitmap();
    }
}
/**
 * Created by Administrator on 2015/6/15.
 */
declare module d5power {
    class UFlyFont extends egret.DisplayObjectContainer {
        private static _pool;
        static getInstance(scene: egret.DisplayObjectContainer, skillName: string): UFlyFont;
        private static inPool(target);
        private _scene;
        protected _shower: egret.Sprite;
        private stayTime;
        private xspeed;
        private yspeed;
        /**
         * @param	scene		场景
         * @param	skillName	技能名称
         * @param	color		字体颜色
         */
        constructor();
        protected buildBuffer(name: string): void;
        setPos(x: number, y: number): void;
        private onEnterFrameHander();
    }
}
/**
 * Created by Administrator on 2015/6/11.
 */
declare module d5power {
    class CharacterStuff extends egret.Shape {
        /**
         * 控制目标
         */
        protected _target: IGD;
        /**
         * 控制属性的变量名
         */
        protected _attName: string;
        /**
         * 控制属性的最大值的变量名
         */
        protected _attMaxName: string;
        /**
         * @param	target		所属游戏对象
         * @param	resource	渲染素材
         * @param	attName		挂接的游戏对象属性
         * @param	attMaxName	如果挂接属性有最大值，进行挂接
         */
        constructor(target: IGD, attName?: string, attMaxName?: string);
        /**
         * 渲染
         */
        render(buffer: egret.Texture): void;
        /**
         * 清空
         */
        clear(): void;
    }
}
/**
 * Created by Administrator on 2015/6/11.
 */
declare module d5power {
    class HSpBar extends CharacterStuff {
        private color;
        /**
         * @param		target		跟踪目标
         * @param		attName		跟踪属性名
         * @param		attMaxName	最大值跟踪
         * @param		ytype		Y轴位置，若大于1则使用该值进行定位
         * @param		resource	使用素材
         */
        constructor(target: IGD, attName: string, attMaxName: string, ytype?: number, color?: number);
        /**
         * 当前值
         */
        private _nowVal;
        static UP: number;
        static DOWN: number;
        private _size;
        /**
         * 上次渲染的值，用来进行渲染优化，同值不渲染
         */
        private _lastRender;
        private waitForFly(e);
        /**
         * 渲染
         * @param		buffer		缓冲区
         * @param		p			角色的标准渲染坐标
         */
        update(): void;
    }
}
/**
 * Created by Howard on 2015/1/20.
 */
declare module d5power {
    interface IDialog {
        configDialog(headUrl: string, npcname: string, npcSay: string): void;
    }
}
/**
 * Created by Administrator on 2015/5/22.
 */
declare module d5power {
    class Notice extends egret.Sprite {
        protected delete_fun: Function;
        protected _stayTime: number;
        STARTY: number;
        private noticeMap;
        private autoShift;
        constructor(stg: egret.Stage, content: string, dfun?: Function, config?: any);
        protected buildBuffer(content: string, config: any): void;
        protected onEnterFrameHander(e: egret.Event): void;
    }
}
/**
 * Created by Howard on 2015/1/20.
 */
declare module d5power {
    class SimpleDialog extends egret.DisplayObjectContainer implements IDialog {
        private _height;
        private _padding;
        private _shower;
        private _npcTitle;
        private _npcHead;
        private _content;
        private _container;
        private _sayStep;
        private _bg;
        private _npcHeadSrc;
        private _npcNameSrc;
        private _fontSize;
        constructor(cont: egret.DisplayObjectContainer);
        configDialog(headUrl: string, npcname: string, npcSay: string): void;
        dispose(e?: egret.TouchEvent): void;
        private onClickNext(e);
        private onHead(data);
        private play();
    }
}
declare module d5power {
    class BaseItemData {
        id: number;
        name: string;
        info: string;
        buy: number;
        sale: number;
        constructor();
        baseFormat(xml: any): void;
    }
}
declare module d5power {
    class BaseSkillData {
        id: number;
        name: string;
        constructor();
        baseFormat(xml: any): void;
    }
}
/**
 * Created by Administrator on 2015/11/11.
 */
/**
 * Created by Administrator on 2015/10/26.
 */
declare module d5power {
    class ChapterData {
        /**
         * id
         */
        id: number;
        /**
         * add
         */
        add: string;
        /**
         * info
         */
        info: string;
        partArray: Array<PartData>;
        constructor();
    }
}
/**
 * Created by Administrator on 2015/1/19.
 */
declare module d5power {
    class CharacterData implements ICharacterData, IMissionDispatcher {
        _talkWithNpc: Array<any>;
        /**
         * 玩家当前处于的章id
         */
        _chapterID: number;
        /**
         * 玩家当前处于的节id
         */
        _partID: number;
        /**
         * 新的任务列表
         */
        _missionList: Array<any>;
        /**
         * 未激活的任务列表
         */
        _noActiveList: Array<any>;
        nickname: string;
        /**
         * 系统配置的起始任务ID
         */
        private _startMission;
        /**
        * 玩家阵营
        */
        camp: number;
        /**
        * 玩家用户ID
        */
        uid: number;
        /**
        * 当前所在地图
        */
        mapid: number;
        /**
        * 所在坐标X
        */
        posx: number;
        /**
        * 所在坐标Y
        */
        posy: number;
        private _money;
        protected _userdataDisplayer: IUserInfoDisplayer;
        /**
         * 任务配置加载队列
         */
        private _missionLoadingList;
        private _missionIsLoading;
        private _onAddMission;
        private _onAddMissionThis;
        /**
         * 用于存放UI界面的数组。当用户属性发生变化的时候，将逐个通知这些界面。
         */
        private _uiList;
        private _waitDispathTimer;
        constructor();
        addDisplayer(ui: IUserInfoDisplayer): void;
        removeDisplayer(ui: IUserInfoDisplayer): void;
        setuserdataDisplayer(value: IUserInfoDisplayer): void;
        updateDisplayers(): void;
        dispathChange(): void;
        private onDispathTimer(e);
        missionNum: number;
        /**
         * 设置一个当获得任务的时候调用的函数
         * 本参数可用于根据任务打开UI面板等和任务相关的调用
         * @param	f	调用的参数，回叫时将提供一个uint型的任务ID
         */
        onAddMission(f: Function, thisobj: any): void;
        getMissionByIndex(index: number): any;
        /**
         * 通过任务id 获取相关任务数据
         * @param id 任务ID
         */
        getMissionById(id: number): MissionData;
        /**
         * 获取任务数据
         * @param mission_id 任务ID
         */
        addMissionById(mission_id?: number): void;
        setStartMission(v: number): void;
        startMission: number;
        /**
         * 刷新任务，尝试完成现有任务
         */
        flushMission(): void;
        checkActiveMission(): void;
        /**
         * 刷新当前场景中的NPC任务状态
         */
        flushMissionNpc(): void;
        hasMission(mid?: number): boolean;
        /**
         * 是否有某个ID的任务
         */
        hasMissionById(id?: number): boolean;
        /**
         * 获取最后一个任务ID
         */
        lastMissionid: number;
        private loadMissionConfig();
        private onMissionConfigComplate(data);
        deleteMission(m: any): void;
        addMission(m: any): void;
        hasItemNum(itemid?: number): number;
        hasTalkedWith(npcid?: number): boolean;
        killMonseterNum(monsterid?: number): number;
        hasBuff(id?: number): boolean;
        hasEqu(id?: number): boolean;
        hasSkill(id: number, lv?: number): boolean;
        hasSkin(path: string): boolean;
        userPro(pro_name: string, value?: number): boolean;
        getItem(itemid: number, num: number, packageid?: number, equ?: boolean): boolean;
        addPro(pro_name: string, value: number): boolean;
        getExp(num?: number): void;
        delItem(itemid: number, num: number): boolean;
        /**
        * 给予游戏币
        */
        getMoney(u: number): boolean;
        hasChecker(type?: number): boolean;
        publicCheck(type: number, value: string, num: string): boolean;
        checkSkillByID(skillID: number): any;
        check(): void;
    }
}
declare module d5power {
    class GOData implements IGD {
        static WORK_NORMAL: number;
        static WORK_NPC: number;
        static WORK_DOOR: number;
        static WORK_MONSTER: number;
        static WORK_EVENT: number;
        static JOB_COLLECTION: number;
        static JOB_SHOP: number;
        static JOB_CHANGE_MAP: number;
        static JOB_COMPOSE: number;
        private static _pool;
        private static _poolNum;
        static initPool(num?: number): void;
        static getInstance(): GOData;
        private static back2pool(data);
        private _pos;
        private _controller;
        private _respath;
        private _nickname;
        private _deleting;
        private _displayer;
        private _inScreen;
        private _direction;
        private _action;
        private _speed;
        private _uid;
        private _say;
        private _script;
        private _job_type;
        private _job_value;
        private _job_num;
        private _resStyle;
        private _missionIndex;
        private _missionIndexList;
        private _work;
        private _link_map;
        private _link_posx;
        private _link_posy;
        private _camp;
        private _hp;
        private _maxHp;
        private _sp;
        private _maxSp;
        private _monsterid;
        private _ai;
        private _fighter;
        private _isDB;
        private _checktime;
        private _checksize;
        private _checkdel;
        /**
        * 是否处于重力状态
        */
        inG: boolean;
        /**
        * 重心 X 加速度
        */
        speedX: number;
        /**
        * 重力 Y加速度
        */
        speedY: number;
        /**
         * 排序调整
         */
        _zOrderF: number;
        constructor();
        loadMission(): void;
        run(): void;
        setAction(action: number): void;
        action: number;
        /**
         * 深度排序浮动
         */
        setZOrderF(val: number): void;
        /**
         * 深度排序浮动
         */
        zOrderF(): number;
        /**
         * 获取坐标的深度排序
         */
        zOrder: number;
        setDirection(dir: number): void;
        direction: number;
        setPos(px: number, py: number): void;
        speed: number;
        setSpeed(speed: number): void;
        $pos: egret.Point;
        posX: number;
        posY: number;
        setController(ctrl: IController): void;
        controller: IController;
        setRespath(v: string): void;
        respath: string;
        setResStyle(dir: string): void;
        resStyle: string;
        setLink(mapid: number, posx: number, posy: number): void;
        linkMap: number;
        linkPosx: number;
        linkPosy: number;
        setNickname(v: string): void;
        nickname: string;
        setWork(value: number): void;
        work: number;
        isNpc(): boolean;
        isDoor(): boolean;
        dispose(): void;
        setInScreen(b: boolean): void;
        inScreen: boolean;
        setCamp(value: number): void;
        camp: number;
        deleting: boolean;
        setDeleting(b: boolean): void;
        setDisplayer(data: any): void;
        displayer: IGO;
        setAI(data: any): void;
        ai: BTTree;
        setUid(id: number): void;
        uid: number;
        setSay(say: string): void;
        say: string;
        setScript(script: string): void;
        script: string;
        missionIndexList: Array<number>;
        missionIndex: number;
        setJob(type: number, value: string, num: string): void;
        job_type: number;
        job_value: string;
        job_number: string;
        renderMe(): void;
        setHp(value: number): void;
        hp: number;
        setMaxHp(value: number): void;
        maxHp: number;
        setSp(value: number): void;
        sp: number;
        setMaxSp(value: number): void;
        maxSp: number;
        setMonsterid(id: number): void;
        monsterid: number;
        setIsDB(id: number): void;
        isDB: number;
        setChecktime(id: number): void;
        checktime: number;
        setChecksize(id: number): void;
        checksize: number;
        setCheckdel(id: number): void;
        checkdel: number;
    }
}
declare module d5power {
    /**
     * 职业配置数据
     * @author
     *
     */
    class JobData {
        constructor();
        /**
         *职业标示id
         */
        id: number;
        /**
        * 职业名称
        */
        name: string;
        /**
        * 职业皮肤
        */
        skin: string;
        format(xml: any): void;
        toString(): string;
    }
}
declare module d5power {
    interface IMissionDispatcher {
        missionNum: number;
        getMissionByIndex(index: number): any;
        getMissionById(id: number): MissionData;
        onAddMission(f: Function, thisobj: any): void;
        addMissionById(mission_id: number): void;
        setStartMission(v: number): any;
        startMission: number;
        flushMission(): void;
        hasMission(mid: number): boolean;
        hasMissionById(id: number): boolean;
        lastMissionid: number;
        deleteMission(m: any): void;
        publicCheck(type: number, value: string, num: string): boolean;
        /**
         * 是否具备某个条件的独立检查器
         */
        hasChecker(type: number): boolean;
        /**
         * 是否具备某个任务
         */
        hasMission(mid: number): boolean;
        /**
         * 检查某物品数量
         */
        hasItemNum(itemid: number): number;
        /**
         * 是否和某NPC对话过
         */
        hasTalkedWith(npcid: number): boolean;
        /**
         * 杀死怪物数量
         */
        killMonseterNum(monsterid: number): number;
        /**
         * 玩家属性达到
         */
        userPro(pro_name: string, value: number): boolean;
        /**
         * 给玩家属性
         */
        addPro(pro_name: string, value: number): boolean;
        /**
         * 得到某物品
         */
        getItem(itemid: number, num: number, packageid: number, equ: boolean): boolean;
        /**
         * 获得经验
         */
        getExp(num: number): void;
        /**
         * 获得某个任务
         */
        addMissionById(id: number): void;
        /**
         * 获得游戏币
         */
        getMoney(num: number): boolean;
        /**
         * 拥有BUFF
         */
        hasBuff(id: number): boolean;
        /**
         * 装备了某道具
         */
        hasEqu(id: number): boolean;
        /**
         * 是否具备某技能
         * @param		lv 为0时不判断级别，否则需要等级大等于
         */
        hasSkill(id: number, lv: number): boolean;
        /**
         * 是否具备某皮肤
         */
        hasSkin(path: string): boolean;
    }
}
declare module d5power {
    class MissionBlock {
        /**
         * 类型
         */
        type: number;
        /**
         * 值
         */
        value: string;
        /**
         * 数量
         */
        num: string;
        constructor();
        Type: number;
        Value: string;
        Num: string;
        format(t: number, v: string, n: string): void;
        toString(): string;
    }
}
declare module d5power {
    class MissionData {
        /**
         * 接受任务
         */
        static TYPE_GET: number;
        /**
         * 完成任务 ？
         */
        static TYPE_COMPLATE: number;
        /**
         * 主线任务 ！
         */
        static ACTIONTYPE_TRUNK: number;
        /**
         * 支线任务 ？
         */
        static ACTIONTYPE_BRANCHES: number;
        /**
         * 重复任务 ？
         */
        static ACTIONTYPE_AGAIN: number;
        private _actionType;
        private _type;
        /**
         * 任务ID
         */
        private _id;
        /**
         * 任务名
         */
        private _name;
        /**
         * 任务内容
         */
        private _info;
        /**
         * NPC对话内容
         */
        private _npc_said;
        /**
         *未完成 对话内容
         */
        private _uncompDialog;
        /**
         *完成 对话内容
         */
        private _completeDialog;
        /**
         * 开始NPC
         */
        private _npc_startId;
        /**
         * 结束NPC
         */
        private _npc_CompleteId;
        /**
         * 是否开始
         */
        private _isstart;
        /**
         * 是否完成
         */
        private _iscomplate;
        /**
         * 是否激活
         */
        private _isactive;
        /**
         * 任务要求
         */
        private _active;
        /**
         * 任务需求
         */
        private _need;
        /**
         * 任务奖励
         */
        private _give;
        /**
         * 任务开始后脚本
         */
        private _startScript;
        /**
         * 任务完成后脚本
         */
        private _complate_script;
        /**
         * 领取类任务，直接可以完成，文字显示接受
         */
        private static GIVE;
        /**
         * 完成类任务，需要满足条件才能完成。
         */
        private static MISS;
        private _node;
        setNode(value: any): void;
        node: any;
        constructor(id?: number);
        formatFromJson(data: any): void;
        complate_script: string;
        startScript: string;
        /**
         * 任务类型 0-主 1-支 2-可重复
         */
        actionType: number;
        /**
         * 任务类型 0-接 1-交
         */
        setType(value: number): void;
        /**
         * 任务类型 0-接 1-交
         */
        type: number;
        /**
         * 任务名
         */
        name: string;
        /**
         * 任务ID
         */
        id: number;
        /**
         * 任务信息
         */
        info: string;
        /**
         * NPC任务对话
         */
        npc_said: string;
        /**
         * NPC 未完成对话
         */
        uncompDialog: string;
        /**
         * NPC 完成对话
         */
        completeDialog: string;
        /**
         * 开始NPC关联
         */
        npc_startId: number;
        /**
         * 结束NPC关联
         */
        npc_CompleteId: number;
        /**
         * 任务条件
         */
        need: Array<MissionBlock>;
        active: Array<MissionBlock>;
        /**
         * 任务奖励
         */
        give: Array<MissionBlock>;
        giveString: string;
        needString: string;
        /**
         * 任务是否完成
         */
        isComplate: boolean;
        /**
         * 任务是否激活
         */
        isActive: boolean;
        /**
         * 增加完成条件
         */
        addNeed(need: MissionBlock): void;
        /**
         * 增加奖励内容
         */
        addGive(give: MissionBlock): void;
        /**
         * 检查当前任务是否完成
         */
        check(checker: IMissionDispatcher): boolean;
        /**
         * 检查当前任务是否完成
         */
        checkActive(checker: IMissionDispatcher): boolean;
        /**
         * 完成任务
         */
        complate(checker: IMissionDispatcher, node: any): boolean;
        static reward(give: MissionBlock, checker: IMissionDispatcher): void;
        toString(): string;
    }
}
/**
 * Created by Administrator on 2015/10/26.
 */
declare module d5power {
    class MissionNode {
        childs: string;
        /**
         * id
         */
        id: number;
        /**
         * ��id
         */
        chapterId: number;
        /**
         * ��id
         */
        partId: number;
        /**
         * ������id
         */
        missionId: number;
        private _missionData;
        constructor();
        format(xml: any): void;
        missionData: d5power.MissionData;
    }
}
declare module d5power {
    class MissionNR {
        /**
         * 系统保存的处理模式
         */
        static SAVE_KEY: number;
        /**
         * 需求与奖励分割线
         */
        static N_R_LINE: number;
        /**
         * 杀死怪物
         */
        static N_MONSTER_KILLED: number;
        /**
         * 拥有物品（不扣除）
         */
        static N_ITEM_TACKED: number;
        /**
         * 拥有物品（扣除）
         */
        static N_ITEM_NEED: number;
        /**
         * 拥有任务
         */
        static N_MISSION: number;
        /**
         * 玩家属性
         */
        static N_PLAYER_PROP: number;
        /**
         * 与NPC对话
         */
        static N_TALK_NPC: number;
        /**
         * 需要技能
         */
        static N_SKILL_LV: number;
        /**
         * 需要主角皮肤
         */
        static N_SKIN: number;
        /**
         * 需要装备某类型道具
         */
        /**
         * 需要装备某个特定道具
         */
        static N_EQU: number;
        /**
         * 需要学会技能
         */
        static N_SKILL: number;
        /**
         * 需要增益
         */
        static N_BUFF: number;
        /**
         *需要游戏币
         */
        static N_MONEY: number;
        /**
         *需要标记
         */
        static N_MARK: number;
        /**
         *拥有游戏币
         */
        static N_MONEY_KEEP: number;
        /**
         * 奖励道具
         */
        static R_ITEM: number;
        /**
         * 奖励游戏币
         */
        static R_MONEY: number;
        /**
         * 奖励经验
         */
        static R_EXP: number;
        /**
         * 奖励任务
         */
        static R_MISSION: number;
        /**
         * 奖励属性
         */
        static R_PLAYER_PROP: number;
        private static COSTOM_DEFINE;
        constructor();
        /**
         * 增加用户处理配置
         */
        static addCostomDefine(data: Array<any>): string;
        static getChinese(id?: number): string;
    }
}
/**
 * Created by Administrator on 2015/8/24.
 */
declare module d5power {
    class MonsterConfData {
        /**
         * 怪物ID
         */
        id: number;
        /**
         * 怪物名
         */
        name: string;
        /**
         * 怪物等级
         */
        lv: number;
        /**
         * 怪物贴图
         */
        skin: String;
        /**
         * 是否为骨骼动画
         */
        isDB: number;
        constructor();
        /**
         * 格式化对象
         */
        formatObject(data: any): void;
        format(data: any): void;
    }
}
/**
 * Created by Administrator on 2015/5/29.
 */
declare module d5power {
    class MonsterFlushData {
        /**
         * 怪物ID
         */
        id: number;
        /**
         * 怪物是否停留
         */
        stay: boolean;
        /**
         * 怪物行走范围
         */
        walk_round: number;
        /**
         * 怪物刷新个数
         */
        flush_num: number;
        /**
         * 怪物刷新范围
         */
        flush_dis: number;
        /**
         * 怪物复活时间
         */
        relive: number;
        /**
         * 怪物阵营设置
         */
        campset: number;
        /**
         * 是否主动攻击
         */
        autoAtk: boolean;
        posx: number;
        posy: number;
        constructor();
        format(monster: any): void;
    }
}
/**
 * Created by Administrator on 2015/6/2.
 */
declare module d5power {
    class NpcData {
        id: number;
        name: string;
        skin: string;
        head: string;
        inmap: number;
        constructor();
        format(xml: any): void;
        toString(): string;
    }
}
/**
 * Created by Administrator on 2015/11/11.
 */
/**
 * Created by Administrator on 2015/11/11.
 */
/**
 * Created by Administrator on 2015/10/26.
 */
declare module d5power {
    class PartData {
        /**
         * id
         */
        id: number;
        /**
         *
         */
        tree: Object;
        constructor();
    }
}
/**
 * Created by Administrator on 2015/11/6.
 */
declare module d5power {
    class SceneData {
        id: number;
        name: string;
        posX: number;
        posY: number;
        icon: string;
        constructor();
        format(xml: any): void;
        toString(): string;
    }
}
declare module d5power {
    class Base64 {
        private static BASE64_CHARS;
        constructor();
        static encode(data: string): string;
        static decodeToArray(chunk: string, lineWidth: number, compressed: boolean): Array<any>;
        static encodeByteArray(data: egret.ByteArray): string;
        static decode(data: string): string;
        static decodeToByteArray(data: string): egret.ByteArray;
    }
}
declare module d5power {
    class TiledLayer {
        map: TiledMap;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        opacity: number;
        visible: boolean;
        tileGIDs: Array<any>;
        encoding: string;
        compressed: boolean;
        constructor(source: any, parent: TiledMap);
        toJson(): any;
        private arrayToString();
        static csvToArray(input: string, lineWidth?: number): Array<any>;
        arrayToCsv(data: Array<any>): string;
        arrayToBase64(data: Array<any>, lineWidth: number, compressed: boolean): string;
        static base64ToArray(chunk: string, lineWidth: number, compressed: boolean): Array<any>;
        private testDecode(value);
        private static BASE64_CHARS;
        static base64ToByteArray(data: string): egret.ByteArray;
    }
}
declare module d5power {
    class TiledMap {
        width: number;
        height: number;
        tileWidth: number;
        tileHeight: number;
        version: number;
        orientation: string;
        renderorder: string;
        nextobjectid: number;
        layers: any;
        tileSets: any;
        objectGroups: any;
        imgLib: Array<any>;
        layers_ordered: Array<string>;
        constructor();
        format(data: any): void;
        getTileSet(name: string): TiledTileSet;
        getLayer(name: string): TiledLayer;
        getGidOwner(gid?: number): TiledTileSet;
    }
}
declare module d5power {
    /**
     * tiled 图片纹理集
     * @author
     *
     */
    class TiledResourceData {
        private static _resource;
        private static _resourceLib;
        private static _name;
        private static _bitmap;
        constructor();
        static setupResLib(name: string, bitmap: egret.Texture, tiledset: TiledTileSet): void;
        static getResource(name: string, id: number): egret.Texture;
    }
}
declare module d5power {
    class TiledTileSet {
        private _tileProps;
        private _image;
        firstGID: number;
        map: TiledMap;
        name: string;
        tileWidth: number;
        tileHeight: number;
        spacing: number;
        margin: number;
        imageSource: string;
        imageheight: number;
        imagewidth: number;
        numTiles: number;
        numRows: number;
        numCols: number;
        constructor(source: any, parent: TiledMap);
        toJson(): any;
        image: egret.Texture;
        hasGid(gid?: number): boolean;
        fromGid(gid?: number): number;
        toGid(id?: number): number;
        getRect(id?: number): egret.Rectangle;
    }
}
/**
 * Created by Administrator on 2015/6/1.
 */
declare module d5power {
    class UserProData {
        field: number;
        name: string;
        format(data: any): void;
        constructor();
    }
}
