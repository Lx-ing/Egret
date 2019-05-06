class BestTextField extends  egret.DisplayObjectContainer{
    /** 记录最佳纪录的文本容器*/
    public constructor(best:number) {
            super();
            this.initList(best);
    }
    private initList(best:number){
        let label:egret.TextField = new egret.TextField(); 
        label.text =  best.toString();
        label.bold = true;
        this.x = 410;
        this.y = 38;
        this.width = 90;
        label.x = (this.width - label.width)/2;
        label.textColor = 0xff0000;
        label.size = 20;
        label.fontFamily= "Microsoft Yahei";
        this.addChild(label); 
    }
}