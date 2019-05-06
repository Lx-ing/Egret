var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NumList = (function (_super) {
    __extends(NumList, _super);
    function NumList() {
        var _this = _super.call(this) || this;
        /** 数字图像列表*/
        _this.numArr = [];
        /** 列表行数*/
        _this.listRow = 4;
        /** 列表列数*/
        _this.listCol = 4;
        /** 数字图像数量*/
        _this.numCount = _this.listRow * _this.listCol;
        _this.aim = 0;
        _this.initList();
        return _this;
    }
    /** 初始化数字图像列表 */
    NumList.prototype.initList = function () {
        //初始化数组列表
        this.numArr = [];
        // 随机生成两个数
        var n1 = Math.floor(Math.random() * this.numCount);
        var n2;
        while (true) {
            n2 = Math.floor(Math.random() * this.numCount);
            if (n1 != n2)
                break;
        }
        for (var i = 0; i < this.numCount; i++) {
            if (i == n1) {
                var numBmp = this.createBitmapByName("number_1");
                numBmp.setValue(2);
                this.addNumBmp(i, numBmp);
            }
            else if (i == n2) {
                var type = Math.floor(Math.random() * 2); //随机2或4
                if (type == 0) {
                    var numBmp = this.createBitmapByName("number_1");
                    numBmp.setValue(2);
                    this.addNumBmp(i, numBmp);
                }
                else {
                    var numBmp = this.createBitmapByName("number_2");
                    numBmp.setValue(4);
                    this.addNumBmp(i, numBmp);
                }
            }
            else {
                var numBmp = this.createBitmapByName("backtile");
                numBmp.setValue(0);
                this.addNumBmp(i, numBmp);
            }
        }
    };
    NumList.prototype.createBitmapByName = function (name) {
        var result = new NewBitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /** 将格子加到数组列表和容器中 */
    NumList.prototype.addNumBmp = function (i, numBmp) {
        numBmp.x = (10 + numBmp.width) * (i % this.listCol) + 10;
        numBmp.y = (10 + numBmp.height) * Math.floor(i / this.listRow) + 10;
        var rect = new egret.Rectangle(30, 31, 40, 41);
        numBmp.scale9Grid = rect;
        this.numArr.push(numBmp);
        this.addChild(numBmp);
    };
    /** 刷新数字图像列表 */
    NumList.prototype.updateList = function () {
        var numArr2 = this.numArr;
        this.numArr = [];
        this.removeChildren();
        for (var i = 0; i < 16; i++) {
            var numBmp = void 0;
            if (numArr2[i].getValue() == 0) {
                numBmp = this.createBitmapByName("backtile");
            }
            else if (numArr2[i].getValue() == 2) {
                numBmp = this.createBitmapByName("number_1");
            }
            else if (numArr2[i].getValue() == 4) {
                numBmp = this.createBitmapByName("number_2");
            }
            else if (numArr2[i].getValue() == 8) {
                numBmp = this.createBitmapByName("number_3");
            }
            else if (numArr2[i].getValue() == 16) {
                numBmp = this.createBitmapByName("number_4");
            }
            else if (numArr2[i].getValue() == 32) {
                numBmp = this.createBitmapByName("number_5");
            }
            else if (numArr2[i].getValue() == 64) {
                numBmp = this.createBitmapByName("number_6");
            }
            else if (numArr2[i].getValue() == 128) {
                numBmp = this.createBitmapByName("number_7");
            }
            else if (numArr2[i].getValue() == 256) {
                numBmp = this.createBitmapByName("number_8");
            }
            else if (numArr2[i].getValue() == 512) {
                numBmp = this.createBitmapByName("number_9");
            }
            else if (numArr2[i].getValue() == 1024) {
                numBmp = this.createBitmapByName("number_10");
            }
            else if (numArr2[i].getValue() == 2048) {
                numBmp = this.createBitmapByName("number_11");
            }
            else if (numArr2[i].getValue() == 4096) {
                numBmp = this.createBitmapByName("number_12");
            }
            else if (numArr2[i].getValue() == 8192) {
                numBmp = this.createBitmapByName("number_13");
            }
            else {
                console.log("6666");
            }
            numBmp.setValue(numArr2[i].getValue());
            this.addNumBmp(i, numBmp);
        }
    };
    /** 数字图像列表左移 */
    NumList.prototype.leftRemove = function () {
        for (var i = 0; i < 16; i++) {
            if (this.numArr[i].getValue() == 0) {
                for (var j = i + 1; j < (Math.floor(i / this.listCol) + 1) * this.listCol; j++) {
                    if (this.numArr[j].getValue() != 0) {
                        for (var k = j + 1; k < (Math.floor(j / this.listCol) + 1) * this.listCol; k++) {
                            if (this.numArr[k].getValue() != 0) {
                                if (this.numArr[k].getValue() == this.numArr[j].getValue()) {
                                    var n = this.numArr[j].getValue() * 2;
                                    this.numArr[j].setValue(n);
                                    this.numArr[k].setValue(0);
                                }
                                break;
                            }
                        }
                        this.numArr[i].setValue(this.numArr[j].getValue());
                        this.numArr[j].setValue(0);
                        break;
                    }
                }
            }
            else {
                for (var j = i + 1; j < (Math.floor(i / this.listCol) + 1) * this.listCol; j++) {
                    if (this.numArr[j].getValue() != 0) {
                        if (this.numArr[j].getValue() == this.numArr[i].getValue()) {
                            //i和j相加并替换
                            var n = this.numArr[j].getValue() * 2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }
        }
        var flag = this.createNewNum();
        if (flag == false)
            this.aim = 1;
        this.updateList();
        return this;
    };
    /** 数字图像列表右移 */
    NumList.prototype.rightRemove = function () {
        for (var i = 15; i >= 0; i--) {
            if (this.numArr[i].getValue() == 0) {
                for (var j = i - 1; j >= Math.floor(i / this.listCol) * this.listCol; j--) {
                    if (this.numArr[j].getValue() != 0) {
                        for (var k = j - 1; k >= Math.floor(j / this.listCol) * this.listCol; k--) {
                            if (this.numArr[k].getValue() != 0) {
                                if (this.numArr[k].getValue() == this.numArr[j].getValue()) {
                                    var n = this.numArr[j].getValue() * 2;
                                    this.numArr[j].setValue(n);
                                    this.numArr[k].setValue(0);
                                }
                                break;
                            }
                        }
                        this.numArr[i].setValue(this.numArr[j].getValue());
                        this.numArr[j].setValue(0);
                        break;
                    }
                }
            }
            else {
                for (var j = i - 1; j >= Math.floor(i / this.listCol) * this.listCol; j--) {
                    if (this.numArr[j].getValue() != 0) {
                        if (this.numArr[j].getValue() == this.numArr[i].getValue()) {
                            //i和j相加并替换
                            var n = this.numArr[j].getValue() * 2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }
        }
        var flag = this.createNewNum();
        if (flag == false)
            this.aim = 1;
        this.updateList();
        return this;
    };
    /** 数字图像列表上移 */
    NumList.prototype.upRemove = function () {
        for (var i = 0; i < this.numCount; i++) {
            if (this.numArr[i].getValue() == 0) {
                for (var j = i + this.listCol; j <= (this.listRow - 1) * this.listCol + i % this.listCol; j += this.listCol) {
                    if (this.numArr[j].getValue() != 0) {
                        for (var k = j + this.listCol; k <= (this.listRow - 1) * this.listCol + j % this.listCol; k += this.listCol) {
                            if (this.numArr[k].getValue() != 0) {
                                if (this.numArr[k].getValue() == this.numArr[j].getValue()) {
                                    var n = this.numArr[j].getValue() * 2;
                                    this.numArr[j].setValue(n);
                                    this.numArr[k].setValue(0);
                                }
                                break;
                            }
                        }
                        this.numArr[i].setValue(this.numArr[j].getValue());
                        this.numArr[j].setValue(0);
                        break;
                    }
                }
            }
            else {
                for (var j = i + this.listCol; j <= (this.listRow - 1) * this.listCol + i % this.listCol; j += this.listCol) {
                    if (this.numArr[j].getValue() != 0) {
                        if (this.numArr[j].getValue() == this.numArr[i].getValue()) {
                            //i和j相加并替换
                            var n = this.numArr[j].getValue() * 2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }
        }
        var flag = this.createNewNum();
        if (flag == false)
            this.aim = 1;
        this.updateList();
        return this;
    };
    /** 数字图像列表下移 */
    NumList.prototype.downRemove = function () {
        for (var i = this.numCount - 1; i >= 0; i--) {
            if (this.numArr[i].getValue() == 0) {
                for (var j = i - this.listCol; j >= i % this.listCol; j -= this.listCol) {
                    if (this.numArr[j].getValue() != 0) {
                        for (var k = j - this.listCol; k >= j % this.listCol; k -= this.listCol) {
                            if (this.numArr[k].getValue() != 0) {
                                if (this.numArr[k].getValue() == this.numArr[j].getValue()) {
                                    var n = this.numArr[j].getValue() * 2;
                                    this.numArr[j].setValue(n);
                                    this.numArr[k].setValue(0);
                                }
                                break;
                            }
                        }
                        this.numArr[i].setValue(this.numArr[j].getValue());
                        this.numArr[j].setValue(0);
                        break;
                    }
                }
            }
            else {
                for (var j = i - this.listCol; j >= i % this.listCol; j -= this.listCol) {
                    if (this.numArr[j].getValue() != 0) {
                        if (this.numArr[j].getValue() == this.numArr[i].getValue()) {
                            //i和j相加并替换
                            var n = this.numArr[j].getValue() * 2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }
        }
        var flag = this.createNewNum();
        if (flag == false)
            this.aim = 1;
        this.updateList();
        return this;
    };
    /** 随机生成新格子 */
    NumList.prototype.createNewNum = function () {
        var arr = [];
        this.numArr.forEach(function (element, index) {
            if (element.getValue() == 0)
                arr.push(index);
        });
        //判断是否能产生新格子
        if (arr.length == 0) {
            return false;
        }
        var i = arr[Math.floor(Math.random() * arr.length)];
        this.numArr[i].setValue(2);
        return true;
    };
    /** 判断是否结束游戏
     *  如果没结束游戏，返回0；
     *  如果结束，但不需要更改最佳记录，返回1
     *  如果结束，需要修改最佳记录，返回2
     */
    NumList.prototype.testNext = function (best) {
        var life = 4;
        var nums1 = new NumList();
        this.numArr.forEach(function (value, index) {
            nums1.numArr[index].setValue(value.getValue());
        });
        nums1 = nums1.leftRemove();
        if (nums1.aim == 1)
            life--;
        var nums2 = new NumList();
        this.numArr.forEach(function (value, index) {
            nums2.numArr[index].setValue(value.getValue());
        });
        nums2 = nums2.upRemove();
        if (nums2.aim == 1)
            life--;
        var nums3 = new NumList();
        this.numArr.forEach(function (value, index) {
            nums3.numArr[index].setValue(value.getValue());
        });
        nums3 = nums3.rightRemove();
        if (nums3.aim == 1)
            life--;
        var nums4 = new NumList();
        this.numArr.forEach(function (value, index) {
            nums4.numArr[index].setValue(value.getValue());
        });
        nums4 = nums4.downRemove();
        if (nums4.aim == 1)
            life--;
        if (life == 0) {
            //结束游戏
            console.log("游戏结束！！！！");
            alert("游戏结束！！！");
            //修改最佳记录
            if (this.getAllValue() > best) {
                return 2;
            }
            return 1;
        }
        return 0;
    };
    /** 求出总共获得的分数 */
    NumList.prototype.getAllValue = function () {
        var sum = 0;
        this.numArr.forEach(function (Bitmap) {
            sum += Bitmap.getValue();
        });
        return sum;
    };
    return NumList;
}(egret.DisplayObjectContainer));
__reflect(NumList.prototype, "NumList");
//# sourceMappingURL=NumList.js.map