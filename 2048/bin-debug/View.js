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
var View = (function (_super) {
    __extends(View, _super);
    /** 创建主视图*/
    function View(stageH, stageW) {
        var _this = _super.call(this) || this;
        /** 最佳成绩*/
        _this.best = 0;
        _this.initList(stageH, stageW);
        return _this;
    }
    View.prototype.initList = function (stageH, stageW) {
        //北区信息栏
        this.north = new egret.DisplayObjectContainer();
        var menu = this.createBitmapByName("menu");
        var rect1 = new egret.Rectangle(5, 5, 480, 110);
        menu.scaleX = 0.9;
        menu.scaleY = 0.9;
        menu.x = 42;
        menu.scale9Grid = rect1;
        this.north.addChildAt(menu, 0);
        this.addChild(this.north);
        //按钮组件
        var button = this.createBitmapByName("buttonUp");
        var rect2 = new egret.Rectangle(10, 11, 40, 21);
        button.scale9Grid = rect2;
        button.scaleX = 0.85;
        button.scaleY = 0.85;
        button.x = 410;
        button.y = 80;
        this.north.addChildAt(button, 3);
        button.touchEnabled = true; //设置显示对象可以相应触摸事件
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginEvent, this);
        //按钮上的文本组件
        var label3 = new egret.TextField();
        label3.text = "新游戏";
        label3.bold = true;
        label3.x = button.x + 12;
        label3.y = button.y + 12;
        label3.size = 20;
        label3.fontFamily = "Microsoft Yahei";
        this.north.addChild(label3);
        //南区游戏主界面
        this.south = new egret.DisplayObjectContainer();
        var sbg = this.createBitmapByName("background");
        this.south.addChild(sbg);
        sbg.width = stageW - 50;
        sbg.height = stageH - menu.height - 60;
        this.south.x = (stageW - sbg.width) / 2;
        this.south.y = (stageH + this.north.height - sbg.height) / 2;
        var rect3 = new egret.Rectangle(30, 31, 40, 41);
        sbg.scale9Grid = rect3;
        this.addChild(this.south);
        //游戏面板
        this.nums = new NumList();
        this.south.addChild(this.nums);
        //文本组件
        var scoreLabel = new ScoreTextField(this.nums);
        this.north.addChildAt(scoreLabel, 1);
        var bestLabel = new BestTextField(this.best);
        this.north.addChildAt(bestLabel, 2);
        //按键事件
        this.keyEvent();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    View.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /** 新游戏按钮事件 */
    View.prototype.beginEvent = function (evt) {
        this.south.removeChildAt(1);
        this.nums = new NumList();
        this.south.addChild(this.nums);
        //更新成绩
        this.north.removeChildAt(1);
        var scoreLabel = new ScoreTextField(this.nums);
        this.north.addChildAt(scoreLabel, 1);
    };
    /** 方位按键事件 */
    View.prototype.keyEvent = function () {
        var that = this;
        document.addEventListener("keyup", function (evt) {
            var num2 = that.nums;
            if (evt.keyCode == 37 || evt.keyCode == 65) {
                num2 = num2.leftRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }
            if (evt.keyCode == 38 || evt.keyCode == 87) {
                num2 = num2.upRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }
            if (evt.keyCode == 39 || evt.keyCode == 68) {
                num2 = num2.rightRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }
            if (evt.keyCode == 40 || evt.keyCode == 83) {
                num2 = num2.downRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }
            //更新成绩
            that.north.removeChildAt(1);
            var scoreLabel = new ScoreTextField(num2);
            that.north.addChildAt(scoreLabel, 1);
            //测试是否结束游戏
            var test = num2.testNext(that.best);
            if (test != 0) {
                //1.结束游戏所需运行的内容
                //2.结束游戏，并且修改最佳记录
                if (test == 2) {
                    that.best = num2.getAllValue();
                    that.north.removeChildAt(2);
                    var bestLabel = new BestTextField(that.best);
                    that.north.addChildAt(bestLabel, 2);
                }
            }
        });
    };
    return View;
}(egret.DisplayObjectContainer));
__reflect(View.prototype, "View");
//# sourceMappingURL=View.js.map