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
var ScoreTextField = (function (_super) {
    __extends(ScoreTextField, _super);
    /** 记录当前获得分数的文本容器*/
    function ScoreTextField(nums) {
        var _this = _super.call(this) || this;
        _this.initList(nums);
        return _this;
    }
    ScoreTextField.prototype.initList = function (nums) {
        var score = nums.getAllValue().toString();
        var label = new egret.TextField();
        label.text = score;
        label.bold = true;
        this.x = 320;
        this.y = 38;
        this.width = 90;
        label.textColor = 0xff0000;
        label.x = (this.width - label.width) / 2;
        label.size = 20;
        label.fontFamily = "Microsoft Yahei";
        this.addChild(label);
    };
    return ScoreTextField;
}(egret.DisplayObjectContainer));
__reflect(ScoreTextField.prototype, "ScoreTextField");
//# sourceMappingURL=ScoreTextField.js.map