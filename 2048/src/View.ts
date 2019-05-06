class View extends egret.DisplayObjectContainer{

    private textfield: egret.TextField;
    private south:egret.DisplayObjectContainer;
    private north:egret.DisplayObjectContainer;
    private nums:NumList;
    /** 最佳成绩*/
    private best:number = 0;

    /** 创建主视图*/
    public constructor(stageH,stageW) {
        super();
        this.initList(stageH,stageW);
    }

    private initList(stageH,stageW){
        //北区信息栏
        this.north = new egret.DisplayObjectContainer();
        let menu = this.createBitmapByName("menu");
        var rect1:egret.Rectangle = new egret.Rectangle(5,5,480,110);
        menu.scaleX = 0.9;
        menu.scaleY = 0.9;
        menu.x = 42;
        menu.scale9Grid =rect1;
        this.north.addChildAt(menu,0);
        this.addChild(this.north);
        
        //按钮组件
        let button = this.createBitmapByName("buttonUp");
        var rect2:egret.Rectangle = new egret.Rectangle(10,11,40,21);
        button.scale9Grid =rect2;
        button.scaleX = 0.85;
        button.scaleY = 0.85;
        button.x = 410;
        button.y = 80;
        this.north.addChildAt(button,3);
        button.touchEnabled = true;//设置显示对象可以相应触摸事件
        button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginEvent,this);
        //按钮上的文本组件
        let label3:egret.TextField = new egret.TextField(); 
        label3.text = "新游戏"; 
        label3.bold = true;
        label3.x = button.x+12;
        label3.y = button.y+12;
        label3.size = 20;
        label3.fontFamily= "Microsoft Yahei";
        this.north.addChild(label3); 
        //南区游戏主界面
        this.south = new egret.DisplayObjectContainer();
        let sbg = this.createBitmapByName("background");
        this.south.addChild(sbg);
        sbg.width = stageW-50;
        sbg.height = stageH-menu.height-60;
        this.south.x = (stageW-sbg.width)/2;
        this.south.y = (stageH+this.north.height-sbg.height)/2;
        var rect3:egret.Rectangle = new egret.Rectangle(30,31,40,41);
        sbg.scale9Grid =rect3;
        this.addChild(this.south);
        //游戏面板
        this.nums = new NumList();
        this.south.addChild(this.nums);
        //文本组件
        let scoreLabel = new ScoreTextField(this.nums);
        this.north.addChildAt(scoreLabel,1);
        let bestLabel = new BestTextField(this.best);
        this.north.addChildAt(bestLabel,2);
        //按键事件
        this.keyEvent();
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /** 新游戏按钮事件 */
    private beginEvent(evt:egret.TouchEvent){
        this.south.removeChildAt(1);
        this.nums = new NumList();       
        this.south.addChild(this.nums);
        //更新成绩
        this.north.removeChildAt(1);
        let scoreLabel = new ScoreTextField(this.nums);
        this.north.addChildAt(scoreLabel,1);

    }
    /** 方位按键事件 */
    private keyEvent(){
        var that =this;
        document.addEventListener("keyup",function(evt:any){

            var num2 = that.nums;
            if(evt.keyCode == 37||evt.keyCode == 65){
                num2 = num2.leftRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;         
            }
            if(evt.keyCode == 38||evt.keyCode == 87){
                num2 = num2.upRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }
            if(evt.keyCode == 39||evt.keyCode == 68){
                num2 = num2.rightRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }
            if(evt.keyCode == 40||evt.keyCode == 83){
                num2= num2.downRemove();
                that.south.removeChildAt(1);
                that.south.addChild(num2);
                that.nums = num2;
            }  

            //更新成绩
            that.north.removeChildAt(1);
            let scoreLabel = new ScoreTextField(num2);
            that.north.addChildAt(scoreLabel,1);

            //测试是否结束游戏
            let test = num2.testNext(that.best);

            if(test != 0){
                //1.结束游戏所需运行的内容

                //2.结束游戏，并且修改最佳记录
                if (test == 2){
                    that.best = num2.getAllValue();
                    that.north.removeChildAt(2);
                    let bestLabel = new BestTextField(that.best);
                    that.north.addChildAt(bestLabel,2);
                }
            }
        });
    }
}