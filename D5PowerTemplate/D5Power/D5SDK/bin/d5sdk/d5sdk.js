//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, MicroGame Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
function trace() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var s = "";
    for (var i = 0, j = args.length; i < j; i++) {
        s += args[i] + " ";
    }
    console.log(s);
}

var d5power;
(function (d5power) {
    /**
     * 使用要求：必须使用getInstance获得实例，等待onSpriteSheepReady回叫，确保素材加载完毕。
     * 当不再使用时，需要使用unlink断开引用，对象将自动等待重用
     */
    var D5SpriteSheet = (function () {
        function D5SpriteSheet() {
            this._link = 0;
            this._waiterList = new Array();
        }
        var d = __define,c=D5SpriteSheet;p=c.prototype;
        D5SpriteSheet.setupUnknow = function (data) {
            if (data == null)
                return;
            data._offsetX = -(data._bitmapWidth >> 1);
            data._offsetY = -(data._bitmapHeight);
            D5SpriteSheet._unknow = data;
        };
        D5SpriteSheet.getInstance = function (res, getObj) {
            var data;
            if (D5SpriteSheet._pool_inuse[res] != null) {
                data = D5SpriteSheet._pool_inuse[res];
                data._link++;
                if (data._link == 1)
                    data.setup(res);
            }
            else {
                if (D5SpriteSheet._pool_jale.length > 0) {
                    data = D5SpriteSheet._pool_jale.pop();
                }
                else {
                    data = new D5SpriteSheet();
                }
                data._link++;
                data.setup(res);
            }
            if (data._sheet == null) {
                data.addWaiter(getObj);
            }
            else {
                getObj.onSpriteSheepReady(data);
            }
            data.loadID = getObj.loadID;
            return data;
        };
        D5SpriteSheet.back2pool = function (data) {
            D5SpriteSheet._pool_inuse[data._name] = null;
            if (D5SpriteSheet._pool_jale.length < D5SpriteSheet.MAX_IN_JALE && D5SpriteSheet._pool_jale.indexOf(data) == -1) {
                D5SpriteSheet._pool_jale.push(data);
            }
        };
        d(p, "name"
            ,function () {
                return this._name;
            }
        );
        d(p, "renderTime"
            ,function () {
                return this._renderTime;
            }
        );
        d(p, "totalFrame"
            ,function () {
                return this._totalFrame;
            }
        );
        d(p, "totalDirection"
            ,function () {
                return this._totalDirection;
            }
        );
        d(p, "shadowX"
            ,function () {
                return this._shadowX;
            }
        );
        d(p, "shadowY"
            ,function () {
                return this._shadowY;
            }
        );
        d(p, "gX"
            ,function () {
                return this._gX;
            }
        );
        d(p, "gY"
            ,function () {
                return this._gY;
            }
        );
        d(p, "uvList"
            ,function () {
                return this._uvList;
            }
        );
        d(p, "frameWidth"
            ,function () {
                return this._frameW;
            }
        );
        d(p, "frameHeight"
            ,function () {
                return this._frameH;
            }
        );
        p.addWaiter = function (waiter) {
            if (this._waiterList.indexOf(waiter) == -1)
                this._waiterList.push(waiter);
        };
        p.setup = function (res) {
            if (res.substr(-4, 4) == '.png') {
                this._name = res.substr(0, res.length - 4);
            }
            else {
                this._name = res;
                res = res + '.png';
            }
            D5SpriteSheet._pool_inuse[this._name] = this;
            //console.log("[D5SpriteSheet] Res is load."+res);
            RES.getResByUrl(res, this.onTextureComplete, this);
        };
        p.unlink = function () {
            this._link--;
            if (this._link < 0)
                this._link = 0;
            //console.log('[D5SpriteSheet] unlink ',this._name,this._link);
            if (this._link == 0) {
                this._sheet = null;
                this._waiterList = [];
                D5SpriteSheet._pool_inuse[this._name] = null;
                D5SpriteSheet.back2pool(this);
            }
        };
        p.onTextureComplete = function (data) {
            //console.log("[D5SpriteSheet] Res is loaded."+this._name);
            // link为0意味着该对象已失去全部引用，被废弃掉了，所以无需再处理程序
            if (this._link == 0)
                return;
            this._sheet = new egret.SpriteSheet(data);
            RES.getResByUrl(this._name + '.json', this.onDataComplate, this);
        };
        p.getTexture = function (dir, frame) {
            return this._sheet == null ? D5SpriteSheet._unknow : this._sheet.getTexture('frame' + dir + '_' + frame);
        };
        p.onDataComplate = function (data) {
            //console.log("[D5SpriteSheet] json is loaded."+this._name);
            // link为0意味着该对象已失去全部引用，被废弃掉了，所以无需再处理程序
            if (this._link == 0) {
                this._sheet = null;
                return;
            }
            //{"X":-59,"shadowY":12,"FrameWidth":120,"shadowX":20,"Direction":1,"Time":120,"Frame":4,"Y":-114,"FrameHeight":120}
            this._totalFrame = parseInt(data.Frame);
            this._renderTime = parseInt(data.Time);
            this._shadowX = parseInt(data.shadowX);
            this._shadowY = parseInt(data.shadowY);
            if (this._shadowY >= this._shadowX)
                this._shadowY = data.shadowX * 0.5;
            this._totalDirection = parseInt(data.Direction);
            switch (parseInt(data.Direction)) {
                case 1:
                    this._totalDirection = 1;
                    break;
                case 5:
                    this._totalDirection = 8;
                    break;
                case 3:
                    this._totalDirection = 4;
                    break;
            }
            this._gX = parseInt(data.X);
            this._gY = parseInt(data.Y);
            this._frameW = parseInt(data.FrameWidth);
            this._frameH = parseInt(data.FrameHeight);
            this._uvList = data.uv ? data.uv : null;
            //console.log("[D5SpriteSheepINIT] renderTime:",this._renderTime,",shadowY:",this._shadowY);
            var i;
            var l;
            if (data.uv) {
                for (l = 0; l < this._totalDirection; l++) {
                    for (i = 0; i < this._totalFrame; i++) {
                        var uvLine = l < 5 ? l : 8 - l;
                        var uv = data.uv[uvLine * this._totalFrame + i];
                        if (uv == null) {
                            console.log("[D5SpriteSheepINIT] can not find uv config line:", l, ",frame:", i, "===========================");
                        }
                        else {
                            if (uv.offY == -uv.height)
                                uv.offY += 0.01;
                            //this._sheet.createTexture('frame' + l + '_' + i, i * data.FrameWidth, l * data.FrameHeight, uv.width, uv.height,l<5 ? uv.offX : -uv.width-uv.offX, uv.offY);
                            this._sheet.createTexture('frame' + l + '_' + i, i * data.FrameWidth + uv.x, l * data.FrameHeight + uv.y, uv.width, uv.height, 0, 0);
                        }
                    }
                }
            }
            else {
                for (l = 0; l < this._totalDirection; l++) {
                    for (i = 0; i < this._totalFrame; i++) {
                        this._sheet.createTexture('frame' + l + '_' + i, i * data.FrameWidth, l * data.FrameHeight, data.FrameWidth, data.FrameHeight, 0, 0);
                    }
                }
            }
            while (this._waiterList.length > 0) {
                var poper = this._waiterList.pop();
                if (poper.loadID == this.loadID)
                    poper.onSpriteSheepReady(this);
            }
        };
        /**
         * 对象池最大容量
         * @type {number}
         */
        D5SpriteSheet.MAX_IN_JALE = 200;
        D5SpriteSheet._pool_inuse = {};
        D5SpriteSheet._pool_jale = new Array();
        return D5SpriteSheet;
    })();
    d5power.D5SpriteSheet = D5SpriteSheet;
    egret.registerClass(D5SpriteSheet,"d5power.D5SpriteSheet",["d5power.IDisplayer"]);
})(d5power || (d5power = {}));



//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, MicroGame Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, MicroGame Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, MicroGame Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var d5power;
(function (d5power) {
    /**
     * 用于处理UI素材的贴图数据
     * 本数据仅供D5BitmapUI使用
     * D5Rpg中的贴图数据直接调用Json中的uv对象，未进行结构化
     */
    var UVData = (function () {
        function UVData() {
            /**
             * 贴图的偏移坐标
             */
            this.offX = 0;
            /**
             * 贴图的偏移坐标
             */
            this.offY = 0;
            /**
             * 贴图宽度
             */
            this.width = 0;
            /**
             * 贴图高度
             */
            this.height = 0;
        }
        var d = __define,c=UVData;p=c.prototype;
        /**
         * 格式化数据
         */
        p.format = function (data) {
            this.offX = parseInt(data.offX);
            this.offY = parseInt(data.offY);
            this.width = parseInt(data.width);
            this.height = parseInt(data.height);
            this.u = (data.u);
            this.v = (data.v);
            this.w = (data.w);
            this.h = (data.h);
            this.x = (data.x);
            this.y = (data.y);
        };
        return UVData;
    })();
    d5power.UVData = UVData;
    egret.registerClass(UVData,"d5power.UVData");
})(d5power || (d5power = {}));

