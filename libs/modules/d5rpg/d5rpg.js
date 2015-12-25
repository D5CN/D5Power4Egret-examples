







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
 * Created by Administrator on 2015/5/26.
 */
var d5power;
(function (d5power) {
    var BTNode = (function () {
        function BTNode(precondition) {
            if (precondition === void 0) { precondition = null; }
            //public  database:Database;
            // Cooldown function.
            this.interval = 0;
            this._lastTimeEvaluated = 0;
            this.precondition = precondition;
        }
        var d = __define,c=BTNode;p=c.prototype;
        d(p, "children"
            ,function () {
                return this._children;
            }
        );
        p.Activate = function () {
            if (this.activated)
                return;
            //			Init();
            if (this.precondition != null) {
                this.precondition.Activate();
            }
            if (this._children != null) {
                var child;
                for (var i = 0; i < this._children.length; i++) {
                    child = this._children[i];
                    child.Activate();
                }
            }
            this.activated = true;
        };
        p.Evaluate = function () {
            var coolDownOK = this.CheckTimer();
            return this.activated && coolDownOK && (this.precondition == null || this.precondition.Check()) && this.DoEvaluate();
        };
        p.DoEvaluate = function () {
            return true;
        };
        p.Tick = function () {
            return d5power.BTConst.BTResult_Ended;
        };
        p.Clear = function () {
        };
        p.AddChild = function (aNode) {
            if (this._children == null) {
                this._children = new Array();
            }
            if (aNode != null) {
                this._children.push(aNode);
            }
        };
        p.RemoveChild = function (aNode) {
            if (this._children != null && aNode != null) {
                var index = this._children.indexOf(aNode);
                this._children.splice(index, 1);
            }
        };
        // Check if cooldown is finished.
        p.CheckTimer = function () {
            if (egret.getTimer() - this._lastTimeEvaluated > this.interval) {
                this._lastTimeEvaluated = egret.getTimer();
                return true;
            }
            return false;
        };
        return BTNode;
    })();
    d5power.BTNode = BTNode;
    egret.registerClass(BTNode,"d5power.BTNode");
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
 * Created by Administrator on 2015/5/26.
 */
var d5power;
(function (d5power) {
    var BTAction = (function (_super) {
        __extends(BTAction, _super);
        function BTAction(precondition) {
            if (precondition === void 0) { precondition = null; }
            _super.call(this, precondition);
            this._status = d5power.BTConst.BTActionStatus_Ready;
        }
        var d = __define,c=BTAction;p=c.prototype;
        p.Enter = function () {
        };
        p.Exit = function () {
        };
        p.Execute = function () {
            return d5power.BTConst.BTResult_Running;
        };
        p.Clear = function () {
            if (this._status != d5power.BTConst.BTActionStatus_Ready) {
                this.Exit();
                this._status = d5power.BTConst.BTActionStatus_Ready;
            }
        };
        p.Tick = function () {
            var result = d5power.BTConst.BTResult_Ended;
            if (this._status == d5power.BTConst.BTActionStatus_Ready) {
                this.Enter();
                this._status = d5power.BTConst.BTActionStatus_Running;
            }
            if (this._status == d5power.BTConst.BTActionStatus_Running) {
                result = this.Execute();
                if (result != d5power.BTConst.BTResult_Running) {
                    this.Exit();
                    this._status = d5power.BTConst.BTActionStatus_Ready;
                }
            }
            return result;
        };
        p.AddChild = function (aNode) {
            //			Debug.LogError("BTAction: Cannot add a node into BTAction.");
        };
        p.RemoveChild = function (aNode) {
            //			Debug.LogError("BTAction: Cannot remove a node into BTAction.");
        };
        return BTAction;
    })(d5power.BTNode);
    d5power.BTAction = BTAction;
    egret.registerClass(BTAction,"d5power.BTAction");
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
 * Created by Administrator on 2015/5/27.
 */
var d5power;
(function (d5power) {
    var BTConst = (function () {
        function BTConst() {
        }
        var d = __define,c=BTConst;p=c.prototype;
        BTConst.BTResult_Ended = 1;
        BTConst.BTResult_Running = 2;
        BTConst.BTActionStatus_Ready = 1;
        BTConst.BTActionStatus_Running = 2;
        BTConst.Parallel_And = 1;
        BTConst.Parallel_Or = 2;
        return BTConst;
    })();
    d5power.BTConst = BTConst;
    egret.registerClass(BTConst,"d5power.BTConst");
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
 * Created by Administrator on 2015/5/27.
 */
var d5power;
(function (d5power) {
    var BTParallel = (function (_super) {
        __extends(BTParallel, _super);
        function BTParallel(type, precondition) {
            if (precondition === void 0) { precondition = null; }
            this._type = type;
            _super.call(this, precondition);
        }
        var d = __define,c=BTParallel;p=c.prototype;
        p.DoEvaluate = function () {
            var child;
            for (var i = 0; i < this.children.length; i++) {
                child = this.children[i];
                if (!child.Evaluate()) {
                    return false;
                }
            }
            return true;
        };
        p.Tick = function () {
            var endingResultCount = 0;
            for (var i = 0; i < this.children.length; i++) {
                if (this._type == d5power.BTConst.Parallel_And) {
                    if (this._results[i] == d5power.BTConst.BTResult_Running) {
                        this._results[i] = this.children[i].Tick();
                    }
                    if (this._results[i] != d5power.BTConst.BTResult_Running) {
                        endingResultCount++;
                    }
                }
                else {
                    if (this._results[i] == d5power.BTConst.BTResult_Running) {
                        this._results[i] = this.children[i].Tick();
                    }
                    if (this._results[i] != d5power.BTConst.BTResult_Running) {
                        this.ResetResults();
                        return d5power.BTConst.BTResult_Ended;
                    }
                }
            }
            if (endingResultCount == this.children.length) {
                this.ResetResults();
                return d5power.BTConst.BTResult_Ended;
            }
            return d5power.BTConst.BTResult_Running;
        };
        p.Clear = function () {
            this.ResetResults();
            var child;
            for (var i = 0; i < this.children.length; i++) {
                child = this.children[i];
                child.Clear();
            }
        };
        p.AddChild = function (aNode) {
            _super.prototype.AddChild.call(this, aNode);
            this._results.push(d5power.BTConst.BTResult_Running);
        };
        p.RemoveChild = function (aNode) {
            var index = this._children.indexOf(aNode);
            this._results.splice(index, 1);
            _super.prototype.RemoveChild.call(this, aNode);
        };
        p.ResetResults = function () {
            for (var i = 0; i < this._results.length; i++) {
                this._results[i] = d5power.BTConst.BTResult_Running;
            }
        };
        return BTParallel;
    })(d5power.BTNode);
    d5power.BTParallel = BTParallel;
    egret.registerClass(BTParallel,"d5power.BTParallel");
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
 * Created by Administrator on 2015/5/27.
 */
var d5power;
(function (d5power) {
    var BTParallelFlexible = (function (_super) {
        __extends(BTParallelFlexible, _super);
        function BTParallelFlexible(precondition) {
            if (precondition === void 0) { precondition = null; }
            _super.call(this, precondition);
            this._activeList = [];
        }
        var d = __define,c=BTParallelFlexible;p=c.prototype;
        p.DoEvaluate = function () {
            var numActiveChildren = 0;
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                if (child.Evaluate()) {
                    this._activeList[i] = true;
                    numActiveChildren++;
                }
                else {
                    this._activeList[i] = false;
                }
            }
            if (numActiveChildren == 0) {
                return false;
            }
            return true;
        };
        p.Tick = function () {
            var numRunningChildren = 0;
            for (var i = 0; i < this._children.length; i++) {
                var active = this._activeList[i];
                if (active) {
                    var result = this._children[i].Tick();
                    if (result == d5power.BTConst.BTResult_Running) {
                        numRunningChildren++;
                    }
                }
            }
            if (numRunningChildren == 0) {
                return d5power.BTConst.BTResult_Ended;
            }
            return d5power.BTConst.BTResult_Running;
        };
        p.AddChild = function (aNode) {
            _super.prototype.AddChild.call(this, aNode);
            this._activeList.push(false);
        };
        p.RemoveChild = function (aNode) {
            var index = this._children.indexOf(aNode);
            this._activeList.splice(index, 1);
            _super.prototype.RemoveChild.call(this, aNode);
        };
        p.Clear = function () {
            _super.prototype.Clear.call(this);
            var child;
            for (var i = 0; i < this.children.length; i++) {
                child = this.children[i];
                child.Clear();
            }
        };
        return BTParallelFlexible;
    })(d5power.BTNode);
    d5power.BTParallelFlexible = BTParallelFlexible;
    egret.registerClass(BTParallelFlexible,"d5power.BTParallelFlexible");
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
 * Created by Administrator on 2015/5/26.
 */
var d5power;
(function (d5power) {
    var BTPrecondition = (function (_super) {
        __extends(BTPrecondition, _super);
        function BTPrecondition() {
            _super.call(this, null);
        }
        var d = __define,c=BTPrecondition;p=c.prototype;
        p.Check = function () {
            return true;
        };
        // Functions as a node
        p.Tick = function () {
            var success = this.Check();
            if (success) {
                return d5power.BTConst.BTResult_Ended;
            }
            else {
                return d5power.BTConst.BTResult_Running;
            }
        };
        return BTPrecondition;
    })(d5power.BTNode);
    d5power.BTPrecondition = BTPrecondition;
    egret.registerClass(BTPrecondition,"d5power.BTPrecondition");
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
 * Created by Administrator on 2015/5/26.
 */
var d5power;
(function (d5power) {
    var BTPrioritySelector = (function (_super) {
        __extends(BTPrioritySelector, _super);
        function BTPrioritySelector(precondition) {
            if (precondition === void 0) { precondition = null; }
            _super.call(this, precondition);
        }
        var d = __define,c=BTPrioritySelector;p=c.prototype;
        // selects the active child
        p.DoEvaluate = function () {
            var child;
            for (var i = 0; i < this.children.length; i++) {
                child = this.children[i];
                if (child.Evaluate()) {
                    if (this._activeChild != null && this._activeChild != child) {
                        this._activeChild.Clear();
                    }
                    this._activeChild = child;
                    return true;
                }
            }
            if (this._activeChild != null) {
                this._activeChild.Clear();
                this._activeChild = null;
            }
            return false;
        };
        p.Clear = function () {
            if (this._activeChild != null) {
                this._activeChild.Clear();
                this._activeChild = null;
            }
        };
        p.Tick = function () {
            if (this._activeChild == null) {
                return d5power.BTConst.BTResult_Ended;
            }
            var result = this._activeChild.Tick();
            if (result != d5power.BTConst.BTResult_Running) {
                this._activeChild.Clear();
                this._activeChild = null;
            }
            return result;
        };
        return BTPrioritySelector;
    })(d5power.BTNode);
    d5power.BTPrioritySelector = BTPrioritySelector;
    egret.registerClass(BTPrioritySelector,"d5power.BTPrioritySelector");
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
 * Created by Administrator on 2015/5/27.
 */
var d5power;
(function (d5power) {
    var BTSequence = (function (_super) {
        __extends(BTSequence, _super);
        function BTSequence(precondition) {
            if (precondition === void 0) { precondition = null; }
            _super.call(this, precondition);
            this._activeIndex = -1;
        }
        var d = __define,c=BTSequence;p=c.prototype;
        p.DoEvaluate = function () {
            if (this._activeChild != null) {
                var result = this._activeChild.Evaluate();
                if (!result) {
                    this._activeChild.Clear();
                    this._activeChild = null;
                    this._activeIndex = -1;
                }
                return result;
            }
            else {
                return this.children[0].Evaluate();
            }
        };
        p.Tick = function () {
            // first time
            if (this._activeChild == null) {
                this._activeChild = this.children[0];
                this._activeIndex = 0;
            }
            var result = this._activeChild.Tick();
            if (result == d5power.BTConst.BTResult_Ended) {
                this._activeIndex++;
                if (this._activeIndex >= this.children.length) {
                    this._activeChild.Clear();
                    this._activeChild = null;
                    this._activeIndex = -1;
                }
                else {
                    this._activeChild.Clear();
                    this._activeChild = this.children[this._activeIndex];
                    result = d5power.BTConst.BTResult_Running;
                }
            }
            return result;
        };
        p.Clear = function () {
            if (this._activeChild != null) {
                this._activeChild = null;
                this._activeIndex = -1;
            }
            var child;
            for (var i = 0; i < this.children.length; i++) {
                child = this.children[i];
                child.Clear();
            }
        };
        return BTSequence;
    })(d5power.BTNode);
    d5power.BTSequence = BTSequence;
    egret.registerClass(BTSequence,"d5power.BTSequence");
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
 * Created by Administrator on 2015/5/26.
 */
var d5power;
(function (d5power) {
    var BTTree = (function () {
        function BTTree() {
            this._root = null;
            this.isRunning = true;
        }
        var d = __define,c=BTTree;p=c.prototype;
        p.start = function () {
            this.Init();
            this._root.Activate();
        };
        p.Update = function () {
            if (!this.isRunning)
                return;
            //			if (database.GetData<bool>(RESET)) {
            //				Reset();
            //				database.SetData<bool>(RESET, false);
            //			}
            // Iterate the BT tree now!
            if (this._root.Evaluate()) {
                this._root.Tick();
            }
        };
        p.OnDestroy = function () {
            if (this._root != null) {
                this._root.Clear();
            }
        };
        // Need to be called at the initialization code in the children.
        p.Init = function () {
            //			database = GetComponent<Database>();
            //			if (database == null) {
            //				database = gameObject.AddComponent<Database>();
            //			}
            //			_resetId = database.GetDataId(RESET);
            //			database.SetData<bool>(_resetId, false);
        };
        p.Reset = function () {
            if (this._root != null) {
                this._root.Clear();
            }
        };
        BTTree.RESET = "Rest";
        return BTTree;
    })();
    d5power.BTTree = BTTree;
    egret.registerClass(BTTree,"d5power.BTTree");
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
    var CharacterController = (function () {
        function CharacterController() {
            //if(CharacterController._me!=null)
            //{
            //    this.error();
            //}
        }
        var d = __define,c=CharacterController;p=c.prototype;
        CharacterController.getInstance = function (igd) {
            if (CharacterController._me == null) {
                CharacterController._me = new CharacterController();
            }
            CharacterController._me._target = igd;
            CharacterController._me.setupListener();
            return CharacterController._me;
        };
        p.pause = function () {
            this._isPause = true;
        };
        p.start = function () {
            this._isPause = false;
        };
        p.setupListener = function () {
            d5power.D5Game.me.touchReciver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        p.unsetupListener = function () {
            d5power.D5Game.me.touchReciver.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        p.run = function () {
            if (this._path != null && this._path[this._step] != null) {
                //console.log("[CharacterController] Running");
                //if(this._target.action==Actions.Stop) this._target.action = Actions.Run;
                if (this._target.action == d5power.Actions.Wait)
                    this._target.setAction(d5power.Actions.Run);
                this._nextTarget = this._step == this._path.length ? this._endTarget : d5power.D5Game.me.map.tile2WorldPostion(this._path[this._step][0], this._path[this._step][1]);
                var radian = d5power.GMath.getPointAngle(this._nextTarget.x - this._target.posX, this._nextTarget.y - this._target.posY);
                var angle = d5power.GMath.R2A(radian) + 90;
                var xisok = false;
                var yisok = false;
                var xspeed = this._target.speed * Math.cos(radian);
                var yspeed = this._target.speed * Math.sin(radian);
                if (Math.abs(this._target.posX - this._nextTarget.x) <= xspeed) {
                    xisok = true;
                    xspeed = 0;
                }
                if (Math.abs(this._target.posY - this._nextTarget.y) <= yspeed) {
                    yisok = true;
                    yspeed = 0;
                }
                this._target.setPos(this._target.posX + xspeed, this._target.posY + yspeed);
                if (xisok && yisok) {
                    // 走到新的位置点 更新区块坐标
                    this._step++;
                    if (this._step >= this._path.length) {
                        this._target.setAction(d5power.Actions.Wait);
                        this._path = null;
                        this._step = 1;
                        if (this._onWalkComplate != null)
                            this._onWalkComplate.apply(this._onWalkComplateThisObj, this._onWalkComplateParams);
                        this.clearWalkComplate();
                    }
                }
                else {
                    this.changeDirectionByAngle(angle);
                }
            }
        };
        /**
         * 根据角度值修改角色的方向
         */
        p.changeDirectionByAngle = function (angle) {
            if (angle === void 0) { angle = 0; }
            if (this._target == null)
                return;
            if (angle < -22.5)
                angle += 360;
            //_me.Angle = angle;
            //console.log("[CharacterContorller] change direction by angle:",angle);
            if (angle >= -22.5 && angle < 22.5) {
                this._target.setDirection(d5power.Direction.Up);
            }
            else if (angle >= 22.5 && angle < 67.5) {
                this._target.setDirection(d5power.Direction.RightUp);
            }
            else if (angle >= 67.5 && angle < 112.5) {
                this._target.setDirection(d5power.Direction.Right);
            }
            else if (angle >= 112.5 && angle < 157.5) {
                this._target.setDirection(d5power.Direction.RightDown);
            }
            else if (angle >= 157.5 && angle < 202.5) {
                this._target.setDirection(d5power.Direction.Down);
            }
            else if (angle >= 202.5 && angle < 247.5) {
                this._target.setDirection(d5power.Direction.LeftDown);
            }
            else if (angle >= 247.5 && angle < 292.5) {
                this._target.setDirection(d5power.Direction.Left);
            }
            else {
                this._target.setDirection(d5power.Direction.LeftUp);
            }
        };
        p.dispose = function () {
            this.unsetupListener();
            this._path = null;
            this._endTarget = null;
            this._step = 1;
            this._target = null;
            this._nextTarget = null;
            this.clearWalkComplate();
        };
        p.clearPath = function () {
        };
        p.setComplateFun = function (fun, thisObj) {
            if (thisObj === void 0) { thisObj = null; }
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            this._onWalkComplate = fun;
            this._onWalkComplateThisObj = thisObj;
            this._onWalkComplateParams = params;
        };
        p.onTouch = function (e) {
            // 以下代码for横版跳
            //	        if(this._isPause) return;
            //            if(this._jumpTime<CharacterController.JUMP_MAX)
            //            {
            //                this._gravitySpeed=-CharacterController.JUMP_POWER;
            //                this._target.setPos(this._target.posX,this._target.posY+this._gravitySpeed);
            //                this._jumpTime++;
            //            }
            //
            //            return;
            if (this._isPause)
                return;
            //            if(this._jumpTime<CharacterController.JUMP_MAX)
            //            {
            //                this._gravitySpeed=-CharacterController.JUMP_POWER;
            //                this._target.setPos(this._target.posX,this._target.posY+this._gravitySpeed);
            //                this._jumpTime++;
            //            }
            //
            //            return;
            //console.log("[CharacterController] get touch evet");
            // 检查是否点到某对象
            var clicker = d5power.D5Game.me.getClicker(e.stageX, e.stageY);
            if (clicker != null) {
                this.clickSomeBody(clicker);
                return;
            }
            //console.log("[CharacterController] get touch evet2");
            // 计算世界坐标
            this._endTarget = d5power.D5Game.me.map.getWorldPostion(e.stageX, e.stageY).clone();
            // 自动清掉后续动作，因为是在控制移动
            this.clearWalkComplate();
            this.walk2Target();
        };
        p.walkTo = function (posx, posy) {
            // 计算世界坐标
            this._endTarget = new egret.Point(posx, posy);
            // 自动清掉后续动作，因为是在控制移动
            this.clearWalkComplate();
            this.walk2Target();
        };
        p.clearWalkComplate = function () {
            this._onWalkComplate = null;
            this._onWalkComplateParams = null;
            this._onWalkComplateThisObj = null;
        };
        /**
         * 控制角色走向某点
         * 请在本方法执行前设置_endTarget
         *
         * @return	移动成功，则返回true，移动失败返回false(目标点无法到达)
         */
        p.walk2Target = function () {
            //console.log("[CharacterController] into walk2target");
            // 检查目标点是否可移动
            if (this._endTarget.x == this._target.posX && this._endTarget.y == this._target.posY)
                return false;
            var p = d5power.D5Game.me.map.Postion2Tile(this._endTarget.x, this._endTarget.y).clone();
            var p0 = d5power.D5Game.me.map.Postion2Tile(this._target.posX, this._target.posY);
            this._path = new Array();
            if (d5power.D5Game.me.g) {
                if (!d5power.D5Game.me.map.getRoadPass(p.x, p.y)) {
                    this._path = [[p.x, p.y], [p0.x, p0.y]];
                    this._step = 1;
                    this._target.inG = true;
                    this._target.speedY = 3;
                    return true;
                }
            }
            if (!d5power.D5Game.me.map.getRoadPass(p.x, p.y)) {
                this._target.setAction(d5power.Actions.Wait);
                return false;
            }
            // 得出路径
            var nodeArr = d5power.D5Game.me.map.find(p0.x, p0.y, p.x, p.y);
            if (nodeArr == null) {
                return false;
            }
            else {
                for (var i = 0, j = nodeArr.length; i < j; i++) {
                    this._path.push([nodeArr[i].x, nodeArr[i].y]);
                }
            }
            this._step = 1;
            // 向服务器发送同步数据
            this.tellServerMove(this._endTarget);
            //this._target.setAction(Actions.Run);
            return true;
        };
        p.tellServerMove = function (target) {
            // 移动通知
            this.checkQuiteFight();
            d5power.D5Game.me.canclePickup();
        };
        p.checkQuiteFight = function () {
            if (this._target.displayer.target != null) {
                d5power.D5Game.me.fightController.quitFight(this._target.displayer);
            }
        };
        /**
         * 点击到了某对象
         * @param	o	触发点击事件的GameObject
         */
        p.clickSomeBody = function (o) {
            // mission click
            //if(o instanceof NCharacterObject && o['uid']>0) D5Game.me.missionCallBack(<NCharacterObject><any> o);
            // do some thing
            if (o != this._target && egret.Point.distance(o.$pos, this._target.$pos) > CharacterController.TALK_DISTANCE) {
                var i = 0;
                this.clearWalkComplate();
                var result = d5power.D5Game.me.map.getPointAround(o.$pos, this._target.$pos, CharacterController.TALK_DISTANCE);
                if (result == null) {
                    alert("无法接近，请靠近一些");
                }
                else {
                    this._endTarget = result;
                    this.walk2Target();
                    this.setComplateFun(this.clickSomeBody, this, o);
                }
                return;
            }
            else {
                // 朝向目标
                var angle = d5power.GMath.getPointAngle(o.posX - this._target.posX, o.posY - this._target.posY);
                this.changeDirectionByAngle(d5power.GMath.R2A(angle) + 90);
                //<IFighter><any>o.displayer == null
                if (o.work == d5power.GOData.WORK_MONSTER) {
                    d5power.D5Game.me.fightController.joinFight(this._target.displayer, o.displayer);
                    return;
                }
                if (o.job_type == d5power.GOData.JOB_COLLECTION) {
                    trace("采集中。。。");
                    d5power.D5Game.me.collectionWithNPC(o);
                }
                else {
                    d5power.D5Game.me.talkWithNPC(o);
                }
            }
            console.log("[CharacterController] Cick Some body");
        };
        p.getNeer = function (px, py, f, targetObj, doer, target) {
            this._target.setAction(d5power.Actions.Wait);
            // 得出路径
            var p0 = d5power.D5Game.me.map.Postion2Tile(this._target.posX, this._target.posY).clone();
            var p = d5power.D5Game.me.map.Postion2Tile(px, py);
            var nodeArr = d5power.D5Game.me.map.find(p0.x, p0.y, p.x, p.y);
            if (nodeArr == null) {
                return;
            }
            else {
                this.clearWalkComplate();
                this._onWalkComplate = f;
                this._onWalkComplateThisObj = targetObj;
                this._onWalkComplateParams = [doer, target];
                this._path = new Array();
                var i;
                for (i = 0; i < nodeArr.length; i++) {
                    this._path.push([nodeArr[i].x, nodeArr[i].y]);
                }
            }
            this._step = 1;
        };
        p.error = function () {
            throw new Error("[CharacterController] please just get instance throw static function getInstance()");
        };
        CharacterController.TALK_DISTANCE = 200;
        return CharacterController;
    })();
    d5power.CharacterController = CharacterController;
    egret.registerClass(CharacterController,"d5power.CharacterController",["d5power.IController"]);
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
    var Actions = (function () {
        function Actions() {
        }
        var d = __define,c=Actions;p=c.prototype;
        /**
         * 特殊状态：复活
         */
        Actions.RELIVE = -1;
        /**
         * Stop 停止
         * */
        Actions.Stop = 8;
        /**
         * Run 跑动
         * */
        Actions.Run = 1;
        /**
         * Attack 物理攻击
         * */
        Actions.Attack = 2;
        /**
         * 弓箭攻击
         * */
        Actions.BowAtk = 3;
        /**
         * 坐下
         */
        Actions.Sit = 4;
        /**
         * 死亡
         */
        Actions.Die = 5;
        /**
         * 拾取
         */
        Actions.Pickup = 6;
        /**
         * 被攻击
         */
        Actions.BeAtk = 7;
        /**
         * 等待（备战）
         */
        Actions.Wait = 8;
        return Actions;
    })();
    d5power.Actions = Actions;
    egret.registerClass(Actions,"d5power.Actions");
})(d5power || (d5power = {}));

/**
 * Created by Administrator on 2015/5/7.
 */
var d5power;
(function (d5power) {
    var D5ConfigCenter = (function () {
        function D5ConfigCenter(callback, parent) {
            this._pickupTime = 5;
            if (D5ConfigCenter.my != null) {
                this.D5error();
            }
            D5ConfigCenter._my = this;
            this._parent = parent;
            this._onComplate = callback;
            this._baseitemList = new Object();
            this._baseskillList = new Object();
            this._monsterConf = new Object();
            this._npcList = new Object();
            this._jobList = new Object();
            this._userProList = new Object();
            this._userLvList = new Object();
            this._missionLib = new Object();
            this._missionList = new Object();
            this._chapterList = new Object();
            this.loadConfigCenter();
        }
        var d = __define,c=D5ConfigCenter;p=c.prototype;
        d(p, "pickupTime"
            ,function () {
                return this._pickupTime;
            }
        );
        d(D5ConfigCenter, "my"
            ,function () {
                return D5ConfigCenter._my;
            }
        );
        p.loadConfigCenter = function () {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadComplete, this);
            RES.loadGroup("configcenter");
        };
        p.onLoadComplete = function (event) {
            if (event.groupName == "configcenter") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadComplete, this);
                this.parseData();
            }
        };
        p.parseData = function () {
            this.parseBaseItemList();
            this.parseBaseSkillList(); //技能相关
            this.parseNpcList(); //npc相关
            this.parseMonsterConfigList();
            this.parseJobList(); //职业相关
            this.parseMissionLib(); //任务库相关
            this.parseMissionList(); //章节树
            //this.parseUserProList();//
            this._onComplate.apply(this._parent);
        };
        /**
         *任务库 解析
         */
        p.parseMissionLib = function () {
            var obj = RES.getRes("missionLib");
            var arr = obj.mission;
            var len = arr.length;
            var data;
            for (var i = 0; i < len; i++) {
                data = arr[i];
                var mission = new d5power.MissionData();
                mission.formatFromJson(data);
                this._missionLib[mission.id] = mission;
            }
        };
        p.getMissionData = function (id) {
            if (!this._missionLib.hasOwnProperty(id.toString()))
                return null;
            else
                return this._missionLib[id];
        };
        p.parseMissionList = function () {
            var obj = RES.getRes("chapter");
            var arr = obj.chapter;
            var len = arr.length;
            this.maxChapter = len;
            var data;
            var obj;
            var nodeObj;
            for (var i = 0; i < len; i++) {
                data = arr[i];
                var chapter = new d5power.ChapterData();
                chapter.id = parseInt(data.id);
                chapter.add = data.add;
                chapter.info = data.info;
                for (var j = 0; j < data.section.length; j++) {
                    obj = data.section[j];
                    var part = new d5power.PartData();
                    part.id = parseInt(obj.id);
                    if (obj.tree) {
                        part.tree['startId'] = parseInt(obj.tree.startId);
                        for (var k = 0; k < obj.tree.tree.length; k++) {
                            nodeObj = obj.tree.tree[k];
                            var mission = new d5power.MissionNode();
                            mission.chapterId = chapter.id;
                            mission.partId = part.id;
                            mission.format(nodeObj);
                            this._missionList[mission.chapterId + '_' + mission.partId + '_' + mission.id] = mission;
                        }
                    }
                    chapter.partArray.push(part);
                }
                this._chapterList[chapter.id] = chapter;
            }
        };
        p.getChapterData = function (id) {
            if (!this._chapterList.hasOwnProperty(id.toString()))
                return null;
            else
                return this._chapterList[id];
        };
        p.getMissionNode = function (chapterId, partId, id) {
            if (!this._missionList.hasOwnProperty(chapterId + '_' + partId + '_' + id))
                return null;
            else
                return this._missionList[chapterId + '_' + partId + '_' + id];
        };
        /**
         *npc 配置相关
         */
        p.parseNpcList = function () {
            var obj = RES.getRes("npcConfig");
            var arr = obj.npc;
            var len = arr.length;
            var data;
            for (var i = 0; i < len; i++) {
                data = arr[i];
                var npc = new d5power.NpcData();
                npc.format(data);
                this._npcList[npc.id] = npc;
            }
        };
        p.getNpcConf = function (id) {
            if (!this._npcList.hasOwnProperty(id.toString()))
                return null;
            else
                return this._npcList[id];
        };
        p.parseMonsterConfigList = function () {
            var obj = RES.getRes("monsterConfig");
            var arr = obj.monster;
            var len = arr.length;
            var data;
            for (var i = 0; i < len; i++) {
                data = arr[i];
                var monster = new d5power.MonsterConfData();
                monster.format(data);
                this._monsterConf[monster.id] = monster;
            }
        };
        p.getMonsterConf = function (id) {
            if (!this._monsterConf.hasOwnProperty(id.toString()))
                return null;
            else
                return this._monsterConf[id];
        };
        p.parseUserProList = function () {
            var obj = RES.getRes("userProConfig");
            var arr = obj.data;
            var len = arr.length;
            var data;
            for (var i = 0; i < len; i++) {
                data = arr[i];
                var userPro = new d5power.UserProData();
                userPro.format(data);
                this._userProList[userPro.field] = userPro;
            }
        };
        /**
         * 获得角色属性配置
         */
        p.getUserproConfig = function (filed) {
            return this._userProList[filed];
        };
        /**
        *职业配置相关
        */
        p.parseJobList = function () {
            var obj = RES.getRes("jobConfig");
            var arr = obj.job;
            var len = arr.length;
            var data;
            for (var i = 0; i < len; i++) {
                data = arr[i];
                var job = new d5power.JobData();
                job.format(data);
                this._jobList[job.id] = job;
            }
        };
        p.getJobType = function (job) {
            if (!this._jobList.hasOwnProperty(job.toString()))
                return null;
            else
                return this._jobList[job];
        };
        /**
         *技能相关
         */
        p.parseBaseSkillList = function () {
            var obj = RES.getRes("skillConfig");
            var arr = obj.skill;
            var length = arr.length;
            var data;
            for (var i = 0; i < length; i++) {
                data = arr[i];
                var skill = new d5power.BaseSkillData();
                skill.baseFormat(data);
                this._baseskillList[skill.id] = skill;
            }
            this.parseSkillList();
        };
        p.parseSkillList = function () {
        };
        p.getBaseSkillData = function (id) {
            return this._baseskillList[id];
        };
        d(p, "baseskillList"
            /**
            * 武学数据库
            */
            ,function () {
                return this._baseskillList;
            }
        );
        //---------------物品相关------------------------
        /**
         *物品基础数据
         */
        p.parseBaseItemList = function () {
            var obj = RES.getRes("itemConfig");
            var arr = obj.item;
            var length = arr.length;
            var data;
            for (var i = 0; i < length; i++) {
                data = arr[i];
                var item = new d5power.BaseItemData();
                item.baseFormat(data);
                this._baseitemList[item.id] = item;
            }
            this.parseItemList();
        };
        p.parseItemList = function () {
        };
        p.getBaseItemData = function (id) {
            return this._baseitemList[id];
        };
        p.getBaseItemList = function () {
            return this._baseitemList;
        };
        p.D5error = function () {
            throw new Error("[D5ConfigCenter] Please get instance by (get me) function.");
        };
        return D5ConfigCenter;
    })();
    d5power.D5ConfigCenter = D5ConfigCenter;
    egret.registerClass(D5ConfigCenter,"d5power.D5ConfigCenter");
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
    var Direction = (function () {
        //		public var ATK_LD:int = 9;
        //		public var ATK_LU:int = 10;
        //		public var ATK_RD:int = -9;
        //		public var ATK_RU:int = -10;
        //		
        //		public var BE_ATK_LD:int = 11;
        //		public var BE_ATK_LU:int = 12;
        //		public var BE_ATK_RD:int = -11;
        //		public var BE_ATK_RU:int = -12;
        //		
        //		
        //		public var DIE_RD:int = 14;
        //		public var DIE_RU:int = 13;
        //		public var DIE_LU:int = -13;
        //		public var DIE_LD:int = -14;
        //		
        //		
        //		public var WAIT_LD:uint = 2;
        //		public var WAIT_LU:uint = 3;
        //		public var WAIT_RD:int = -2;
        //		public var WAIT_RU:int = -3;
        function Direction() {
        }
        var d = __define,c=Direction;p=c.prototype;
        Direction.Down = 0;
        Direction.LeftDown = 1;
        Direction.Left = 2;
        Direction.LeftUp = 3;
        Direction.Up = 4;
        Direction.RightUp = 5;
        Direction.Right = 6;
        Direction.RightDown = 7;
        return Direction;
    })();
    d5power.Direction = Direction;
    egret.registerClass(Direction,"d5power.Direction");
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
    var GMath = (function () {
        function GMath() {
        }
        var d = __define,c=GMath;p=c.prototype;
        /**
         * 获取某点的夹角
         * 返回为弧度值
         */
        GMath.getPointAngle = function (x, y) {
            return Math.atan2(y, x);
        };
        /**
         * 弧度转角度
         */
        GMath.R2A = function (r) {
            return r * 180 / Math.PI;
        };
        /**
         * 角度转弧度
         */
        GMath.A2R = function (a) {
            if (a === void 0) { a = 0; }
            return a * Math.PI / 180;
        };
        return GMath;
    })();
    d5power.GMath = GMath;
    egret.registerClass(GMath,"d5power.GMath");
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
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        _super.call(this);
    }
    var d = __define,c=Layer;p=c.prototype;
    return Layer;
})(egret.DisplayObjectContainer);
egret.registerClass(Layer,"Layer");

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
    var D5ScriptCommand = (function () {
        function D5ScriptCommand(type) {
            if (type === void 0) { type = 0; }
            this._type = 0;
            this._type = type;
        }
        var d = __define,c=D5ScriptCommand;p=c.prototype;
        d(p, "type"
            ,function () {
                return this._type;
            }
        );
        p.addCommand = function (data) {
            if (this._commandList == null)
                this._commandList = [];
            this._commandList.push(data);
        };
        d(p, "command"
            ,function () {
                return this._command;
            }
            ,function (s) {
                this._command = s;
            }
        );
        d(p, "commandList"
            ,function () {
                return this._commandList;
            }
        );
        d(p, "params"
            ,function () {
                return this._params;
            }
            ,function (arr) {
                this._params = arr;
            }
        );
        p.toString = function () {
            var result = "[D5ScriptCommand] type:" + this._type + ",command:" + this._command + ',params:[' + this._params + '],sonCommand:';
            if (this._commandList != null) {
                var length = this._commandList.length;
                for (var i = 0; i < length; i++) {
                    var obj = this._commandList[i];
                }
            }
            return result;
        };
        /**
         * 普通命令
         */
        D5ScriptCommand.COMMAND = 0;
        /**
         * 条件判断
         */
        D5ScriptCommand.IF = 1;
        /**
         * 分支语句
         */
        D5ScriptCommand.SWITCH = 2;
        /**
         * 循环语句
         */
        D5ScriptCommand.FOR = 3;
        /**
         * 等待条件达成
         */
        D5ScriptCommand.WAITFOR = 4;
        return D5ScriptCommand;
    })();
    d5power.D5ScriptCommand = D5ScriptCommand;
    egret.registerClass(D5ScriptCommand,"d5power.D5ScriptCommand");
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
    var D5ScriptParser = (function () {
        function D5ScriptParser(stage) {
            /**
             * 默认运行时间间隔
             */
            this._runSpeed = 500;
            /**
             * 上一次的运行时间
             */
            this._lastRunTime = 0;
            /**
             * 脚本终止运行标签
             */
            this._break = false;
            /**
             * 解析行号
             */
            this._lineno = 0;
            /**
             * 是否进入运行状态
             */
            this._running = false;
            /**
             * 运行行号
             */
            this._runLine = 0;
            this.stage = stage;
        }
        var d = __define,c=D5ScriptParser;p=c.prototype;
        p.number = function (name, value) {
            if (value === void 0) { value = 0; }
            D5ScriptParser._vars[name] = value;
        };
        p.string = function (name, value) {
            D5ScriptParser._vars[name] = value;
        };
        p.add = function (name) {
            if (D5ScriptParser._vars[name]) {
                D5ScriptParser._vars[name]++;
            }
            else {
                trace("[D5ScriptParser] Please define " + name + " first.");
            }
        };
        p.print = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            for (var k = 0; k < params.length; k++) {
                var value = params[k];
                if (D5ScriptParser._vars[value])
                    params[k] = D5ScriptParser._vars[value];
            }
            trace(params);
        };
        /**
         * 等待
         */
        p.wait = function (sec) {
            if (sec === void 0) { sec = 0; }
            this._lastRunTime = egret.getTimer() + sec * 1000;
            trace("[Wait]");
        };
        /**
         * 跳转到指定行
         */
        p.goto = function (line) {
            if (line === void 0) { line = 0; }
            line -= 1;
            if (line < 0)
                line = 0;
            if (line >= this._command.commandList.length) {
                throw new Error("[D5ScriptParser] can not jump to a not exist line,line no. is " + line + ",total line is " + this._command.commandList.length);
            }
            this._runLine = line - 1; // 由于运行完一行后，行号会自动+1，因此跳转时必须减1
        };
        /**
         * 从当前行开始跳转指定行
         */
        p.jump = function (number) {
            if (number === void 0) { number = 0; }
            var line = this._runLine + number;
            if (line >= this._command.commandList.length || line < 0) {
                throw new Error("[D5ScriptParser] can not jump to a not exist line,line no. is " + line + ",total line is " + this._command.commandList.length);
            }
            this._runLine = line - 1;
        };
        /**
         * 更新状态
         */
        p.runScript = function (url) {
            if (url === void 0) { url = ''; }
            if (this._running) {
                if (D5ScriptParser._noticer != null)
                    D5ScriptParser._noticer.notice("当前正有一个脚本运行，目前不支持多脚本运行");
                return;
            }
            // 只有第0个任务可以纳入新手引导
            if (this._nowUrl != url && url != '') {
                this._command = null;
                this._nowUrl = url;
                RES.getResByUrl(url, this.onComplate, this);
                return;
            }
            if (this._command != null) {
                this._break = false;
                if (this.stage == null)
                    throw new Error("[D5ScriptParser] can not run without stage setted.please set stage first.");
                this.start();
            }
            else {
                this._runLine = 0;
                this._lineno = 0;
                this._command = new d5power.D5ScriptCommand();
                this.Parse(this._command);
                this.runScript();
            }
        };
        /**
         * 通过文本进行配置
         */
        p.configTxt = function (str) {
            var reg;
            reg = /\t/g;
            str = str.replace(reg, '');
            reg = /\r/g;
            str = str.replace(reg, "\n");
            reg = /\r\n/g;
            str = str.replace(reg, "\n");
            reg = /\n/g;
            // 初始化脚本数据
            var temp = str.split(reg);
            this._scriptArr = new Array();
            var length = temp.length;
            for (var i = 0; i < length; i++) {
                var s = temp[i];
                // 剔除注释
                if (s.substr(0, 1) == '#' || s == '' || s == '\r' || s == '\n' || s == '\r\n')
                    continue;
                this._scriptArr.push(s);
            }
            this.runScript();
        };
        p.stop = function () {
            this.pause();
            this._lastRunTime = 0;
            this._command = null;
            this._nowUrl = '';
            this._runLine = 0;
            this._lineno = 0;
            this._scriptArr = [];
            this._break = false;
            //this.stage = null;
        };
        p.pause = function () {
            this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.running, this);
            this._running = false;
        };
        p.start = function () {
            if (this._running)
                return;
            this.stage.addEventListener(egret.Event.ENTER_FRAME, this.running, this);
            this._running = true;
        };
        p.runComplate = function () {
            trace("[D5ScriptParser] 脚本执行完毕");
        };
        /**
         * 执行程序
         */
        p.running = function (e) {
            if (!this._break && egret.getTimer() - this._lastRunTime > this._runSpeed) {
                if (this._runLine >= this._command.commandList.length) {
                    this.stop();
                    this.runComplate();
                    return;
                }
                var comm = this._command.commandList[this._runLine];
                this.exec(comm);
                this._runLine++;
            }
        };
        p.exec = function (command) {
            var needLoop = false;
            if (this._break)
                return;
            switch (command.type) {
                case d5power.D5ScriptCommand.IF:
                    // IF语句 逻辑处理
                    var p = command.params[0];
                    if (this[p] && this[p] instanceof Function) {
                        var j = command.params.length;
                        if (j == 1) {
                            needLoop = this[p].apply(this);
                        }
                        else {
                            var args = new Array();
                            for (var i = 1; i < j; i++)
                                args.push(command.params[i]);
                            needLoop = this[p].apply(this, args);
                            trace(needLoop, "RUN");
                        }
                    }
                    else {
                        if (command.params.length > 1) {
                            trace("[D5ScriptParser] No Supported IF mode.There are only support ONE chance.");
                            return;
                        }
                        // 首先取出所有的命令、函数
                        var reg = /^[a-zA-Z_]*\([0-9a-zA-Z,]*\)|^[a-zA-Z0-9_]*/g;
                        // 第一次匹配
                        var runner = p.match(reg);
                        // 不包含任何符合条件的函数或参数则报错
                        if (runner == null || runner.length == 0) {
                            trace("[D5ScriptParser] Can not found any command.");
                            return;
                        }
                        // 按参数/函数进行切割，剩余部分为右侧（包含运算符和判断值）
                        var params = p.split(runner[0]);
                        // 条件判断运算符左边的内容
                        var left = runner[0];
                        // 条件判断运算符
                        var doer;
                        // 条件判断运算符右边的内容
                        var right;
                        // 进行二次切割，判断是否存在运算符
                        var reg2 = />|<|!=|==|>=|<=/g;
                        var runner2 = params[1].toString().match(reg2);
                        if (runner2.length == 0) {
                            // 唯一命令
                            right = params[1];
                            doer = runner[0];
                        }
                        else if (runner.length == 1) {
                            // 条件判断命令
                            var rightArr = params[1].toString().split(runner2[0]);
                            right = rightArr[1];
                            doer = runner2[0];
                        }
                        else {
                            throw new Error("[D5ScriptParser] There are only support ONE runner.");
                        }
                        //trace(left,doer,'RIGHT:',right);
                        // 处理函数
                        var funreg = /\([0-9a-zA-Z,]*\)/g;
                        var funRunner = left.match(funreg);
                        // 函数参数的纯净名（不带参数的）
                        var funName = left.replace(funreg, '');
                        if (funRunner && funRunner.length > 1)
                            throw new Error("[D5ScriptParser] Function format error.");
                        var funParam;
                        if (funRunner == null || funRunner.length == 0) {
                            funParam = '';
                        }
                        else {
                            var funStr = funRunner[0];
                            funParam = funStr.substr(1, funStr.length - 2);
                        }
                        // 如果没有参数
                        if (funParam == '') {
                            if (this[funName]) {
                                left = this[funName] instanceof Function ? this[funName]() : this[funName];
                            }
                            else if (D5ScriptParser._vars[funName]) {
                                left = D5ScriptParser._vars[funName];
                            }
                        }
                        else {
                            // 如果有参数	
                            if (this[funName] && this[funName] instanceof Function) {
                                left = this[funName].apply(this, funParam.split(','));
                            }
                        }
                        needLoop = true;
                        switch (doer) {
                            case '>':
                                trace('[D5ScriptParser] Check ' + left + ' > ' + right);
                                if (parseInt(left) <= parseInt(right))
                                    needLoop = false;
                                break;
                            case '<':
                                trace('[D5ScriptParser] Check ' + left + '<' + right);
                                if (parseInt(left) >= parseInt(right))
                                    needLoop = false;
                                break;
                            case '==':
                                trace('[D5ScriptParser] Check ' + left + '==' + right);
                                if (left != right)
                                    needLoop = false;
                                break;
                            case '!=':
                                trace('[D5ScriptParser] Check ' + left + '!=' + right);
                                if (left == right)
                                    needLoop = false;
                                break;
                            case '>=':
                                trace('[D5ScriptParser] Check ' + left + '>=' + right);
                                if (parseInt(left) < parseInt(right))
                                    needLoop = false;
                                break;
                            case '<=':
                                trace('[D5ScriptParser] Check ' + left + '<=' + right);
                                if (parseInt(left) > parseInt(right))
                                    needLoop = false;
                                break;
                            default:
                                throw new Error("Can not understand your runner ");
                                break;
                        }
                    } // for no function mode
                    break;
                case d5power.D5ScriptCommand.SWITCH:
                    // SWITCH处理
                    var checker = this[command.params[0].toString()];
                    var length1 = command.commandList.length;
                    for (var i1 = 0; i1 < length1; i1++) {
                        var son = command.commandList[i1];
                    }
                    break;
                case d5power.D5ScriptCommand.FOR:
                    // IF语句 逻辑处理
                    if (command.params.length != 2) {
                        throw new Error("No Supported FOR mode.There are only support TWO params.");
                    }
                    var start = command.params[0];
                    var end = command.params[1];
                    var list = command.commandList;
                    if (list != null && list.length > 0) {
                        for (var i = start; i < end; i++) {
                            var length2 = list.length;
                            for (var i2 = 0; i2 < length2; i2++) {
                                var obj = list[i2];
                            }
                        }
                    }
                    break;
                default:
                    if (this[command.command] && this[command.command] instanceof Function) {
                        try {
                            (this[command.command]).apply(this, command.params);
                        }
                        catch (e) {
                            trace("[D5ScriptParser] can not run function " + command.command + ",Error code:" + e.message);
                        }
                    }
                    else {
                        trace("[D5ScriptParser] can not found the function " + command.command);
                    }
                    break;
            }
            if (needLoop) {
                var list2 = command.commandList;
                if (list2 != null && list2.length > 0) {
                    for (var i = 0; i < list2.length; i++)
                        this.exec(list2[i]);
                }
            }
        };
        /**
         * 脚本词法解析
         */
        p.Parse = function (block) {
            if (block === void 0) { block = null; }
            var s;
            var temp;
            var breakStatus = true;
            while (breakStatus) {
                s = this.D5ScriptAt(this._scriptArr);
                if (s == null)
                    break;
                var strKey = "[*string*]";
                // 匹配字符串
                var ts = s.replace(/\"(.*)\"/g, strKey);
                temp = ts.split(' ');
                // 取出字符串内容
                var stringArr = s.match(/\"(.*)\"/g);
                // 剔除无效空位
                var findStr = 0;
                for (var i = temp.length - 1; i >= 0; i--) {
                    if (temp[i] == strKey) {
                        temp[i] = stringArr[findStr].replace(/\"/g, '');
                        findStr++;
                    }
                    else if (temp[i] == undefined || temp[i] == '') {
                        temp.splice(i, 1);
                    }
                }
                var sblock = null;
                switch (temp[0]) {
                    case 'if':
                        sblock = new d5power.D5ScriptCommand(d5power.D5ScriptCommand.IF);
                        this.Parse(sblock);
                        break;
                    case 'endif':
                        breakStatus = false;
                        break;
                    case 'switch':
                        sblock = new d5power.D5ScriptCommand(d5power.D5ScriptCommand.SWITCH);
                        this.Parse(sblock);
                        break;
                    case 'endswitch':
                        breakStatus = false;
                        break;
                    case 'for':
                        sblock = new d5power.D5ScriptCommand(d5power.D5ScriptCommand.FOR);
                        this.Parse(sblock);
                        break;
                    case 'endfor':
                        breakStatus = false;
                        break;
                    default:
                        sblock = new d5power.D5ScriptCommand();
                        break;
                }
                if (sblock != null) {
                    sblock.command = temp.shift();
                    if (temp.length > 1)
                        throw new Error("[D5ScriptParser] Too many params.There have " + temp.length + ' params.content is:' + temp);
                    sblock.params = temp[0] == null ? null : temp[0].toString().split(',');
                    block.addCommand(sblock);
                }
            }
        };
        p.onComplate = function (data) {
            var str = data;
            this.configTxt(str);
        };
        /**
         * 脚本词法提取
         */
        p.D5ScriptAt = function (arr) {
            var s = arr[this._lineno];
            this._lineno++;
            return s;
        };
        p.error = function () {
            throw new Error('D5ScriptParser is a single class.can not instance again.');
        };
        /**
         * 变量集合
         */
        D5ScriptParser._vars = {};
        return D5ScriptParser;
    })();
    d5power.D5ScriptParser = D5ScriptParser;
    egret.registerClass(D5ScriptParser,"d5power.D5ScriptParser");
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
var d5power;
(function (d5power) {
    var SilzAstar = (function () {
        /**
         * @param    mapdata        地图数据
         * @param    container    显示容器，若为null则不显示地图
         */
        function SilzAstar(mapdata, container) {
            if (container === void 0) { container = null; }
            /**
             * 地图显示尺寸
             */
            this._cellSize = 5;
            /**
             * 路径显示器
             */
            this.path = new egret.Sprite();
            /**
             * 地图显示器
             */
            this.image = new egret.Bitmap(); //new BitmapData(1, 1)
            /**
             * 显示容器
             */
            this.imageWrapper = new egret.DisplayObjectContainer();
            /**
             * 显示模式
             */
            this.isDisplayMode = false;
            if (container != null) {
                this.isDisplayMode = true;
                this.imageWrapper.addChild(this.image);
                container.addChild(this.imageWrapper);
                this.imageWrapper.addChild(this.path);
            }
            else {
                this.isDisplayMode = false;
            }
            this.makeGrid(mapdata);
        }
        var d = __define,c=SilzAstar;p=c.prototype;
        d(p, "WORKMODE",undefined
            ,function (v) {
                if (v != 8 && v != 4)
                    throw new Error('仅支持8方向或4方向寻路');
            }
        );
        /**
         * @param        xnow    当前坐标X(寻路格子坐标)
         * @param        ynow    当前坐标Y(寻路格子坐标)
         * @param        xpos    目标点X(寻路格子坐标)
         * @param        ypos    目标点Y(寻路格子坐标)
         */
        p.find = function (xnow, ynow, xpos, ypos) {
            xpos = Math.min(xpos, this._grid.numCols - 1);
            ypos = Math.min(ypos, this._grid.numRows - 1);
            xpos = Math.max(xpos, 0);
            ypos = Math.max(ypos, 0);
            this._grid.setEndNode(xpos, ypos); //1
            xnow = Math.min(xnow, this._grid.numCols - 1);
            ynow = Math.min(ynow, this._grid.numRows - 1);
            xnow = Math.max(xnow, 0);
            ynow = Math.max(ynow, 0);
            this._grid.setStartNode(xnow, ynow); //2
            if (this.isDisplayMode) {
                var time = egret.getTimer();
            }
            if (this.astar.findPath()) {
                this._index = 0;
                this.astar.floyd();
                this._path = this.astar.floydPath;
                if (this.isDisplayMode) {
                    time = egret.getTimer() - time;
                    console.log("[SilzAstar]", time + "ms   length:" + this.astar.path.length);
                    console.log("[SilzAstar]", this.astar.floydPath);
                    this.path.graphics.clear();
                    for (var i = 0; i < this.astar.floydPath.length; i++) {
                        var p = this.astar.floydPath[i];
                        this.path.graphics.lineStyle(0, 0xff0000);
                        this.path.graphics.drawCircle((p.x + 0.5) * this._cellSize, (p.y + 0.5) * this._cellSize, 2);
                        this.path.graphics.lineStyle(0, 0xff0000, 0.5);
                        this.path.graphics.moveTo(xnow, ynow);
                    }
                }
                return this._path;
            }
            else if (this.isDisplayMode) {
                this._grid.setEndNode(xpos - 1, ypos - 1);
                time = egret.getTimer() - time;
                console.log("[SilzAstar]", time + "ms 找不到");
            }
            return null;
        };
        p.makeGrid = function (data) {
            var rows = data.length;
            var cols = data[0].length;
            this._grid = new Grid(cols, rows);
            var px;
            var py;
            for (py = 0; py < rows; py++) {
                for (px = 0; px < cols; px++) {
                    this._grid.setWalkable(px, py, data[py][px] == 0);
                }
            }
            if (SilzAstar.WorkMode == 4)
                this._grid.calculateLinks(1);
            else
                this._grid.calculateLinks();
            this.astar = new AStar(this._grid);
            if (this.isDisplayMode) {
                this.drawGrid();
                this.path.graphics.clear();
            }
        };
        p.drawGrid = function () {
            console.log("fuck");
            //			this.image.bitmapData = new BitmapData(this._grid.numCols * this._cellSize, this._grid.numRows * this._cellSize, false, 0xffffff);
            //			for (var i:number = 0; i < this._grid.numCols; i++){
            //				for (var j:number = 0; j < this._grid.numRows; j++){
            //					var node:SilzAstarNode = this._grid.getNode(i, j);
            //					if (!node.walkable){
            //						this.image.bitmapData.fillRect(new egret.Rectangle(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize), this.getColor(node));
            //					}
            //				}
            //			}
        };
        p.getColor = function (node) {
            if (!node.walkable)
                return 0;
            if (node == this._grid.startNode)
                return 0xcccccc;
            if (node == this._grid.endNode)
                return 0xcccccc;
            return 0xffffff;
        };
        /**
         * 寻路方式，8方向和4方向，有效值为8和4
         */
        SilzAstar.WorkMode = 8;
        return SilzAstar;
    })();
    d5power.SilzAstar = SilzAstar;
    egret.registerClass(SilzAstar,"d5power.SilzAstar");
    var AStar = (function () {
        function AStar(grid) {
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this.nowversion = 1;
            this.TwoOneTwoZero = 2 * Math.cos(Math.PI / 3);
            this._grid = grid;
            this.heuristic = this.euclidian2;
        }
        var d = __define,c=AStar;p=c.prototype;
        p.justMin = function (x, y) {
            return x.f < y.f;
        };
        p.findPath = function () {
            this._endNode = this._grid.endNode;
            this.nowversion++;
            this._startNode = this._grid.startNode;
            //_open = [];
            this._open = new BinaryHeap(this.justMin);
            this._startNode.g = 0;
            return this.search();
        };
        p.floyd = function () {
            if (this.path == null)
                return;
            this._floydPath = this.path.concat();
            var len = this._floydPath.length;
            if (len > 2) {
                var vector = new SilzAstarNode(0, 0);
                var tempVector = new SilzAstarNode(0, 0);
                this.floydVector(vector, this._floydPath[len - 1], this._floydPath[len - 2]);
                for (var i = this._floydPath.length - 3; i >= 0; i--) {
                    this.floydVector(tempVector, this._floydPath[i + 1], this._floydPath[i]);
                    if (vector.x == tempVector.x && vector.y == tempVector.y) {
                        this._floydPath.splice(i + 1, 1);
                    }
                    else {
                        vector.x = tempVector.x;
                        vector.y = tempVector.y;
                    }
                }
            }
            len = this._floydPath.length;
            for (i = len - 1; i >= 0; i--) {
                for (var j = 0; j <= i - 2; j++) {
                    if (this.floydCrossAble(this._floydPath[i], this._floydPath[j])) {
                        for (var k = i - 1; k > j; k--) {
                            this._floydPath.splice(k, 1);
                        }
                        i = j;
                        len = this._floydPath.length;
                        break;
                    }
                }
            }
        };
        p.floydCrossAble = function (n1, n2) {
            var ps = this.bresenhamNodes(new egret.Point(n1.x, n1.y), new egret.Point(n2.x, n2.y));
            for (var i = ps.length - 2; i > 0; i--) {
                if (!this._grid.getNode(ps[i].x, ps[i].y).walkable) {
                    return false;
                }
            }
            return true;
        };
        p.bresenhamNodes = function (p1, p2) {
            var steep = Math.abs(p2.y - p1.y) > Math.abs(p2.x - p1.x);
            if (steep) {
                var temp = p1.x;
                p1.x = p1.y;
                p1.y = temp;
                temp = p2.x;
                p2.x = p2.y;
                p2.y = temp;
            }
            var stepX = p2.x > p1.x ? 1 : (p2.x < p1.x ? -1 : 0);
            var stepY = p2.y > p1.y ? 1 : (p2.y < p1.y ? -1 : 0);
            var deltay = (p2.y - p1.y) / Math.abs(p2.x - p1.x);
            var ret = [];
            var nowX = p1.x + stepX;
            var nowY = p1.y + deltay;
            if (steep) {
                ret.push(new egret.Point(p1.y, p1.x));
            }
            else {
                ret.push(new egret.Point(p1.x, p1.y));
            }
            while (nowX != p2.x) {
                var fy = Math.floor(nowY);
                var cy = Math.ceil(nowY);
                if (steep) {
                    ret.push(new egret.Point(fy, nowX));
                }
                else {
                    ret.push(new egret.Point(nowX, fy));
                }
                if (fy != cy) {
                    if (steep) {
                        ret.push(new egret.Point(cy, nowX));
                    }
                    else {
                        ret.push(new egret.Point(nowX, cy));
                    }
                }
                nowX += stepX;
                nowY += deltay;
            }
            if (steep) {
                ret.push(new egret.Point(p2.y, p2.x));
            }
            else {
                ret.push(new egret.Point(p2.x, p2.y));
            }
            return ret;
        };
        p.floydVector = function (target, n1, n2) {
            target.x = n1.x - n2.x;
            target.y = n1.y - n2.y;
        };
        p.search = function () {
            var node = this._startNode;
            node.version = this.nowversion;
            while (node != this._endNode) {
                var len = node.links.length;
                for (var i = 0; i < len; i++) {
                    var test = node.links[i].node;
                    var cost = node.links[i].cost;
                    var g = node.g + cost;
                    var h = this.heuristic(test);
                    var f = g + h;
                    if (test.version == this.nowversion) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.ins(test);
                        test.version = this.nowversion;
                    }
                }
                if (this._open.a.length == 1) {
                    return false;
                }
                node = (this._open.pop());
            }
            this.buildPath();
            return true;
        };
        p.buildPath = function () {
            this._path = [];
            var node = this._endNode;
            this._path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift(node);
            }
        };
        d(p, "path"
            ,function () {
                return this._path;
            }
        );
        d(p, "floydPath"
            ,function () {
                return this._floydPath;
            }
        );
        p.manhattan = function (node) {
            return Math.abs(node.x - this._endNode.x) + Math.abs(node.y - this._endNode.y);
        };
        p.manhattan2 = function (node) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            return dx + dy + Math.abs(dx - dy) / 1000;
        };
        p.euclidian = function (node) {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        p.chineseCheckersEuclidian2 = function (node) {
            var y = node.y / this.TwoOneTwoZero;
            var x = node.x + node.y / 2;
            var dx = x - this._endNode.x - this._endNode.y / 2;
            var dy = y - this._endNode.y / this.TwoOneTwoZero;
            return this.sqrt(dx * dx + dy * dy);
        };
        p.sqrt = function (x) {
            return Math.sqrt(x);
        };
        p.euclidian2 = function (node) {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return dx * dx + dy * dy;
        };
        p.diagonal = function (node) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        };
        return AStar;
    })();
    d5power.AStar = AStar;
    egret.registerClass(AStar,"d5power.AStar");
    var BinaryHeap = (function () {
        function BinaryHeap(justMinFun) {
            if (justMinFun === void 0) { justMinFun = null; }
            this.a = [];
            this.justMinFun = function (x, y) {
                return this.x < this.y;
            };
            this.a.push(-1);
            if (justMinFun != null)
                this.justMinFun = justMinFun;
        }
        var d = __define,c=BinaryHeap;p=c.prototype;
        p.ins = function (value) {
            var p = this.a.length;
            this.a[p] = value;
            var pp = p >> 1;
            while (p > 1 && this.justMinFun(this.a[p], this.a[pp])) {
                var temp = this.a[p];
                this.a[p] = this.a[pp];
                this.a[pp] = temp;
                p = pp;
                pp = p >> 1;
            }
        };
        p.pop = function () {
            var min = this.a[1];
            this.a[1] = this.a[this.a.length - 1];
            this.a.pop();
            var p = 1;
            var l = this.a.length;
            var sp1 = p << 1;
            var sp2 = sp1 + 1;
            while (sp1 < l) {
                if (sp2 < l) {
                    var minp = this.justMinFun(this.a[sp2], this.a[sp1]) ? sp2 : sp1;
                }
                else {
                    minp = sp1;
                }
                if (this.justMinFun(this.a[minp], this.a[p])) {
                    var temp = this.a[p];
                    this.a[p] = this.a[minp];
                    this.a[minp] = temp;
                    p = minp;
                    sp1 = p << 1;
                    sp2 = sp1 + 1;
                }
                else {
                    break;
                }
            }
            return min;
        };
        return BinaryHeap;
    })();
    d5power.BinaryHeap = BinaryHeap;
    egret.registerClass(BinaryHeap,"d5power.BinaryHeap");
    var Grid = (function () {
        function Grid(numCols, numRows) {
            this._straightCost = 1.0;
            this._diagCost = Math.SQRT2;
            this._numCols = numCols;
            this._numRows = numRows;
            this._nodes = new Array();
            for (var i = 0; i < this._numCols; i++) {
                this._nodes[i] = new Array();
                for (var j = 0; j < this._numRows; j++) {
                    this._nodes[i][j] = new SilzAstarNode(i, j);
                }
            }
        }
        var d = __define,c=Grid;p=c.prototype;
        /**
         *
         * @param   type    0四方向 1八方向 2跳棋
         */
        p.calculateLinks = function (type) {
            if (type === void 0) { type = 0; }
            this.type = type;
            for (var i = 0; i < this._numCols; i++) {
                for (var j = 0; j < this._numRows; j++) {
                    this.initNodeLink(this._nodes[i][j], type);
                }
            }
        };
        p.getType = function () {
            return this.type;
        };
        /**
         *
         * @param   node
         * @param   type    0八方向 1四方向 2跳棋
         */
        p.initNodeLink = function (node, type) {
            var startX = Math.max(0, node.x - 1);
            var endX = Math.min(this.numCols - 1, node.x + 1);
            var startY = Math.max(0, node.y - 1);
            var endY = Math.min(this.numRows - 1, node.y + 1);
            node.links = [];
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this.getNode(i, j);
                    if (test == node || !test.walkable) {
                        continue;
                    }
                    if (type != 2 && i != node.x && j != node.y) {
                        var test2 = this.getNode(node.x, j);
                        if (!test2.walkable) {
                            continue;
                        }
                        test2 = this.getNode(i, node.y);
                        if (!test2.walkable) {
                            continue;
                        }
                    }
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        if (type == 1) {
                            continue;
                        }
                        if (type == 2 && (node.x - test.x) * (node.y - test.y) == 1) {
                            continue;
                        }
                        if (type == 2) {
                            cost = this._straightCost;
                        }
                        else {
                            cost = this._diagCost;
                        }
                    }
                    node.links.push(new Link(test, cost));
                }
            }
        };
        p.getNode = function (x, y) {
            return this._nodes[x][y];
        };
        p.setEndNode = function (x, y) {
            this._endNode = this._nodes[x][y];
        };
        p.setStartNode = function (x, y) {
            this._startNode = this._nodes[x][y];
        };
        p.setWalkable = function (x, y, value) {
            this._nodes[x][y].walkable = value;
        };
        d(p, "endNode"
            ,function () {
                return this._endNode;
            }
        );
        d(p, "numCols"
            ,function () {
                return this._numCols;
            }
        );
        d(p, "numRows"
            ,function () {
                return this._numRows;
            }
        );
        d(p, "startNode"
            ,function () {
                return this._startNode;
            }
        );
        return Grid;
    })();
    d5power.Grid = Grid;
    egret.registerClass(Grid,"d5power.Grid");
    var Link = (function () {
        function Link(node, cost) {
            this.node = node;
            this.cost = cost;
        }
        var d = __define,c=Link;p=c.prototype;
        return Link;
    })();
    d5power.Link = Link;
    egret.registerClass(Link,"d5power.Link");
    var SilzAstarNode = (function () {
        //public var index:int;
        function SilzAstarNode(x, y) {
            this.walkable = true;
            //public var costMultiplier:Number = 1.0;
            this.version = 1;
            this.x = x;
            this.y = y;
        }
        var d = __define,c=SilzAstarNode;p=c.prototype;
        p.toString = function () {
            return "x:" + this.x + " y:" + this.y;
        };
        return SilzAstarNode;
    })();
    d5power.SilzAstarNode = SilzAstarNode;
    egret.registerClass(SilzAstarNode,"d5power.SilzAstarNode");
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
    var XML = (function () {
        function XML(data) {
            for (var k in data) {
                console.log(k, data[k]);
            }
        }
        var d = __define,c=XML;p=c.prototype;
        return XML;
    })();
    d5power.XML = XML;
    egret.registerClass(XML,"d5power.XML");
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
    var D5Camera = (function () {
        function D5Camera() {
            this._zorderSpeed = 600;
            /**
             * 视口左上角对应的世界坐标X
             */
            this._zeroX = 0;
            /**
             * 视口左上角对应的世界坐标Y
             */
            this._zeroY = 0;
            this._moveSpeed = 1;
            this._moveAngle = 0;
            if (D5Camera._cameraView == null)
                D5Camera._cameraView = new egret.Rectangle();
            this._cameraCutView = new egret.Rectangle();
        }
        var d = __define,c=D5Camera;p=c.prototype;
        d(D5Camera, "needreCut"
            ,function () {
                return D5Camera.$needreCut;
            }
        );
        d(p, "zeroX"
            ,function () {
                return isNaN(this._zeroX) ? 0 : this._zeroX;
            }
        );
        d(p, "zeroY"
            ,function () {
                return isNaN(this._zeroY) ? 0 : this._zeroY;
            }
        );
        p.setZero = function (x, y) {
            this._zeroX = x;
            this._zeroY = y;
            var value = d5power.D5Game.me.map.width - d5power.D5Game.me.screenWidth;
            this._zeroX = this._zeroX < 0 ? 0 : this._zeroX;
            this._zeroX = this._zeroX > value ? value : this._zeroX;
            value = d5power.D5Game.me.map.height - d5power.D5Game.me.screenHeight;
            this._zeroY = this._zeroY < 0 ? 0 : this._zeroY;
            this._zeroY = this._zeroY > value ? value : this._zeroY;
        };
        p.update = function () {
            if (this._focus) {
                this._zeroX = this._focus.posX - (d5power.D5Game.me.screenWidth >> 1);
                this._zeroY = this._focus.posY - (d5power.D5Game.me.screenHeight >> 1);
                //console.log("[D5Camera] update in _fouces",this._zeroX,this._zeroY,this._focus.posX,this._focus.posY);
                var value = d5power.D5Game.me.map.width - d5power.D5Game.me.screenWidth;
                this._zeroX = this._zeroX < 0 ? 0 : this._zeroX;
                this._zeroX = this._zeroX > value ? value : this._zeroX;
                value = d5power.D5Game.me.map.height - d5power.D5Game.me.screenHeight;
                this._zeroY = this._zeroY < 0 ? 0 : this._zeroY;
                this._zeroY = this._zeroY > value ? value : this._zeroY;
            }
            D5Camera._cameraView.x = this._zeroX;
            D5Camera._cameraView.y = this._zeroY;
            D5Camera._cameraView.width = d5power.D5Game.me.screenWidth;
            D5Camera._cameraView.height = d5power.D5Game.me.screenHeight;
        };
        /**
         * 镜头注视
         */
        p.setFocus = function (o) {
            this._focus = o;
            this.update();
            this.reCut();
        };
        d(p, "focus"
            ,function () {
                return this._focus;
            }
        );
        d(p, "moveSpeed",undefined
            /**
             * 镜头移动速度
             */
            ,function (s) {
                this._moveSpeed = s;
            }
        );
        d(D5Camera, "cameraView"
            /**
             * 镜头视野矩形
             * 返回镜头在世界地图内测区域
             */
            ,function () {
                return D5Camera._cameraView;
            }
        );
        d(p, "cameraCutView"
            /**
             * 镜头裁剪视野
             */
            ,function () {
                var zero_x = this._zeroX;
                var zero_y = this._zeroY;
                if (zero_x > 0)
                    zero_x -= d5power.D5Game.me.map.tileWidth * 2;
                if (zero_x > 0)
                    zero_y -= zero_y - d5power.D5Game.me.map.tileHeight * 2;
                zero_x = zero_x < 0 ? 0 : zero_x;
                zero_y = zero_y < 0 ? 0 : zero_y;
                this._cameraCutView.x = zero_x;
                this._cameraCutView.y = zero_y;
                this._cameraCutView.width = d5power.D5Game.me.screenWidth + d5power.D5Game.me.map.tileWidth * 2;
                this._cameraCutView.height = d5power.D5Game.me.screenHeight + d5power.D5Game.me.map.tileHeight * 2;
                return this._cameraCutView;
            }
        );
        /**
         * 镜头向上
         * @param    k    倍率
         */
        p.moveNorth = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0 || this._zeroY == 0)
                return;
            this.setFocus(null);
            this.setZero(this._zeroX, this._zeroY - this._moveSpeed * k);
            this.reCut();
        };
        /**
         * 镜头向下
         */
        p.moveSourth = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0)
                return;
            this.setFocus(null);
            this.setZero(this._zeroX, this._zeroY + this._moveSpeed * k);
            this.reCut();
        };
        /**
         * 镜头向左
         */
        p.moveWest = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0 || this._zeroX == 0)
                return;
            this.setFocus(null);
            this.setZero(this._zeroX - this._moveSpeed * k, this._zeroY);
            this.reCut();
        };
        /**
         * 镜头向右
         */
        p.moveEast = function (k) {
            if (k === void 0) { k = 1; }
            if (this._moveSpeed == 0)
                return;
            this.setFocus(null);
            this.setZero(this._zeroX + this._moveSpeed * k, this._zeroY);
            this.reCut();
        };
        p.move = function (xdir, ydir, k) {
            if (k === void 0) { k = 1; }
            this.setFocus(null);
            this.setZero(this._zeroX + this._moveSpeed * xdir * k, this._zeroY + this._moveSpeed * ydir * k);
            this.reCut();
        };
        /**
         * 镜头观察某点
         */
        p.lookAt = function (x, y) {
            this.setFocus(null);
            this.setZero(x - (d5power.D5Game.me.screenWidth >> 1), y - (d5power.D5Game.me.screenHeight >> 1));
            this.reCut();
        };
        p.flyTo = function (x, y, callback) {
            if (callback === void 0) { callback = null; }
            if (this._timer != null) {
                console.log("[D5Camera] Camera is moving,can not do this operation.");
                return;
            }
            this.setFocus(null);
            this._moveCallBack = callback;
            this._moveStart = new egret.Point(this._zeroX - (d5power.D5Game.me.screenWidth >> 1), this._zeroY - (d5power.D5Game.me.screenHeight >> 1));
            this._moveEnd = new egret.Point(x - (d5power.D5Game.me.screenWidth >> 1), y - (d5power.D5Game.me.screenHeight >> 1));
            this._timer = new egret.Timer(50);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.moveCamera, this);
            this._timer.start();
        };
        p.moveCamera = function (e) {
            var xspeed = (this._moveEnd.x - this._moveStart.x) / 5;
            var yspeed = (this._moveEnd.y - this._moveStart.y) / 5;
            this._moveStart.x += xspeed;
            this._moveStart.y += yspeed;
            this.setZero(this._moveStart.x, this._moveStart.y);
            if ((xspeed > -.5 && xspeed < .5) && (yspeed > -.5 && yspeed < .5)) {
                //_scene.Map.$Center = _moveEnd;
                this._moveEnd = null;
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.moveCamera, this);
                this._timer = null;
                this.reCut();
                if (this._moveCallBack != null)
                    this._moveCallBack();
            }
        };
        d(p, "zorderSpeed"
            ,function () {
                return this._zorderSpeed;
            }
        );
        p.reCut = function () {
            var list = d5power.D5Game.me.dataList;
            var length = list.length;
            var obj;
            var contains;
            for (var i = 0; i < length; i++) {
                obj = list[i];
                if (obj == d5power.D5Game.me.player)
                    continue;
                contains = D5Camera.cameraView.containsPoint(obj.$pos);
                //console.log("[D5Camera] check ",obj.$pos,D5Camera.cameraView);
                if (!obj.inScreen && contains) {
                    d5power.D5Game.me.add2Screen(obj);
                }
                else if (obj.inScreen && !contains) {
                    d5power.D5Game.me.remove4Screen(obj);
                }
            }
        };
        /**
         * 分布渲染时间限制。每次渲染的最大允许占用时间，单位毫秒
         */
        D5Camera.RenderMaxTime = 10;
        return D5Camera;
    })();
    d5power.D5Camera = D5Camera;
    egret.registerClass(D5Camera,"d5power.D5Camera",["d5power.ICamera"]);
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
    var D5Game = (function (_super) {
        __extends(D5Game, _super);
        function D5Game(mapid, startx, starty, onReady) {
            if (onReady === void 0) { onReady = null; }
            _super.call(this);
            this._lastZorder = 0;
            this._firstEnter = true;
            if (D5Game._me)
                this.error();
            this.touchEnabled = true;
            D5Game._me = this;
            this._runAction = this.run;
            this._startX = startx;
            this._startY = starty;
            this.buildMap(mapid);
            this._readyBack = onReady;
            this._camera = new d5power.D5Camera();
            this._container_map = new Layer();
            this._container = new Layer();
            this._container_far = new Layer();
            this._container_bottom = new Layer();
            this._container_top = new Layer();
            this._touch_layer = new egret.Sprite();
            this._touch_layer.touchEnabled = true;
            this.addChild(this._container_map);
            this.addChild(this._container_far);
            this.addChild(this._container_bottom);
            this.addChild(this._container);
            this.addChild(this._container_top);
            this.addChild(this._touch_layer);
            this._dataList = [];
            this._screenList = [];
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.install, this);
            /**
             * 重力跳跃测试
             */
            var that = this;
            document.addEventListener("keydown", function (event) {
                if (that._g && event.keyCode == 32) {
                    that.player.inG = true;
                    that.player.speedY = -20;
                }
            });
        }
        var d = __define,c=D5Game;p=c.prototype;
        d(D5Game, "me"
            ,function () {
                return D5Game._me;
            }
        );
        p.runScript = function (url) {
        };
        p.openGravity = function () {
            if (!this._g) {
                this._g = new d5power.D5Gravity();
                this._g.initGravity(0.8);
            }
        };
        d(p, "g"
            /**
             * 重力感应控制器
             */
            ,function () {
                return this._g;
            }
        );
        p.setCharacterData = function (data) {
            if (this._characterData != null) {
                return;
            }
            this._characterData = data;
        };
        p.setMissionDispatcher = function (data) {
            if (this._missionDispatcher != null)
                return;
            this._missionDispatcher = data;
        };
        d(p, "missionDispatcher"
            ,function () {
                return this._missionDispatcher;
            }
        );
        d(p, "characterData"
            ,function () {
                return this._characterData;
            }
        );
        p.initUI = function () {
        };
        p.showPackage = function () {
        };
        p.showChapterWin = function () {
        };
        p.showMission = function () {
        };
        p.showScript = function () {
        };
        //        public setDialogUI(ui:IDialog):void
        //        {
        //            this._dialog = ui;
        //        }
        p.notice = function (msg) {
            new d5power.Notice(D5Game.me.stage, msg);
        };
        p.collectionWithNPC = function (igd) {
        };
        p.pickupItem = function () {
        };
        p.canclePickup = function () {
        };
        p.pickup = function (time, callback) {
        };
        //------------------------华丽丽的分割线-----------------------------------------
        p.scriptWithNPC = function (igd) {
            this.runScript(igd.script);
        };
        p.talkWithNPC = function (igd) {
        };
        p.missionDialog = function (headurl, igd) {
        };
        p.onSelect = function (igd, index) {
        };
        p.showCheckMission = function (igd) {
        };
        p.dialog = function (url, nickname, say, igd) {
            if (igd === void 0) { igd = null; }
        };
        p.closeDialog = function () {
        };
        p.showNpcWindow = function (npc) {
        };
        //------------------------华丽丽的分割线-----------------------------------------
        p.alert = function (msg, ok, cancle, thisObj) {
        };
        d(p, "timer"
            ,function () {
                return this._timer;
            }
        );
        d(p, "screenWidth"
            ,function () {
                return this._screenW;
            }
        );
        d(p, "screenHeight"
            ,function () {
                return this._screenH;
            }
        );
        d(p, "camera"
            ,function () {
                return this._camera;
            }
        );
        d(p, "map"
            ,function () {
                return this._map;
            }
        );
        d(p, "dataList"
            ,function () {
                return this._dataList;
            }
        );
        d(p, "player"
            ,function () {
                return this._player;
            }
        );
        p.getIGDByUid = function (id) {
            var data = this._dataList;
            for (var i = 0; i < data.length; i++) {
                if (data[i].uid == id) {
                    return data[i];
                }
            }
            return null;
        };
        p.setPlayer = function (data) {
            this._player = data;
            this.add2Screen(data);
        };
        p.addObject = function (data) {
            this._dataList.push(data);
        };
        p.removeObject = function (index) {
            var data = this._dataList[index];
            data.dispose();
            this._dataList.splice(index, 1);
        };
        p.getClicker = function (px, py) {
            var i, j;
            var testList = new Array();
            var igd;
            for (i = 0, j = this._screenList.length; i < j; i++) {
                igd = this._screenList[i];
                if (igd.work != d5power.GOData.WORK_DOOR && igd != this._player && igd.displayer.hitTestArea(px, py))
                    testList.push(igd);
            }
            var shortY = function (a, b) {
                if (a.zOrder > b.zOrder)
                    return 1;
                else if (a.zOrder == b.zOrder)
                    return 0;
                else
                    return -1;
            };
            testList.sort(shortY);
            return testList[0];
        };
        /**
         * 任务加载完成后触发
         */
        p.missionLoaded = function () {
            var igd;
            for (var i = 0, j = this._screenList.length; i < j; i++) {
                igd = this._screenList[i];
                igd.loadMission();
            }
        };
        /**
         * 将某个角色添加进游戏场景
         * @param data          角色数据
         */
        p.add2Screen = function (data) {
            if (!data.inScreen) {
                data.setInScreen(true);
                console.log("[D5Game] in screen");
                // 这里需要关联GameObject进
                if (data.work == d5power.GOData.WORK_EVENT) {
                    data.setDisplayer(d5power.EventObject.getEvent());
                }
                else {
                    data.setDisplayer(data.work == d5power.GOData.WORK_DOOR ? d5power.DoorObject.getDoor() : d5power.GameObject.getInstance());
                }
                this._screenList.push(data);
                this._container.addChild(data.displayer);
                if (data.work == d5power.GOData.WORK_NPC)
                    data.loadMission();
                if (this._g)
                    this._g.addObject(data);
            }
        };
        p.remove4Screen = function (data) {
            data.setInScreen(false);
            if (data.displayer == null)
                return;
            var index = this._screenList.indexOf(data);
            if (index != -1)
                this.remove4ScreenByIndex(index);
        };
        p.remove4ScreenByIndex = function (index) {
            var data = this._screenList[index];
            if (this._container.contains(data.displayer))
                this._container.removeChild(data.displayer);
            data.setDisplayer(null);
            this._screenList.splice(index, 1);
        };
        p.changeMap = function (tomap, tox, toy) {
            this.reset();
            this._startX = tox;
            this._startY = toy;
            this.enterMap(tomap);
        };
        /**
         * 创建NPC
         * @param    s            位图资源名
         * @param    resname        缓冲池资源名
         * @param    name        NPC姓名
         * @param    pos            目前所在位置
         */
        p.createNPC = function (s, nickname, pos) {
            var data = d5power.GOData.getInstance();
            data.setRespath(D5Game.RES_SERVER + D5Game.ASSET_PATH + '/mapRes/' + s);
            data.setDirection(d5power.Direction.Down);
            data.setNickname(nickname);
            data.setWork(d5power.GOData.WORK_NPC);
            if (pos != null)
                data.setPos(pos.x, pos.y);
            this.addObject(data);
            return data;
        };
        p.createRoad = function (s, pos) {
            var data = d5power.GOData.getInstance();
            data.setRespath(D5Game.RES_SERVER + D5Game.ASSET_PATH + '/mapRes/' + s);
            data.setDirection(d5power.Direction.Down);
            data.setWork(d5power.GOData.WORK_DOOR);
            if (pos != null)
                data.setPos(pos.x, pos.y);
            this.addObject(data);
            return data;
        };
        /**
         * 根据配置文件进行场景的数据初始化
         */
        p.setup = function (data) {
            this._monsterConf = new Array();
            this._map.setContainer(this._container_map);
            this._map.setup(parseInt(data.id), parseInt(data.mapW), parseInt(data.mapH), parseInt(data.tileX), parseInt(data.tileY), this.init, this);
            if (data.gravity == "1")
                this.openGravity();
            if (data.music != "") {
                RES.getResByUrl(D5Game.RES_SERVER + data.music, this.playMusic, this);
            }
            if (data.far) {
                for (var i = 0; i < data.far.length; i++) {
                    var far = data.far[i];
                    if (far.far != "") {
                        var fartype = 0;
                        if (far.farType != "")
                            fartype = parseInt(far.farType);
                        this._map.setupFar(far.far, fartype, this._container_far, parseInt(far.farX), parseInt(far.farY));
                        break;
                    }
                }
            }
            if (data.tiled) {
                for (var i = 0; i < data.tiled.length; i++) {
                    var tiled = data.tiled[i];
                    if (tiled.tiled != "") {
                        var temp = 0;
                        if (tiled.tiledType != "")
                            temp = parseInt(tiled.tiledType);
                        var layer_arr = new Array();
                        if (tiled.tiledLayer != null) {
                            for (var m = 0, n = tiled.tiledLayer.length; m < n; m++) {
                                var layer = tiled.tiledLayer[m];
                                layer_arr.push(layer);
                            }
                        }
                        this._map.setupTiled(tiled.tiled, temp, layer_arr, this._container_bottom);
                        break;
                    }
                }
            }
            for (var i = 0; i < data.monster.length; i++) {
                var monster = data.monster[i];
                var conf = new d5power.MonsterFlushData();
                conf.format(monster);
                this._monsterConf.push(conf);
            }
            var length = data.npc.length;
            for (var i = 0; i < length; i++) {
                var npc = data.npc[i];
                var npcData = d5power.D5ConfigCenter.my.getNpcConf(npc.uid);
                var obj = d5power.GOData.getInstance();
                obj.setDirection(d5power.Direction.Down);
                obj.setRespath(npcData ? npcData.skin : D5Game.RES_SERVER + D5Game.ASSET_PATH + "/mapRes/" + npc.res);
                obj.setNickname(npc.name);
                obj.setPos(npc.posx, npc.posy);
                obj.setUid(npc.uid);
                obj.setSay(npc.say);
                obj.setScript(npc.script);
                obj.setWork(d5power.GOData.WORK_NPC);
                if (npc.job != null)
                    obj.setJob(parseInt(npc.job.type), npc.job.value, npc.job.num);
                this.addObject(obj);
            }
            var len = data.roadpoint.length;
            for (var i = 0; i < len; i++) {
                var door = data.roadpoint[i];
                var obj = d5power.GOData.getInstance();
                obj.setDirection(d5power.Direction.Down);
                obj.setRespath(D5Game.RES_SERVER + D5Game.ASSET_PATH + "/mapRes/" + door.res);
                obj.setLink(door.toMap, door.toX, door.toY);
                obj.setPos(door.posx, door.posy);
                obj.setWork(d5power.GOData.WORK_DOOR);
                this.addObject(obj);
            }
            if (data.event) {
                for (var i = 0; i < data.event.length; i++) {
                    var event = data.event[i];
                    var obj = d5power.GOData.getInstance();
                    obj.setChecktime(event.checktime);
                    obj.setChecksize(event.checksize);
                    obj.setCheckdel(event.checkdel);
                    obj.setScript(event.script);
                    obj.setPos(event.posx, event.posy);
                    obj.setWork(d5power.GOData.WORK_EVENT);
                    this.addObject(obj);
                }
            }
        };
        p.playMusic = function (data) {
            if (data) {
                this._sound = data;
                this._soundChannel = this._sound.play(0, 0);
            }
        };
        p.stopMusic = function () {
            if (this._sound && this._soundChannel) {
                this._soundChannel.stop();
                this._soundChannel = null;
            }
        };
        p.flushMoster = function () {
        };
        p.init = function () {
            this.flushMoster();
            this.initUI();
            console.log("[D5Game] Engine is ready.enjoy~");
            this.buildPlayer();
            if (this._player) {
                this._player.setPos(this._startX, this._startY);
                if (this._player.controller)
                    this._player.controller.setupListener();
                this._camera.update();
            }
            else {
                this._camera.lookAt(this._startX, this._startY);
            }
            if (D5Game.me.g) {
                //                this._player.controller.walkTo((<number>this._startX),(<number>this._startY));
                if (!D5Game.me.map.getRoadPass(this._startX, this._startY)) {
                    D5Game.me.g.addObject(this._player);
                    this._player.inG = true;
                    this._player.speedY = 3;
                }
            }
            if (this._readyBack != null) {
                this._readyBack();
                this._readyBack = null;
            }
            // 本代码务必在最后运行。由于设置了角色后，需要通过camera.update方法更新0点位置。只有在正确设置了0点后，再开始渲染，才能保证不会由于镜头瞬间跳跃，区块加载异步处理而导致的花屏。
            this.play();
        };
        d(p, "touchReciver"
            ,function () {
                return this._touch_layer;
            }
        );
        /**
         * 创建角色，请在子类中重写本方法，创建角色
         * 创建成功后，请通过setPlayer方法，设置为主角
         */
        p.buildPlayer = function () {
        };
        p.play = function () {
            this.addEventListener(egret.Event.ENTER_FRAME, this._runAction, this);
        };
        p.stop = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this._runAction, this);
        };
        p.run = function (e) {
            if (e === void 0) { e = null; }
            this._timer = egret.getTimer();
            this._map.render(false);
            this._map.runPos(this._dataList);
            if (this._g != null)
                this._g.run();
            for (var i = this._screenList.length - 1; i >= 0; i--) {
                if (this._screenList[i].deleting || !this._screenList[i].inScreen)
                    this._screenList.splice(i, 1);
            }
            var needOrder = this._timer - this._lastZorder > this._camera.zorderSpeed;
            if (needOrder) {
                this._screenList.sort(function (objA, objB) {
                    return objA.zOrder > objB.zOrder ? 1 : -1;
                });
                var child; // 场景对象
                var max = this._screenList.length;
                var item; // 循环对象
                while (max--) {
                    item = this._screenList[max].displayer;
                    if (max < this._container.numChildren) {
                        child = this._container.getChildAt(max);
                        if (child != item) {
                            this._container.setChildIndex(item, max);
                        }
                    }
                }
                this._lastZorder = this._timer;
                this._camera.reCut();
            }
            var render;
            while (true) {
                render = this._screenList[this._nowRend];
                if (render == null) {
                    this._nowRend = 0;
                    break;
                }
                render.renderMe();
                this._nowRend++;
                if (egret.getTimer() - this._timer > d5power.D5Camera.RenderMaxTime)
                    break;
            }
            //if(this._player) this._player.setPos(this._player.posX+2,this._player.posY);
            this._camera.update();
        };
        p.buildMap = function (id) {
            this._map = new d5power.D5Map(id);
        };
        p.reset = function () {
            this.stop();
            this.map.clear();
            var i;
            for (i = this._screenList.length - 1; i >= 0; i--)
                this.remove4ScreenByIndex(i);
            for (i = this._dataList.length - 1; i >= 0; i--)
                this.removeObject(i);
            this._player = null;
            this._camera.setFocus(null);
            this.stopMusic();
        };
        p.onResize = function (e) {
            this._screenW = this.stage.stageWidth;
            this._screenH = this.stage.stageHeight;
            this._touch_layer.graphics.clear();
            this._touch_layer.graphics.beginFill(0, 0);
            this._touch_layer.graphics.drawRect(0, 0, this._screenW, this._screenH);
            this._touch_layer.graphics.endFill();
            this._touch_layer.width = this._screenW;
            this._touch_layer.height = this._screenH;
        };
        p.install = function (e) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.install, this);
            this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.onResize(null);
            this.enterMap();
        };
        p.enterMap = function (mapid) {
            if (mapid === void 0) { mapid = -1; }
            RES.getResByUrl(D5Game.RES_SERVER + D5Game.ASSET_PATH + "/tiles/" + (mapid == -1 ? this._map.id : mapid) + "/mapconf.json", this.setup, this);
        };
        p.error = function () {
            throw new Error("[D5Game] Please get instance by (get me) function.");
        };
        /**
         * 游戏中的每“米”对应程序中的像素值
         */
        D5Game.MI = 50;
        /**
         * 游戏资源服务器，留空则为本地素材相对路径
         */
        D5Game.RES_SERVER = '';
        /**
         * 游戏资源的保存目录
         */
        D5Game.ASSET_PATH = 'resource/assets';
        return D5Game;
    })(egret.DisplayObjectContainer);
    d5power.D5Game = D5Game;
    egret.registerClass(D5Game,"d5power.D5Game");
})(d5power || (d5power = {}));

