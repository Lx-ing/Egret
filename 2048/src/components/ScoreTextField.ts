class ScoreTextField extends  egret.DisplayObjectContainer{
    /** 记录当前获得分数的文本容器*/
    public constructor(nums:NumList) {
            super();
            this.initList(nums);
    }
    private initList(nums:NumList){
        let score = nums.getAllValue().toString();
        let label:egret.TextField = new egret.TextField(); 
        label.text = score; 
        label.bold = true;
        this.x = 320;
        this.y = 38;
        this.width = 90;
        label.textColor = 0xff0000;
        label.x = (this.width - label.width)/2;
        label.size = 20;
        label.fontFamily= "Microsoft Yahei";
        this.addChild(label); 
    }
}