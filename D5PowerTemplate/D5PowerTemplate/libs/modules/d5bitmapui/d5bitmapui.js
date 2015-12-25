

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
/**
 * Created by Administrator on 2015/4/22.
 */
var d5power;
(function (d5power) {
    var D5UIResourceData = (function () {
        function D5UIResourceData() {
            this._resList = [];
        }
        var d = __define,c=D5UIResourceData;p=c.prototype;
        D5UIResourceData.setupResLib = function (bitmap, config) {
            D5UIResourceData._resource = new egret.SpriteSheet(bitmap);
            var obj;
            var uv;
            var cut;
            var cut1;
            var uvList;
            for (var k in config) {
                trace(k, config[k]);
                obj = config[k];
                var data = new D5UIResourceData();
                uvList = [];
                switch (obj.type) {
                    case "D5MirrorBox":
                        cut = obj.cut[0];
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y;
                        uv.width = cut.x;
                        uv.height = cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut.x;
                        uv.offY = obj.y;
                        uv.width = obj.w - cut.x;
                        uv.height = cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y + cut.y;
                        uv.width = cut.x;
                        uv.height = obj.h - cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut.x;
                        uv.offY = obj.y + cut.y;
                        uv.width = obj.w - cut.x;
                        uv.height = obj.h - cut.y;
                        uvList.push(uv);
                        data.setupResource(k, uvList);
                        break;
                    case "D5Window":
                        cut = obj.cut[0];
                        cut1 = obj.cut[1];
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y;
                        uv.width = cut.x;
                        uv.height = cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut.x;
                        uv.offY = obj.y;
                        uv.width = cut1.x - cut.x;
                        uv.height = cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut1.x;
                        uv.offY = obj.y;
                        uv.width = obj.w - cut1.x;
                        uv.height = cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y + cut.y;
                        uv.width = cut.x;
                        uv.height = cut1.y - cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut.x;
                        uv.offY = obj.y + cut.y;
                        uv.width = cut1.x - cut.x;
                        uv.height = cut1.y - cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut1.x;
                        uv.offY = obj.y + cut.y;
                        uv.width = obj.w - cut1.x;
                        uv.height = cut1.y - cut.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y + cut1.y;
                        uv.width = cut.x;
                        uv.height = obj.h - cut1.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut.x;
                        uv.offY = obj.y + cut1.y;
                        uv.width = cut1.x - cut.x;
                        uv.height = obj.h - cut1.y;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut1.x;
                        uv.offY = obj.y + cut1.y;
                        uv.width = obj.w - cut1.x;
                        uv.height = obj.h - cut1.y;
                        uvList.push(uv);
                        data.setupResource(k, uvList);
                        break;
                    case "D5Button":
                        cut = obj.cut[1];
                        if (cut.x == 0) {
                            uv = new d5power.UVData();
                            uv.offX = obj.x;
                            uv.offY = obj.y;
                            uv.width = obj.w / 4;
                            uv.height = obj.h;
                            uvList.push(uv);
                            uv = new d5power.UVData();
                            uv.offX = obj.x + obj.w / 4;
                            uv.offY = obj.y;
                            uv.width = obj.w / 4;
                            uv.height = obj.h;
                            uvList.push(uv);
                            uv = new d5power.UVData();
                            uv.offX = obj.x + obj.w / 2;
                            uv.offY = obj.y;
                            uv.width = obj.w / 4;
                            uv.height = obj.h;
                            uvList.push(uv);
                            uv = new d5power.UVData();
                            uv.offX = obj.x + obj.w - obj.w / 4;
                            uv.offY = obj.y;
                            uv.width = obj.w / 4;
                            uv.height = obj.h;
                            uvList.push(uv);
                            data.buttonType = 4;
                        }
                        else {
                            uv = new d5power.UVData();
                            uv.offX = obj.x;
                            uv.offY = obj.y;
                            uv.width = obj.w / 2;
                            uv.height = obj.h;
                            uvList.push(uv);
                            uv = new d5power.UVData();
                            uv.offX = obj.x + obj.w / 2;
                            uv.offY = obj.y;
                            uv.width = obj.w / 2;
                            uv.height = obj.h;
                            uvList.push(uv);
                            data.buttonType = 2;
                        }
                        data.setupResource(k, uvList);
                        break;
                    case "D5MirrorLoop":
                        cut = obj.cut[0];
                        if (cut.y == 0) {
                            uv = new d5power.UVData();
                            uv.offX = obj.x;
                            uv.offY = obj.y;
                            uv.width = cut.x;
                            uv.height = obj.h;
                            uvList.push(uv);
                            uv = new d5power.UVData();
                            uv.offX = obj.x + cut.x;
                            uv.offY = obj.y;
                            uv.width = obj.w - cut.x;
                            uv.height = obj.h;
                            uvList.push(uv);
                            D5UIResourceData._typeLoop = 0;
                        }
                        else {
                            uv = new d5power.UVData();
                            uv.offX = obj.x;
                            uv.offY = obj.y;
                            uv.width = obj.w;
                            uv.height = cut.y;
                            uvList.push(uv);
                            uv = new d5power.UVData();
                            uv.offX = obj.x;
                            uv.offY = obj.y + cut.y;
                            uv.width = obj.w;
                            uv.height = obj.h - cut.y;
                            uvList.push(uv);
                            D5UIResourceData._typeLoop = 1;
                        }
                        data.setupResource(k, uvList);
                        break;
                    case "D5Bitmap":
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y;
                        uv.width = obj.w;
                        uv.height = obj.h;
                        uvList.push(uv);
                        data.setupResource(k, uvList);
                        break;
                    case "D5RadioBtn":
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y;
                        uv.width = obj.w / 4;
                        uv.height = obj.h;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + obj.w / 4;
                        uv.offY = obj.y;
                        uv.width = obj.w / 4;
                        uv.height = obj.h;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + obj.w / 2;
                        uv.offY = obj.y;
                        uv.width = obj.w / 4;
                        uv.height = obj.h;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + obj.w - obj.w / 4;
                        uv.offY = obj.y;
                        uv.width = obj.w / 4;
                        uv.height = obj.h;
                        uvList.push(uv);
                        data.setupResource(k, uvList);
                        break;
                    case "D5SliderButton":
                        cut = obj.cut[0];
                        uv = new d5power.UVData();
                        uv.offX = obj.x;
                        uv.offY = obj.y;
                        uv.width = cut.x;
                        uv.height = obj.h / 2;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + cut.x;
                        uv.offY = obj.y;
                        uv.width = obj.w - cut.x;
                        uv.height = obj.h / 2;
                        uvList.push(uv);
                        uv = new d5power.UVData(); //下面是按钮素材   ，上面是背景素材
                        uv.offX = obj.x;
                        uv.offY = obj.y + obj.h / 2;
                        uv.width = obj.w / 4;
                        uv.height = obj.h / 2;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + obj.w / 4;
                        uv.offY = obj.y + obj.h / 2;
                        uv.width = obj.w / 4;
                        uv.height = obj.h / 2;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + obj.w / 2;
                        uv.offY = obj.y + obj.h / 2;
                        uv.width = obj.w / 4;
                        uv.height = obj.h / 2;
                        uvList.push(uv);
                        uv = new d5power.UVData();
                        uv.offX = obj.x + obj.w - obj.w / 4;
                        uv.offY = obj.y + obj.h / 2;
                        uv.width = obj.w / 4;
                        uv.height = obj.h / 2;
                        uvList.push(uv);
                        data.setupResource(k, uvList);
                        break;
                    case "D5BitmapNumber":
                        for (var i = 0; i < 10; i++) {
                            uv = new d5power.UVData();
                            uv.offX = obj.x + i * obj.w / 10;
                            uv.offY = obj.y;
                            uv.width = obj.w / 10;
                            uv.height = obj.h;
                            uvList.push(uv);
                        }
                        data.setupResource(k, uvList);
                        break;
                }
                D5UIResourceData._resourceLib[k] = data;
            }
        };
        D5UIResourceData.getData = function (name) {
            return D5UIResourceData._resourceLib[name];
        };
        p.setupResource = function (name, uvData) {
            this._name = name;
            for (var i = 0, j = uvData.length; i < j; i++) {
                D5UIResourceData._resource.createTexture(name + i, uvData[i].offX, uvData[i].offY, uvData[i].width, uvData[i].height);
            }
        };
        p.getResource = function (id) {
            return D5UIResourceData._resource.getTexture(this._name + id);
        };
        D5UIResourceData._resourceLib = {};
        D5UIResourceData._typeLoop = 0;
        return D5UIResourceData;
    })();
    d5power.D5UIResourceData = D5UIResourceData;
    egret.registerClass(D5UIResourceData,"d5power.D5UIResourceData");
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
var d5power;
(function (d5power) {
    var D5Component = (function (_super) {
        __extends(D5Component, _super);
        function D5Component() {
            _super.call(this);
            if (D5Component.autoRelease)
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        }
        var d = __define,c=D5Component;p=c.prototype;
        p.setSkin = function (name) {
        };
        /**
         * 属性绑定目标
         */
        D5Component.setproBindingSource = function (obj) {
            this._pro_binding_source = obj;
        };
        d(D5Component, "proBindingSource"
            ,function () {
                return this._pro_binding_source;
            }
        );
        p.setSize = function (w, h) {
            this._w = w;
            this._h = h;
            this.invalidate();
        };
        d(p, "nowName"
            ,function () {
                return this._nowName;
            }
        );
        d(p, "width"
            ,function () {
                return this._w;
            }
        );
        d(p, "height"
            ,function () {
                return this._h;
            }
        );
        D5Component.getComponentByURL = function (url, container, onComplate) {
            if (onComplate === void 0) { onComplate = null; }
            //var obj:any = RES.getRes(url)
            var obj = url;
            var arr = obj.uiList;
            var length = arr.length;
            var comObj;
            container['_realWidth'] = parseInt(obj.width);
            container['_realHeight'] = parseInt(obj.height);
            container['_flyX'] = obj.flyx;
            container['_flyY'] = obj.flyy;
            for (var i = 0; i < length; i++) {
                comObj = arr[i];
                container.addChild(this.getCompoentByJson(comObj, container));
            }
            if (onComplate)
                onComplate.apply(container);
        };
        D5Component.getCompoentByJson = function (value, container) {
            var com;
            switch (value.Class) {
                case "D5Window":
                    com = new d5power.D5Window();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    com.setSize(value.width, value.height);
                    var arr = value.uiList;
                    var length = arr.length;
                    var comObj;
                    for (var i = 0; i < length; i++) {
                        comObj = arr[i];
                        com.addChild(this.getCompoentByJson(comObj, container));
                    }
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5MirrorBox":
                    com = new d5power.D5MirrorBox();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    com.setSize(value.width, value.height);
                    var arr = value.uiList;
                    var length = arr.length;
                    var comObj;
                    for (var i = 0; i < length; i++) {
                        comObj = arr[i];
                        com.addChild(this.getCompoentByJson(comObj, container));
                    }
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5Button":
                    com = new d5power.D5Button();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.setSound(value.soundDown);
                    com.x = value.x;
                    com.y = value.y;
                    com.setIcon(value.icon);
                    var callback_String = value.listener;
                    if (value.lable && value.lable != '') {
                        com.setLable(value.lable);
                    }
                    if (callback_String != '' && callback_String != 'null' && callback_String != null && container != null) {
                        //                        if(container.hasOwnProperty(callback_String))
                        //                        {
                        //                        (<D5Button>com).setCallback(container[callback_String]);
                        //                        }else{
                        //                            trace("[D5Component] 未在"+container+"中发现所需要的按钮响应函数"+callback_String);
                        //                        }
                        com.setCallback(container[callback_String]);
                    }
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5MirrorLoop":
                    com = new d5power.D5MirrorLoop();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    com.setSize(value.width, value.height);
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5Bitmap":
                    com = new d5power.D5Bitmap();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5RadioBtn":
                    com = new d5power.D5RadioBtn();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    if (value.lable && value.lable != '') {
                        com.setLable(value.lable);
                    }
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5FlyBox":
                    com = new d5power.D5FlyBox();
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    com.setMaxWidth(value.maxWidth);
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5HBox":
                    com = new d5power.D5HBox();
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5VBox":
                    com = new d5power.D5VBox();
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5Text":
                    com = new d5power.D5Text(value.textValue, value.fontColor, -1, value.filterColor, value.fontSize);
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    com.setSize(value.width, value.height);
                    com.setType(value.type);
                    com.setTextAlign(value.alignType);
                    com.setFontBold(value.bold);
                    com.setBgColor(value.bgColor);
                    com.setLtBorder(value.ltColor);
                    com.setRbBorder(value.rbColor);
                    com.setWrapFlg(value.wrapType);
                    com.setIsPassword(value.password);
                    com.setTextID((value.textID).toString());
                    com._binding = value.binding;
                    if (container)
                        container[com.name] = com;
                    if (container && container && com._binding != '')
                        container.addBinder(com);
                    break;
                case "D5ImageBox":
                    com = new d5power.D5ImageBox();
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    com.setSize(value.width, value.height);
                    com.showNum(value.shownum);
                    com.setLogo((value.bg).toString());
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5ButtonGroup":
                    com = new d5power.D5ButtonGroup();
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    var arr = value.uiList;
                    var length = arr.length;
                    var comObj;
                    for (var i = 0; i < length; i++) {
                        comObj = arr[i];
                        com.addChild(this.getCompoentByJson(comObj, container));
                    }
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5Swf":
                    com = new d5power.D5Swf();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    com.setSrc(value.src);
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5BitmapNumber":
                    com = new d5power.D5BitmapNumber();
                    com.name = value.name;
                    com.setSkin(value.skinId);
                    com.x = value.x;
                    com.y = value.y;
                    //(<D5BitmapNumber>com).setPadding(value.src);
                    com.setAlign(value.align);
                    com.setValue(1);
                    if (container)
                        container[com.name] = com;
                    break;
                case "D5Shape":
                    com = new d5power.D5Shape();
                    com.name = value.name;
                    com.x = value.x;
                    com.y = value.y;
                    com.setWorkMode(value.workMode);
                    com.setFillColor(value.fillColor);
                    com.setTickNess(value.tickNess);
                    com.setColor(value.color);
                    com.setOffX(value.offX);
                    com.setOffY(value.offY);
                    com.setDrawWidth(value.drawWidth);
                    com.setDrawHeight(value.drawHeight);
                    com.setRadius(value.radius);
                    if (container)
                        container[com.name] = com;
                    break;
            }
            return com;
        };
        p.dispose = function () {
        };
        p.invalidate = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
        };
        p.onInvalidate = function (event) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onInvalidate, this);
            this.draw();
        };
        p.draw = function () {
            this.invalidateSize();
            this.dispatchEvent(new egret.Event(egret.Event.RESIZE));
        };
        p.invalidateSize = function () {
        };
        p.autoCache = function () {
            this.cacheAsBitmap = false;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onAutoCache, this);
        };
        p.onAutoCache = function (event) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onAutoCache, this);
            this.cacheAsBitmap = true;
        };
        D5Component.autoRelease = true;
        return D5Component;
    })(egret.Sprite);
    d5power.D5Component = D5Component;
    egret.registerClass(D5Component,"d5power.D5Component");
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
var d5power;
(function (d5power) {
    var D5Bitmap = (function (_super) {
        __extends(D5Bitmap, _super);
        function D5Bitmap() {
            _super.call(this);
        }
        var d = __define,c=D5Bitmap;p=c.prototype;
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            var data = d5power.D5UIResourceData.getData(name);
            if (data == null) {
                trace("[D5Bitmap]No Resource" + name);
                var texture = RES.getRes(name);
                if (texture) {
                    this.bit = new egret.Bitmap();
                    this.bit.texture = texture;
                    this.invalidate();
                }
                else {
                    this.setSrc(name);
                }
                return;
            }
            if (this.bit == null) {
                this.bit = new egret.Bitmap();
            }
            this.bit.texture = data.getResource(0);
            this.invalidate();
        };
        p.setSrc = function (url) {
            this._url = url;
            this.changeParticle();
        };
        p.changeParticle = function () {
            //RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComplete, this);
            //RES.loadConfig("resource/resource.json",  "resource/");
            //RES.loadGroup("preload");
            RES.getResByUrl(this._url, this.onComplete, this);
        };
        p.onComplete = function (data) {
            if (this.bit == null)
                this.bit = new egret.Bitmap();
            this.bit.texture = data;
            this.addChild(this.bit);
            if (data == null) {
                trace(this.name, 'resource hot found ==============');
                return;
            }
            this.setSize(this.bit.$getWidth(), this.bit.$getHeight());
            //this.invalidate();
        };
        p.draw = function () {
            if (this.bit == null) {
            }
            else {
                if (!this.contains(this.bit)) {
                    this.addChildAt(this.bit, 0);
                }
            }
            _super.prototype.draw.call(this);
        };
        return D5Bitmap;
    })(d5power.D5Component);
    d5power.D5Bitmap = D5Bitmap;
    egret.registerClass(D5Bitmap,"d5power.D5Bitmap");
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
var d5power;
(function (d5power) {
    /**
     *
     * @author
     *
     */
    var D5BitmapNumber = (function (_super) {
        __extends(D5BitmapNumber, _super);
        function D5BitmapNumber() {
            _super.call(this);
            this._align = 0;
            this._box = new d5power.D5HBox();
            //            this._box.setPadding(0);
            this._numic = {};
            this.addChild(this._box);
        }
        var d = __define,c=D5BitmapNumber;p=c.prototype;
        p.setAlign = function (v) {
            this._align = v;
        };
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            this.data = d5power.D5UIResourceData.getData(name);
            if (this.data == null) {
                trace("[D5Button]No Resource" + name);
                return;
            }
        };
        p.setValue = function (v) {
            var str = v + '';
            var len = str.length;
            var bitmap;
            var pnumber;
            this._box.removeChildren();
            for (var i = 0; i < len; i++) {
                pnumber = str.substr(i, 1);
                bitmap = this._numic[pnumber];
                if (!bitmap) {
                    bitmap = new egret.Bitmap();
                    this._numic[pnumber] = bitmap;
                }
                bitmap.texture = this.data.getResource(parseInt(pnumber));
                this._box.addChild(bitmap);
            }
            this.invalidate();
        };
        p.setPadding = function (v) {
            this._box.setPadding(v);
            this.invalidate();
        };
        p.draw = function () {
            switch (this._align) {
                case d5power.D5Text.CENTER:
                    this._box.x = -this._box.width >> 1;
                    break;
                case d5power.D5Text.RIGHT:
                    this._box.x = -this._box.width;
                    break;
            }
            _super.prototype.draw.call(this);
        };
        return D5BitmapNumber;
    })(d5power.D5Component);
    d5power.D5BitmapNumber = D5BitmapNumber;
    egret.registerClass(D5BitmapNumber,"d5power.D5BitmapNumber");
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
var d5power;
(function (d5power) {
    var D5Button = (function (_super) {
        __extends(D5Button, _super);
        function D5Button() {
            _super.call(this);
            this._iconAutoFly = false;
        }
        var d = __define,c=D5Button;p=c.prototype;
        p.showIcon = function (v) {
            if (this._icon)
                this._icon.visible = v;
        };
        d(p, "iconDisplay"
            ,function () {
                return this._icon == null ? false : this._icon.visible;
            }
        );
        p.setIcon = function (url, xpos, ypos) {
            if (xpos === void 0) { xpos = 0; }
            if (ypos === void 0) { ypos = 0; }
            if (url == '')
                return;
            if (!this._icon)
                this._icon = new d5power.D5Bitmap();
            this._icon.setSkin(url);
            this._icon.x = xpos;
            this._icon.y = ypos;
            if (this._icon.x == 0 && this._icon.y == 0)
                this._iconAutoFly = true;
            if (this.width != 0)
                this.flyIcon();
        };
        p.flyIcon = function () {
            if (this._icon) {
                if (this.contains(this._icon))
                    this.setChildIndex(this._icon, this.numChildren - 1);
                else
                    this.addChild(this._icon);
                if (this._lable && this.contains(this._lable) && this.contains(this._icon) && this._iconAutoFly) {
                    this._icon.x = (this.a.width - this._icon.width - this._lable.width) >> 1;
                    this._lable.x = this._icon.x + this._icon.height;
                }
                else {
                    if (this._icon.x == 0) {
                        this._icon.x = (this.width - this._icon.width) >> 1;
                    }
                    if (this._icon.y == 0) {
                        this._icon.y = (this.height - this._icon.height) >> 1;
                    }
                }
            }
        };
        p.setLable = function (lab) {
            if (this._lable == null) {
                this._lable = new d5power.D5Text();
                this._lable.setFontSize(d5power.D5Style.default_btn_lable_size);
                this._lable.setFontBold(d5power.D5Style.default_btn_lable_bold);
                if (d5power.D5Style.default_btn_lable_border != -1)
                    this._lable.setFontBorder(d5power.D5Style.default_btn_lable_border);
                this.addChild(this._lable);
            }
            this._lable.setText(lab);
            this._lable.setWidth(lab.length * d5power.D5Style.default_btn_lable_size);
            this._lable.setHeight(d5power.D5Style.default_btn_lable_size);
        };
        p.autoLableSize = function () {
            if (this._lable == null || this.a == null)
                return;
            this._lable.x = Math.abs(this.a.width - this._lable.width) / 2;
            this._lable.y = Math.abs(this.a.height - this._lable.height) / 2;
        };
        p.enabled = function (b) {
            this.touchEnabled = b;
            if (b) {
                this.a.texture = this.data.getResource(0);
            }
            else {
                if (this.data.buttonType == 2) {
                    this.a.texture = this.data.getResource(0);
                }
                else {
                    this.a.texture = this.data.getResource(3);
                }
            }
            this.invalidate();
        };
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            this.data = d5power.D5UIResourceData.getData(name);
            if (this.data == null) {
                trace("[D5Button]No Resource" + name);
                return;
            }
            if (this.a == null)
                this.a = new egret.Bitmap();
            this.a.texture = this.data.getResource(0);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnDown, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.btnUp, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.btnOutSide, this);
            this.invalidate();
        };
        p.setSound = function (sound) {
            sound = sound.replace('resource/', '');
            this.sound = sound;
        };
        p.btnDown = function (evt) {
            if (this.data.buttonType == 2) {
                this.a.texture = this.data.getResource(1);
            }
            else {
                this.a.texture = this.data.getResource(2);
            }
            this.invalidate();
        };
        p.btnUp = function (evt) {
            this.a.texture = this.data.getResource(0);
            this.invalidate();
        };
        p.btnOutSide = function (evt) {
            this.a.texture = this.data.getResource(0);
            this.invalidate();
        };
        p.btnClick = function (evt) {
            var sound = RES.getRes(this.sound);
            if (sound)
                sound.play();
            if (this._callback2 != null && this.enabled) {
                this._callback2(evt);
            }
            this.invalidate();
        };
        p.draw = function () {
            if (this.a == null) {
            }
            else {
                if (!this.contains(this.a)) {
                    this.addChildAt(this.a, 0);
                }
            }
            _super.prototype.draw.call(this);
            if (this._lable != null) {
                this.addChild(this._lable);
                this.autoLableSize();
            }
        };
        p.setCallback = function (fun) {
            this._callback2 = fun;
        };
        return D5Button;
    })(d5power.D5Component);
    d5power.D5Button = D5Button;
    egret.registerClass(D5Button,"d5power.D5Button");
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
var d5power;
(function (d5power) {
    /**
     *
     * @author
     *
     */
    var D5CDdisplayer = (function (_super) {
        __extends(D5CDdisplayer, _super);
        function D5CDdisplayer() {
            _super.call(this);
            this._color = 0;
            this.setSize(60, 60);
        }
        var d = __define,c=D5CDdisplayer;p=c.prototype;
        p.setColor = function (v) {
            this._color = v;
        };
        p.setAlpha = function (value) {
            this.alpha = value;
        };
        d(p, "cding"
            /**
            * 是否正在CD
            */
            ,function () {
                return this._cding;
            }
        );
        p.setSize = function (w, h) {
            _super.prototype.setSize.call(this, w, h);
            this._progressMax = (w + h) * 2;
            this._startX = w >> 1;
            this._startY = h >> 1;
            this._drawPath = [[(w >> 1), 0, 0], [w, 0, (w >> 1)], [w, h, (w >> 1) + h], [0, h, (w >> 1) + h + w], [0, 0, (w >> 1) + h + h + w], [(w >> 1), 0, (w + h) * 2]];
        };
        /**
        * 开始CD
        * @param	v	CD时间，单位秒
        */
        p.startCD = function (v) {
            this._cd = v * 1000;
            this._cding = true;
            this._startTime = egret.getTimer();
            this._progressLen = 0;
            if (v < 2) {
                this._renderSpeed = 20;
            }
            else if (v < 6) {
                this._renderSpeed = 40;
            }
            else if (v < 10) {
                this._renderSpeed = 100;
            }
            else if (v < 30) {
                this._renderSpeed = 150;
            }
            else if (v < 120) {
                this._renderSpeed = 200;
            }
            else {
                this._renderSpeed = 800;
            }
            this.graphics.clear();
            this.graphics.beginFill(this._color, this.alpha);
            this.graphics.drawRect(0, 0, this.width, this.height);
            this.addEventListener(egret.Event.ENTER_FRAME, this.render, this);
        };
        p.render = function (e) {
            if (e === void 0) { e = null; }
            var t = egret.getTimer();
            var checker = t - this._lastRender;
            if (checker < this._renderSpeed)
                return;
            checker = t - this._startTime;
            if (checker >= this._cd) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.render, this);
                this._cding = false;
                this.graphics.clear();
                trace("Ended");
                return;
            }
            this._progressLen = this._progressMax * (checker / this._cd);
            this.graphics.clear();
            this.graphics.beginFill(this._color, this.alpha);
            this.graphics.moveTo(this._startX, this._startY);
            var nowX = -1;
            var nowY = -1;
            for (var i = 0; i < 6; i++) {
                if (i < 4 && this._progressLen > this._drawPath[i + 1][2])
                    continue;
                if (nowX == -1) {
                    switch (i) {
                        case 0:
                            nowX = this._drawPath[i][0] + this._progressLen;
                            nowY = this._drawPath[i][1];
                            break;
                        case 1:
                            nowX = this._drawPath[i][0];
                            nowY = this._drawPath[i][1] + this._progressLen - this._drawPath[i][2];
                            break;
                        case 2:
                            nowX = this._drawPath[i][0] - this._progressLen + this._drawPath[i][2];
                            nowY = this._drawPath[i][1];
                            break;
                        case 3:
                            nowX = this._drawPath[i][0];
                            nowY = this._drawPath[i][1] - this._progressLen + this._drawPath[i][2];
                            break;
                        case 4:
                            nowX = this._drawPath[i][0] + this._progressLen - this._drawPath[i][2];
                            nowY = this._drawPath[i][1];
                            break;
                    }
                    this.graphics.lineTo(nowX, nowY);
                }
                else {
                    this.graphics.lineTo(this._drawPath[i][0], this._drawPath[i][1]);
                }
            }
            this.graphics.lineTo(this._startX, this._startY);
            this.graphics.endFill();
            this._lastRender = t;
        };
        return D5CDdisplayer;
    })(d5power.D5Component);
    d5power.D5CDdisplayer = D5CDdisplayer;
    egret.registerClass(D5CDdisplayer,"d5power.D5CDdisplayer");
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
var d5power;
(function (d5power) {
    var D5FlyBox = (function (_super) {
        __extends(D5FlyBox, _super);
        /**
         * @pararm	w	最大的自动换行宽度
         */
        function D5FlyBox() {
            _super.call(this);
            this._maxWidth = 0;
            this._usedWidth = 0;
            this._usedHeight = 0;
            this._paddingx = 5;
            this._paddingy = 5;
            this._align = 0;
            /**
             * 原始X坐标
             */
            this._zerox = 0;
        }
        var d = __define,c=D5FlyBox;p=c.prototype;
        /**
         * 设置对齐模式
         */
        p.setMode = function (values) {
            this._align = values;
            this.redraw();
        };
        p.setX = function (value) {
            //			super.x = value;
            this._zerox = this.x;
        };
        p.setPaddingx = function (num) {
            if (num === void 0) { num = 0; }
            this._paddingx = num;
            this.redraw();
        };
        p.setPaddingy = function (num) {
            if (num === void 0) { num = 0; }
            this._paddingy = num;
            this.redraw();
        };
        p.getPaddingx = function () {
            return this._paddingx;
        };
        p.getPaddingy = function () {
            return this._paddingy;
        };
        /**
         * 设置最大宽度，当内容超过最大宽度后，即会自动换行
         */
        p.setMaxWidth = function (w) {
            if (w === void 0) { w = 0; }
            this._maxWidth = w;
            this.redraw();
        };
        d(p, "maxWidth"
            ,function () {
                return this._maxWidth;
            }
        );
        d(p, "$maxWidth"
            ,function () {
                return this._maxWidth;
            }
        );
        p.parseToXML = function () {
            var result = "<D5FlyBox name='" + this.name + "' x='" + this.x + "' y='" + this.y + "' maxWidth='" + this._maxWidth + "'/>\n";
            return result;
        };
        p.setEditorMode = function () {
            if (this._editorBG != null)
                return;
            this._editorBG = new egret.Shape();
            this.addChild(this._editorBG);
            this.updateEditorBG();
        };
        p.addChild = function (child) {
            var obj = _super.prototype.addChild.call(this, child);
            obj.addEventListener(egret.Event.RESIZE, this.redraw, this);
            this.redraw();
            return obj;
        };
        p.removeChild = function (child) {
            var obj = _super.prototype.removeChild.call(this, child);
            obj.removeEventListener(egret.Event.RESIZE, this.redraw, this);
            this.redraw();
            return obj;
        };
        p.redraw = function (e) {
            if (e === void 0) { e = null; }
            this._usedWidth = 0;
            this._usedHeight = 0;
            var obj;
            var perMaxHeight = 0;
            for (var i = 0, j = this.numChildren; i < j; i++) {
                obj = this.getChildAt(i);
                if (this._usedWidth + this._paddingx + obj.width > this._maxWidth) {
                    this._usedHeight += perMaxHeight + this._paddingy;
                    perMaxHeight = 0;
                    this._usedWidth = 0;
                }
                obj.x = this._usedWidth;
                obj.y = this._usedHeight;
                perMaxHeight = perMaxHeight < obj.height ? obj.height : perMaxHeight;
                this._usedWidth += obj.width + this._paddingx;
            }
            //			if(this._align==D5FlyBox.CENTER){
            //				super.x = parseInt((this._maxWidth-this._w)>>1)+this._zerox;
            //			}
            this.setSize(this._maxWidth, this._usedHeight + perMaxHeight);
            if (this._editorBG != null)
                this.updateEditorBG();
            this.dispatchEvent(new egret.Event(egret.Event.RESIZE));
        };
        p.updateEditorBG = function () {
            this._editorBG.graphics.clear();
            this._editorBG.graphics.lineStyle(1, 0);
            this._editorBG.graphics.beginFill(0xffffff, .5);
            this._editorBG.graphics.drawRect(0, 0, this._maxWidth, this._usedHeight < 20 ? 20 : this._usedHeight);
            this._editorBG.graphics.endFill();
        };
        D5FlyBox.LEFT = 0;
        D5FlyBox.CENTER = 1;
        return D5FlyBox;
    })(d5power.D5Component);
    d5power.D5FlyBox = D5FlyBox;
    egret.registerClass(D5FlyBox,"d5power.D5FlyBox");
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
var d5power;
(function (d5power) {
    var D5ButtonGroup = (function (_super) {
        __extends(D5ButtonGroup, _super);
        /**
         * 构造函数
         * @param	w	按钮组的容器宽度
         */
        function D5ButtonGroup(w) {
            if (w === void 0) { w = 0; }
            _super.call(this);
            this._itemNum = 0;
            this._bgShapeFlg = 0;
            this._w = w;
            this._hasDefaultSelected = true;
            this.items = [];
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onItemClick, this);
        }
        var d = __define,c=D5ButtonGroup;p=c.prototype;
        p.unsetup = function (e) {
            if (e === void 0) { e = null; }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this._onItemClick, this);
            var length = this.items.length;
            for (var i = 0; i < length; i++) {
                var item = this.items[i];
                if (item.parent)
                    item.parent.removeChild(item);
                item = null;
            }
        };
        /**
         * 按钮数量
         */
        p.setItemNum = function (num) {
            if (num === void 0) { num = 0; }
            this._itemNum = num;
        };
        d(p, "itemNum"
            /**
             * 按钮数量
             */
            ,function () {
                return this.items.length;
            }
        );
        d(p, "hasDefaultSelected"
            /**
             * 是否具备默认选项
             */
            ,function () {
                return this._hasDefaultSelected;
            }
        );
        /**
         * 是否具备默认选项
         */
        p.setHasDefaultSelected = function (value) {
            this._hasDefaultSelected = value;
        };
        /**
         * 向按钮组中增加对象
         */
        p.addItem = function (item) {
            if (item == null) {
                trace("[D5ButtonGroup] 按钮组只能添加按钮对象");
                return;
            }
            this.addChild(item);
            if (this.items.indexOf(item) == -1)
                this.items.push(item);
        };
        p.addChild = function (child) {
            if (!(child instanceof d5power.D5Button)) {
                trace("[D5ButtonGroup] 按钮组只能添加按钮对象");
                return null;
            }
            if (this.items.indexOf(child) == -1)
                this.items.push(child);
            return _super.prototype.addChild.call(this, child);
        };
        /**
         * 从按钮组中移除某对象
         */
        p.removeItem = function (item) {
            this.removeChild(item);
            if (item.hasEventListener(egret.TouchEvent.TOUCH_TAP))
                item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._onItemClick, this);
        };
        /**
         * 点击事件
         */
        p._onItemClick = function (e) {
            var item = (e.target);
            if (item != this._lastSelectedItem) {
                this._lastSelectedItem = item;
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
            }
        };
        p.getSelectedID = function () {
            return this.items.indexOf(this._lastSelectedItem);
        };
        p.setEditorMode = function () {
            this.createBgShape();
        };
        /**
         *此组件默认背景
         */
        p.createBgShape = function (w, h) {
            if (w === void 0) { w = 500; }
            if (h === void 0) { h = 60; }
            this.graphics.beginFill(0x3e3e3e);
            this.graphics.drawRect(0, 0, w, h);
            this.graphics.endFill();
            this._bgShapeFlg = 1;
        };
        p.clearVirtualBackground = function () {
            this.graphics.clear();
            this._bgShapeFlg = 0;
        };
        d(p, "bgShapeFlg"
            ,function () {
                return this._bgShapeFlg;
            }
            ,function (flg) {
                this._bgShapeFlg = flg;
            }
        );
        return D5ButtonGroup;
    })(d5power.D5FlyBox);
    d5power.D5ButtonGroup = D5ButtonGroup;
    egret.registerClass(D5ButtonGroup,"d5power.D5ButtonGroup");
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
var d5power;
(function (d5power) {
    var D5HBox = (function (_super) {
        __extends(D5HBox, _super);
        function D5HBox() {
            _super.call(this);
            this._padding = 5;
            this.autoFly = true;
        }
        var d = __define,c=D5HBox;p=c.prototype;
        p.setEditorMode = function () {
            if (this._editorBG != null)
                return;
            this._editorBG = new egret.Shape();
            this._editorBG.graphics.clear();
            this._editorBG.graphics.lineStyle(1, 0);
            this._editorBG.graphics.beginFill(0xff9900, .5);
            this._editorBG.graphics.drawRect(0, 0, 60, 20);
            this._editorBG.graphics.endFill();
            this.addChild(this._editorBG);
        };
        p.parseToXML = function () {
            var result = "<D5HBox name='" + this.name + "' x='" + this.x + "' y='" + this.y + "'/>\n";
            return result;
        };
        /**
         * Override of addChild to force layout;
         */
        p.addChildAt = function (child, index) {
            if (index === void 0) { index = 0; }
            _super.prototype.addChildAt.call(this, child, index);
            child.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.invalidate();
            return child;
        };
        p.addChild = function (child) {
            _super.prototype.addChild.call(this, child);
            child.addEventListener(egret.Event.RESIZE, this.onResize, this);
            if (this.autoFly)
                this.invalidate();
            return child;
        };
        /**
         * Override of removeChild to force layout;
         */
        p.removeChild = function (child) {
            _super.prototype.removeChild.call(this, child);
            child.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            if (this.autoFly)
                this.invalidate();
            return child;
        };
        /**
         * Override of removeChild to force layout;
         */
        p.removeChildAt = function (index) {
            if (index === void 0) { index = 0; }
            var child = _super.prototype.removeChildAt.call(this, index);
            child.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            if (this.autoFly)
                this.invalidate();
            return child;
        };
        p.onResize = function (event) {
            if (this.autoFly)
                this.invalidate();
        };
        /**
         * Draws the visual ui of the component, in this case, laying out the sub components.
         */
        p.draw = function () {
            this._w = 0;
            this._h = 0;
            var xpos = 0;
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                child.x = xpos;
                xpos += child.width;
                xpos += this._padding;
                this._w += child.width;
                this._h = Math.max(this._h, child.height);
            }
            this._w += this._padding * (this.numChildren - 1);
            this.dispatchEvent(new egret.Event(egret.Event.RESIZE));
        };
        /**
         * Gets / sets the spacing between each sub component.
         */
        p.setPadding = function (s) {
            this._padding = s;
            this.invalidate();
        };
        d(p, "padding"
            ,function () {
                return this._padding;
            }
        );
        return D5HBox;
    })(d5power.D5Component);
    d5power.D5HBox = D5HBox;
    egret.registerClass(D5HBox,"d5power.D5HBox");
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
var d5power;
(function (d5power) {
    var D5List = (function (_super) {
        __extends(D5List, _super);
        function D5List() {
            _super.call(this);
            this._blockW = 0;
            this._blockH = 0;
            this._textColor = 0;
            this._hoverColor = 0;
            this._fontSize = 0;
            this.setupListener();
        }
        var d = __define,c=D5List;p=c.prototype;
        d(p, "className"
            ,function () {
                return 'D5List';
            }
        );
        p.drawBackground = function (background, alpha, line) {
            if (alpha === void 0) { alpha = 1; }
            if (line === void 0) { line = 0; }
            this.graphics.beginFill(background);
            this.graphics.lineStyle(1, line);
            this.graphics.drawRect(0, 0, this._blockW, this.height);
            this.graphics.endFill();
        };
        /**
         * 设置列表样式
         *
         * @param	blockW		每个区块的宽度
         * @param	blockH		每个区块的高度
         * @param	textColor	字体颜色
         * @param	hoverColor	鼠标经过颜色
         * @param	hoverAlpha	鼠标经过透明度
         * @param	textSize	字体大小
         */
        p.setFormat = function (blockW, blockH, textColor, hoverColor, hoverAlpha, textSize) {
            if (hoverAlpha === void 0) { hoverAlpha = 1.0; }
            if (textSize === void 0) { textSize = 12; }
            this._blockW = blockW;
            this._blockH = blockH;
            this._textColor = textColor;
            this._hoverColor = hoverColor;
            this._hoverAlpha = hoverAlpha;
            this._fontSize = textSize;
            this.flushFormat();
        };
        p.setblockW = function (value) {
            if (value === void 0) { value = 0; }
            this._blockW = value;
            this.flushFormat();
        };
        p.unsetup = function (e) {
            if (e === void 0) { e = null; }
            //super.unsetup(e);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
        };
        p.addStuff = function (lable, data) {
            var lab;
            if (lable instanceof egret.DisplayObjectContainer) {
                lab = lable;
                lab.name = data.toString();
            }
            else {
                if (!(typeof (lable) == "string"))
                    lable = lable.toString();
                lab = new d5power.D5HoverText(lable, 0xffffff);
                if (this._blockW > 0) {
                    lab.setTextColor(this._textColor);
                    lab.width = this._blockW;
                    lab.height = this._blockH;
                    lab.setFontSize(this._fontSize);
                    lab.graphics.beginFill(0xff0000);
                    lab.graphics.drawRect(0, 0, this.width, 20);
                    lab.setHover(this._hoverColor, this._hoverAlpha);
                }
                else {
                    //(<D5HoverText><any> lab).autoGrow();
                    lab.setHover(this._hoverColor, this._hoverAlpha);
                }
                lab.setData(data);
                lab.autoGrow();
            }
            this._list.push(lab);
            this._content.addChild(lab);
        };
        p.removeStuffByIndex = function (index) {
            if (index === void 0) { index = 0; }
            if (index >= this._list.length)
                return;
            var lab = this._list[index];
            if (this._content.contains(lab))
                this._content.removeChild(lab);
            this._list.splice(index, 1);
        };
        p.removeAllStuff = function () {
            while (this._list.length)
                this.removeStuffByIndex(0);
            this._selected = null;
        };
        d(p, "height"
            ,function () {
                var p = (this._content).padding;
                return this._list.length > 0 ? this._list.length * (this._list[0].height + p) - p : 0;
            }
        );
        d(p, "value"
            /**
             * 当前选择的值
             */
            ,function () {
                if (this._selected == null)
                    return null;
                if (this._selected instanceof d5power.D5HoverText) {
                    return (this._selected).data;
                }
                else {
                    return this._selected.name;
                }
            }
        );
        d(p, "lable"
            ,function () {
                if (this._selected == null)
                    return '';
                if (this._selected instanceof d5power.D5HoverText) {
                    return (this._selected).text;
                }
                else {
                    return this._selected.toString();
                }
            }
        );
        d(p, "index"
            ,function () {
                return this._list.indexOf(this._selected);
            }
        );
        p.setupListener = function () {
            this._list = [];
            this._content = new d5power.D5VBox();
            this.addChild(this._content);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            //			addEventListener(Event.ADDED_TO_STAGE,onAdd);
        };
        p.onMove = function (e) {
            var t = this.getUnderMouse(e.stageX, e.stageY);
            if (t == null)
                return;
            if (t instanceof d5power.D5HoverText) {
                if (!t.isHover && t != this._selected) {
                    if (this._selected && this._selected instanceof d5power.D5HoverText)
                        (this._selected).unhover();
                    t.hover();
                    this._selected = t;
                }
            }
            else {
            }
        };
        p.onClick = function (e) {
            var t = this.getUnderMouse(e.stageX, e.stageY);
            if (t) {
                this._selected = t;
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
            }
        };
        p.onAdd = function (e) {
            this._stage = this.stage;
        };
        p.onStageClick = function (e) {
            if (this.parent && this.stage) {
                if (e.target == this)
                    return;
                this.parent.removeChild(this);
                if (this.stage)
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStageClick, this);
            }
        };
        p.getUnderMouse = function (px, py) {
            if (py === void 0) { py = 0; }
            var length = this._list.length;
            for (var i = 0; i < length; i++) {
                var t = this._list[i];
                if (t.hitTestPoint(px, py)) {
                    return t;
                }
            }
            return null;
        };
        p.flushFormat = function () {
            var length = this._list.length;
            for (var i = 0; i < length; i++) {
                var t = this._list[i];
                t.setTextColor(this._textColor);
                t.width = this._blockW;
                t.height = this._blockH == 0 ? 20 : this._blockH;
                //trace("RUN",_hoverColor,_hoverAlpha);
                t.setHover(this._hoverColor, this._hoverAlpha);
            }
        };
        return D5List;
    })(d5power.D5Component);
    d5power.D5List = D5List;
    egret.registerClass(D5List,"d5power.D5List");
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
var d5power;
(function (d5power) {
    var D5MirrorBox = (function (_super) {
        __extends(D5MirrorBox, _super);
        function D5MirrorBox() {
            _super.call(this);
        }
        var d = __define,c=D5MirrorBox;p=c.prototype;
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            var data = d5power.D5UIResourceData.getData(name);
            if (data == null) {
                trace("[D5MirrorBox]No Resource" + name);
                return;
            }
            if (this.lt == null)
                this.lt = new egret.Bitmap();
            this.lt.texture = data.getResource(0);
            if (this.t == null)
                this.t = new egret.Bitmap();
            this.t.texture = data.getResource(1);
            this.t.fillMode = egret.BitmapFillMode.REPEAT;
            if (this.rt == null)
                this.rt = new egret.Bitmap();
            this.rt.texture = data.getResource(0);
            this.rt.scaleX = -1;
            if (this.l == null)
                this.l = new egret.Bitmap();
            this.l.texture = data.getResource(2);
            this.l.fillMode = egret.BitmapFillMode.REPEAT;
            if (this.m == null)
                this.m = new egret.Bitmap();
            this.m.texture = data.getResource(3);
            this.m.fillMode = egret.BitmapFillMode.REPEAT;
            if (this.r == null)
                this.r = new egret.Bitmap();
            this.r.texture = data.getResource(2);
            this.r.scaleX = -1;
            this.r.fillMode = egret.BitmapFillMode.REPEAT;
            if (this.lb == null)
                this.lb = new egret.Bitmap();
            this.lb.texture = data.getResource(0);
            this.lb.scaleY = -1;
            if (this.b == null)
                this.b = new egret.Bitmap();
            this.b.texture = data.getResource(1);
            this.b.scaleY = -1;
            this.b.fillMode = egret.BitmapFillMode.REPEAT;
            if (this.rb == null)
                this.rb = new egret.Bitmap();
            this.rb.texture = data.getResource(0);
            this.rb.scaleX = this.rb.scaleY = -1;
            this.rb.fillMode = egret.BitmapFillMode.REPEAT;
            this.invalidate();
        };
        p.draw = function () {
            if (this.l == null) {
            }
            else {
                if (!this.contains(this.l)) {
                    this.addChildAt(this.lt, 0);
                    this.addChildAt(this.t, 0);
                    this.addChildAt(this.rt, 0);
                    this.addChildAt(this.l, 0);
                    this.addChildAt(this.m, 0);
                    this.addChildAt(this.r, 0);
                    this.addChildAt(this.lb, 0);
                    this.addChildAt(this.b, 0);
                    this.addChildAt(this.rb, 0);
                }
                this.t.x = this.m.x = this.b.x = this.lt.width;
                this.rt.x = this.r.x = this.rb.x = this._w;
                this.l.y = this.m.y = this.r.y = this.lt.height;
                this.lb.y = this.b.y = this.rb.y = this._h;
                this.m.width = this.t.width = this.b.width = this._w - this.lt.width * 2;
                this.m.height = this.l.height = this.r.height = this._h - this.lt.height * 2;
            }
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            _super.prototype.draw.call(this);
        };
        d(p, "mBitmap"
            ,function () {
                return this.m;
            }
        );
        return D5MirrorBox;
    })(d5power.D5Component);
    d5power.D5MirrorBox = D5MirrorBox;
    egret.registerClass(D5MirrorBox,"d5power.D5MirrorBox");
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
var d5power;
(function (d5power) {
    var D5ImageBox = (function (_super) {
        __extends(D5ImageBox, _super);
        function D5ImageBox() {
            _super.call(this);
            /**
             * 是否显示数量
             */
            this._showNum = false;
        }
        var d = __define,c=D5ImageBox;p=c.prototype;
        p.addParticle = function () {
            //外部加载icon，url为全路径，如：resource/..
            RES.getResByUrl(this._url, this.onGroupComplete, this);
        };
        p.onGroupComplete = function (data) {
            if (this._logo == null) {
                this._logo = new egret.Bitmap();
            }
            this._logo.texture = data;
            this.addChildAt(this._logo, 0);
            this._logo.scaleX = this._w / this._logo.width;
            this._logo.scaleY = this._h / this._logo.height;
            this._logo.fillMode = egret.BitmapFillMode.REPEAT;
            this._logo.x = 0;
            this._logo.y = 0;
        };
        /**
         * 设置物品图片
         */
        p.setLogo = function (url) {
            if (this.spr == null) {
                this.spr = new egret.Sprite();
                this.addChild(this.spr);
            }
            for (var i = 0; i < this.spr.numChildren; i++) {
                var obj = this.spr.getChildAt(i);
                if (obj.parent)
                    obj.parent.removeChild(obj);
                obj = null;
            }
            if (url != "") {
                this._url = url;
                this.addParticle();
            }
        };
        p.removeLogo = function () {
            if (this._logo && this.contains(this._logo)) {
                this.removeChild(this._logo);
            }
        };
        p.over = function (evt) {
            this.addParticle();
        };
        d(p, "url",undefined
            /**
             * 设置URL，本功能仅用来保存URL，不会加载地址
             * 如需要加载，请使用logo属性，或者通过logoData直接设置位图数据
             */
            ,function (v) {
                this._url = v;
            }
        );
        /**
         * 是否显示数量（例如背包的右下角数据）
         */
        p.showNum = function (b) {
            this._showNum = b;
            if (!this._showNum && this.numShower != null && this.contains(this.numShower)) {
                this.removeChild(this.numShower);
                this.numShower = null;
            }
            else if (this._showNum && this.numShower == null) {
                this.buildNumShower();
            }
        };
        p.buildNumShower = function () {
            if (this.numShower == null) {
                this.numShower = new d5power.D5Text('0', 0xd4cc75);
                this.numShower.setFontBorder(0x000000);
                this.numShower.setTextAlign(d5power.D5Text.RIGHT);
                this.numShower.setSize(20, 18);
            }
            this.numShower.x = this._w - this.numShower.width;
            this.numShower.y = this._h - this.numShower.height;
            this.addChild(this.numShower);
        };
        /**
         * 设置数量
         */
        p.setNum = function (v) {
            this._itemNum = v;
            if (this.numShower != null)
                this.numShower.setText(v.toString());
        };
        d(p, "num"
            /**
             * 获取数量
             */
            ,function () {
                return this._itemNum;
            }
        );
        d(p, "id"
            ,function () {
                return this._id;
            }
        );
        p.setId = function (value) {
            this._id = value;
        };
        D5ImageBox._resourceLib = {};
        return D5ImageBox;
    })(d5power.D5MirrorBox);
    d5power.D5ImageBox = D5ImageBox;
    egret.registerClass(D5ImageBox,"d5power.D5ImageBox");
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
var d5power;
(function (d5power) {
    var D5MirrorLoop = (function (_super) {
        __extends(D5MirrorLoop, _super);
        function D5MirrorLoop() {
            _super.call(this);
        }
        var d = __define,c=D5MirrorLoop;p=c.prototype;
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            var data = d5power.D5UIResourceData.getData(name);
            if (data == null) {
                trace("[D5MirrorLoop]No Resource" + name);
                return;
            }
            if (d5power.D5UIResourceData._typeLoop == 0) {
                if (this.front == null)
                    this.front = new egret.Bitmap();
                this.front.texture = data.getResource(0);
                if (this.enter == null)
                    this.enter = new egret.Bitmap();
                this.enter.texture = data.getResource(1);
                this.enter.fillMode = egret.BitmapFillMode.REPEAT;
                if (this.after == null)
                    this.after = new egret.Bitmap();
                this.after.texture = data.getResource(0);
                this.after.scaleX = -1;
            }
            else {
                if (this.front == null)
                    this.front = new egret.Bitmap();
                this.front.texture = data.getResource(0);
                if (this.enter == null)
                    this.enter = new egret.Bitmap();
                this.enter.texture = data.getResource(1);
                this.enter.fillMode = egret.BitmapFillMode.REPEAT;
                if (this.after == null)
                    this.after = new egret.Bitmap();
                this.after.texture = data.getResource(0);
                this.after.scaleY = -1;
            }
            this.invalidate();
        };
        p.draw = function () {
            if (this.front == null) {
            }
            else {
                if (!this.contains(this.front)) {
                    this.addChildAt(this.front, 0);
                    this.addChildAt(this.enter, 0);
                    this.addChildAt(this.after, 0);
                }
            }
            if (d5power.D5UIResourceData._typeLoop == 0) {
                this.enter.x = this.front.width;
                this.enter.width = this._w - this.front.width * 2;
                this.after.x = this._w;
            }
            else {
                this.enter.y = this.front.height;
                this.enter.height = this._h - this.front.height * 2;
                this.after.y = this._h;
            }
            _super.prototype.draw.call(this);
        };
        return D5MirrorLoop;
    })(d5power.D5Component);
    d5power.D5MirrorLoop = D5MirrorLoop;
    egret.registerClass(D5MirrorLoop,"d5power.D5MirrorLoop");
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
var d5power;
(function (d5power) {
    var D5RadioBtn = (function (_super) {
        __extends(D5RadioBtn, _super);
        function D5RadioBtn() {
            _super.call(this);
            this._selected = false;
        }
        var d = __define,c=D5RadioBtn;p=c.prototype;
        p.setLable = function (lab) {
            if (this._lable == null) {
                this._lable = new d5power.D5Text();
                this._lable.setFontSize(d5power.D5Style.default_btn_lable_size);
                this._lable.setFontBold(d5power.D5Style.default_btn_lable_bold);
                if (d5power.D5Style.default_btn_lable_border != -1)
                    this._lable.setFontBorder(d5power.D5Style.default_btn_lable_border);
                this.addChild(this._lable);
            }
            this._lable.setText(lab);
        };
        p.autoLableSize = function () {
            if (this._lable == null || this.a == null)
                return;
            trace(this.a.height, this._lable.height, "左左右右");
            //            this._lable.autoGrow();
            this._lable.x = this.a.width;
            this._lable.y = (this.a.height - this._lable.height) >> 1;
        };
        p.setSelected = function (value) {
            this._selected = value;
            this.updateFace();
        };
        d(p, "selected"
            ,function () {
                return this._selected;
            }
        );
        p.updateFace = function () {
            if (this._selected) {
                this.a.texture = this.data.getResource(2);
                this.invalidate();
            }
            else {
                this.a.texture = this.data.getResource(0);
                this.invalidate();
            }
        };
        p.enabled = function (b) {
            if (b) {
                this.a.texture = this.data.getResource(0);
            }
            else {
                this.a.texture = this.data.getResource(3);
            }
            this.invalidate();
        };
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            this.data = d5power.D5UIResourceData.getData(name);
            if (this.data == null) {
                trace("[D5RadioBtn]No Resource" + name);
                return;
            }
            this.a = new egret.Bitmap();
            this.a.texture = this.data.getResource(0);
            this.touchEnabled = true;
            this.enabled(true);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnDown, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.btnUp, this);
            this.invalidate();
        };
        p.btnDown = function (evt) {
            this.a.texture = this.data.getResource(2);
            this.invalidate();
        };
        p.btnUp = function (evt) {
            this.setSelected(!this._selected);
        };
        p.draw = function () {
            if (this.a == null) {
            }
            else {
                if (!this.contains(this.a)) {
                    this.addChildAt(this.a, 0);
                }
            }
            _super.prototype.draw.call(this);
            if (this._lable != null) {
                this.addChild(this._lable);
                this.autoLableSize();
            }
        };
        return D5RadioBtn;
    })(d5power.D5Component);
    d5power.D5RadioBtn = D5RadioBtn;
    egret.registerClass(D5RadioBtn,"d5power.D5RadioBtn");
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
/**
 * Created by Administrator on 2015/8/28.
 */
var d5power;
(function (d5power) {
    /**
     *
     * @author
     *
     */
    var D5Shape = (function (_super) {
        __extends(D5Shape, _super);
        function D5Shape() {
            _super.call(this);
            this._workMode = 0;
            this._tickNess = 0;
            this._offX = 0;
            this._offY = 0;
            this._drawWidth = 0;
            this._drawHeight = 0;
            this._radius = 0;
            this._shape = new egret.Shape();
            this.addChild(this._shape);
        }
        var d = __define,c=D5Shape;p=c.prototype;
        p.draw = function () {
            if (this._shape)
                this._shape.graphics.clear();
            switch (this._workMode) {
                case D5Shape.RECT:
                    this._shape.graphics.beginFill(this._fillColor);
                    if (this._tickNess > 0) {
                        this._shape.graphics.lineStyle(this._tickNess, this._color);
                    }
                    this._shape.graphics.drawRect(this._offX, this._offY, this._drawWidth, this._drawHeight);
                    this._shape.graphics.endFill();
                    break;
                case D5Shape.CIRCLE:
                    this._shape.graphics.beginFill(this._fillColor);
                    if (this._tickNess > 0) {
                        this._shape.graphics.lineStyle(this._tickNess, this._color);
                    }
                    this._shape.graphics.drawCircle(this._offX, this._offY, this._radius);
                    this._shape.graphics.endFill();
                    break;
            }
            _super.prototype.draw.call(this);
        };
        d(p, "fillColor"
            /**
             *填充颜色
             */
            ,function () {
                return this._fillColor;
            }
        );
        /**
         * @private
         */
        p.setFillColor = function (value) {
            if (this._fillColor == value)
                return;
            this._fillColor = value;
            this.invalidate();
        };
        d(p, "tickNess"
            /**
             * 线条粗细，0为不显示线条
             */
            ,function () {
                return this._tickNess;
            }
        );
        /**
         * @private
         */
        p.setTickNess = function (value) {
            if (this._tickNess == value)
                return;
            this._tickNess = value;
            this.invalidate();
        };
        d(p, "color"
            /**
             * 线条颜色
             */
            ,function () {
                return this._color;
            }
        );
        /**
         * @private
         */
        p.setColor = function (value) {
            if (this._color == value)
                return;
            this._color = value;
            this.invalidate();
        };
        d(p, "offX"
            /**
             * 偏移坐标x,y
             */
            ,function () {
                return this._offX;
            }
        );
        /**
         * @private
         */
        p.setOffX = function (value) {
            if (this._offX == value)
                return;
            this._offX = value;
            this.invalidate();
        };
        d(p, "offY"
            /**
             * 偏移坐标x,y
             */
            ,function () {
                return this._offY;
            }
        );
        /**
         * @private
         */
        p.setOffY = function (value) {
            if (this._offY == value)
                return;
            this._offY = value;
            this.invalidate();
        };
        d(p, "drawWidth"
            ,function () {
                return this._drawWidth;
            }
        );
        p.setDrawWidth = function (value) {
            if (this._drawWidth == value)
                return;
            this._drawWidth = value;
            this.invalidate();
        };
        d(p, "drawHeight"
            ,function () {
                return this._drawHeight;
            }
        );
        p.setDrawHeight = function (value) {
            if (this._drawHeight == value)
                return;
            this._drawHeight = value;
            this.invalidate();
        };
        d(p, "radius"
            ,function () {
                return this._radius;
            }
        );
        p.setRadius = function (value) {
            if (this._radius == value)
                return;
            this._radius = value;
            this.invalidate();
        };
        d(p, "workMode"
            ,function () {
                return this._workMode;
            }
        );
        p.setWorkMode = function (value) {
            if (this._workMode == value)
                return;
            this._workMode = value;
            this.invalidate();
        };
        /**
         * 工作模式矩形
         */
        D5Shape.RECT = 0;
        /**
         * 工作模式圆
         */
        D5Shape.CIRCLE = 1;
        return D5Shape;
    })(d5power.D5Component);
    d5power.D5Shape = D5Shape;
    egret.registerClass(D5Shape,"d5power.D5Shape");
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
var d5power;
(function (d5power) {
    var D5SliderButton = (function (_super) {
        __extends(D5SliderButton, _super);
        function D5SliderButton() {
            _super.call(this);
            this._arrCell = [];
            this._dataArr = [];
        }
        var d = __define,c=D5SliderButton;p=c.prototype;
        p.setDataName = function (arr) {
            this._dataArr = arr;
        };
        d(p, "dataName"
            ,function () {
                return this._dataArr;
            }
        );
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            this.data = d5power.D5UIResourceData.getData(name);
            if (this.data == null) {
                trace("No Resource");
                return;
            }
            this.front = new egret.Bitmap();
            this.front.texture = this.data.getResource(0);
            this.enter = new egret.Bitmap();
            this.enter.texture = this.data.getResource(1);
            this.enter.fillMode = egret.BitmapFillMode.REPEAT;
            this.after = new egret.Bitmap();
            this.after.texture = this.data.getResource(0);
            this.after.scaleX = -1;
            this.button = new egret.Bitmap();
            this.button.texture = this.data.getResource(2);
            this.touchEnabled = this.button.touchEnabled = true;
            this.button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnDown, this);
            this.button.addEventListener(egret.TouchEvent.TOUCH_END, this.btnUp, this);
            this.invalidate();
        };
        p.setTable = function (info) {
            if (this.text == null) {
                this.text = new d5power.D5Text();
                this.text.setWidth(this._w - this.button.width);
                this.text.setTextColor(0xff0000);
                this.text.setText(info);
            }
            else {
                this.text.setTextColor(0xff0000);
                this.text.setText(info);
            }
        };
        p.btnDown = function (evt) {
            this.button.texture = this.data.getResource(4);
            this.invalidate();
            if (this.box == null) {
                this.box = new d5power.D5MirrorBox();
                this.box.setSkin('box0');
                this.box.x = 0;
                this.box.y = this.button.height;
                this.box.setSize(this._w, 100);
                this.addChild(this.box);
                this.vBox = new d5power.D5VBox();
                this.vBox.x = 5;
                this.vBox.y = 10;
            }
            else {
                this.box.visible = !this.box.visible;
            }
            if (this.box.visible) {
                this.showList(this._dataArr);
            }
        };
        p.showList = function (arr) {
            this.cleanCell();
            for (var i = 0; i < arr.length; i++) {
                this.cell = new d5power.ListCell();
                this.cell.showCell(this._w, arr[i]);
                this._arrCell.push(this.cell);
                this.vBox.addChild(this.cell);
                this.cell.setBtnID(i);
                this.cell.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeName, this);
            }
            this.box.setSize(this._w, this._dataArr.length * 25);
        };
        p.changeName = function (evt) {
            this.box.visible = !this.box.visible;
            var id = evt.currentTarget.btnID;
            this.setTable(this._dataArr[id]);
        };
        p.cleanCell = function () {
            if (this._arrCell == null || this._arrCell.length == 0)
                return;
            for (var j = 0; j < this._arrCell.length; j++) {
                var obj = this._arrCell[j];
                obj.dispose();
                if (obj.parent)
                    obj.parent.removeChild(obj);
                obj = null;
            }
            this._arrCell.splice(0, this._arrCell.length);
        };
        p.btnUp = function (evt) {
            this.button.texture = this.data.getResource(2);
            this.invalidate();
        };
        p.draw = function () {
            if (this.front == null) {
            }
            else {
                if (!this.contains(this.front)) {
                    this.addChild(this.front);
                    this.addChild(this.enter);
                    this.addChild(this.after);
                    this.addChild(this.button);
                }
            }
            this.enter.x = this.front.width;
            this.enter.width = this._w - this.front.width * 2;
            this.after.x = this._w - this.front.width;
            this.button.x = this._w - this.button.width;
            _super.prototype.draw.call(this);
            this.addChild(this.text);
            this.box.addChild(this.vBox);
        };
        return D5SliderButton;
    })(d5power.D5Component);
    d5power.D5SliderButton = D5SliderButton;
    egret.registerClass(D5SliderButton,"d5power.D5SliderButton");
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
var d5power;
(function (d5power) {
    var D5Style = (function () {
        function D5Style() {
        }
        var d = __define,c=D5Style;p=c.prototype;
        /**
         * 默认Lable颜色
         */
        D5Style.default_lable_color = 0xffffff;
        /**
         * 默认按钮文字描边颜色
         */
        D5Style.default_btn_lable_border = -1;
        /**
         * 默认按钮文字大小
         */
        D5Style.default_btn_lable_size = 18;
        /**
         * 默认按钮文字是否加粗
         */
        D5Style.default_btn_lable_bold = false;
        /**
         * UI控件是否自动释放
         */
        D5Style.autoRelease = false;
        return D5Style;
    })();
    d5power.D5Style = D5Style;
    egret.registerClass(D5Style,"d5power.D5Style");
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
var d5power;
(function (d5power) {
    var D5Swf = (function (_super) {
        __extends(D5Swf, _super);
        function D5Swf() {
            _super.call(this);
            this._loadID = 0;
            this._playFrame = 0;
            this._monitor = new egret.Bitmap();
            this._zoom = 1;
        }
        var d = __define,c=D5Swf;p=c.prototype;
        p.setSrc = function (src) {
            this._src = src;
            this.addParticle();
        };
        d(p, "loadID"
            ,function () {
                return this._loadID;
            }
        );
        p.setEditorMode = function () {
            if (!this._drager) {
                this._drager = new egret.Shape();
                this._drager.graphics.beginFill(Math.random() * 0xffffff, .5);
                this._drager.graphics.drawRect(-20, -20, 40, 40);
                this._drager.graphics.endFill();
            }
            this.addChild(this._drager);
        };
        p.addParticle = function () {
            this._loadID++;
            d5power.D5SpriteSheet.getInstance(this._src + '.png', this);
            //RES.getResByUrl(this._src+'.png', this.onTextureComplete, this);
        };
        p.onSpriteSheepReady = function (data) {
            if (this._spriteSheet)
                this._spriteSheet.unlink();
            this._spriteSheet = data;
            if (!this.contains(this._monitor))
                this.addChild(this._monitor);
            this.onLoadComplate();
            this.addEventListener(egret.Event.ENTER_FRAME, this.runAction, this);
        };
        p.runAction = function (e) {
            if (egret.getTimer() - this._lastRender < this._spriteSheet.renderTime)
                return;
            this._lastRender = egret.getTimer();
            var direction = 0;
            this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
            if (this._spriteSheet.uvList) {
                this._monitor.x = this._spriteSheet.uvList[direction * this._spriteSheet.totalFrame + this._playFrame].offX;
                this._monitor.y = this._spriteSheet.uvList[direction * this._spriteSheet.totalFrame + this._playFrame].offY;
            }
            else {
                this._monitor.x = this._spriteSheet.gX;
                this._monitor.y = this._spriteSheet.gY;
            }
            this._playFrame++;
            if (this._playFrame >= this._spriteSheet.totalFrame)
                this._playFrame = 0;
        };
        p.setZoom = function (value) {
            if (this._zoom == value)
                return;
            this._zoom = value;
            this.invalidate();
        };
        p.onLoadComplate = function () {
            //if(this._w==0){
            //	this._w = data.width;
            //	this._h = data.height;
            //}
            if (this._drager)
                this.addChild(this._drager);
            this.invalidate();
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        };
        p.draw = function () {
            if (this._zoom != 1)
                this.scaleX = this.scaleY = this._zoom;
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
        };
        return D5Swf;
    })(d5power.D5Component);
    d5power.D5Swf = D5Swf;
    egret.registerClass(D5Swf,"d5power.D5Swf",["d5power.ISpriteSheetWaiter"]);
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
var d5power;
(function (d5power) {
    var D5Text = (function (_super) {
        __extends(D5Text, _super);
        //        /**
        //         * 设置对齐
        //         */
        //        private _alignType:number = 0;
        /**
         *
         * @param	_text		字符内容
         * @param	fontcolor	字体颜色
         * @param	bgcolor		文本框背景颜色
         * @param	border		文本框边线颜色
         */
        function D5Text(_text, fontcolor, bgcolor, border, size) {
            if (_text === void 0) { _text = ''; }
            if (fontcolor === void 0) { fontcolor = -1; }
            if (bgcolor === void 0) { bgcolor = -1; }
            if (border === void 0) { border = -1; }
            if (size === void 0) { size = 12; }
            _super.call(this);
            /**
             * 背景色
             */
            this._bgColor = -1;
            /**
             * 亮色边
             */
            this._lightBorder = -1;
            /**
             * 暗色边
             */
            this._darkBorder = -1;
            /**
             * 当前的描边颜色
             */
            this._filterColor = -1;
            /**
             * 最大宽度
             */
            this._maxWidth = 200;
            this._textField = new egret.TextField();
            this._textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            this._textField.textAlign = egret.HorizontalAlign.LEFT; //egret.VerticalAlign.MIDDLE;
            if (fontcolor >= 0)
                this._textField.textColor = fontcolor;
            if (bgcolor >= 0)
                this.setBgColor(bgcolor);
            if (border >= 0)
                this.setFontBorder(border);
            this._textField.lineSpacing = 4;
            this.setFontSize(size);
            if (_text != '') {
                this.setText(_text);
            }
            this.addChild(this._textField);
        }
        var d = __define,c=D5Text;p=c.prototype;
        p.update = function () {
            this.setText((d5power.D5Component._pro_binding_source.getPro(this._binding)));
        };
        p.invalidateSize = function () {
            this._w = this._maxWidth == 0 || this._textField.multiline == false ? this._textField.textWidth + 6 : this._maxWidth;
            this._h = this._textField.textHeight + 10;
            //            console.log("[d5text]"+this._textField.textHeight+"|"+this._textField.height);
            this.setWidth(this._w);
            this.setHeight(this._h);
        };
        /**
         * 设置文本内容的描边
         * @param	color	描边的值，-1为删除描边
         */
        p.setVerticalAlign = function (value) {
            if (value === void 0) { value = 0; }
            switch (value) {
                case D5Text.TOP:
                    this._textField.verticalAlign = egret.VerticalAlign.TOP;
                    break;
                case D5Text.MIDDLE:
                    this._textField.verticalAlign = egret.VerticalAlign.MIDDLE;
                    break;
                case D5Text.BOTTOM:
                    this._textField.verticalAlign = egret.VerticalAlign.BOTTOM;
                    break;
            }
        };
        /**
         * 设置文本内容的描边
         * @param	color	描边的值，-1为删除描边
         */
        p.setFontBorder = function (color) {
            if (color === void 0) { color = 0; }
            if (color < 0) {
                this._textField.stroke = 0;
            }
            else {
                this._textField.stroke = 1;
                this._textField.strokeColor = color;
            }
            this._filterColor = color;
        };
        d(p, "fontBorder"
            ,function () {
                return this._filterColor;
            }
        );
        /**
         * 传入内容文本,兼容旧版。建议直接使用text属性
         */
        p.setText = function (t) {
            if (this._textField == null) {
                return;
            }
            this._textField.text = t;
        };
        d(p, "text"
            ,function () {
                return this._textField.text;
            }
            ,function (t) {
                if (this._textField == null) {
                    return;
                }
                this._textField.text = t;
            }
        );
        d(p, "textField"
            ,function () {
                return this._textField;
            }
        );
        /**
        *传入html文本
        */
        p.setHtmlText = function (html) {
            if (this._textField == null)
                return;
            this._textField.textFlow = (new egret.HtmlTextParser).parser(html);
        };
        /**
         * 设置背景颜色
         */
        p.setBgColor = function (v) {
            if (v === void 0) { v = 0; }
            this._bgColor = v;
            this.setSize(this._w, this._h);
        };
        d(p, "bgColor"
            ,function () {
                return this._bgColor;
            }
        );
        /**
         * 设置边框颜色
         * @param	lt	LeftTop，左侧和顶部的线条颜色
         * @param	rb	RightBottom,右侧和底部的线条颜色
         */
        p.setLtBorder = function (v) {
            if (v === void 0) { v = 0; }
            this._lightBorder = v;
            this.setSize(this._w, this._h);
        };
        d(p, "ltBorder"
            ,function () {
                return this._lightBorder;
            }
        );
        p.setRbBorder = function (v) {
            if (v === void 0) { v = 0; }
            this._darkBorder = v;
            this.setSize(this._w, this._h);
        };
        d(p, "rbBorder"
            ,function () {
                return this._darkBorder;
            }
        );
        /**
         * 是否以密码的状态显示文本
         */
        p.setIsPassword = function (v) {
            this._textField.displayAsPassword = v;
        };
        d(p, "isPassword"
            ,function () {
                return this._textField.displayAsPassword;
            }
        );
        d(p, "textID"
            /**
             *文本id,用此id去语言包取对应的值
             */
            ,function () {
                return this._textID;
            }
        );
        p.setTextID = function (value) {
            this._textID = value;
        };
        /**
         *设置宽高
         */
        p.setWidth = function (value) {
            this._w = value;
            this._textField.width = value > this._maxWidth ? this._maxWidth : value;
            this.width = value;
        };
        p.setHeight = function (value) {
            this._h = value;
            this._textField.height = value;
            this._textField.$setHeight(value);
            this.height = value;
        };
        /**
         *设置对齐
         */
        p.setTextAlign = function (value) {
            switch (value) {
                case D5Text.LEFT:
                    this._textField.textAlign = egret.HorizontalAlign.LEFT;
                    break;
                case D5Text.CENTER:
                    this._textField.textAlign = egret.HorizontalAlign.CENTER;
                    break;
                case D5Text.RIGHT:
                    this._textField.textAlign = egret.HorizontalAlign.RIGHT;
                    break;
            }
        };
        /**
         *背景宽高
         */
        p.setSize = function (w, h) {
            if (h === void 0) { h = 0; }
            this._w = w;
            this._h = h;
            this._textField.height = h;
            this._textField.width = w;
            this.graphics.clear();
            if (this._bgColor != -1) {
                this.graphics.beginFill(this._bgColor);
            }
            if (this._lightBorder != -1) {
                if (this._darkBorder == -1)
                    this._darkBorder = this._lightBorder;
                this.graphics.lineStyle(1, this._lightBorder);
                this.graphics.lineTo(this._w, 0);
                this.graphics.lineStyle(1, this._darkBorder);
                this.graphics.lineTo(this._w, this._h);
                this.graphics.lineTo(0, this._h);
                this.graphics.lineStyle(1, this._lightBorder);
                this.graphics.lineTo(0, 0);
                this.graphics.endFill();
            }
            else if (this._bgColor != -1) {
                this.graphics.drawRect(0, 0, this._w, this._h);
            }
            this.graphics.endFill();
        };
        /**
        * 自动调整宽度和高度
        */
        p.autoGrow = function () {
            if (this._textField == null)
                return;
            this._w = this._maxWidth == 0 || this._textField.multiline == false ? this._textField.textWidth + 6 : this._maxWidth;
            this._h = this._textField.textHeight + 10;
            this.setSize(this._w, this._h);
            //            console.log("[d5text2]"+this._textField.textHeight+"|"+this._textField.height);
            //            this.invalidate();
        };
        /**
         * 是否为多行
         */
        p.setWrapFlg = function (flg) {
            if (flg === void 0) { flg = 0; }
            var b;
            if (flg == 1)
                b = true;
            else if (flg == 0)
                b = false;
            this._textField.multiline = b;
        };
        d(p, "wrapFlg"
            ,function () {
                return this._textField.multiline == true ? 1 : 0;
            }
        );
        /**
         * 将文本框锁定在某背景元素上,使文本框的宽\高\坐标与目标完全一致
         * @param	d
         */
        p.lockTo = function (d, changeHeight, padding) {
            if (changeHeight === void 0) { changeHeight = false; }
            if (padding === void 0) { padding = 0; }
            this.width = d.width - padding * 2;
            if (changeHeight) {
                this.height = d.height - padding * 2;
            }
            this.x = d.x + padding;
            this.y = d.y + padding;
        };
        /**
         * 设置字体大小
         */
        p.setFontSize = function (size) {
            if (size === void 0) { size = 0; }
            this._textField.size = size;
        };
        d(p, "fontSize"
            ,function () {
                return this._textField.size;
            }
        );
        /**
         * 设置字体加粗
         */
        p.setFontBold = function (b) {
            this._textField.bold = b;
        };
        d(p, "fontBold"
            ,function () {
                return this._textField.bold;
            }
        );
        /**
         * 设置文本的输入类型（是否允许输入）1,允许输入；0，不允许
         */
        p.setType = function (u) {
            if (u === void 0) { u = 0; }
            if (u == 1) {
                this._textField.type = egret.TextFieldType.INPUT;
            }
            else {
                this._textField.type = egret.TextFieldType.DYNAMIC;
            }
        };
        d(p, "type"
            ,function () {
                return this._textField.type == egret.TextFieldType.INPUT ? 1 : 0;
            }
        );
        d(p, "textWidth"
            /**
             * 文本内容宽高
             */
            ,function () {
                return this._textField.textWidth;
            }
        );
        d(p, "textHeight"
            ,function () {
                return this._textField.textHeight;
            }
        );
        /**
         * 设置文本颜色
         */
        p.setTextColor = function (u) {
            if (u === void 0) { u = 0; }
            this._textField.textColor = u;
        };
        d(p, "textColor"
            ,function () {
                return this._textField.textColor;
            }
        );
        p.clear = function () {
        };
        D5Text.LEFT = 0;
        D5Text.CENTER = 1;
        D5Text.RIGHT = 2;
        D5Text.TOP = 0;
        D5Text.MIDDLE = 1;
        D5Text.BOTTOM = 2;
        return D5Text;
    })(d5power.D5Component);
    d5power.D5Text = D5Text;
    egret.registerClass(D5Text,"d5power.D5Text",["d5power.IProBindingSupport"]);
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
var d5power;
(function (d5power) {
    var D5HoverText = (function (_super) {
        __extends(D5HoverText, _super);
        function D5HoverText(_text, fontcolor, bgcolor, border, size) {
            if (_text === void 0) { _text = ''; }
            if (fontcolor === void 0) { fontcolor = -1; }
            if (bgcolor === void 0) { bgcolor = -1; }
            if (border === void 0) { border = -1; }
            if (size === void 0) { size = 12; }
            _super.call(this, _text, fontcolor, bgcolor, border, size);
            /**
             * 鼠标经过颜色
             */
            this._hoverColor = 0;
            this.touchChildren = true;
            this.touchEnabled = true;
        }
        var d = __define,c=D5HoverText;p=c.prototype;
        d(p, "className"
            ,function () {
                return 'D5HoverText';
            }
        );
        p.init = function (e) {
            if (e === void 0) { e = null; }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        };
        p.onRemove = function (e) {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        };
        /**
         * 设置状态
         */
        p.setHover = function (colorV, alphaV) {
            this._hover = true;
            this._hoverColor = colorV;
            this._hoverAlpha = alphaV;
            this.unhover();
            if (!this.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
                this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            }
        };
        p.hover = function () {
            if (!this._hover)
                return;
            this.graphics.clear();
            this.graphics.beginFill(this._hoverColor, this._hoverAlpha);
            this.graphics.drawRect(0, 0, this._textField.width, this._textField.height);
            this.graphics.endFill();
            this._isHover = true;
        };
        p.unhover = function () {
            if (!this._hover)
                return;
            this.graphics.clear();
            this.graphics.beginFill(this._hoverColor, 0);
            this.graphics.drawRect(0, 0, this._textField.width, this._textField.height);
            this.graphics.endFill();
            this._isHover = false;
        };
        d(p, "isHover"
            ,function () {
                return this._isHover;
            }
        );
        p.onMouse = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.hover();
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.unhover();
                    break;
            }
        };
        p.setData = function (data) {
            this._data = data;
        };
        d(p, "data"
            ,function () {
                return this._data;
            }
        );
        return D5HoverText;
    })(d5power.D5Text);
    d5power.D5HoverText = D5HoverText;
    egret.registerClass(D5HoverText,"d5power.D5HoverText");
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
/**
 * Created by Administrator on 2015/9/1.
 */
var d5power;
(function (d5power) {
    var D5UILoader = (function (_super) {
        __extends(D5UILoader, _super);
        function D5UILoader() {
            _super.call(this);
            this._realWidth = 0;
            this._realHeight = 0;
            this._flyX = 0;
            this._flyY = 0;
        }
        var d = __define,c=D5UILoader;p=c.prototype;
        p.addBinder = function (obj) {
            if (this._bindingList == null)
                this._bindingList = new Array();
            this._bindingList.push(obj);
        };
        p.setup = function (url) {
            this.removeChildren();
            RES.getResByUrl(this._uiSrc, this.LoadComplete, this);
        };
        p.LoadComplete = function (data) {
            if (data) {
                d5power.D5Component.getComponentByURL(data, this);
            }
            if (this.stage) {
                this.flyPos();
            }
            else {
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.flyPos, this);
            }
        };
        p.dispose = function () {
            this.stage.removeEventListener(egret.Event.RESIZE, this.autoFly, this);
            if (this.parent)
                this.parent.removeChild(this);
        };
        p.flyPos = function (e) {
            if (e === void 0) { e = null; }
            if (e != null)
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.flyPos, this);
            if (d5power.D5Component.proBindingSource && this._bindingList) {
                d5power.D5Component.proBindingSource.addDisplayer(this);
                this.stage.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.autoDispose, this);
                this.update();
            }
            if (this._flyX != 0 && this._flyY != 0)
                this.stage.addEventListener(egret.Event.RESIZE, this.autoFly, this);
            this.autoFly();
        };
        p.autoFly = function (e) {
            if (e === void 0) { e = null; }
            this.x = this._flyX == 1 ? (this.stage.stageWidth - this._realWidth) : (this._flyX == .5 ? (this.stage.stageWidth - this._realWidth) >> 1 : (this.stage.stageWidth * this._flyX));
            this.y = this._flyY == 1 ? (this.stage.stageHeight - this._realHeight) : (this._flyY == .5 ? (this.stage.stageHeight - this._realHeight) >> 1 : (this.stage.stageHeight * this._flyY));
        };
        p.autoDispose = function (e) {
            this.stage.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.autoDispose, this);
            trace("[D5UILoader] ", name, ' 自动释放');
            if (d5power.D5Component.proBindingSource && this._bindingList) {
                d5power.D5Component.proBindingSource.removeDisplayer(this);
                this._bindingList = null;
            }
            this.stage.removeEventListener(egret.Event.RESIZE, this.autoFly, this);
        };
        p.update = function () {
            if (this._bindingList) {
                var ui;
                for (var i = 0; i < this._bindingList.length; i++) {
                    ui = this._bindingList[i];
                    ui.update();
                }
            }
        };
        d(p, "width"
            ,function () {
                return this._realWidth;
            }
        );
        d(p, "height"
            ,function () {
                return this._realHeight;
            }
        );
        return D5UILoader;
    })(egret.Sprite);
    d5power.D5UILoader = D5UILoader;
    egret.registerClass(D5UILoader,"d5power.D5UILoader",["d5power.IUserInfoDisplayer","d5power.IProBindingContainer"]);
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
var d5power;
(function (d5power) {
    var D5VBox = (function (_super) {
        __extends(D5VBox, _super);
        function D5VBox() {
            _super.call(this);
            this._padding = 5;
        }
        var d = __define,c=D5VBox;p=c.prototype;
        p.setEditorMode = function () {
            if (this._editorBG != null)
                return;
            this._editorBG = new egret.Shape();
            this._editorBG.graphics.clear();
            this._editorBG.graphics.lineStyle(1, 0);
            this._editorBG.graphics.beginFill(0x00ff00, .5);
            this._editorBG.graphics.drawRect(0, 0, 60, 20);
            this._editorBG.graphics.endFill();
            this.addChild(this._editorBG);
        };
        p.parseToXML = function () {
            var result = "<D5VBox name='" + this.name + "' x='" + this.x + "' y='" + this.y + "'/>\n";
            return result;
        };
        /**
         * Override of addChild to force layout;
         */
        p.addChild = function (child) {
            _super.prototype.addChild.call(this, child);
            child.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.invalidate();
            return child;
        };
        /**
         * Override of removeChild to force layout;
         */
        p.removeChild = function (child) {
            _super.prototype.removeChild.call(this, child);
            child.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.invalidate();
            return child;
        };
        /**
         * Override of removeChild to force layout;
         */
        p.removeChildAt = function (index) {
            if (index === void 0) { index = 0; }
            var child = _super.prototype.removeChildAt.call(this, index);
            child.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.invalidate();
            return child;
        };
        /**
         * Internal handler for resize event of any attached component. Will redo the layout based on new size.
         */
        p.onResize = function (event) {
            this.invalidate();
        };
        /**
         * Draws the visual ui of the component, in this case, laying out the sub components.
         */
        p.draw = function () {
            console.info("[draw D5VBox]");
            this._w = 0;
            this._h = 0;
            var ypos = 0;
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                child.y = ypos;
                ypos += child.height;
                ypos += this._padding;
                this._h += child.height;
                this._w = Math.max(this._w, child.width);
                console.info("[D5VBOX]" + child.x + "||" + child.y);
            }
            this._h += this._padding * (this.numChildren - 1);
            this.dispatchEvent(new egret.Event(egret.Event.RESIZE));
        };
        d(p, "padding"
            ,function () {
                return this._padding;
            }
            /**
             * Gets / sets the spacing between each sub component.
             */
            ,function (s) {
                this._padding = s;
                this.invalidate();
            }
        );
        return D5VBox;
    })(d5power.D5Component);
    d5power.D5VBox = D5VBox;
    egret.registerClass(D5VBox,"d5power.D5VBox");
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
var d5power;
(function (d5power) {
    var D5Window = (function (_super) {
        __extends(D5Window, _super);
        function D5Window() {
            _super.call(this);
        }
        var d = __define,c=D5Window;p=c.prototype;
        p.setSkin = function (name) {
            if (this._nowName == name)
                return;
            this._nowName = name;
            var data = d5power.D5UIResourceData.getData(name);
            if (data == null) {
                trace("[D5Window]No Resource" + name);
                return;
            }
            this.lt = new egret.Bitmap();
            this.lt.texture = data.getResource(0);
            this.t = new egret.Bitmap();
            this.t.texture = data.getResource(1);
            this.t.fillMode = egret.BitmapFillMode.REPEAT;
            this.rt = new egret.Bitmap();
            this.rt.texture = data.getResource(2);
            this.l = new egret.Bitmap();
            this.l.texture = data.getResource(3);
            this.l.fillMode = egret.BitmapFillMode.REPEAT;
            this.m = new egret.Bitmap();
            this.m.texture = data.getResource(4);
            this.m.fillMode = egret.BitmapFillMode.REPEAT;
            this.r = new egret.Bitmap();
            this.r.texture = data.getResource(5);
            this.lb = new egret.Bitmap();
            this.lb.texture = data.getResource(6);
            this.b = new egret.Bitmap();
            this.b.texture = data.getResource(7);
            this.b.fillMode = egret.BitmapFillMode.REPEAT;
            this.rb = new egret.Bitmap();
            this.rb.texture = data.getResource(8);
            //trace(list[0].textureWidth.toString(),list[0].textureHeight.toString());
            this.invalidate();
        };
        p.draw = function () {
            if (this.l == null) {
            }
            else {
                if (!this.contains(this.l)) {
                    this.addChildAt(this.lt, 0);
                    this.addChildAt(this.t, 0);
                    this.addChildAt(this.rt, 0);
                    this.addChildAt(this.l, 0);
                    this.addChildAt(this.m, 0);
                    this.addChildAt(this.r, 0);
                    this.addChildAt(this.lb, 0);
                    this.addChildAt(this.b, 0);
                    this.addChildAt(this.rb, 0);
                }
                this.m.width = this.t.width = this.b.width = this._w - this.lt.width - this.rt.width;
                this.m.height = this.l.height = this.r.height = this._h - this.lt.height - this.lb.height;
                this.t.x = this.m.x = this.b.x = this.lt.width;
                this.rt.x = this.r.x = this.rb.x = this.lt.width + this.t.width;
                this.l.y = this.m.y = this.r.y = this.lt.height;
                this.lb.y = this.b.y = this.rb.y = this.lt.height + this.l.height;
            }
            _super.prototype.draw.call(this);
        };
        return D5Window;
    })(d5power.D5Component);
    d5power.D5Window = D5Window;
    egret.registerClass(D5Window,"d5power.D5Window");
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
var d5power;
(function (d5power) {
    var ListCell = (function (_super) {
        __extends(ListCell, _super);
        function ListCell() {
            _super.call(this);
        }
        var d = __define,c=ListCell;p=c.prototype;
        p.setBtnID = function (id) {
            this._id = id;
        };
        d(p, "btnID"
            ,function () {
                return this._id;
            }
        );
        p.showCell = function (w, msg) {
            this.touchEnabled = true;
            this.loop = new d5power.D5MirrorLoop();
            this.loop.setSkin('loop0');
            this.loop.setSize(w, 0);
            this.addChild(this.loop);
            this.text = new d5power.D5Text();
            this.text.setWidth(w);
            this.text.setFontSize(5);
            this.text.setTextColor(0xff0000);
            this.text.setText(msg);
            this.addChild(this.text);
        };
        p.dispose = function () {
            if (this.text.parent)
                this.text.parent.removeChild(this.text);
            this.text = null;
            if (this.loop.parent)
                this.loop.parent.removeChild(this.loop);
            this.loop = null;
        };
        return ListCell;
    })(egret.Sprite);
    d5power.ListCell = ListCell;
    egret.registerClass(ListCell,"d5power.ListCell");
})(d5power || (d5power = {}));