var d5power;
(function (d5power) {
    /**
     *
     * @author
     *
     */
    var D5Gravity = (function () {
        function D5Gravity() {
            this.JUMP_POWER = 5;
            this.JUMP_MAX = 2;
            this._objects = [];
        }
        var d = __define,c=D5Gravity;p=c.prototype;
        p.initGravity = function (gy, gx, jumppower) {
            if (gx === void 0) { gx = 0; }
            if (jumppower === void 0) { jumppower = 5; }
            this._gy = gy;
            this._gx = gx;
        };
        p.addObject = function (e) {
            if (this._objects.indexOf(e) == -1)
                this._objects.push(e);
        };
        p.removeObject = function (e) {
            var id = this._objects.indexOf(e);
            if (id != -1)
                this._objects.splice(id, 1);
        };
        p.clearObject = function () {
            this._objects = [];
        };
        d(p, "counts"
            ,function () {
                return this._objects.length;
            }
        );
        p.run = function () {
            // 更新所有的静态物体的位置
            var i;
            var j;
            var obj;
            var px;
            var py;
            var hit;
            for (i = this._objects.length; i > 0; i--) {
                obj = this._objects[i - 1];
                if (!obj.inG)
                    continue;
                if (!obj.inScreen)
                    this._objects.splice(i, 1);
                obj.speedX += this._gx;
                obj.speedY += this._gy;
                px = obj.posX + obj.speedX;
                py = obj.posY + obj.speedY;
                var p = d5power.D5Game.me.map.Postion2Tile(px, py);
                if (obj.speedY > 0 && d5power.D5Game.me.map.getRoadPass(p.x, p.y)) {
                    obj.inG = false;
                    obj.speedX = 0;
                    obj.speedY = 0;
                }
            }
        };
        return D5Gravity;
    })();
    d5power.D5Gravity = D5Gravity;
    egret.registerClass(D5Gravity,"d5power.D5Gravity");
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
     * 横向地图
     */
    var D5HMap = (function () {
        function D5HMap(id) {
            this._roadW = 60;
            this._roadH = 30;
            this._posX = 0;
            this._speed = 6.6;
            this._nowStartX = 0;
            this._count = 0;
            this._mapid = id;
            this._tempPoint = new egret.Point();
            this._tileList = [];
        }
        var d = __define,c=D5HMap;p=c.prototype;
        D5HMap.getTile = function () {
            if (D5HMap._pool.length > 0)
                return D5HMap._pool.pop();
            return new egret.Bitmap();
        };
        D5HMap.back2Pool = function (tile) {
            tile.texture = null;
            if (tile.parent)
                tile.parent.removeChild(tile);
            if (D5HMap._pool.indexOf(tile) == -1)
                D5HMap._pool.push(tile);
        };
        p.clear = function () {
        };
        p.runPos = function (dataList) {
            for (var i = dataList.length - 1; i >= 0; i--)
                dataList[i].deleting ? d5power.D5Game.me.removeObject(i) : dataList[i].run();
        };
        p.render = function (flush) {
            if (flush === void 0) { flush = false; }
            this._posX += this._speed;
            var startx = parseInt((this._posX / this._roadW));
            this.makeData(startx);
            var newRightFar;
            var newRightMiddle;
            for (var i = 0; i < 3; i++) {
                this._far[i].x -= this._speed * .12;
                if (this._far[i].x < -this._far[i].width) {
                    newRightFar = this._far[i];
                }
                this._middle[i].x -= this._speed * .6;
                if (this._middle[i].x < -this._middle[i].width) {
                    newRightMiddle = this._middle[i];
                }
            }
            if (newRightMiddle) {
                newRightMiddle.x = this._rightMiddle.x + this._rightMiddle.width;
                this._rightMiddle = newRightMiddle;
                this._layer_middle.cacheAsBitmap = true;
            }
            if (newRightFar) {
                newRightFar.x = this._rightFar.x + this._rightFar.width;
                this._rightFar = newRightFar;
                this._layer_far.cacheAsBitmap = true;
            }
            for (i = this._tileList.length - 1; i >= 0; i--) {
                newRightFar = this._tileList[i];
                newRightFar.x -= this._speed;
                if (newRightFar.x <= -newRightFar.width) {
                    D5HMap.back2Pool(newRightFar);
                    this._tileList.splice(i, 1);
                }
            }
        };
        p.reset = function () {
        };
        p.setContainer = function (container) {
            container.removeChildren();
            if (this._layer_far == null) {
                this._layer_far = new egret.DisplayObjectContainer();
                this._layer_middle = new egret.DisplayObjectContainer();
                this._layer_neer = new egret.DisplayObjectContainer();
            }
            else {
                this._layer_far.removeChildren();
                this._layer_middle.removeChildren();
                this._layer_neer.removeChildren();
            }
            container.addChild(this._layer_far);
            container.addChild(this._layer_middle);
            container.addChild(this._layer_neer);
        };
        p.setTileFormat = function (s) {
        };
        p.setup = function (id, w, h, tw, th, onReady, onReadyThis) {
            this._mapid = id;
            this._mapHeight = h;
            this._mapWidth = w;
            this._tileW = tw;
            this._tileH = th;
            this._onReady = onReady;
            this._onReadyThis = onReadyThis;
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/map.png', this.onResLoaded, this);
        };
        p.setupTiled = function (name, type, data, container) {
        };
        p.setupFar = function (name, type, container, far_x, far_y) {
        };
        d(p, "id"
            ,function () {
                return this._mapid;
            }
        );
        d(p, "width"
            ,function () {
                return this._mapWidth;
            }
        );
        d(p, "height"
            ,function () {
                return this._mapHeight;
            }
        );
        d(p, "tileWidth"
            ,function () {
                return this._tileW;
            }
        );
        d(p, "tileHeight"
            ,function () {
                return this._tileH;
            }
        );
        d(p, "roadWidth"
            ,function () {
                return this._roadW;
            }
        );
        d(p, "roadHeight"
            ,function () {
                return this._roadH;
            }
        );
        p.find = function (xnow, ynow, xpos, ypos) {
            return null;
        };
        p.getPointAround = function (center, from, r) {
            return null;
        };
        p.getRoadPass = function (px, py) {
            if (this._roadArr == null)
                return true;
            if (this._roadArr[py] == null || this._roadArr[py][px] != 0)
                return false;
            return true;
        };
        p.isInAlphaArea = function (px, py) {
            return false;
        };
        /**
         * 根据世界坐标获取在屏幕内的坐标
         */
        p.getScreenPostion = function (x, y) {
            this._tempPoint.x = x - d5power.D5Game.me.camera.zeroX;
            this._tempPoint.y = y - d5power.D5Game.me.camera.zeroY;
            return this._tempPoint;
        };
        /**
         * 根据屏幕某点坐标获取其在世界（全地图）内的坐标
         */
        p.getWorldPostion = function (x, y) {
            this._tempPoint.x = d5power.D5Game.me.camera.zeroX + x;
            this._tempPoint.y = d5power.D5Game.me.camera.zeroY + y;
            return this._tempPoint;
        };
        /**
         * 根据路点获得世界（全地图）内的坐标
         */
        p.tile2WorldPostion = function (x, y) {
            this._tempPoint.x = x * this._roadW + this._roadW * .5;
            this._tempPoint.y = y * this._roadH + this._roadH * .5;
            return this._tempPoint;
        };
        /**
         * 世界地图到路点的转换
         */
        p.Postion2Tile = function (px, py) {
            this._tempPoint.x = Math.floor(px / this._roadW);
            this._tempPoint.y = Math.floor(py / this._roadH);
            return this._tempPoint;
        };
        p.onResLoaded = function (data) {
            this._sheet = new egret.SpriteSheet(data);
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/resconf.json', this.onDataComplate, this);
        };
        p.onDataComplate = function (data) {
            if (data.uv) {
                for (var i = 0, j = data.uv.length; i < j; i++) {
                    this._sheet.createTexture(data.uv[i].name, data.uv[i].x, data.uv[i].y, data.uv[i].width, data.uv[i].height, 0, 0);
                }
            }
            this._far = [];
            this._middle = [];
            this._far[0] = new egret.Bitmap();
            this._far[1] = new egret.Bitmap();
            this._far[2] = new egret.Bitmap();
            this._far[0].texture = this._sheet.getTexture("far");
            this._far[1].texture = this._sheet.getTexture("far");
            this._far[2].texture = this._sheet.getTexture("far");
            this._rightFar = this._far[2];
            this._far[0].height = this._far[1].height = this._far[2].height = d5power.D5Game.me.screenWidth / this._rightFar.width * this._rightFar.height;
            this._far[0].width = this._far[1].width = this._far[2].width = d5power.D5Game.me.screenWidth;
            this._far[1].x = this._rightFar.width;
            this._far[2].x = this._rightFar.width * 2;
            this._layer_far.addChild(this._far[0]);
            this._layer_far.addChild(this._far[1]);
            this._layer_far.addChild(this._far[2]);
            this._middle[0] = new egret.Bitmap();
            this._middle[1] = new egret.Bitmap();
            this._middle[2] = new egret.Bitmap();
            this._middle[0].texture = this._sheet.getTexture("middle");
            this._middle[1].texture = this._sheet.getTexture("middle");
            this._middle[2].texture = this._sheet.getTexture("middle");
            this._rightMiddle = this._middle[2];
            this._middle[0].height = this._middle[1].height = this._middle[2].height = d5power.D5Game.me.screenWidth / this._rightMiddle.width * this._rightMiddle.height;
            this._middle[0].width = this._middle[1].width = this._middle[2].width = d5power.D5Game.me.screenWidth;
            this._middle[1].x = this._rightMiddle.width;
            this._middle[2].x = this._rightMiddle.width * 2;
            this._middle[0].y = this._middle[1].y = this._middle[2].y = this._rightFar.height * .3 * 1.5;
            this._layer_middle.addChild(this._middle[0]);
            this._layer_middle.addChild(this._middle[1]);
            this._layer_middle.addChild(this._middle[2]);
            this.resetRoad();
            if (this._onReady != null) {
                this._onReady.apply(this._onReadyThis);
            }
        };
        p.resetRoad = function () {
            this._roadArr = [];
            // 定义临时地图数据
            var h = Math.floor(d5power.D5Game.me.screenHeight / this._roadH);
            var w = Math.floor(d5power.D5Game.me.screenWidth / this._roadW) + 2;
            var land = Math.floor(d5power.D5Game.me.screenHeight * .25 * 3 / this._roadH);
            var value;
            for (var y = 0; y < h; y++) {
                var arr = new Array();
                for (var x = 0; x < w; x++) {
                    value = y != land ? 0 : 1;
                    arr.push(value);
                    if (value == 1) {
                        this.drawTile(y, x, arr);
                    }
                }
                this._roadArr.push(arr);
            }
        };
        p.drawTile = function (y, x, arr) {
            var tile;
            tile = D5HMap.getTile();
            if (x > 0 && arr != null && arr[x - 1] == 0) {
                tile.texture = this._sheet.getTexture("tile_left");
            }
            else if (arr == null || (x < arr.length - 1 && arr[x + 1] == 0)) {
                tile.texture = this._sheet.getTexture("tile_right");
            }
            else {
                tile.texture = this._sheet.getTexture("tile_middle");
            }
            tile.width = this._roadW;
            tile.height = this._roadW;
            tile.x = this._lastAdd == null ? x * this._roadW : this._lastAdd.x + this._roadW;
            tile.y = y * this._roadH;
            this._lastAdd = tile;
            this._layer_neer.addChild(tile);
            this._tileList.push(tile);
        };
        p.makeData = function (startx) {
            if (this._nowStartX == startx)
                return;
            this._nowStartX = startx;
            // 计数为0，重新计算当前随机生成的支撑类型
            if (this._count == 0) {
                this._lastAdd = null;
                // 若当前值为-1，则为空白，那么后续必须生成支撑物。否则当前为支撑物，则后续必然是空白
                this._rline = this._rline == -1 ? 8 + parseInt((3 * Math.random())) : -1;
                // 若生成的是空白，则随机在1-4个，若是支撑物，则随机2-8个
                this._count = this._rline == -1 ? 1 + parseInt((4 * Math.random())) : 2 + parseInt((8 * Math.random()));
            }
            var value;
            for (var y = 0, ym = this._roadArr.length; y < ym; y++) {
                var arr = this._roadArr[y];
                arr.shift();
                value = y != this._rline ? 0 : 1;
                arr.push(value);
                if (value == 1)
                    this.drawTile(y, arr.length - 1, this._count == 1 ? null : arr);
            }
            this._count--;
        };
        p.setDeviceorientation = function (b) {
        };
        D5HMap._pool = [];
        return D5HMap;
    })();
    d5power.D5HMap = D5HMap;
    egret.registerClass(D5HMap,"d5power.D5HMap",["d5power.IMap"]);
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
     * 2.5D透视地图
     */
    var D5Map = (function () {
        function D5Map(id) {
            this._tileFormat = '.jpg';
            this._roadW = 60;
            this._roadH = 30;
            this._nowStartX = -1;
            this._nowStartY = -1;
            this._nowName = '';
            this._nowTiledStartX = -1; //tiled当前显示 块X
            this._nowTiledStartY = -1; //tiled当前显示 块Y
            this._tiledRows = 1; //横向数量
            this._tiledCols = 1; //纵向数量
            this._isReady = false;
            this._tiledLoadNum = 0;
            /**
            * 设置重力感应
            * @param  b   boolean
            */
            this._deviceorientation = false;
            this._mapid = id;
        }
        var d = __define,c=D5Map;p=c.prototype;
        D5Map.rebuildPool = function (num) {
            if (D5Map._tilePool.length > num) {
                while (D5Map._tilePool.length > num)
                    D5Map._tilePool.pop();
            }
            else {
                while (D5Map._tilePool.length < num)
                    D5Map._tilePool.push(new egret.Bitmap());
            }
            //console.log("[D5Map] there are ",num,"tiles in pool.");
        };
        D5Map.back2pool = function (data) {
            if (D5Map._tilePool.indexOf(data) == -1)
                D5Map._tilePool.push(data);
            //console.log("[D5Map] 1 tiles get home.there are ",D5Map._tilePool.length,"tiles in pool.");
        };
        D5Map.getTile = function () {
            var data;
            data = D5Map._tilePool.length ? D5Map._tilePool.pop() : new egret.Bitmap();
            //console.log("[D5Map] pop 1 tiles.there are ",D5Map._tilePool.length,"tiles in pool.");
            data.texture = null;
            return data;
        };
        d(p, "id"
            ,function () {
                return this._mapid;
            }
        );
        p.setContainer = function (container) {
            if (container == this._dbuffer)
                return;
            if (this._dbuffer != null) {
                this._dbuffer.removeChildren();
                if (this._dbuffer.parent)
                    this._dbuffer.parent.removeChild(this._dbuffer);
            }
            this._dbuffer = container;
        };
        p.setTileFormat = function (s) {
            if (s.substr(0, 1) != '.')
                s = "." + s;
            this._tileFormat = s;
        };
        p.setup = function (id, w, h, tw, th, onReady, onReadyThis) {
            this._mapid = id;
            this._mapHeight = h;
            this._mapWidth = w;
            this._tileW = tw;
            this._tileH = th;
            this._onReady = onReady;
            this._onReadyThis = onReadyThis;
            this._nowStartX = -1;
            this._nowStartY = -1;
            var onSmallMapLoaded = function (data) {
                this._smallMap = data;
                this._smallMap = new egret.SpriteSheet(data);
                this.createSmallData(data.textureWidth, data.textureHeight);
                RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/roadmap.bin', this.setupRoad, this, RES.ResourceItem.TYPE_BIN);
            };
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/s.jpg', onSmallMapLoaded, this);
        };
        p.createSmallData = function (smallW, smallH) {
            var smallWidth = smallW / (this._mapWidth / this._tileW);
            var smallHeight = smallH / (this._mapHeight / this._tileH);
            var i;
            var l;
            for (l = 0; l < this._mapWidth / this._tileW; l++) {
                for (i = 0; i < this._mapHeight / this._tileH; i++) {
                    this._smallMap.createTexture('small' + l + '_' + i, i * smallWidth, l * smallHeight, smallWidth, smallHeight, 0, 0);
                }
            }
        };
        d(p, "width"
            ,function () {
                return this._mapWidth;
            }
        );
        d(p, "height"
            ,function () {
                return this._mapHeight;
            }
        );
        d(p, "tileWidth"
            ,function () {
                return this._tileW;
            }
        );
        d(p, "tileHeight"
            ,function () {
                return this._tileH;
            }
        );
        d(p, "roadWidth"
            ,function () {
                return this._roadW;
            }
        );
        d(p, "roadHeight"
            ,function () {
                return this._roadH;
            }
        );
        p.runPos = function (dataList) {
            for (var i = dataList.length - 1; i >= 0; i--) {
                dataList[i].deleting ? d5power.D5Game.me.removeObject(i) : dataList[i].run();
            }
        };
        p.render = function (flush) {
            if (flush === void 0) { flush = false; }
            if (this.mod_buffer) {
                this.mod_buffer = false;
                this._dbuffer.cacheAsBitmap = true;
            }
            var startx = parseInt((d5power.D5Game.me.camera.zeroX / this._tileW));
            var starty = parseInt((d5power.D5Game.me.camera.zeroY / this._tileH));
            this.makeData(startx, starty, flush); // 只有在采用大地图背景的前提下才不断修正数据
            this.makeTiledData(); //不断更新tiled地图数据  
            this.makeFarData(); //不断更新远景地图
            if (this._nowStartX == startx && this._nowStartY == starty && this._posFlush != null) {
                var zero_x = d5power.D5Game.me.camera.zeroX % this._tileW;
                var zero_y = d5power.D5Game.me.camera.zeroY % this._tileH;
                this._dbuffer.x = -zero_x;
                this._dbuffer.y = -zero_y;
            }
        };
        p.resize = function () {
            this._areaX = Math.ceil(d5power.D5Game.me.screenWidth / this._tileW) + 1;
            this._areaY = Math.ceil(d5power.D5Game.me.screenHeight / this._tileH) + 1;
            console.log("[D5Game] max tiles number ", this._areaX, this._areaY);
            D5Map.rebuildPool(this._areaX * this._areaY + this._areaX + this._areaY);
        };
        /**
         * 重置地图数据
         */
        p.resetRoad = function () {
            this._roadArr = [];
            this._alphaArr = [];
            // 定义临时地图数据
            var h = Math.floor(this._mapHeight / this._roadH);
            var w = Math.floor(this._mapWidth / this._roadW);
            for (var y = 0; y < h; y++) {
                var arr = new Array();
                var arr2 = new Array();
                for (var x = 0; x < w; x++) {
                    arr.push(0);
                    arr2.push(0);
                }
                this._roadArr.push(arr);
                this._alphaArr.push(arr2);
            }
        };
        /**
         * 设置地图数据
         * @param data
         */
        p.setRoad = function (data) {
            this._roadArr = data;
        };
        p.isInAlphaArea = function (px, py) {
            var tile = this.Postion2Tile(px, py);
            return this._alphaArr[tile.y] && this._alphaArr[tile.y][tile.x] == D5Map.BIN_ALPHA_VALUE;
        };
        p.getPointAround = function (center, from, r) {
            var i = 0;
            var max = 10;
            var step = Math.PI * 2 / max;
            var gotoP = new egret.Point();
            var angle = d5power.GMath.getPointAngle(center.x - from.x, center.y - from.y) + (Math.random() > .5 ? 1 : -1) * Math.PI / 8;
            while (i < max) {
                var n = step * i + angle;
                gotoP.x = center.x - r * Math.cos(n);
                gotoP.y = center.y - r * Math.sin(n);
                if (this.PointCanMove(gotoP, from)) {
                    return gotoP;
                    break;
                }
                i++;
            }
            return null;
        };
        p.PointCanMove = function (p, n) {
            if (this._astar == null)
                return true;
            var nodeArr = this._astar.find(n.x, n.y, p.x, p.y);
            return nodeArr != null;
        };
        p.getRoadPass = function (px, py) {
            if (this._roadArr[py] == null || this._roadArr[py][px] != 0)
                return false;
            return true;
        };
        p.find = function (xnow, ynow, xpos, ypos) {
            return this._astar == null ? null : this._astar.find(xnow, ynow, xpos, ypos);
        };
        /**
         * 根据屏幕某点坐标获取其在世界（全地图）内的坐标
         */
        p.getWorldPostion = function (x, y) {
            this._tempPoint.x = d5power.D5Game.me.camera.zeroX + x;
            this._tempPoint.y = d5power.D5Game.me.camera.zeroY + y;
            return this._tempPoint;
        };
        /**
         * 根据世界坐标获取在屏幕内的坐标
         */
        p.getScreenPostion = function (x, y) {
            this._tempPoint.x = x - d5power.D5Game.me.camera.zeroX;
            this._tempPoint.y = y - d5power.D5Game.me.camera.zeroY;
            return this._tempPoint;
        };
        /**
         * 根据路点获得世界（全地图）内的坐标
         */
        p.tile2WorldPostion = function (x, y) {
            this._tempPoint.x = x * this._roadW + this._roadW * .5;
            this._tempPoint.y = y * this._roadH + this._roadH * .5;
            return this._tempPoint;
        };
        /**
         * 世界地图到路点的转换
         */
        p.Postion2Tile = function (px, py) {
            if (this._tempPoint == null)
                this._tempPoint = new egret.Point();
            this._tempPoint.x = Math.floor(px / this._roadW);
            this._tempPoint.y = Math.floor(py / this._roadH);
            return this._tempPoint;
        };
        p.reset = function () {
            this._tempPoint = new egret.Point();
            this._mapResource = { tiles: new Object() };
            this._dbuffer.removeChildren();
            //            this._tiledResource = {};
        };
        /**
         * 设置路点。至此，地图准备完毕，通知主程序开始渲染
         * @param data
         */
        p.setupRoad = function (res) {
            if (res == null || res == undefined) {
                this.resetRoad();
            }
            else {
                var data = new egret.ByteArray();
                //data.setArrayBuffer(res);
                data['_setArrayBuffer'](res);
                var sign = data.readUTFBytes(5);
                var value;
                var px = 0;
                var py = 0;
                if (sign == 'D5Map') {
                    py = data.readShort();
                    px = data.readShort();
                    var resmap = [];
                    for (var y = 0; y < py; y++) {
                        var temp = [];
                        for (var x = 0; x < px; x++) {
                            temp.push(data.readByte());
                        }
                        resmap.push(temp);
                    }
                    this.resetRoad();
                    if (px > 1) {
                        var h = Math.floor(this._mapHeight / this._roadH);
                        var w = Math.floor(this._mapWidth / this._roadW);
                        var k = w == px && h == py ? 1 : py / h;
                        for (y = 0; y < h; y++) {
                            for (x = 0; x < w; x++) {
                                try {
                                    py = Math.floor(y * k);
                                    px = Math.floor(x * k);
                                    value = resmap[py][px];
                                    this._roadArr[y][x] = value == D5Map.BIN_NO_VALUE ? 1 : 0;
                                    this._alphaArr[y][x] = value;
                                }
                                catch (e) {
                                    trace("［D5Map］路点超出范围Y:X(" + y + ":" + x + ")", py, px);
                                    this._roadArr[y][x] = D5Map.BIN_NO_VALUE;
                                    this._alphaArr[y][x] = D5Map.BIN_NO_VALUE;
                                }
                            }
                        }
                    }
                }
                else {
                    console.log("[D5Map]非法的地图配置文件");
                }
            }
            this.reset();
            this.resize();
            this._astar = new d5power.SilzAstar(this._roadArr);
            if (this._onReady != null) {
                this._onReady.apply(this._onReadyThis);
            }
        };
        p.makeData = function (startx, starty, flush) {
            if (this._nowStartX == startx && this._nowStartY == starty)
                return;
            this._nowStartX = startx;
            this._nowStartY = starty;
            this._posFlush = [];
            for (var i = 0, j = this._dbuffer.numChildren; i < j; i++) {
                this._dbuffer.getChildAt(i).texture = null;
            }
            //this.fillSmallMap(startx, starty);
            var maxY = Math.min(starty + this._areaY, Math.floor(this._mapHeight / this._tileH));
            var maxX = Math.min(startx + this._areaX, Math.floor(this._mapWidth / this._tileW));
            var key;
            for (var y = starty; y < maxY; y++) {
                for (var x = startx; x < maxX; x++) {
                    key = y + '_' + x;
                    if (x < 0 || y < 0) {
                        continue;
                    }
                    else if (this._mapResource.tiles[key] == null) {
                        this._posFlush.push(y + '_' + x + '_' + this._nowStartX + '_' + this._nowStartY + '_' + this._mapid);
                        this.fillSmallMap(y, x, (x - this._nowStartX), (y - this._nowStartY));
                    }
                    else {
                        this.fillTile((x - this._nowStartX), (y - this._nowStartY), this._mapResource.tiles[key]);
                    }
                }
            }
            this.loadTiles();
        };
        p.clear = function () {
            this._mapResource = { tiles: new Object() };
            var loop;
            while (this._dbuffer.numChildren) {
                loop = this._dbuffer.removeChildAt(0);
                loop.texture = null;
                D5Map.back2pool(loop);
            }
            if (this._tiledBuff) {
                while (this._tiledBuff.numChildren) {
                    loop = this._tiledBuff.removeChildAt(0);
                    loop.texture = null;
                    D5Map.back2pool(loop);
                }
            }
            this.tmx = null;
            this._isReady = false;
            this._tiledLayerData = null;
            this._tiledResource = null;
            this._nowName = '';
        };
        p.loadTiles = function (data) {
            if (data === void 0) { data = null; }
            if (data != null) {
                var pos = this._nowName.split('_');
                if (parseInt(pos[4]) != this._mapid) {
                    console.log("[D5Map] 读取了已切换了的地图资源");
                    return;
                }
                var tileName = pos[0] + "_" + pos[1];
                if (this._mapResource.tiles[tileName] == null)
                    this._mapResource.tiles[tileName] = data;
                // 若加载后位置已变更，则只存储不渲染
                var tx = parseInt(pos[1]) - this._nowStartX;
                var ty = parseInt(pos[0]) - this._nowStartY;
                if (parseInt(pos[2]) == this._nowStartX && parseInt(pos[3]) == this._nowStartY) {
                    this.fillTile(tx, ty, data);
                }
                this._nowName = '';
            }
            if (this._posFlush.length == 0) {
                this._dbuffer.cacheAsBitmap = false;
                this.mod_buffer = true;
            }
            else if (this._nowName == '') {
                this._nowName = this._posFlush.pop();
                var pos = this._nowName.split('_');
                var name = d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + "/tiles/" + this._mapid + "/" + pos[0] + "_" + pos[1] + this._tileFormat;
                RES.getResByUrl(name, this.loadTiles, this);
            }
        };
        p.fillTile = function (tx, ty, data) {
            var bitmap = this._dbuffer.getChildByName(tx + "_" + ty);
            if (bitmap == null) {
                bitmap = D5Map.getTile();
                bitmap.x = tx * this._tileW;
                bitmap.y = ty * this._tileH;
                bitmap.name = tx + "_" + ty;
                this._dbuffer.addChild(bitmap);
            }
            bitmap.texture = data;
            this._dbuffer.cacheAsBitmap = true;
        };
        /**
         * 绘制小地图
         */
        p.fillSmallMap = function (startX, startY, tx, ty) {
            var data = this._smallMap.getTexture('small' + startX + '_' + startY);
            var bitmap = this._dbuffer.getChildByName(tx + "_" + ty);
            if (bitmap == null) {
                bitmap = D5Map.getTile();
                bitmap.x = tx * this._tileW;
                bitmap.y = ty * this._tileH;
                bitmap.fillMode = egret.BitmapFillMode.SCALE;
                bitmap.name = tx + "_" + ty;
                this._dbuffer.addChild(bitmap);
            }
            bitmap.texture = data;
            bitmap.width = this._tileW;
            bitmap.height = this._tileH;
            this._dbuffer.cacheAsBitmap = true;
        };
        /**
         * 加载 tiled配置文件
         */
        p.setupTiled = function (name, type, data, container) {
            this._tiledResource = {};
            this._tiledType = type;
            this._tiledLayerData = data;
            this._tiledBuff = container;
            this._tiledName = name;
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/' + name, this.onTiledLoaded, this);
        };
        p.onTiledLoaded = function (data) {
            if (data) {
                this.tmx = new d5power.TiledMap();
                this.tmx.format(data);
                this._nowTiledSet = this.tmx.imgLib[this._tiledLoadNum];
                var url = d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/' + this._nowTiledSet.imageSource;
                RES.getResByUrl(url, this.loadTiled, this);
            }
        };
        /**
         * 解析tiled 地图 元素
         */
        p.loadTiled = function (data) {
            if (data === void 0) { data = null; }
            this._tiledLoadNum++;
            d5power.TiledResourceData.setupResLib(this._tiledName, data, this._nowTiledSet);
            if (this._tiledLoadNum < this.tmx.imgLib.length) {
                this._nowTiledSet = this.tmx.imgLib[this._tiledLoadNum];
                var url = d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/' + this._nowTiledSet.imageSource;
                RES.getResByUrl(url, this.loadTiled, this);
                return;
            }
            else {
                var mapTiles;
                var mapTilesX, mapTilesY;
                for (var layer_num = 0; layer_num < this._tiledLayerData.length; ++layer_num) {
                    var layer = this._tiledLayerData[layer_num];
                    if (layer.data == null)
                        break;
                    mapTiles = d5power.Base64.decodeToArray(layer.data, layer.width, false);
                    mapTilesX = mapTiles.length;
                    for (var i = 0; i < mapTilesX; ++i) {
                        mapTilesY = mapTiles[i].length;
                        for (var j = 0; j < mapTilesY; ++j) {
                            if (mapTiles[i][j] != 0) {
                                var bit = new egret.Bitmap;
                                var txture = new egret.Texture;
                                txture = d5power.TiledResourceData.getResource(this._tiledName, mapTiles[i][j]);
                                bit.texture = txture;
                                this._tiledResource[layer_num + "_" + i + "_" + j] = txture;
                            }
                        }
                    }
                }
                this._isReady = true;
                this._tiledLoadNum = 0;
            }
        };
        /**
         * 重置 刷新 tiled地图
         */
        p.makeTiledData = function () {
            if (!this.tmx)
                return;
            if (!this._isReady)
                return;
            this._tiledareaX = Math.floor(d5power.D5Game.me.screenWidth / this.tmx.tileWidth) + 1;
            this._tiledareaY = Math.floor(d5power.D5Game.me.screenHeight / this.tmx.tileHeight) + 1;
            var startx = Math.floor(d5power.D5Game.me.camera.zeroX / this.tmx.tileWidth);
            var starty = Math.floor(d5power.D5Game.me.camera.zeroY / this.tmx.tileHeight);
            var zero_x = d5power.D5Game.me.camera.zeroX % this.tmx.tileWidth;
            var zero_y = d5power.D5Game.me.camera.zeroY % this.tmx.tileHeight;
            this._tiledBuff.x = -zero_x;
            this._tiledBuff.y = -zero_y;
            if (this._nowTiledStartX == startx && this._nowTiledStartY == starty)
                return;
            this._nowTiledStartX = startx;
            this._nowTiledStartY = starty;
            this._tiledRows = this.tmx.width;
            this._tiledCols = this.tmx.height;
            var mapTiles;
            var mapTilesX, mapTilesY;
            var i, j;
            for (i = 0, j = this._tiledBuff.numChildren; i < j; i++) {
                this._tiledBuff.getChildAt(i).texture = null;
            }
            var maxX = Math.ceil(d5power.D5Game.me.stage.stageWidth / this.tmx.tileWidth) + startx + 1;
            var maxY = Math.ceil(d5power.D5Game.me.stage.stageHeight / this.tmx.tileHeight) + starty + 1;
            var key;
            for (i = 0, j = this.tmx.layers_ordered.length; i < j; i++) {
                for (var m = starty; m < maxY; m++) {
                    for (var n = startx; n < maxX; n++) {
                        //                        key = i + "_" + m + "_" + n;
                        key = this.fillTiledMap(i, m, n);
                        var bit = new egret.Bitmap();
                        var texture = this._tiledResource[key];
                        var temp = this._tiledBuff.getChildByName(key);
                        if (bit) {
                            if (temp) {
                                temp.texture = texture;
                                temp.x = (n - startx) * this.tmx.tileWidth;
                                temp.y = (m - starty) * this.tmx.tileHeight;
                            }
                            else {
                                this._tiledBuff.addChild(bit);
                                bit.name = key;
                                bit.texture = texture;
                                bit.x = (n - startx) * this.tmx.tileWidth;
                                bit.y = (m - starty) * this.tmx.tileHeight;
                            }
                        }
                        else {
                            if (temp)
                                temp.texture = null;
                        }
                    }
                }
            }
            this._tiledBuff.cacheAsBitmap = true;
        };
        /**
         * tiled 填充tiled地图
         */
        p.fillTiledMap = function (tx, ty, tz) {
            var result = "";
            result += tx;
            switch (this._tiledType) {
                case 2:
                    result += "_" + ty % this._tiledCols + "_" + tz;
                    break;
                case 1:
                    result += "_" + ty + "_" + tz % this._tiledRows;
                    break;
                case 3:
                    result += "_" + ty % this._tiledCols + "_" + tz % this._tiledRows;
                    break;
                case 0:
                default:
                    result += "_" + ty + "_" + tz;
                    break;
            }
            return result;
        };
        p.setupFar = function (name, type, container, far_x, far_y) {
            this._farName = name;
            this._farType = type;
            this._farBuff = container;
            this._far_x = far_x;
            this._far_y = far_y;
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + '/tiles/' + this._mapid + '/' + name, this.onFarLoaded, this);
        };
        p.onFarLoaded = function (data) {
            if (data) {
                if (!this._farDisplayer) {
                    this._farDisplayer = new egret.Bitmap();
                    this._farBuff.addChild(this._farDisplayer);
                }
                this._farDisplayer.texture = data;
                var f_w;
                var f_h;
                switch (this._farType) {
                    case 1:
                        this._farDisplayer.fillMode = egret.BitmapFillMode.REPEAT;
                        f_w = this._mapWidth;
                        f_h = data.textureHeight;
                        break;
                    case 2:
                        this._farDisplayer.fillMode = egret.BitmapFillMode.REPEAT;
                        f_w = data.textureWidth;
                        f_h = this._mapHeight;
                        break;
                    case 3:
                        this._farDisplayer.fillMode = egret.BitmapFillMode.REPEAT;
                        f_w = this._mapWidth;
                        f_h = this._mapHeight;
                        break;
                    case 0:
                    default:
                        this._farDisplayer.fillMode = egret.BitmapFillMode.SCALE;
                        f_w = data.textureWidth;
                        f_h = data.textureHeight;
                        break;
                }
                this._farDisplayer.width = f_w;
                this._farDisplayer.height = f_h;
                this._farDisplayer.x = this._far_x;
                this._farDisplayer.y = this._far_y;
                this._farBuff.cacheAsBitmap = true;
            }
        };
        /**
        * 重置 刷新 tiled地图
        */
        p.makeFarData = function () {
            if (this._farBuff) {
                this._farBuff.x = -d5power.D5Game.me.camera.zeroX;
                this._farBuff.y = -d5power.D5Game.me.camera.zeroY;
            }
        };
        p.setDeviceorientation = function (b) {
            this._deviceorientation = b;
            b ? window.addEventListener("deviceorientation", this.ondeviceorientation) : window.removeEventListener("deviceorientation", this.ondeviceorientation);
        };
        d(p, "Deviceorientation"
            ,function () {
                return this._deviceorientation;
            }
        );
        p.ondeviceorientation = function (e) {
            //            console.log(Math.floor(e.beta), Math.floor(e.gamma), Math.floor(e.alpha));
        };
        /**
         * 在二进制文件中，由于需要1个字节表示多个状态。因此采用大于0的值表示可通过
         * 在导入后进行了转义
         */
        D5Map.BIN_ALPHA_VALUE = 2;
        D5Map.BIN_CAN_VALUE = 1;
        D5Map.BIN_NO_VALUE = 0;
        D5Map._tilePool = new Array();
        return D5Map;
    })();
    d5power.D5Map = D5Map;
    egret.registerClass(D5Map,"d5power.D5Map",["d5power.IMap"]);
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
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        /**
         * @param    ctrl    控制器
         */
        function GameObject() {
            _super.call(this);
            this.ID = 0;
            this._playFrame = 0;
            this._alphaCheckTime = 0;
            this._loadID = 0;
            this._flag = false;
            this._monitor = new egret.Bitmap();
        }
        var d = __define,c=GameObject;p=c.prototype;
        GameObject.setupMissionIcon = function (res) {
            var perW = res._bitmapWidth >> 2;
            var perH = res._bitmapHeight;
            GameObject._missionIcon = new egret.SpriteSheet(res);
            for (var i = 0; i < 4; i++)
                GameObject._missionIcon.createTexture("mission" + i, i * perW, 0, perW, perH, 0, 0);
        };
        d(GameObject, "MissionOver"
            ,function () {
                return GameObject._missionIcon == null ? null : GameObject._missionIcon.getTexture("mission0");
            }
        );
        d(GameObject, "MissionOver0"
            ,function () {
                return GameObject._missionIcon == null ? null : GameObject._missionIcon.getTexture("mission1");
            }
        );
        d(GameObject, "MissionStart"
            ,function () {
                return GameObject._missionIcon == null ? null : GameObject._missionIcon.getTexture("mission2");
            }
        );
        d(GameObject, "MissionStart0"
            ,function () {
                return GameObject._missionIcon == null ? null : GameObject._missionIcon.getTexture("mission3");
            }
        );
        GameObject.getInstance = function () {
            var obj;
            if (GameObject._pool.length) {
                obj = GameObject._pool.pop();
            }
            else {
                obj = new GameObject();
            }
            return obj;
        };
        GameObject.back2pool = function (obj) {
            if (GameObject._pool.length < GameObject.MAX_POOL_NUM && GameObject._pool.indexOf(obj) == -1)
                GameObject._pool.push(obj);
        };
        d(p, "loadID"
            ,function () {
                return this._loadID;
            }
        );
        d(p, "inScreen"
            ,function () {
                return this._inScreen;
            }
        );
        d(p, "deleteing"
            ,function () {
                return this._deleting;
            }
        );
        d(p, "camp"
            ,function () {
                return this._camp;
            }
        );
        p.hitTestArea = function (px, py) {
            if (this._spriteSheet == null)
                return false;
            return (px >= this.x + this._spriteSheet.gX && py >= this.y + this._spriteSheet.gY && px < this.x + this._spriteSheet.gX + this._spriteSheet.frameWidth && py <= this.y + this._spriteSheet.gY + this.spriteSheet.frameHeight);
        };
        /**
         * 渲染自己在屏幕上输出
         */
        p.renderMe = function () {
            // 控制总体刷新率
            this.renderAction();
            this._drawAction != null ? this._drawAction() : 0;
        };
        d(p, "spriteSheet"
            ,function () {
                return this._spriteSheet;
            }
        );
        p.setupData = function (data) {
            this._data = data;
        };
        p.dispose = function () {
            if (this._spriteSheet) {
                this._spriteSheet.unlink();
                this._spriteSheet = null;
            }
            this._data = null;
            this._monitor.texture = null;
            this._drawAction = null;
            this._loadID = 0;
            this._playFrame = 0;
            if (this._missionIcon) {
                this._missionIcon.texture = null;
                if (this.contains(this._missionIcon))
                    this.removeChild(this._missionIcon);
            }
            if (this._nameShower && this.contains(this._nameShower)) {
                this._nameShower.text = '';
                this.removeChild(this._nameShower);
            }
            if (this.contains(this._monitor))
                this.removeChild(this._monitor);
            if (this._shadow)
                this._shadow.graphics.clear();
            if (this._hpBar && this.contains(this._hpBar))
                this.removeChild(this._hpBar);
            if (this._spBar && this.contains(this._spBar))
                this.removeChild(this._spBar);
            this._hpBar = null;
            this._spBar = null;
            GameObject.back2pool(this);
        };
        p.showMissionStatus = function (index) {
            if (d5power.D5Game.me.characterData == null || d5power.D5Game.me.missionDispatcher == null) {
                console.log("[GameObject] 暂未设置角色信息存储数据。请通过D5Game.me.characterData进行设置。");
                return;
            }
            if (index == -1) {
                if (this._missionIcon && this.contains(this._missionIcon))
                    this.removeChild(this._missionIcon);
                return;
            }
            if (!this._missionIcon)
                this._missionIcon = new egret.Bitmap();
            var m = d5power.D5Game.me.characterData.getMissionByIndex(index).missionData;
            if (m) {
                var url;
                if (m.type == d5power.MissionData.TYPE_GET && m.check(d5power.D5Game.me.missionDispatcher)) {
                    this._missionIcon.texture = GameObject.MissionOver;
                }
                else if (m.type == d5power.MissionData.TYPE_GET) {
                    this._missionIcon.texture = GameObject.MissionOver0;
                }
                else if (m.check(d5power.D5Game.me.missionDispatcher)) {
                    this._missionIcon.texture = GameObject.MissionStart;
                }
                else {
                    this._missionIcon.texture = GameObject.MissionStart0;
                }
                this.showMissionIcon();
            }
        };
        /**
         * 渲染动作
         */
        p.renderAction = function () {
            if (d5power.D5Game.me.timer - this._alphaCheckTime > 500) {
                this._alphaCheckTime = d5power.D5Game.me.timer;
                this._monitor.alpha = d5power.D5Game.me.map.isInAlphaArea(this._data.posX, this._data.posY) ? .5 : 1;
            }
        };
        p.setupSkin = function (res) {
            //console.log("[GameObject] Res is load."+res);
            // 更换动作，将原来的皮肤释放掉
            this._loadID++;
            //if (this._spriteSheet) this._spriteSheet.unlink();
            d5power.D5SpriteSheet.getInstance(res, this);
        };
        p.onSpriteSheepReady = function (data) {
            if (this._spriteSheet)
                this._spriteSheet.unlink();
            this._drawAction = this.draw;
            //console.log("[GameObject] Res is ready");
            this._spriteSheet = data;
            if (this._spriteSheet.shadowX != 0 && this._spriteSheet.shadowY != 0) {
                if (this._shadow == null) {
                    this._shadow = new egret.Shape();
                }
                else {
                    this._shadow.graphics.clear();
                }
                this._shadow.graphics.lineStyle();
                this._shadow.graphics.beginFill(0, 0.2);
                this._shadow.graphics.drawEllipse(0, 0, this._spriteSheet.shadowX, this._spriteSheet.shadowY);
                this._shadow.graphics.endFill();
            }
            if (!this.contains(this._monitor))
                this.addChild(this._monitor);
            this.showMissionIcon();
            this.showPos();
        };
        p.showMissionIcon = function () {
            if (this._missionIcon != null && this.contains(this._monitor)) {
                this._missionIcon.y = -this._spriteSheet.frameHeight - this._missionIcon.height;
                this._missionIcon.x = -(this._missionIcon.width >> 1);
                if (!this.contains(this._missionIcon))
                    this.addChild(this._missionIcon);
            }
            if (this._data != null && this._data.nickname != null && this.contains(this._monitor)) {
                if (this._nameShower == null)
                    this._nameShower = new egret.TextField();
                this._nameShower.size = 12;
                this._nameShower.textColor = d5power.D5Game.me.characterData.camp == this._data.camp ? 0x99ff00 : 0xff0000;
                this._nameShower.text = this._data.nickname;
                this._nameShower.x = -(this._nameShower.width >> 1);
                //this._nameShower.y = -this._monitor.height-this._nameShower.height;
                this.addChild(this._nameShower);
            }
        };
        /**
         * 设置HP条
         */
        p.setHpBar = function (bar) {
            this._hpBar = bar;
            this.addChild(this._hpBar);
        };
        p.updateBar = function () {
            if (this._hpBar)
                this._hpBar.update();
            if (this._spBar)
                this._spBar.update();
        };
        /**
         * 设置SP条
         */
        p.setSpBar = function (bar) {
            this._spBar = bar;
            this.addChild(this._spBar);
        };
        p.showPos = function () {
        };
        p.draw = function () {
            if (d5power.D5Game.me.timer - this._lastRender < this._spriteSheet.renderTime)
                return;
            this._lastRender = d5power.D5Game.me.timer;
            var direction = this._data.direction;
            if (this._data.direction <= 4) {
                if (this._spriteSheet.totalDirection == 1) {
                    direction = 0;
                    this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
                }
                else if (this._spriteSheet.totalDirection == 4) {
                    if (direction == 1 || direction == 2 || direction == 3) {
                        direction = 1;
                    }
                    this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
                }
                else {
                    this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
                }
                this._monitor.scaleX = 1;
                if (this._spriteSheet.uvList) {
                    this._monitor.x = this._spriteSheet.uvList[direction * this._spriteSheet.totalFrame + this._playFrame].offX;
                    this._monitor.y = this._spriteSheet.uvList[direction * this._spriteSheet.totalFrame + this._playFrame].offY;
                }
                else {
                    this._monitor.x = this._spriteSheet.gX;
                    this._monitor.y = this._spriteSheet.gY;
                }
            }
            else {
                if (this._spriteSheet.totalDirection == 1) {
                    direction = 0;
                    this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
                }
                else if (this._spriteSheet.totalDirection == 4) {
                    direction = 1;
                    this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
                }
                else {
                    direction = 8 - this._data.direction;
                    this._monitor.texture = this._spriteSheet.getTexture(direction, this._playFrame);
                }
                this._monitor.scaleX = -1;
                if (this._spriteSheet.uvList) {
                    this._monitor.x = -this._spriteSheet.uvList[direction * this._spriteSheet.totalFrame + this._playFrame].offX;
                    this._monitor.y = this._spriteSheet.uvList[direction * this._spriteSheet.totalFrame + this._playFrame].offY;
                }
                else {
                    this._monitor.x = -this._spriteSheet.gX;
                    this._monitor.y = this._spriteSheet.gY;
                }
            }
            this._playFrame++;
            if (this._playFrame >= this._spriteSheet.totalFrame)
                this._playFrame = 0;
            if (this._data.action == d5power.Actions.Attack) {
                if (this._playFrame == 0 && this._flag) {
                    this._data.setAction(d5power.Actions.Wait);
                    this._flag = false;
                }
                if (this._playFrame + 1 >= this._spriteSheet.totalFrame && !this._flag) {
                    this['atkfun']();
                    this._flag = true;
                }
            }
        };
        GameObject.MAX_POOL_NUM = 100;
        GameObject._pool = [];
        return GameObject;
    })(egret.DisplayObjectContainer);
    d5power.GameObject = GameObject;
    egret.registerClass(GameObject,"d5power.GameObject",["d5power.IGO","d5power.ISpriteSheetWaiter"]);
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
 * Created by renhoward on 15/1/24.
 */
