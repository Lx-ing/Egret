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
var BestTextField = (function (_super) {
    __extends(BestTextField, _super);
    /** 记录最佳纪录的文本容器*/
    function BestTextField(best) {
        var _this = _super.call(this) || this;
        _this.initList(best);
        return _this;
    }
    BestTextField.prototype.initList = function (best) {
        var label = new egret.TextField();
        label.text = best.toString();
        label.bold = true;
        this.x = 410;
        this.y = 38;
        this.width = 90;
        label.x = (this.width - label.width) / 2;
        label.textColor = 0xff0000;
        label.size = 20;
        label.fontFamily = "Microsoft Yahei";
        this.addChild(label);
    };
    return BestTextField;
}(egret.DisplayObjectContainer));
__reflect(BestTextField.prototype, "BestTextField");
//# sourceMappingURL=BestTextField.js.map