var d5power;
(function (d5power) {
    var DoorObject = (function (_super) {
        __extends(DoorObject, _super);
        function DoorObject() {
            _super.call(this);
        }
        var d = __define,c=DoorObject;p=c.prototype;
        DoorObject.getDoor = function () {
            var obj;
            if (DoorObject._pool_door.length) {
                obj = DoorObject._pool_door.pop();
            }
            else {
                obj = new DoorObject();
            }
            obj._lock = false;
            obj._lastCheck = 0;
            return obj;
        };
        DoorObject.backDoor = function (obj) {
            if (DoorObject._pool_door.length < DoorObject.MAX_POOL_NUM && DoorObject._pool_door.indexOf(obj) == -1)
                DoorObject._pool_door.push(obj);
        };
        p.renderAction = function () {
            if (!this._lock && d5power.D5Game.me.timer - this._lastCheck > 500 && egret.Point.distance(this._data.$pos, d5power.D5Game.me.player.$pos) < 50) {
                this._lastCheck = d5power.D5Game.me.timer;
                this._lock = true;
                console.log("change Map");
                d5power.D5Game.me.changeMap(this._data.linkMap, this._data.linkPosx, this._data.linkPosy);
            }
        };
        p.dispose = function () {
            if (this._spriteSheet) {
                this._spriteSheet.unlink();
                this._spriteSheet = null;
            }
            this._data = null;
            this._monitor.texture = null;
            this._drawAction = null;
            if (this.contains(this._monitor))
                this.removeChild(this._monitor);
            DoorObject.backDoor(this);
        };
        DoorObject.MAX_POOL_NUM = 5;
        DoorObject._pool_door = [];
        return DoorObject;
    })(d5power.GameObject);
    d5power.DoorObject = DoorObject;
    egret.registerClass(DoorObject,"d5power.DoorObject");
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
 * Created by Administrator on 2015/9/24.
 */
var d5power;
(function (d5power) {
    var EventObject = (function (_super) {
        __extends(EventObject, _super);
        function EventObject() {
            _super.call(this);
        }
        var d = __define,c=EventObject;p=c.prototype;
        EventObject.getEvent = function () {
            var obj;
            if (EventObject._pool_event.length) {
                obj = EventObject._pool_event.pop();
            }
            else {
                obj = new EventObject();
            }
            obj._lock = false;
            obj._lastCheck = 0;
            return obj;
        };
        EventObject.backEvent = function (obj) {
            if (EventObject._pool_event.length < EventObject.MAX_POOL_NUM && EventObject._pool_event.indexOf(obj) == -1)
                EventObject._pool_event.push(obj);
        };
        p.renderAction = function () {
            if (d5power.D5Game.me.timer - this._lastCheck > this._data.checktime) {
                this._lastCheck = d5power.D5Game.me.timer;
                if (this._lock) {
                    if (egret.Point.distance(this._data.$pos, d5power.D5Game.me.player.$pos) > this._data.checksize)
                        this._lock = false;
                }
                else {
                    if (egret.Point.distance(this._data.$pos, d5power.D5Game.me.player.$pos) < this._data.checksize) {
                        this._lock = true;
                        console.log("EventObject script");
                        if (this._data.script && this._data.script != '') {
                            d5power.D5Game.me.runScript(this._data.script);
                        }
                        if (this._data.checkdel == 1)
                            this._data.setDeleting(true);
                    }
                }
            }
        };
        p.dispose = function () {
            if (this._spriteSheet) {
                this._spriteSheet.unlink();
                this._spriteSheet = null;
            }
            this._data = null;
            this._monitor.texture = null;
            this._drawAction = null;
            if (this.contains(this._monitor))
                this.removeChild(this._monitor);
            EventObject.backEvent(this);
        };
        EventObject.MAX_POOL_NUM = 5;
        EventObject._pool_event = [];
        return EventObject;
    })(d5power.GameObject);
    d5power.EventObject = EventObject;
    egret.registerClass(EventObject,"d5power.EventObject");
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
 * Created by Administrator on 2015/8/18.
 */
var d5power;
(function (d5power) {
    var GameObjectDB = (function (_super) {
        __extends(GameObjectDB, _super);
        /**
         * @param    ctrl    控制器
         */
        function GameObjectDB() {
            _super.call(this);
            this.ID = 0;
            this._playFrame = 0;
            this._alphaCheckTime = 0;
            this._loadID = 0;
        }
        var d = __define,c=GameObjectDB;p=c.prototype;
        GameObjectDB.getInstance = function () {
            var obj;
            if (GameObjectDB._pool.length) {
                obj = GameObjectDB._pool.pop();
            }
            else {
                obj = new GameObjectDB();
            }
            return obj;
        };
        GameObjectDB.back2pool = function (obj) {
            if (GameObjectDB._pool.length < GameObjectDB.MAX_POOL_NUM && GameObjectDB._pool.indexOf(obj) == -1)
                GameObjectDB._pool.push(obj);
        };
        d(p, "loadID"
            ,function () {
                return this._loadID;
            }
        );
        d(p, "inScreen"
            ,function () {
                return this._inScreen;
            }
        );
        d(p, "deleteing"
            ,function () {
                return this._deleting;
            }
        );
        d(p, "camp"
            ,function () {
                return this._camp;
            }
        );
        p.hitTestArea = function (px, py) {
            if (this._armature == null)
                return false;
            var point = d5power.D5Game.me.map.getScreenPostion(this._data.posX, this._data.posY);
            return (px >= point.x - this._armature.display.width / 2 && py >= point.y - this._armature.display.height && px < point.x + this._armature.display.width / 2 && py <= point.y);
        };
        /**
         * 渲染自己在屏幕上输出
         */
        p.renderMe = function () {
            // 控制总体刷新率
            this.renderAction();
            this._drawAction != null ? this._drawAction() : 0;
        };
        d(p, "spriteSheet"
            ,function () {
                return this._spriteSheet;
            }
        );
        p.setupData = function (data) {
            this._data = data;
            RES.getResByUrl(this._data.resStyle + '/skeleton.json', this.onDataComplate, this);
        };
        p.onDataComplate = function (data) {
            this._skeletonData = data;
            RES.getResByUrl(this._data.resStyle + '/texture.json', this.onTextureDataComplete, this);
        };
        p.onTextureDataComplete = function (data) {
            this._textureData = data;
            RES.getResByUrl(this._data.resStyle + '/texture.png', this.onTextureComplete, this);
        };
        p.onTextureComplete = function (data) {
            this._texture = data;
            this.createDB();
        };
        p.createDB = function () {
            var factory = new dragonBones.EgretFactory();
            factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(this._skeletonData));
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(this._texture, this._textureData));
            this._armature = factory.buildArmature(this._skeletonData.armature[0].name);
            //this._armature.enableAnimationCache(30);
            var armatureDisplay = this._armature.display;
            armatureDisplay.scaleX = armatureDisplay.scaleY = 1;
            this.addChild(armatureDisplay);
            this._armature.animation.gotoAndPlay("action_" + this._data.action, -1, -1, 0);
            if (!dragonBones.WorldClock.clock.contains(this._armature)) {
                dragonBones.WorldClock.clock.add(this._armature);
                if (!GameObjectDB.flag) {
                    egret.Ticker.getInstance().register(function (advancedTime) {
                        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
                    }, this);
                    GameObjectDB.flag = true;
                }
            }
        };
        p.dispose = function () {
            if (this._spriteSheet) {
                this._spriteSheet.unlink();
                this._spriteSheet = null;
            }
            this._data = null;
            this._drawAction = null;
            this._loadID = 0;
            if (this._armature) {
                if (this.contains(this._armature.display))
                    this.removeChild(this._armature.display);
                if (dragonBones.WorldClock.clock.contains(this._armature)) {
                    dragonBones.WorldClock.clock.remove(this._armature);
                    egret.Ticker.getInstance().unregister(function (advancedTime) {
                        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
                    }, this);
                }
                this._armature = null;
            }
            if (this._missionIcon) {
                this._missionIcon.texture = null;
                if (this.contains(this._missionIcon))
                    this.removeChild(this._missionIcon);
            }
            if (this._nameShower && this.contains(this._nameShower)) {
                this._nameShower.text = '';
                this.removeChild(this._nameShower);
            }
            if (this._shadow)
                this._shadow.graphics.clear();
            if (this._hpBar && this.contains(this._hpBar))
                this.removeChild(this._hpBar);
            if (this._spBar && this.contains(this._spBar))
                this.removeChild(this._spBar);
            this._hpBar = null;
            this._spBar = null;
            GameObjectDB.back2pool(this);
        };
        p.showMissionStatus = function (index) {
            if (d5power.D5Game.me.characterData == null || d5power.D5Game.me.missionDispatcher == null) {
                console.log("[GameObject] 暂未设置角色信息存储数据。请通过D5Game.me.characterData进行设置。");
                return;
            }
            if (index == -1) {
                if (this._missionIcon && this.contains(this._missionIcon))
                    this.removeChild(this._missionIcon);
                return;
            }
            if (!this._missionIcon)
                this._missionIcon = new egret.Bitmap();
            var m = d5power.D5Game.me.characterData.getMissionByIndex(index).missionData;
            if (m) {
                var url;
                if (m.type == d5power.MissionData.TYPE_COMPLATE && m.check(d5power.D5Game.me.missionDispatcher)) {
                    this._missionIcon.texture = d5power.GameObject.MissionOver;
                }
                else if (m.type == d5power.MissionData.TYPE_COMPLATE) {
                    this._missionIcon.texture = d5power.GameObject.MissionOver0;
                }
                else if (m.check(d5power.D5Game.me.missionDispatcher)) {
                    this._missionIcon.texture = d5power.GameObject.MissionStart;
                }
                else {
                    this._missionIcon.texture = d5power.GameObject.MissionStart0;
                }
                this.showMissionIcon();
            }
        };
        /**
         * 渲染动作
         */
        p.renderAction = function () {
            if (d5power.D5Game.me.timer - this._alphaCheckTime > 500) {
                this._alphaCheckTime = d5power.D5Game.me.timer;
                if (this._armature)
                    this._armature.display.alpha = d5power.D5Game.me.map.isInAlphaArea(this._data.posX, this._data.posY) ? .5 : 1;
            }
        };
        p.setupSkin = function (res) {
            this._drawAction = this.drawDB;
            if (this._armature)
                this._armature.animation.gotoAndPlay("action_" + this._data.action, -1, -1, 0);
            this.showMissionIcon();
        };
        p.onSpriteSheepReady = function (data) {
        };
        p.showMissionIcon = function () {
            if (this._missionIcon != null) {
                this._missionIcon.y = -this._spriteSheet.frameHeight - this._missionIcon.height;
                this._missionIcon.x = -(this._missionIcon.width >> 1);
                if (!this.contains(this._missionIcon))
                    this.addChild(this._missionIcon);
            }
            if (this._data != null && this._data.nickname != null) {
                if (this._nameShower == null)
                    this._nameShower = new egret.TextField();
                this._nameShower.size = 12;
                this._nameShower.textColor = d5power.D5Game.me.characterData.camp == this._data.camp ? 0x99ff00 : 0xff0000;
                this._nameShower.text = this._data.nickname;
                this._nameShower.x = -(this._nameShower.width >> 1);
                //this._nameShower.y = -this._monitor.height-this._nameShower.height;
                this.addChild(this._nameShower);
            }
        };
        /**
         * 设置HP条
         */
        p.setHpBar = function (bar) {
            this._hpBar = bar;
            this.addChild(this._hpBar);
        };
        p.updateBar = function () {
            if (this._hpBar)
                this._hpBar.update();
            if (this._spBar)
                this._spBar.update();
        };
        /**
         * 设置SP条
         */
        p.setSpBar = function (bar) {
            this._spBar = bar;
            this.addChild(this._spBar);
        };
        p.showPos = function () {
        };
        p.drawDB = function () {
            if (this._armature) {
                if (this._data.direction <= 4) {
                    this._armature.display.scaleX = 1;
                }
                else {
                    this._armature.display.scaleX = -1;
                }
            }
        };
        GameObjectDB.flag = false;
        GameObjectDB.MAX_POOL_NUM = 100;
        GameObjectDB._pool = [];
        return GameObjectDB;
    })(egret.DisplayObjectContainer);
    d5power.GameObjectDB = GameObjectDB;
    egret.registerClass(GameObjectDB,"d5power.GameObjectDB",["d5power.IGO","d5power.ISpriteSheetWaiter"]);
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
 * Created by Administrator on 2015/6/15.
 */
var d5power;
(function (d5power) {
    var NumberBitmap = (function (_super) {
        __extends(NumberBitmap, _super);
        function NumberBitmap(value) {
            _super.call(this);
            this._content = value;
            if (NumberBitmap._sheet == null) {
                this.createTexture();
            }
            this.buildBitmap();
        }
        var d = __define,c=NumberBitmap;p=c.prototype;
        p.createTexture = function () {
            NumberBitmap._sheet = new egret.SpriteSheet(RES.getRes('number_png'));
            var name;
            for (var i = 0; i < NumberBitmap.NUMBERSTR.length; i++) {
                name = NumberBitmap.NUMBERSTR.charAt(i);
                NumberBitmap._sheet.createTexture(name, 20 * i, 0, 20, 20, 0, 0, 20, 20);
            }
        };
        p.buildBitmap = function () {
            var bitmap;
            var value;
            for (var i = 0; i < this._content.length; i++) {
                value = this._content.charAt(i);
                bitmap = new egret.Bitmap();
                bitmap.texture = NumberBitmap._sheet.getTexture(value);
                bitmap.x = 18 * i;
                this.addChild(bitmap);
            }
            this.cacheAsBitmap = true;
        };
        NumberBitmap.NUMBERSTR = "-1269345780";
        return NumberBitmap;
    })(egret.Sprite);
    d5power.NumberBitmap = NumberBitmap;
    egret.registerClass(NumberBitmap,"d5power.NumberBitmap");
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
 * Created by Administrator on 2015/6/15.
 */
var d5power;
(function (d5power) {
    var UFlyFont = (function (_super) {
        __extends(UFlyFont, _super);
        /**
         * @param	scene		场景
         * @param	skillName	技能名称
         * @param	color		字体颜色
         */
        function UFlyFont() {
            _super.call(this);
        }
        var d = __define,c=UFlyFont;p=c.prototype;
        UFlyFont.getInstance = function (scene, skillName) {
            var obj;
            if (this._pool.length == 0) {
                obj = new UFlyFont();
            }
            else {
                obj = this._pool.pop();
            }
            obj.alpha = 1;
            obj._scene = scene;
            obj.buildBuffer(skillName);
            return obj;
        };
        UFlyFont.inPool = function (target) {
            if (this._pool.indexOf(target) == -1)
                this._pool.push(target);
        };
        p.buildBuffer = function (name) {
            if (this._shower) {
                //if(this._shower.parent)this._shower.parent.removeChild(this._shower);
                //this._shower = null;
                this._shower.removeChildren();
            }
            this._shower = new d5power.NumberBitmap(name);
            this.addChild(this._shower);
            this.xspeed = Math.random() > 0.5 ? 2 : -2;
            this.yspeed = 3;
        };
        p.setPos = function (x, y) {
            this.x = x;
            this.y = y;
            this._scene.addChild(this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
        };
        p.onEnterFrameHander = function () {
            this.y -= this.yspeed;
            this.x += this.xspeed;
            if ((this.alpha - 0.01) > 0) {
                this.alpha -= 0.01;
            }
            else {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
                if (this.parent)
                    this.parent.removeChild(this);
                UFlyFont.inPool(this);
                return;
            }
            this.yspeed -= 0.08;
        };
        UFlyFont._pool = new Array();
        return UFlyFont;
    })(egret.DisplayObjectContainer);
    d5power.UFlyFont = UFlyFont;
    egret.registerClass(UFlyFont,"d5power.UFlyFont");
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
 * Created by Administrator on 2015/6/11.
 */
var d5power;
(function (d5power) {
    var CharacterStuff = (function (_super) {
        __extends(CharacterStuff, _super);
        /**
         * @param	target		所属游戏对象
         * @param	resource	渲染素材
         * @param	attName		挂接的游戏对象属性
         * @param	attMaxName	如果挂接属性有最大值，进行挂接
         */
        function CharacterStuff(target, attName, attMaxName) {
            if (attName === void 0) { attName = ''; }
            if (attMaxName === void 0) { attMaxName = ''; }
            _super.call(this);
            this._target = target;
            if (attName != '' && this._target.hasOwnProperty(attName))
                this._attName = attName;
            if (attMaxName != '' && this._target.hasOwnProperty(attMaxName))
                this._attMaxName = attMaxName;
        }
        var d = __define,c=CharacterStuff;p=c.prototype;
        /**
         * 渲染
         */
        p.render = function (buffer) {
        };
        /**
         * 清空
         */
        p.clear = function () {
        };
        return CharacterStuff;
    })(egret.Shape);
    d5power.CharacterStuff = CharacterStuff;
    egret.registerClass(CharacterStuff,"d5power.CharacterStuff");
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
 * Created by Administrator on 2015/6/11.
 */
var d5power;
(function (d5power) {
    var HSpBar = (function (_super) {
        __extends(HSpBar, _super);
        /**
         * @param		target		跟踪目标
         * @param		attName		跟踪属性名
         * @param		attMaxName	最大值跟踪
         * @param		ytype		Y轴位置，若大于1则使用该值进行定位
         * @param		resource	使用素材
         */
        function HSpBar(target, attName, attMaxName, ytype, color) {
            if (ytype === void 0) { ytype = 1; }
            if (color === void 0) { color = 0x990000; }
            _super.call(this, target, attName, attMaxName);
            this._size = 50;
            this.color = color;
            this.y = ytype;
            this.x = -(this._size >> 1);
            this.update();
        }
        var d = __define,c=HSpBar;p=c.prototype;
        p.waitForFly = function (e) {
        };
        /**
         * 渲染
         * @param		buffer		缓冲区
         * @param		p			角色的标准渲染坐标
         */
        p.update = function () {
            if (this._lastRender == this._target[this._attName])
                return;
            this._lastRender = this._target[this._attName];
            this.graphics.clear();
            this.graphics.beginFill(this.color);
            this.graphics.drawRect(0, 0, (this._size * this._target[this._attName] / this._target[this._attMaxName]), 4);
            this.graphics.endFill();
            this.graphics.lineStyle(1);
            this.graphics.lineTo(this._size, 0);
            this.graphics.lineTo(this._size, 4);
            this.graphics.lineTo(0, 4);
            this.graphics.lineTo(0, 0);
        };
        HSpBar.UP = 0;
        HSpBar.DOWN = 1;
        return HSpBar;
    })(d5power.CharacterStuff);
    d5power.HSpBar = HSpBar;
    egret.registerClass(HSpBar,"d5power.HSpBar");
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
 * Created by Administrator on 2015/5/22.
 */
var d5power;
(function (d5power) {
    var Notice = (function (_super) {
        __extends(Notice, _super);
        function Notice(stg, content, dfun, config) {
            if (dfun === void 0) { dfun = null; }
            if (config === void 0) { config = null; }
            _super.call(this);
            this.STARTY = 80;
            this.noticeMap = [0, 0, 0, 0, 0, 0];
            this.autoShift = 0;
            this.delete_fun = dfun;
            this._stayTime = 120;
            this.buildBuffer(content, config);
            // 开始自动寻找位置
            var fond = false;
            for (var i = 0, j = this.noticeMap.length; i < j; i++) {
                if (this.noticeMap[i] == 0) {
                    this.noticeMap[i] = this;
                    this.x = (stg.stageWidth - this.width) * .5;
                    this.y = this.STARTY + i * (this.height + 5);
                    fond = true;
                    break;
                }
            }
            if (!fond) {
                this.noticeMap[this.autoShift]._stayTime = 0;
                this.noticeMap[this.autoShift] = this;
                this.x = (stg.stageWidth - this.width) * .5;
                this.y = this.STARTY + this.autoShift * (this.height + 5);
                this.autoShift++;
                if (this.autoShift >= this.noticeMap.length)
                    this.autoShift = 0;
            }
            stg.addChild(this);
        }
        var d = __define,c=Notice;p=c.prototype;
        p.buildBuffer = function (content, config) {
            var color = config == null || config.color == null ? 0x00FF00 : config.color;
            var padding = 1;
            var lable = new egret.TextField();
            lable.width = 200;
            lable.height = 25;
            lable.text = content;
            lable.size = config == null || config.size == null ? 16 : config.size;
            lable.textColor = color;
            lable.textAlign = egret.HorizontalAlign.CENTER;
            if (config != null && config.bgcolor != null) {
                this.graphics.beginFill(config.bgcolor, (config != null && config.bgalpha != null ? .6 : config.bgalpha));
                this.graphics.drawRect(0, 0, lable.width + padding * 2, lable.height + padding * 2);
                this.graphics.endFill();
            }
            this.addChild(lable);
            this.cacheAsBitmap = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
        };
        p.onEnterFrameHander = function (e) {
            if (this._stayTime <= 0) {
                if ((this.alpha - 0.05) > 0) {
                    this.alpha -= 0.05;
                }
                else {
                    this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameHander, this);
                    if (this.parent)
                        this.parent.removeChild(this);
                    if (this.delete_fun != null)
                        this.delete_fun(this);
                    var id = this.noticeMap.indexOf(this);
                    if (id != -1) {
                        this.noticeMap[id] = 0;
                    }
                    return;
                }
                return;
            }
            this._stayTime--;
        };
        return Notice;
    })(egret.Sprite);
    d5power.Notice = Notice;
    egret.registerClass(Notice,"d5power.Notice");
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
 * Created by Howard on 2015/1/20.
 */
var d5power;
(function (d5power) {
    var SimpleDialog = (function (_super) {
        __extends(SimpleDialog, _super);
        function SimpleDialog(cont) {
            _super.call(this);
            this._height = 120;
            this._padding = 5;
            this._sayStep = 0;
            this._fontSize = 14;
            this._container = cont;
            this._shower = new egret.TextField();
            this._shower.size = this._fontSize;
            this._npcTitle = new egret.TextField();
            this._npcTitle.size = this._fontSize;
            this._npcHead = new egret.DisplayObjectContainer();
        }
        var d = __define,c=SimpleDialog;p=c.prototype;
        p.configDialog = function (headUrl, npcname, npcSay) {
            d5power.D5Game.me.player.controller.pause();
            if (this._bg == null) {
                this._bg = new egret.Shape();
                this._bg.graphics.beginFill(0, .4);
                this._bg.graphics.drawRect(0, 0, d5power.D5Game.me.screenWidth, this._height);
                this._bg.graphics.endFill();
                this.addChild(this._bg);
                this.y = d5power.D5Game.me.screenHeight - this._height;
                this._shower.width = d5power.D5Game.me.screenWidth - this._padding * 2;
                this._npcTitle.width = this._shower.width;
                this._npcTitle.height = 20;
                this._npcTitle.y = this._padding;
                this._shower.height = this._height - this._padding * 3 - 20;
                this._shower.y = this._npcTitle.y + 20 + this._padding;
                this.addChild(this._npcTitle);
                this.addChild(this._shower);
            }
            this._npcNameSrc = npcname;
            this._npcHeadSrc = headUrl;
            this._content = npcSay.split(/[\r|]/g);
            this._container.addChild(this);
            this._npcTitle.text = npcname;
            this._sayStep = 0;
            this.play();
            d5power.D5Game.me.touchReciver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickNext, this);
        };
        p.dispose = function (e) {
            if (e === void 0) { e = null; }
            d5power.D5Game.me.player.controller.start();
            if (this.parent)
                this.parent.removeChild(this);
            d5power.D5Game.me.touchReciver.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickNext, this);
        };
        p.onClickNext = function (e) {
            this._sayStep++;
            if (this._sayStep >= this._content.length) {
                this.dispose();
                return;
            }
            this.play();
        };
        p.onHead = function (data) {
            this._npcHead.removeChildren();
            if (data != null)
                this._npcHead.addChild(new egret.Bitmap(data));
        };
        p.play = function () {
            var content = this._content[this._sayStep];
            content = content.replace(/{/g, '<');
            content = content.replace(/}/g, '>');
            if (content.substr(0, 3) == '[0]') {
                content = content.substr(3, content.length - 3);
                this._npcTitle.text = d5power.D5Game.me.characterData.nickname;
            }
            this._shower.text = content;
            console.log("[SimpleDialog] play");
        };
        return SimpleDialog;
    })(egret.DisplayObjectContainer);
    d5power.SimpleDialog = SimpleDialog;
    egret.registerClass(SimpleDialog,"d5power.SimpleDialog",["d5power.IDialog"]);
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
    var BaseItemData = (function () {
        function BaseItemData() {
            this.id = 0;
            this.buy = 0;
            this.sale = 0;
        }
        var d = __define,c=BaseItemData;p=c.prototype;
        p.baseFormat = function (xml) {
            this.id = parseInt(xml.id);
            this.name = (xml.name);
            this.info = (xml.info);
            this.buy = parseInt(xml.buy_price);
            this.sale = parseInt(xml.sell_price);
        };
        return BaseItemData;
    })();
    d5power.BaseItemData = BaseItemData;
    egret.registerClass(BaseItemData,"d5power.BaseItemData");
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
    var BaseSkillData = (function () {
        function BaseSkillData() {
            this.id = 0;
        }
        var d = __define,c=BaseSkillData;p=c.prototype;
        p.baseFormat = function (xml) {
            this.id = parseInt(xml.id);
            this.name = (xml.name);
        };
        return BaseSkillData;
    })();
    d5power.BaseSkillData = BaseSkillData;
    egret.registerClass(BaseSkillData,"d5power.BaseSkillData");
})(d5power || (d5power = {}));

/**
 * Created by Administrator on 2015/11/11.
 */
/**
 * Created by Administrator on 2015/10/26.
 */
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
    var ChapterData = (function () {
        function ChapterData() {
            /**
             * id
             */
            this.id = 0;
            this.partArray = new Array();
        }
        var d = __define,c=ChapterData;p=c.prototype;
        return ChapterData;
    })();
    d5power.ChapterData = ChapterData;
    egret.registerClass(ChapterData,"d5power.ChapterData");
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
 * Created by Administrator on 2015/1/19.
 */
var d5power;
(function (d5power) {
    var CharacterData = (function () {
        function CharacterData() {
            /**
             * 玩家当前处于的章id
             */
            this._chapterID = 0;
            /**
             * 玩家当前处于的节id
             */
            this._partID = 0;
            /**
             * 系统配置的起始任务ID
             */
            this._startMission = 0;
            /**
            * 玩家阵营
            */
            this.camp = 0;
            /**
            * 玩家用户ID
            */
            this.uid = 0;
            this._missionList = [];
            this._noActiveList = [];
            this._missionLoadingList = [];
            this._talkWithNpc = [];
            this._uiList = [];
        }
        var d = __define,c=CharacterData;p=c.prototype;
        p.addDisplayer = function (ui) {
            if (ui == null)
                return;
            if (this._waitDispathTimer == null) {
                this._waitDispathTimer = new egret.Timer(500);
                this._waitDispathTimer.addEventListener(egret.TimerEvent.TIMER, this.onDispathTimer, this);
            }
            // 清理目前已经不在舞台上的UI界面
            if (this._uiList.length > 0) {
                for (var i = this._uiList.length - 1; i >= 0; i--) {
                    if ((this._uiList[i]) == null)
                        this._uiList.splice(i, 1);
                }
            }
            if (this._uiList.indexOf(ui) == -1)
                this._uiList.push(ui);
        };
        p.removeDisplayer = function (ui) {
            var index = this._uiList.indexOf(ui);
            if (index != -1)
                this._uiList.splice(index, 1);
        };
        p.setuserdataDisplayer = function (value) {
            this._userdataDisplayer = value;
        };
        p.updateDisplayers = function () {
            if (this._uiList.length > 0) {
                for (var i = 0, j = this._uiList.length; i < j; i++) {
                    this._uiList[i].update();
                }
            }
        };
        p.dispathChange = function () {
            if (this._uiList.length == 0 || this._waitDispathTimer.running)
                return;
            this._waitDispathTimer.start();
        };
        p.onDispathTimer = function (e) {
            this._waitDispathTimer.reset();
            this._waitDispathTimer.stop();
            trace("延迟更新完成。");
            if (this._uiList.length > 0) {
                for (var i = 0, j = this._uiList.length; i < j; i++) {
                    this._uiList[i].update();
                }
            }
            this.flushMissionNpc();
            this.checkActiveMission();
            //D5Game.me.setCharacterData(RPGI.Global.userdata);
        };
        d(p, "missionNum"
            ,function () {
                return this._missionList.length;
            }
        );
        /**
         * 设置一个当获得任务的时候调用的函数
         * 本参数可用于根据任务打开UI面板等和任务相关的调用
         * @param	f	调用的参数，回叫时将提供一个uint型的任务ID
         */
        p.onAddMission = function (f, thisobj) {
            this._onAddMission = f;
            this._onAddMissionThis = thisobj;
        };
        p.getMissionByIndex = function (index) {
            if (index >= this._missionList.length)
                return null;
            return this._missionList[index].missionData;
        };
        /**
         * 通过任务id 获取相关任务数据
         * @param id 任务ID
         */
        p.getMissionById = function (id) {
            var length = this._missionList.length;
            for (var i = 0; i < length; i++) {
                var obj = this._missionList[i];
                if (obj.id == id)
                    return obj;
            }
            return null;
        };
        /**
         * 获取任务数据
         * @param mission_id 任务ID
         */
        p.addMissionById = function (mission_id) {
            if (mission_id === void 0) { mission_id = 0; }
            if (this.hasMission(mission_id) || this._missionLoadingList.indexOf(mission_id) != -1)
                return;
            this._missionLoadingList.push(mission_id);
            if (this._missionLoadingList.length > 0)
                this.loadMissionConfig();
        };
        p.setStartMission = function (v) {
            this._startMission = v;
            this.addMissionById(this._startMission);
        };
        d(p, "startMission"
            ,function () {
                return this._startMission;
            }
        );
        /**
         * 刷新任务，尝试完成现有任务
         */
        p.flushMission = function () {
            var length = this._missionList.length;
            for (var i = 0; i < length; i++) {
                var mis = this._missionList[i];
            }
        };
        p.checkActiveMission = function () {
        };
        /**
         * 刷新当前场景中的NPC任务状态
         */
        p.flushMissionNpc = function () {
        };
        p.hasMission = function (mid) {
            if (mid === void 0) { mid = 0; }
            for (var i = 0, j = this._missionList.length; i < j; i++) {
                if (this._missionList[i].id == mid)
                    return true;
            }
            return false;
        };
        /**
         * 是否有某个ID的任务
         */
        p.hasMissionById = function (id) {
            if (id === void 0) { id = 0; }
            var length = this._missionList.length;
            for (var i = 0; i < length; i++) {
                var obj = this._missionList[i];
                if (obj.id == id)
                    return true;
            }
            return false;
        };
        d(p, "lastMissionid"
            /**
             * 获取最后一个任务ID
             */
            ,function () {
                var id = 0;
                var length = this._missionList.length;
                for (var i = 0; i < length; i++) {
                    var obj = this._missionList[i];
                    return id;
                }
            }
        );
        p.loadMissionConfig = function () {
            if (this._missionIsLoading)
                return;
            if (this._missionLoadingList.length == 0) {
                d5power.D5Game.me.missionLoaded();
                this.updateDisplayers();
                return;
            }
            this._missionIsLoading = true;
            console.log("[CharacterData]加载任务：" + this._missionLoadingList[0] + ".json");
            RES.getResByUrl(d5power.D5Game.RES_SERVER + d5power.D5Game.ASSET_PATH + "/data/mission/" + this._missionLoadingList[0] + ".json", this.onMissionConfigComplate, this);
        };
        p.onMissionConfigComplate = function (data) {
            this._missionIsLoading = false;
            var missionData = new d5power.MissionData();
            missionData.formatFromJson(data);
            this._missionList.push(missionData);
            this._missionLoadingList.shift();
            this.loadMissionConfig();
            if (this._onAddMission != null)
                this._onAddMission(missionData.id);
        };
        p.deleteMission = function (m) {
            this._missionList.splice(this._missionList.indexOf(m), 1);
        };
        p.addMission = function (m) {
        };
        p.hasItemNum = function (itemid) {
            if (itemid === void 0) { itemid = 0; }
            return 0;
        };
        p.hasTalkedWith = function (npcid) {
            if (npcid === void 0) { npcid = 0; }
            return true;
        };
        p.killMonseterNum = function (monsterid) {
            if (monsterid === void 0) { monsterid = 0; }
            return 0;
        };
        p.hasBuff = function (id) {
            if (id === void 0) { id = 0; }
            return false;
        };
        p.hasEqu = function (id) {
            if (id === void 0) { id = 0; }
            return false;
        };
        p.hasSkill = function (id, lv) {
            if (lv === void 0) { lv = 0; }
            return false;
        };
        p.hasSkin = function (path) {
            return false;
        };
        p.userPro = function (pro_name, value) {
            if (value === void 0) { value = 0; }
            return false;
        };
        p.getItem = function (itemid, num, packageid, equ) {
            if (packageid === void 0) { packageid = 0; }
            if (equ === void 0) { equ = false; }
            return true;
        };
        p.addPro = function (pro_name, value) {
            return true;
        };
        p.getExp = function (num) {
            if (num === void 0) { num = 0; }
        };
        p.delItem = function (itemid, num) {
            return false;
        };
        /**
        * 给予游戏币
        */
        p.getMoney = function (u) {
            if (u < 0 && this._money < -u)
                return false;
            this._money += u;
            if (this._userdataDisplayer != null)
                this._userdataDisplayer.update();
            return true;
        };
        p.hasChecker = function (type) {
            if (type === void 0) { type = 0; }
            return false;
        };
        p.publicCheck = function (type, value, num) {
            return false;
        };
        p.checkSkillByID = function (skillID) {
            return null;
        };
        p.check = function () {
        };
        return CharacterData;
    })();
    d5power.CharacterData = CharacterData;
    egret.registerClass(CharacterData,"d5power.CharacterData",["d5power.ICharacterData","d5power.IMissionDispatcher"]);
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
    var GOData = (function () {
        function GOData() {
            this._speed = 3.0;
            this._uid = 0;
            this._work = 0;
            this._camp = 0;
            this._hp = 0;
            this._isDB = 0;
            this._checktime = 0;
            this._checksize = 0;
            this._checkdel = 0;
            /**
            * 是否处于重力状态
            */
            this.inG = true;
            /**
            * 重心 X 加速度
            */
            this.speedX = 0;
            /**
            * 重力 Y加速度
            */
            this.speedY = 0;
            //        public runGravity(): void
            //        {
            //            var p0:egret.Point = D5Game.me.map.Postion2Tile(this.posX,this.posY+this._gravitySpeed);
            //            // 上升阶段和可通过路点均可任意调整坐标
            //            if(this._gravitySpeed<0 || !D5Game.me.map.getRoadPass(p0.x,p0.y))
            //            {
            //                this._target.setPos(this._target.posX,this._target.posY+this._gravitySpeed);
            //                this._gravitySpeed += CharacterController.GRAVITY;
            //            }else{
            //                this._jumpTime = 0;
            //                this._gravitySpeed = 0;
            //                this._target.setPos(this._target.posX,p0.y*D5Game.me.map.roadHeight);
            //                }
            //        }
            /**
             * 排序调整
             */
            this._zOrderF = 0;
            this._pos = new egret.Point();
        }
        var d = __define,c=GOData;p=c.prototype;
        GOData.initPool = function (num) {
            if (num === void 0) { num = 400; }
            if (GOData._pool != null) {
                throw new Error("[GOData] initPool just can run one time.");
                return;
            }
            GOData._poolNum = num;
            GOData._pool = new Array();
            for (var i = 0; i < GOData._poolNum; i++)
                GOData._pool.push(new GOData());
        };
        GOData.getInstance = function () {
            if (GOData._pool.length > 0)
                return GOData._pool.pop();
            return new GOData();
        };
        GOData.back2pool = function (data) {
            if (GOData._pool.length < GOData._poolNum && GOData._pool.indexOf(data) == -1)
                GOData._pool.push(data);
        };
        p.loadMission = function () {
            if (d5power.D5Game.me.characterData) {
                var m;
                var num = d5power.D5Game.me.characterData.missionNum;
                this._missionIndex = -1;
                this._missionIndexList = new Array();
                for (var i = 0; i < num; i++) {
                    m = d5power.D5Game.me.characterData.getMissionByIndex(i).missionData;
                    if ((m.type == 0 && m.npc_startId == this._uid) || (m.type > 0 && m.npc_CompleteId == this._uid)) {
                        if (this._missionIndex == -1)
                            this._missionIndex = i;
                        this._missionIndexList.push(i);
                    }
                }
                if (this._missionIndex == -1 && this._missionIndexList.length > 0) {
                    this._missionIndex = this._missionIndexList[0];
                }
                if (this._displayer)
                    this.displayer.showMissionStatus(this._missionIndex);
            }
        };
        p.run = function () {
            var targetx;
            var targety;
            var maxX = d5power.D5Game.me.map.width;
            var maxY = d5power.D5Game.me.map.height;
            this._pos.x += this.speedX;
            this._pos.y += this.speedY;
            if (d5power.D5Game.me.camera.focus == this) {
                targetx = this._pos.x < (d5power.D5Game.me.screenWidth >> 1) ? this._pos.x : (d5power.D5Game.me.screenWidth >> 1);
                targety = this._pos.y < (d5power.D5Game.me.screenHeight >> 1) ? this._pos.y : (d5power.D5Game.me.screenHeight >> 1);
                targetx = this._pos.x > maxX - (d5power.D5Game.me.screenWidth >> 1) ? this._pos.x - (maxX - d5power.D5Game.me.screenWidth) : targetx;
                targety = this._pos.y > maxY - (d5power.D5Game.me.screenHeight >> 1) ? this._pos.y - (maxY - d5power.D5Game.me.screenHeight) : targety;
            }
            else {
                var target = d5power.D5Game.me.map.getScreenPostion(this._pos.x, this._pos.y);
                targetx = target.x;
                targety = target.y;
            }
            if (this._displayer) {
                this._displayer.x = parseInt(targetx);
                this._displayer.y = parseInt(targety);
            }
            if (this._controller)
                this._controller.run();
        };
        p.setAction = function (action) {
            this._action = action;
            if (this._resStyle != null)
                this.setRespath(this._resStyle + '/' + action);
        };
        d(p, "action"
            ,function () {
                return this._action;
            }
        );
        /**
         * 深度排序浮动
         */
        p.setZOrderF = function (val) {
            this._zOrderF = val;
        };
        /**
         * 深度排序浮动
         */
        p.zOrderF = function () {
            return this._zOrderF;
        };
        d(p, "zOrder"
            /**
             * 获取坐标的深度排序
             */
            ,function () {
                //return zorder;
                return this.posY + this._zOrderF;
            }
        );
        p.setDirection = function (dir) {
            this._direction = dir;
        };
        d(p, "direction"
            ,function () {
                return this._direction;
            }
        );
        p.setPos = function (px, py) {
            this._pos.x = px;
            this._pos.y = py;
        };
        d(p, "speed"
            ,function () {
                return this._speed;
            }
        );
        p.setSpeed = function (speed) {
            this._speed = speed;
        };
        d(p, "$pos"
            ,function () {
                return this._pos;
            }
        );
        d(p, "posX"
            ,function () {
                return this._pos.x;
            }
        );
        d(p, "posY"
            ,function () {
                return this._pos.y;
            }
        );
        p.setController = function (ctrl) {
            this._controller = ctrl;
        };
        d(p, "controller"
            ,function () {
                return this._controller;
            }
        );
        p.setRespath = function (v) {
            this._respath = v;
            if (v != null && v != '' && this._displayer) {
                this._displayer.setupSkin(this._respath);
            }
        };
        d(p, "respath"
            ,function () {
                return this._respath;
            }
        );
        p.setResStyle = function (dir) {
            this._resStyle = dir;
            this.setAction(d5power.Actions.Wait);
        };
        d(p, "resStyle"
            ,function () {
                return this._resStyle;
            }
        );
        p.setLink = function (mapid, posx, posy) {
            this._link_map = mapid;
            this._link_posx = posx;
            this._link_posy = posy;
        };
        d(p, "linkMap"
            ,function () {
                return this._link_map;
            }
        );
        d(p, "linkPosx"
            ,function () {
                return this._link_posx;
            }
        );
        d(p, "linkPosy"
            ,function () {
                return this._link_posy;
            }
        );
        p.setNickname = function (v) {
            this._nickname = v;
        };
        d(p, "nickname"
            ,function () {
                return this._nickname;
            }
        );
        p.setWork = function (value) {
            this._work = value;
        };
        d(p, "work"
            ,function () {
                return this._work;
            }
        );
        p.isNpc = function () {
            return this._work == GOData.WORK_NPC;
        };
        p.isDoor = function () {
            return this._work == GOData.WORK_DOOR;
        };
        p.dispose = function () {
            if (this._controller) {
                this._controller.dispose();
            }
            this._controller = null;
            this._deleting = false;
            this._work = GOData.WORK_NORMAL;
            this._inScreen = false;
            this._nickname = null;
            this._respath = null;
            this._resStyle = null;
            this.$pos.x = 0;
            this.$pos.y = 0;
            this.setJob(0, '', '0');
            this.setDisplayer(null);
            this.setAI(null);
            this.setUid(0);
            GOData.back2pool(this);
        };
        p.setInScreen = function (b) {
            this._inScreen = b;
        };
        d(p, "inScreen"
            ,function () {
                return this._inScreen;
            }
        );
        p.setCamp = function (value) {
            this._camp = value;
        };
        d(p, "camp"
            ,function () {
                return this._camp;
            }
        );
        d(p, "deleting"
            ,function () {
                return this._deleting;
            }
        );
        p.setDeleting = function (b) {
            this._deleting = b;
        };
        p.setDisplayer = function (data) {
            if (this._displayer != null && data == null)
                this._displayer.dispose();
            this._displayer = data;
            if (this._displayer) {
                this._displayer.setupData(this);
                if (this.respath != null && this.respath != '') {
                    this._displayer.setupSkin(this.respath);
                }
            }
        };
        d(p, "displayer"
            ,function () {
                return this._displayer;
            }
        );
        p.setAI = function (data) {
            this._ai = data;
        };
        d(p, "ai"
            ,function () {
                return this._ai;
            }
        );
        p.setUid = function (id) {
            this._uid = id;
        };
        d(p, "uid"
            ,function () {
                return this._uid;
            }
        );
        p.setSay = function (say) {
            this._say = say;
        };
        d(p, "say"
            ,function () {
                var missionData = this._missionIndex == -1 ? null : d5power.D5Game.me.characterData.getMissionByIndex(this._missionIndex).missionData;
                return missionData == null ? this._say : missionData.npc_said;
            }
        );
        p.setScript = function (script) {
            this._script = script;
        };
        d(p, "script"
            ,function () {
                return this._script;
            }
        );
        d(p, "missionIndexList"
            ,function () {
                return this._missionIndexList;
            }
        );
        d(p, "missionIndex"
            ,function () {
                return this._missionIndex;
            }
        );
        p.setJob = function (type, value, num) {
            this._job_type = type;
            this._job_value = value;
            this._job_num = num;
        };
        d(p, "job_type"
            ,function () {
                return this._job_type;
            }
        );
        d(p, "job_value"
            ,function () {
                return this._job_value;
            }
        );
        d(p, "job_number"
            ,function () {
                return this._job_num;
            }
        );
        p.renderMe = function () {
            this.displayer.renderMe();
        };
        p.setHp = function (value) {
            if (value < 0) {
                value = 0;
            }
            this._hp = value > this._maxHp ? this._maxHp : value;
        };
        d(p, "hp"
            ,function () {
                return this._hp;
            }
        );
        p.setMaxHp = function (value) {
            this._maxHp = value;
            this._hp = value;
        };
        d(p, "maxHp"
            ,function () {
                return this._maxHp;
            }
        );
        p.setSp = function (value) {
            if (value < 0) {
                value = 0;
            }
            this._sp = value > this._maxSp ? this._maxSp : value;
        };
        d(p, "sp"
            ,function () {
                return this._sp;
            }
        );
        p.setMaxSp = function (value) {
            this._maxSp = value;
            this._sp = value;
        };
        d(p, "maxSp"
            ,function () {
                return this._maxSp;
            }
        );
        p.setMonsterid = function (id) {
            this._monsterid = id;
        };
        d(p, "monsterid"
            ,function () {
                return this._monsterid;
            }
        );
        p.setIsDB = function (id) {
            this._isDB = id;
        };
        d(p, "isDB"
            ,function () {
                return this._isDB;
            }
        );
        p.setChecktime = function (id) {
            this._checktime = id;
        };
        d(p, "checktime"
            ,function () {
                return this._checktime;
            }
        );
        p.setChecksize = function (id) {
            this._checksize = id;
        };
        d(p, "checksize"
            ,function () {
                return this._checksize;
            }
        );
        p.setCheckdel = function (id) {
            this._checkdel = id;
        };
        d(p, "checkdel"
            ,function () {
                return this._checkdel;
            }
        );
        GOData.WORK_NORMAL = 0;
        GOData.WORK_NPC = 1;
        GOData.WORK_DOOR = 2;
        GOData.WORK_MONSTER = 3;
        GOData.WORK_EVENT = 4;
        GOData.JOB_COLLECTION = 1;
        GOData.JOB_SHOP = 2;
        GOData.JOB_CHANGE_MAP = 3;
        GOData.JOB_COMPOSE = 4;
        return GOData;
    })();
    d5power.GOData = GOData;
    egret.registerClass(GOData,"d5power.GOData",["d5power.IGD"]);
})(d5power || (d5power = {}));

var d5power;
(function (d5power) {
    /**
     * 职业配置数据
     * @author
     *
     */
    var JobData = (function () {
        function JobData() {
            /**
            * 职业名称
            */
            this.name = "";
            /**
            * 职业皮肤
            */
            this.skin = "";
        }
        var d = __define,c=JobData;p=c.prototype;
        p.format = function (xml) {
            this.id = parseInt(xml.id);
            this.name = (xml.name);
            this.skin = (xml.skin);
        };
        p.toString = function () {
            return "阵营[" + this.id + "]" + name;
        };
        return JobData;
    })();
    d5power.JobData = JobData;
    egret.registerClass(JobData,"d5power.JobData");
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
var d5power;
(function (d5power) {
    var MissionBlock = (function () {
        function MissionBlock() {
            /**
             * 类型
             */
            this.type = 0;
        }
        var d = __define,c=MissionBlock;p=c.prototype;
        d(p, "Type"
            ,function () {
                return this.type;
            }
        );
        d(p, "Value"
            ,function () {
                return this.value;
            }
        );
        d(p, "Num"
            ,function () {
                return this.num;
            }
        );
        p.format = function (t, v, n) {
            this.type = t;
            this.value = v;
            this.num = n;
        };
        p.toString = function () {
            return "类型：" + this.type + "值：" + this.value + "数量：" + this.num;
        };
        return MissionBlock;
    })();
    d5power.MissionBlock = MissionBlock;
    egret.registerClass(MissionBlock,"d5power.MissionBlock");
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
    var MissionData = (function () {
        function MissionData(id) {
            if (id === void 0) { id = 0; }
            this._actionType = 0;
            this._type = 0;
            /**
             * 任务ID
             */
            this._id = 0;
            /**
             * 是否开始
             */
            this._isstart = false;
            /**
             * 是否完成
             */
            this._iscomplate = false;
            /**
             * 是否激活
             */
            this._isactive = false;
            this._id = id;
        }
        var d = __define,c=MissionData;p=c.prototype;
        p.setNode = function (value) {
            this._node = value;
        };
        d(p, "node"
            ,function () {
                return this._node;
            }
        );
        p.formatFromJson = function (data) {
            var block;
            this._need = [];
            this._give = [];
            this._active = [];
            this._name = data.name;
            this._actionType = data.type;
            this._info = data.info;
            this._npc_startId = data.npcStartId;
            this._npc_CompleteId = data.npcCompleteId;
            this._id = data.id;
            this._npc_said = data.npcSaid;
            this._startScript = data.startScript;
            this._complate_script = data.completeScript;
            this._uncompDialog = data.uncompDialog;
            this._completeDialog = data.completeDialog;
            //if(this._npc_startId==0)
            //{
            //	if(this._npc_CompleteId==0)
            //	{
            //		this._type = MissionData.TYPE_COMPLATE;
            //	}
            //	else
            //	{
            //		this._type = MissionData.TYPE_GET;
            //	}
            //}
            var obj;
            var i;
            if (data.need) {
                for (i = 0; i < data.need.length; i++) {
                    obj = data.need[i];
                    block = new d5power.MissionBlock();
                    block.type = parseInt(obj.type);
                    block.value = obj.value;
                    block.num = obj.num;
                    this._active.push(block);
                }
            }
            var obj;
            if (data.give) {
                for (i = 0; i < data.give.length; i++) {
                    obj = data.give[i];
                    block = new d5power.MissionBlock();
                    block.type = parseInt(obj.type);
                    block.value = obj.value;
                    block.num = obj.num;
                    this._give.push(block);
                }
            }
            var obj;
            if (data.complete) {
                for (i = 0; i < data.complete.length; i++) {
                    obj = data.complete[i];
                    block = new d5power.MissionBlock();
                    block.type = parseInt(obj.type);
                    block.value = obj.value;
                    block.num = obj.num;
                    this._need.push(block);
                }
            }
        };
        d(p, "complate_script"
            ,function () {
                return this._complate_script;
            }
        );
        d(p, "startScript"
            ,function () {
                return this._startScript;
            }
        );
        d(p, "actionType"
            /**
             * 任务类型 0-主 1-支 2-可重复
             */
            ,function () {
                return this._actionType;
            }
        );
        /**
         * 任务类型 0-接 1-交
         */
        p.setType = function (value) {
            this._type = value;
        };
        d(p, "type"
            /**
             * 任务类型 0-接 1-交
             */
            ,function () {
                return this._type;
            }
        );
        d(p, "name"
            /**
             * 任务名
             */
            ,function () {
                return this._name;
            }
        );
        d(p, "id"
            /**
             * 任务ID
             */
            ,function () {
                return this._id;
            }
        );
        d(p, "info"
            /**
             * 任务信息
             */
            ,function () {
                return this._info;
            }
        );
        d(p, "npc_said"
            /**
             * NPC任务对话
             */
            ,function () {
                return this._npc_said;
            }
        );
        d(p, "uncompDialog"
            /**
             * NPC 未完成对话
             */
            ,function () {
                return this._uncompDialog;
            }
        );
        d(p, "completeDialog"
            /**
             * NPC 完成对话
             */
            ,function () {
                return this._completeDialog;
            }
        );
        d(p, "npc_startId"
            /**
             * 开始NPC关联
             */
            ,function () {
                return this._npc_startId;
            }
        );
        d(p, "npc_CompleteId"
            /**
             * 结束NPC关联
             */
            ,function () {
                return this._npc_CompleteId;
            }
        );
        d(p, "need"
            /**
             * 任务条件
             */
            ,function () {
                return this._need;
            }
        );
        d(p, "active"
            ,function () {
                return this._active;
            }
        );
        d(p, "give"
            /**
             * 任务奖励
             */
            ,function () {
                return this._give;
            }
        );
        d(p, "giveString"
            ,function () {
                var givestr = '';
                var len = this.give.length;
                for (var i = 0; i < len; i++) {
                    var temp = this.give[i];
                    givestr += d5power.MissionNR.getChinese(temp.type) + 'x' + temp.num;
                }
                return givestr;
            }
        );
        d(p, "needString"
            ,function () {
                var needstr = '';
                var length = this._need.length;
                for (var i = 0; i < length; i++) {
                    var need = this._need[i];
                    needstr += d5power.MissionNR.getChinese(need.type) + "()";
                }
                return needstr;
            }
        );
        d(p, "isComplate"
            /**
             * 任务是否完成
             */
            ,function () {
                return this._iscomplate;
            }
        );
        d(p, "isActive"
            /**
             * 任务是否激活
             */
            ,function () {
                return this._isactive;
            }
        );
        /**
         * 增加完成条件
         */
        p.addNeed = function (need) {
            if (this._need == null)
                this._need = [];
            if (need.type == 0 && need.value == null)
                return;
            this._need.push(need);
        };
        /**
         * 增加奖励内容
         */
        p.addGive = function (give) {
            if (this._give == null)
                this._give = [];
            if (give.type == 0 && give.value == null)
                return;
            this._give.push(give);
        };
        /**
         * 检查当前任务是否完成
         */
        p.check = function (checker) {
            this._iscomplate = true;
            if (this._need != null) {
                var length = this._need.length;
                for (var i = 0; i < length; i++) {
                    var need = this._need[i];
                    switch (need.type) {
                        case d5power.MissionNR.N_ITEM_NEED:
                        case d5power.MissionNR.N_ITEM_TACKED:
                            this._iscomplate = this._iscomplate && checker.hasItemNum(parseInt(need.value)) >= parseInt(need.num);
                            break;
                        case d5power.MissionNR.N_MONSTER_KILLED:
                            this._iscomplate = this._iscomplate && checker.killMonseterNum(parseInt(need.value)) >= parseInt(need.num);
                            break;
                        case d5power.MissionNR.N_PLAYER_PROP:
                            this._iscomplate = this._iscomplate && checker.userPro(need.value, parseInt(need.num));
                            break;
                        case d5power.MissionNR.N_MISSION:
                            this._iscomplate = this._iscomplate && checker.hasMission(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_TALK_NPC:
                            this._iscomplate = this._iscomplate && checker.hasTalkedWith(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_BUFF:
                            this._iscomplate = this._iscomplate && checker.hasBuff(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_EQU:
                            this._iscomplate = this._iscomplate && checker.hasEqu(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_SKILL:
                            this._iscomplate = this._iscomplate && checker.hasSkill(parseInt(need.value), 0);
                            break;
                        case d5power.MissionNR.N_SKILL_LV:
                            this._iscomplate = this._iscomplate && checker.hasSkill(parseInt(need.value), parseInt(need.num));
                            break;
                        case d5power.MissionNR.N_SKIN:
                            this._iscomplate = this._iscomplate && checker.hasSkin(need.value);
                            break;
                        default:
                            if (checker.hasChecker(need.type))
                                this._iscomplate = this._iscomplate && checker.publicCheck(need.type, need.value, need.num);
                            break;
                    }
                }
            }
            return this._iscomplate;
        };
        /**
         * 检查当前任务是否完成
         */
        p.checkActive = function (checker) {
            this._isactive = true;
            if (this._active != null) {
                var length = this._active.length;
                for (var i = 0; i < length; i++) {
                    var need = this._active[i];
                    switch (need.type) {
                        case d5power.MissionNR.N_ITEM_NEED:
                        case d5power.MissionNR.N_ITEM_TACKED:
                            this._isactive = this._isactive && checker.hasItemNum(parseInt(need.value)) >= parseInt(need.num);
                            break;
                        case d5power.MissionNR.N_MONSTER_KILLED:
                            this._isactive = this._isactive && checker.killMonseterNum(parseInt(need.value)) >= parseInt(need.num);
                            break;
                        case d5power.MissionNR.N_PLAYER_PROP:
                            this._isactive = this._isactive && checker.userPro(need.value, parseInt(need.num));
                            break;
                        case d5power.MissionNR.N_MISSION:
                            this._isactive = this._isactive && checker.hasMission(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_TALK_NPC:
                            this._isactive = this._isactive && checker.hasTalkedWith(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_BUFF:
                            this._isactive = this._isactive && checker.hasBuff(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_EQU:
                            this._isactive = this._isactive && checker.hasEqu(parseInt(need.value));
                            break;
                        case d5power.MissionNR.N_SKILL:
                            this._isactive = this._isactive && checker.hasSkill(parseInt(need.value), 0);
                            break;
                        case d5power.MissionNR.N_SKILL_LV:
                            this._isactive = this._isactive && checker.hasSkill(parseInt(need.value), parseInt(need.num));
                            break;
                        case d5power.MissionNR.N_SKIN:
                            this._isactive = this._isactive && checker.hasSkin(need.value);
                            break;
                        default:
                            if (checker.hasChecker(need.type))
                                this._isactive = this._isactive && checker.publicCheck(need.type, need.value, need.num);
                            break;
                    }
                }
            }
            return this._isactive;
        };
        /**
         * 完成任务
         */
        p.complate = function (checker, node) {
            if (!this.check(checker))
                return false;
            if (this._actionType != MissionData.ACTIONTYPE_AGAIN) {
                d5power.D5Game.me.characterData.deleteMission(node);
            }
            else {
                this._isactive = false;
                this._iscomplate = false;
                this._type = 0;
            }
            d5power.D5Game.me.characterData.addMission(node);
            d5power.D5Game.me.characterData.check();
            if (this._need != null) {
                var length = this._need.length;
                for (var i = 0; i < length; i++) {
                    var need = this._need[i];
                    switch (need.type) {
                        case d5power.MissionNR.N_ITEM_NEED:
                            d5power.D5Game.me.characterData.delItem(parseInt(need.value), parseInt(need.num));
                            break;
                    }
                }
            }
            if (this._give != null) {
                var length1 = this._give.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var give = this._give[i1];
                    MissionData.reward(give, checker);
                }
            }
            return true;
        };
        MissionData.reward = function (give, checker) {
            switch (give.type) {
                case d5power.MissionNR.R_ITEM:
                    checker.getItem((give.value), (give.num), 0, false);
                    break;
                case d5power.MissionNR.R_MONEY:
                    checker.getMoney(parseInt(give.value));
                    d5power.D5Game.me.missionLoaded();
                    break;
                case d5power.MissionNR.R_EXP:
                    checker.getExp(parseInt(give.value));
                    break;
                case d5power.MissionNR.R_MISSION:
                    d5power.D5Game.me.characterData.addMissionById(parseInt(give.Value));
                    break;
            }
        };
        p.toString = function () {
            return "任务名：" + this._name + "\n任务编号：" + this._id + "\n任务类型：" + this._type + "\n任务说明:" + this._info;
        };
        /**
         * 接受任务
         */
        MissionData.TYPE_GET = 1;
        /**
         * 完成任务 ？
         */
        MissionData.TYPE_COMPLATE = 2;
        /**
         * 主线任务 ！
         */
        MissionData.ACTIONTYPE_TRUNK = 0;
        /**
         * 支线任务 ？
         */
        MissionData.ACTIONTYPE_BRANCHES = 1;
        /**
         * 重复任务 ？
         */
        MissionData.ACTIONTYPE_AGAIN = 2;
        /**
         * 领取类任务，直接可以完成，文字显示接受
         */
        MissionData.GIVE = 0;
        /**
         * 完成类任务，需要满足条件才能完成。
         */
        MissionData.MISS = 1;
        return MissionData;
    })();
    d5power.MissionData = MissionData;
    egret.registerClass(MissionData,"d5power.MissionData");
})(d5power || (d5power = {}));

/**
 * Created by Administrator on 2015/10/26.
 */
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
    var MissionNode = (function () {
        function MissionNode() {
            /**
             * id
             */
            this.id = 0;
            /**
             * ��id
             */
            this.chapterId = 0;
            /**
             * ��id
             */
            this.partId = 0;
            /**
             * ������id
             */
            this.missionId = 0;
        }
        var d = __define,c=MissionNode;p=c.prototype;
        p.format = function (xml) {
            this.id = parseInt(xml.id);
            this.childs = xml.node;
            this.missionId = parseInt(xml.missionId);
            this._missionData = d5power.D5ConfigCenter.my.getMissionData(this.missionId);
            this._missionData.setNode(this);
        };
        d(p, "missionData"
            ,function () {
                return this._missionData;
            }
        );
        return MissionNode;
    })();
    d5power.MissionNode = MissionNode;
    egret.registerClass(MissionNode,"d5power.MissionNode");
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
    var MissionNR = (function () {
        function MissionNR() {
        }
        var d = __define,c=MissionNR;p=c.prototype;
        /**
         * 增加用户处理配置
         */
        MissionNR.addCostomDefine = function (data) {
            if (data.length != 2) {
                return '无效的配置数据';
            }
            if (parseInt(data[0]) <= MissionNR.SAVE_KEY) {
                return MissionNR.SAVE_KEY + '以内为D5Rpg保留条件ID';
            }
            MissionNR.COSTOM_DEFINE.push(data);
            return 'TRUE';
        };
        MissionNR.getChinese = function (id) {
            if (id === void 0) { id = 0; }
            switch (id) {
                case MissionNR.N_MONSTER_KILLED:
                    return '杀死怪物';
                    break;
                case MissionNR.N_ITEM_NEED:
                    return '拥有道具（扣除）';
                    break;
                case MissionNR.N_ITEM_TACKED:
                    return '拥有道具（不扣除）';
                    break;
                case MissionNR.N_MISSION:
                    return '拥有任务';
                    break;
                case MissionNR.N_PLAYER_PROP:
                    return '玩家属性达到';
                    break;
                case MissionNR.N_TALK_NPC:
                    return '与NPC对话';
                    break;
                case MissionNR.N_SKILL_LV:
                    return '技能等级达到';
                    break;
                case MissionNR.N_EQU:
                    return '需要装备';
                    break;
                case MissionNR.N_SKIN:
                    return '需要皮肤';
                    break;
                case MissionNR.N_SKILL:
                    return '需要学会技能';
                    break;
                case MissionNR.N_BUFF:
                    return '需要BUFF状态';
                    break;
                case MissionNR.R_ITEM:
                    return '奖励道具';
                    break;
                case MissionNR.R_MONEY:
                    return '奖励游戏币';
                    break;
                case MissionNR.R_EXP:
                    return '奖励经验';
                    break;
                case MissionNR.R_MISSION:
                    return '奖励任务';
                    break;
                default:
                    var length = MissionNR.COSTOM_DEFINE.length;
                    for (var i = 0; i < length; i++) {
                        var data = MissionNR.COSTOM_DEFINE[i];
                        if (data[0] == id)
                            return data[1];
                    }
                    break;
            }
            return 'NULL';
        };
        /**
         * 系统保存的处理模式
         */
        MissionNR.SAVE_KEY = 200;
        /**
         * 需求与奖励分割线
         */
        MissionNR.N_R_LINE = 100;
        /* !!! 以下内容为D5Rpg内部定义，非必要请不要修改，会影响较多代码 !!! */
        /**
         * 杀死怪物
         */
        MissionNR.N_MONSTER_KILLED = 0;
        /**
         * 拥有物品（不扣除）
         */
        MissionNR.N_ITEM_TACKED = 1;
        /**
         * 拥有物品（扣除）
         */
        MissionNR.N_ITEM_NEED = 2;
        /**
         * 拥有任务
         */
        MissionNR.N_MISSION = 3;
        /**
         * 玩家属性
         */
        MissionNR.N_PLAYER_PROP = 4;
        /**
         * 与NPC对话
         */
        MissionNR.N_TALK_NPC = 5;
        /**
         * 需要技能
         */
        MissionNR.N_SKILL_LV = 6;
        /**
         * 需要主角皮肤
         */
        MissionNR.N_SKIN = 7;
        /**
         * 需要装备某类型道具
         */
        //public static const N_EQU_TYPE:uint = 8;
        /**
         * 需要装备某个特定道具
         */
        MissionNR.N_EQU = 9;
        /**
         * 需要学会技能
         */
        MissionNR.N_SKILL = 10;
        /**
         * 需要增益
         */
        MissionNR.N_BUFF = 11;
        /**
         *需要游戏币
         */
        MissionNR.N_MONEY = 12;
        /**
         *需要标记
         */
        MissionNR.N_MARK = 13;
        /**
         *拥有游戏币
         */
        MissionNR.N_MONEY_KEEP = 14;
        /**
         * 奖励道具
         */
        MissionNR.R_ITEM = 100;
        /**
         * 奖励游戏币
         */
        MissionNR.R_MONEY = 101;
        /**
         * 奖励经验
         */
        MissionNR.R_EXP = 102;
        /**
         * 奖励任务
         */
        MissionNR.R_MISSION = 103;
        /**
         * 奖励属性
         */
        MissionNR.R_PLAYER_PROP = 104;
        /* !!! 以上内容为D5Rpg内部定义，非必要请不要修改，会影响较多代码 !!! */
        MissionNR.COSTOM_DEFINE = new Array();
        return MissionNR;
    })();
    d5power.MissionNR = MissionNR;
    egret.registerClass(MissionNR,"d5power.MissionNR");
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
 * Created by Administrator on 2015/8/24.
 */
var d5power;
(function (d5power) {
    var MonsterConfData = (function () {
        function MonsterConfData() {
        }
        var d = __define,c=MonsterConfData;p=c.prototype;
        /**
         * 格式化对象
         */
        p.formatObject = function (data) {
            this.id = data.id;
            this.name = data.name;
            this.lv = data.lv;
            this.skin = data.skin;
            this.isDB = data.isDB;
        };
        p.format = function (data) {
            this.id = parseInt(data.id);
            this.name = String(data.name);
            this.lv = parseInt(data.lv);
            this.skin = String(data.skin);
            this.isDB = parseInt(data.isDB);
        };
        return MonsterConfData;
    })();
    d5power.MonsterConfData = MonsterConfData;
    egret.registerClass(MonsterConfData,"d5power.MonsterConfData");
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
 * Created by Administrator on 2015/5/29.
 */
var d5power;
(function (d5power) {
    var MonsterFlushData = (function () {
        function MonsterFlushData() {
        }
        var d = __define,c=MonsterFlushData;p=c.prototype;
        p.format = function (monster) {
            this.id = parseInt(monster.id);
            this.stay = parseInt(monster.stay) == 0 ? false : true;
            this.walk_round = parseInt(monster.walk_round);
            this.flush_num = parseInt(monster.flush_num);
            this.flush_dis = parseInt(monster.flush_dis);
            this.relive = parseInt(monster.relive);
            this.campset = parseInt(monster.camp);
            this.autoAtk = parseInt(monster.autoAtk) == 0 ? false : true;
            this.posx = parseInt(monster.posx);
            this.posy = parseInt(monster.posy);
        };
        return MonsterFlushData;
    })();
    d5power.MonsterFlushData = MonsterFlushData;
    egret.registerClass(MonsterFlushData,"d5power.MonsterFlushData");
})(d5power || (d5power = {}));

/**
 * Created by Administrator on 2015/6/2.
 */
var d5power;
(function (d5power) {
    var NpcData = (function () {
        function NpcData() {
        }
        var d = __define,c=NpcData;p=c.prototype;
        p.format = function (xml) {
            this.id = parseInt(xml.id);
            this.name = (xml.name);
            this.skin = (xml.skin);
            this.head = (xml.head);
            this.inmap = parseInt(xml.inmap);
        };
        p.toString = function () {
            return "npc[" + this.id + "]" + this.name + "[Ƥ��]" + this.skin + "[���ڵ�ͼ]" + this.inmap;
        };
        return NpcData;
    })();
    d5power.NpcData = NpcData;
    egret.registerClass(NpcData,"d5power.NpcData");
})(d5power || (d5power = {}));

/**
 * Created by Administrator on 2015/11/11.
 */
/**
 * Created by Administrator on 2015/11/11.
 */
/**
 * Created by Administrator on 2015/10/26.
 */
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
    var PartData = (function () {
        function PartData() {
            /**
             * id
             */
            this.id = 0;
            this.tree = new Object();
        }
        var d = __define,c=PartData;p=c.prototype;
        return PartData;
    })();
    d5power.PartData = PartData;
    egret.registerClass(PartData,"d5power.PartData");
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
 * Created by Administrator on 2015/11/6.
 */
var d5power;
(function (d5power) {
    var SceneData = (function () {
        function SceneData() {
            this.name = "";
            this.icon = "";
        }
        var d = __define,c=SceneData;p=c.prototype;
        p.format = function (xml) {
            this.id = parseInt(xml.id);
            this.posX = parseInt(xml.x);
            this.posY = parseInt(xml.y);
            this.icon = xml.icon;
            this.name = xml.name;
        };
        p.toString = function () {
            return "�³���[" + this.id + "]" + this.name;
        };
        return SceneData;
    })();
    d5power.SceneData = SceneData;
    egret.registerClass(SceneData,"d5power.SceneData");
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
    var Base64 = (function () {
        function Base64() {
            throw new Error("Base64 class is static container only");
        }
        var d = __define,c=Base64;p=c.prototype;
        Base64.encode = function (data) {
            // Convert string to ByteArray   
            var bytes = new egret.ByteArray();
            bytes.writeUTFBytes(data);
            //			bytes.compress();
            bytes.endian = egret.Endian.LITTLE_ENDIAN;
            // Return encoded ByteArray   
            return Base64.encodeByteArray(bytes);
        };
        Base64.decodeToArray = function (chunk, lineWidth, compressed) {
            var result = new Array();
            var data = Base64.decodeToByteArray(chunk);
            //            if (compressed)
            //            {
            //                //				data.uncompress();
            //
            //                //由于接口需要传入Uint8Array类型参数，所以在此进行ArrayBuffer2Uint8Array转换
            //
            //                var plain:Uint8Array = new Uint8Array(data.buffer);
            //
            //                //            //zlib压缩
            //
            //                //            var deflate = new Zlib.Deflate(plain);
            //
            //                //            var compressed:Uint8Array = deflate.compress();
            //
            //                //zlib解压缩
            //
            //                var inflate = new Zlib.Inflate(plain);
            //
            //                var deplain:Uint8Array = inflate.decompress();
            //
            //                //在测试中发现解压后的deplain.buffer值不正确（也不知道为毛）
            //
            //                //所以要想得到最终的ArrayBuffer,需要重新复制一份deplain
            //
            //                var newDeplain: Uint8Array = new Uint8Array(deplain.length);
            //
            //                for(var i: number = 0;i < deplain.length;i++) { 
            //
            //                    newDeplain[i] = deplain[i];
            //
            //                }
            //
            //                //zlib解压后的字节流
            //
            //                //            var lastbytes: ArrayBuffer = newDeplain.buffer;
            //                data = new egret.ByteArray(newDeplain.buffer);
            //            }
            data.endian = egret.Endian.LITTLE_ENDIAN;
            while (data.bytesAvailable) {
                var resultRow = [];
                for (var i = 0; i < lineWidth; i++) {
                    var p = data.readInt();
                    resultRow.push(p);
                }
                result.push(resultRow);
            }
            return result;
        };
        Base64.encodeByteArray = function (data) {
            // Initialise output   
            var output = "";
            // Create data and output buffers   
            var dataBuffer;
            var outputBuffer = new Array(4);
            // Rewind ByteArray   
            data.position = 0;
            while (data.bytesAvailable > 0) {
                // Create new data buffer and populate next 3 bytes from data   
                dataBuffer = new Array();
                for (var i = 0; i < 3 && data.bytesAvailable > 0; i++) {
                    dataBuffer[i] = data.readUnsignedByte();
                }
                // Convert to data buffer Base64 character positions and    
                // store in output buffer   
                outputBuffer[0] = (dataBuffer[0] & 0xfc) >> 2;
                outputBuffer[1] = ((dataBuffer[0] & 0x03) << 4) | ((dataBuffer[1]) >> 4);
                outputBuffer[2] = ((dataBuffer[1] & 0x0f) << 2) | ((dataBuffer[2]) >> 6);
                outputBuffer[3] = dataBuffer[2] & 0x3f;
                for (var j = dataBuffer.length; j < 3; j++) {
                    outputBuffer[j + 1] = 64;
                }
                for (var k = 0; k < outputBuffer.length; k++) {
                    output += Base64.BASE64_CHARS.charAt(outputBuffer[k]);
                }
            }
            // Return encoded data   
            return output;
        };
        Base64.decode = function (data) {
            // Decode data to ByteArray   
            var bytes = Base64.decodeToByteArray(data);
            //			bytes.uncompress();
            bytes.endian = egret.Endian.LITTLE_ENDIAN;
            // Convert to string and return   
            return bytes.readUTFBytes(bytes.length);
        };
        Base64.decodeToByteArray = function (data) {
            // Initialise output ByteArray for decoded data   
            var output = new egret.ByteArray();
            // Create data and output buffers   
            var dataBuffer = new Array(4);
            var outputBuffer = new Array(3);
            for (var i = 0; i < data.length; i += 4) {
                for (var j = 0; j < 4 && i + j < data.length; j++) {
                    dataBuffer[j] = Base64.BASE64_CHARS.indexOf(data.charAt(i + j));
                }
                // Decode data buffer back into bytes   
                outputBuffer[0] = (dataBuffer[0] << 2) + ((dataBuffer[1] & 0x30) >> 4);
                outputBuffer[1] = ((dataBuffer[1] & 0x0f) << 4) + ((dataBuffer[2] & 0x3c) >> 2);
                outputBuffer[2] = ((dataBuffer[2] & 0x03) << 6) + dataBuffer[3];
                for (var k = 0; k < outputBuffer.length; k++) {
                    if (dataBuffer[k + 1] == 64)
                        break;
                    output.writeByte(outputBuffer[k]);
                }
            }
            // Rewind decoded data ByteArray   
            output.position = 0;
            // Return decoded data   
            return output;
        };
        Base64.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return Base64;
    })();
    d5power.Base64 = Base64;
    egret.registerClass(Base64,"d5power.Base64");
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
    var TiledLayer = (function () {
        //		public properties:TiledPropertySet = null;
        function TiledLayer(source, parent) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.compressed = false;
            this.map = parent;
            this.name = source.name;
            this.x = source.x;
            this.y = source.y;
            this.width = source.width;
            this.height = source.height;
            this.visible = !source.visible || (source.visible != 0);
            this.opacity = source.opacity;
            var node;
            //			var length:number = source.properties.length;
            //			for(var i:number = 0;i < length;i++){
            //				var node:any = source.properties[i];
            //				this.properties = this.properties ? this.properties.format(node) : new TiledPropertySet(node);
            //			}
            this.tileGIDs = [];
            this.encoding = source.encoding;
            var chunk;
            if (source.encoding == "") {
                // create a 2dimensional array
                var lineWidth = this.width;
                var rowIdx = -1;
                var length1 = source.tile.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    node = source.tile[i1];
                    // new line?
                    if (++lineWidth >= this.width) {
                        this.tileGIDs[++rowIdx] = [];
                        lineWidth = 0;
                    }
                    var gid = node.gid;
                    this.tileGIDs[rowIdx].push(gid);
                }
            }
            else if (source.encoding == "csv") {
                chunk = (source.data);
                this.tileGIDs = TiledLayer.csvToArray(chunk, this.width);
            }
            else if (source.encoding == "base64") {
                chunk = (source.data);
                if (source.compression == "zlib")
                    this.compressed = true;
                else if (source.compression.length() != 0)
                    throw ("TmxLayer - data compression type not supported!");
            }
        }
        var d = __define,c=TiledLayer;p=c.prototype;
        p.toJson = function () {
            var result = new Object;
            result.name = this.name;
            result.x = this.x;
            result.y = this.y;
            result.width = this.width;
            result.height = this.height;
            result.visible = this.visible;
            result.opacity = this.opacity;
            result.encoding = this.encoding;
            //			var temp:String = arrayToString();
            if (this.encoding == "") {
                var node_arr = new Array();
                for (var i = 0; i < this.tileGIDs.length; i++) {
                    var arr = new Array(this.tileGIDs[i]);
                    var len = arr.length;
                    for (var j = 0; j < len; j++) {
                        var node = new Object;
                        node.gid = arr[j];
                        node_arr.push(node);
                    }
                }
                result.tile = node_arr;
            }
            else if (this.encoding == "csv") {
                result.data = this.arrayToCsv(this.tileGIDs);
            }
            else if (this.encoding == "base64") {
                result.data = this.arrayToBase64(this.tileGIDs, this.width, this.compressed);
            }
            return result;
        };
        p.arrayToString = function () {
            var result = "";
            for (var i = 0; i < this.tileGIDs.length; i++) {
                var arr = new Array(this.tileGIDs[i]);
                var len = arr.length;
                for (var j = 0; j < len; j++) {
                    if (arr[j] != 0)
                        result += arr[j];
                }
            }
            return result;
        };
        TiledLayer.csvToArray = function (input, lineWidth) {
            if (lineWidth === void 0) { lineWidth = 0; }
            var result = [];
            var rows = input.split("\n");
            var length = rows.length;
            for (var i = 0; i < length; i++) {
                var row = rows[i];
                var resultRow = [];
                var entries = row.split(",", lineWidth);
                var length1 = entries.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var entry = entries[i1];
                    resultRow.push(parseInt(entry));
                }
                // convert to uint
                result.push(resultRow);
            }
            return result;
        };
        p.arrayToCsv = function (data) {
            var result = "";
            for (var i = 0; i < data.length; i++) {
                var arr = data[i];
                for (var j = 0; j < arr.length; j++) {
                    j < arr.length - 1 ? result += arr[j] + "," : result += arr[j];
                }
                result += "\n";
            }
            return result;
        };
        p.arrayToBase64 = function (data, lineWidth, compressed) {
            var result = "";
            var bytes = new egret.ByteArray;
            bytes.endian = egret.Endian.LITTLE_ENDIAN;
            for (var m = 0; m < data.length; m++) {
                var arr = data[m];
                for (var n = 0; n < arr.length; n++) {
                    bytes.writeInt(arr[n]);
                }
            }
            bytes.position = 0;
            //			bytes.compress();
            result = d5power.Base64.encodeByteArray(bytes);
            return result;
        };
        TiledLayer.base64ToArray = function (chunk, lineWidth, compressed) {
            var result = [];
            var data = d5power.Base64.decodeToByteArray(chunk);
            //			if (compressed)
            //			{
            //                //				data.uncompress();
            //                //由于接口需要传入Uint8Array类型参数，所以在此进行ArrayBuffer2Uint8Array转换
            //                var plain:Uint8Array = new Uint8Array(data.buffer);
            //                //            //zlib压缩
            //                //            var deflate = new Zlib.Deflate(plain);
            //                //            var compressed:Uint8Array = deflate.compress();
            //                //zlib解压缩
            //                var inflate = new Zlib.Inflate(plain);
            //                var deplain:Uint8Array = inflate.decompress();
            //                //在测试中发现解压后的deplain.buffer值不正确（也不知道为毛）
            //                //所以要想得到最终的ArrayBuffer,需要重新复制一份deplain
            //                var newDeplain: Uint8Array = new Uint8Array(deplain.length);
            //                for(var i: number = 0;i < deplain.length;i++) { 
            //                    newDeplain[i] = deplain[i];
            //                }
            //                //zlib解压后的字节流
            //                //            var lastbytes: ArrayBuffer = newDeplain.buffer;
            //                data = new egret.ByteArray(newDeplain.buffer);
            //			}
            data.endian = egret.Endian.LITTLE_ENDIAN;
            console.log(data.bytesAvailable);
            while (data.bytesAvailable) {
                var resultRow = [];
                for (var i = 0; i < lineWidth; i++) {
                    var p = data.readInt();
                    resultRow.push(p);
                }
                result.push(resultRow);
            }
            return result;
        };
        p.testDecode = function (value) {
            return "";
        };
        TiledLayer.base64ToByteArray = function (data) {
            var output = new egret.ByteArray();
            // initialize lookup table
            var lookup = [];
            for (var c = 0; c < TiledLayer.BASE64_CHARS.length; c++)
                lookup[TiledLayer.BASE64_CHARS.charCodeAt(c)] = c;
            for (var i = 0; i < data.length - 3; i += 4) {
                // read 4 bytes and look them up in the table
                var a0 = lookup[data.charCodeAt(i)];
                var a1 = lookup[data.charCodeAt(i + 1)];
                var a2 = lookup[data.charCodeAt(i + 2)];
                var a3 = lookup[data.charCodeAt(i + 3)];
                // convert to and write 3 bytes
                if (a1 < 64)
                    output.writeByte((a0 << 2) + ((a1 & 0x30) >> 4));
                if (a2 < 64)
                    output.writeByte(((a1 & 0x0f) << 4) + ((a2 & 0x3c) >> 2));
                if (a3 < 64)
                    output.writeByte(((a2 & 0x03) << 6) + a3);
            }
            // Rewind & return decoded data
            output.position = 0;
            return output;
        };
        TiledLayer.BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return TiledLayer;
    })();
    d5power.TiledLayer = TiledLayer;
    egret.registerClass(TiledLayer,"d5power.TiledLayer");
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
    var TiledMap = (function () {
        function TiledMap() {
            this.width = 0;
            this.height = 0;
            this.tileWidth = 0;
            this.tileHeight = 0;
            this.version = 0;
            this.nextobjectid = 0;
            //		public properties:TiledPropertySet = null;
            this.layers = {};
            this.tileSets = {};
            this.objectGroups = {};
        }
        var d = __define,c=TiledMap;p=c.prototype;
        p.format = function (data) {
            this.width = parseInt(data.width);
            this.height = parseInt(data.height);
            this.tileWidth = parseInt(data.tilewidth);
            this.tileHeight = parseInt(data.tileheight);
            this.version = parseInt(data.version);
            this.orientation = (data.orientation);
            this.renderorder = (data.renderorder);
            this.nextobjectid = parseInt(data.nextobjectid);
            var node = null;
            //			var length:number = data.properties.length;
            //			for(var i:number = 0;i < length;i++){
            //				node = data.properties[i];
            //				this.properties = this.properties ? this.properties.format(node) : new TiledPropertySet(node);
            //			}
            //			// load tilesets
            //
            this.imgLib = new Array();
            var length1 = data.tilesets.length;
            for (var i1 = 0; i1 < length1; i1++) {
                node = data.tilesets[i1];
                var tiledset = new d5power.TiledTileSet(node, this);
                this.tileSets[node.name] = tiledset;
                this.imgLib.push(tiledset);
            }
            // load layers
            this.layers_ordered = new Array();
            var length2 = data.layers.length;
            for (var i2 = 0; i2 < length2; i2++) {
                node = data.layers[i2];
                this.layers[node.name] = new d5power.TiledLayer(node, this);
                this.layers_ordered.push(node.name);
            }
            // load object group
            //			var length3:number = data.objectgroup.length;
            //			for(var i3:number = 0;i3 < length3;i3++){
            //				node = data.objectgroup[i3];
            //				this.objectGroups[node.name] = new TiledObjectGroup(node, this);
            //			}
        };
        p.getTileSet = function (name) {
            return (this.tileSets[name]);
        };
        p.getLayer = function (name) {
            return (this.layers[name]);
        };
        //		public getObjectGroup(name:string):TiledObjectGroup {
        //			return <TiledObjectGroup><any> (this.objectGroups[name]);
        //		}
        // works only after TmxTileSet has been initialized with an image...
        p.getGidOwner = function (gid) {
            if (gid === void 0) { gid = 0; }
            var length = this.tileSets.length;
            for (var i = 0; i < length; i++) {
                var tileSet = this.tileSets[i];
                if (tileSet.hasGid(gid))
                    return tileSet;
            }
            return null;
        };
        return TiledMap;
    })();
    d5power.TiledMap = TiledMap;
    egret.registerClass(TiledMap,"d5power.TiledMap");
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
     * tiled 图片纹理集
     * @author
     *
     */
    var TiledResourceData = (function () {
        function TiledResourceData() {
        }
        var d = __define,c=TiledResourceData;p=c.prototype;
        TiledResourceData.setupResLib = function (name, bitmap, tiledset) {
            this._bitmap = bitmap;
            if (!TiledResourceData._bitmap)
                return;
            var spritesheet = new egret.SpriteSheet(bitmap);
            var data;
            if (TiledResourceData._resourceLib[name]) {
                data = TiledResourceData._resourceLib[name];
            }
            else {
                data = new Array();
            }
            var num = 0;
            for (var i = 0; i < tiledset.numCols; i++) {
                for (var j = 0; j < tiledset.numRows; j++) {
                    spritesheet.createTexture(name + tiledset.firstGID + num, j * tiledset.tileWidth, i * tiledset.tileHeight, tiledset.tileWidth, tiledset.tileHeight);
                    var txt = spritesheet.getTexture(name + tiledset.firstGID + num);
                    data[tiledset.firstGID + num] = txt;
                    num++;
                }
            }
            TiledResourceData._resourceLib[name] = data;
        };
        TiledResourceData.getResource = function (name, id) {
            //            if(TiledResourceData._resourceLib[name])
            //            {
            //                var res: egret.SpriteSheet = <egret.SpriteSheet><any>TiledResourceData._resourceLib[name];
            //                if(res && id > 0)
            //                {
            //                    return res.getTexture(name + id);
            //                }else
            //                {
            //                    return null;
            //                }
            //            }else{
            //                return null;
            //            }
            if (TiledResourceData._resourceLib[name]) {
                var data = TiledResourceData._resourceLib[name];
                var txt;
                txt = data[id] ? data[id] : null;
                return txt;
            }
            else {
                return null;
            }
        };
        TiledResourceData._resourceLib = {};
        return TiledResourceData;
    })();
    d5power.TiledResourceData = TiledResourceData;
    egret.registerClass(TiledResourceData,"d5power.TiledResourceData");
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
    var TiledTileSet = (function () {
        function TiledTileSet(source, parent) {
            this._tileProps = [];
            this._image = null;
            this.firstGID = 0;
            this.tileWidth = 0;
            this.tileHeight = 0;
            this.spacing = 0;
            this.margin = 0;
            this.imageSource = "";
            this.imageheight = 0;
            this.imagewidth = 0;
            // available only after immage has been assigned:
            this.numTiles = 0xFFFFFF;
            this.numRows = 1;
            this.numCols = 1;
            this.firstGID = source.firstgid;
            this.imageSource = source.image;
            this.map = parent;
            this.name = source.name;
            this.tileWidth = source.tilewidth;
            this.tileHeight = source.tileheight;
            this.imagewidth = source.imagewidth;
            this.imageheight = source.imageheight;
            this.spacing = source.spacing;
            this.margin = source.margin;
            this.numTiles = source.tilecount;
            this.numRows = Math.ceil(this.imagewidth / this.tileWidth);
            this.numCols = Math.ceil(this.imageheight / this.tileHeight);
            // read properties
            //			var length:number = source.tile.length;
            //			for(var i:number = 0;i < length;i++){
            //				var node:any = source.tile[i];
            //				if (node.properties[0])
            //					this._tileProps[parseInt(node.id)] = new TiledPropertySet(node.properties[0]);
            //			}
        }
        var d = __define,c=TiledTileSet;p=c.prototype;
        p.toJson = function () {
            var result = new Object;
            result.firstGID = this.firstGID;
            result.imageSource = this.imageSource;
            result.name = this.name;
            result.tileWidth = this.tileWidth;
            result.tileHeight = this.tileHeight;
            result.spacing = this.spacing;
            result.margin = this.margin;
            var temp = new Array();
            var length = this._tileProps.length;
            //			for(var i:number = 0;i < length;i++){
            //				var node:TiledPropertySet = this._tileProps[i];
            //				temp.push(node.toJson());
            //			}
            result.tile = temp;
            return result;
        };
        d(p, "image"
            ,function () {
                return this._image;
            }
            ,function (v) {
                this._image = v;
                // TODO: consider spacing & margin
                this.numCols = Math.floor(v.textureWidth / this.tileWidth);
                this.numRows = Math.floor(v.textureHeight / this.tileHeight);
                this.numTiles = this.numRows * this.numCols;
            }
        );
        p.hasGid = function (gid) {
            if (gid === void 0) { gid = 0; }
            return (gid >= this.firstGID) && (gid < this.firstGID + this.numTiles);
        };
        p.fromGid = function (gid) {
            if (gid === void 0) { gid = 0; }
            return gid - this.firstGID;
        };
        p.toGid = function (id) {
            if (id === void 0) { id = 0; }
            return this.firstGID + id;
        };
        //		public getPropertiesByGid(gid:number = 0):TiledPropertySet {
        //			return this._tileProps[gid - this.firstGID];
        //		}
        //		
        //		public getProperties(id:number = 0):TiledPropertySet {
        //			return this._tileProps[id];
        //		}
        p.getRect = function (id) {
            if (id === void 0) { id = 0; }
            // TODO: consider spacing & margin
            return new egret.Rectangle(((id - this.firstGID) % this.numCols) * this.tileWidth, Math.floor((id - this.firstGID) / this.numCols) * this.tileHeight, this.tileWidth, this.tileHeight);
        };
        return TiledTileSet;
    })();
    d5power.TiledTileSet = TiledTileSet;
    egret.registerClass(TiledTileSet,"d5power.TiledTileSet");
})(d5power || (d5power = {}));

/**
 * Created by Administrator on 2015/6/1.
 */
var d5power;
(function (d5power) {
    var UserProData = (function () {
        function UserProData() {
            this.name = "";
        }
        var d = __define,c=UserProData;p=c.prototype;
        p.format = function (data) {
            this.field = data.field;
            this.name = data.name;
        };
        return UserProData;
    })();
    d5power.UserProData = UserProData;
    egret.registerClass(UserProData,"d5power.UserProData");
})(d5power || (d5power = {}));

