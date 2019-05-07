class NumList extends egret.DisplayObjectContainer{
    /** 数字图像列表*/
    private numArr:NewBitmap[] = [];
    /** 列表行数*/
    private listRow:number = 4;
    /** 列表列数*/
    private listCol:number = 4;
    /** 数字图像数量*/
    private numCount:number = this.listRow*this.listCol;

    private aim = 0;

    public constructor() {
            super();
            this.initList();
    }

    /** 初始化数字图像列表 */
    private initList(){
        //初始化数组列表
        this.numArr=[];
        // 随机生成两个数
        let n1 = Math.floor(Math.random()*this.numCount);
        let n2:number;
        while(true){
            n2=Math.floor(Math.random()*this.numCount);
            if(n1 != n2) break;
        }
       for (let i:number = 0;i<this.numCount;i++){
            if(i == n1){
                let numBmp:NewBitmap = this.createBitmapByName("number_1");
                numBmp.setValue(2);
                this.addNumBmp(i,numBmp);
            }
            else if(i == n2){
                let type=Math.floor(Math.random()*2);//随机2或4
                if(type == 0){
                    let numBmp:NewBitmap  = this.createBitmapByName("number_1");
                    numBmp.setValue(2);
                    this.addNumBmp(i,numBmp);
                }else{
                    let numBmp:NewBitmap = this.createBitmapByName("number_2");
                    numBmp.setValue(4);
                    this.addNumBmp(i,numBmp);
                }  
            }else{
                let numBmp:NewBitmap  = this.createBitmapByName("backtile");
                numBmp.setValue(0);
                this.addNumBmp(i,numBmp);
            }
        }
    }
    private createBitmapByName(name: string) {
        let result = new NewBitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /** 将格子加到数组列表和容器中 */
    private addNumBmp(i:number,numBmp:NewBitmap){
        numBmp.x = (10 + numBmp.width)*(i%this.listCol) + 10;
        numBmp.y = (10 + numBmp.height)*Math.floor(i/this.listRow) + 10;
        let rect:egret.Rectangle = new egret.Rectangle(30,31,40,41);
        numBmp.scale9Grid =rect;
        this.numArr.push(numBmp);
        this.addChild(numBmp);
    }
    /** 刷新数字图像列表 */
    private updateList(){
        let numArr2= this.numArr;
        this.numArr = [];
        this.removeChildren();
        for(let i = 0;i<16;i++){
            let numBmp:NewBitmap;
            if(numArr2[i].getValue() == 0){ numBmp = this.createBitmapByName("backtile");}
            else if(numArr2[i].getValue() == 2){ numBmp = this.createBitmapByName("number_1");}
            else if(numArr2[i].getValue() == 4){ numBmp = this.createBitmapByName("number_2");}
            else if(numArr2[i].getValue() == 8){ numBmp = this.createBitmapByName("number_3");}
            else if(numArr2[i].getValue() == 16){ numBmp = this.createBitmapByName("number_4");}
            else if(numArr2[i].getValue() == 32){ numBmp = this.createBitmapByName("number_5");}
            else if(numArr2[i].getValue() == 64){ numBmp = this.createBitmapByName("number_6");}
            else if(numArr2[i].getValue() == 128){ numBmp = this.createBitmapByName("number_7");}
            else if(numArr2[i].getValue() == 256){ numBmp = this.createBitmapByName("number_8");}
            else if(numArr2[i].getValue() == 512){ numBmp = this.createBitmapByName("number_9");}
            else if(numArr2[i].getValue() == 1024){ numBmp = this.createBitmapByName("number_10");}
            else if(numArr2[i].getValue() == 2048){ numBmp = this.createBitmapByName("number_11");}
            else if(numArr2[i].getValue() == 4096){ numBmp = this.createBitmapByName("number_12");}
            else if(numArr2[i].getValue() == 8192){ numBmp = this.createBitmapByName("number_13");}
            else{console.log("6666");}

            numBmp.setValue(numArr2[i].getValue());
            this.addNumBmp(i,numBmp);
        }
    }

    /** 数字图像列表左移 */
    leftRemove():NumList {
        let oldList = [];
        this.numArr.forEach((value)=>{
            oldList.push(value.getValue());
        })
        for(let i = 0;i<16;i++){     
            if(this.numArr[i].getValue() == 0){
                for(let j = i+1;j<(Math.floor(i/this.listCol)+1)*this.listCol;j++){
                    if(this.numArr[j].getValue() != 0 ){
                        //右边有值,进行平移                        
                        let tw = egret.Tween.get(this.getChildAt(i));
                        tw.to({x:(10 + this.numArr[i].width)*(j%this.listCol) + 10},2000);

                        for(let k=j+1;k<(Math.floor(j/this.listCol)+1)*this.listCol;k++){
                            if(this.numArr[k].getValue() != 0){
                                if(this.numArr[k].getValue() == this.numArr[j].getValue()){ 
                                    let n = this.numArr[j].getValue()*2;
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
            }else{
                for(let j = i+1;j<(Math.floor(i/this.listCol)+1)*this.listCol;j++){
                    if(this.numArr[j].getValue() != 0 ){
                        if(this.numArr[j].getValue() == this.numArr[i].getValue()){
                            //i和j相加并替换
                            let n = this.numArr[j].getValue()*2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }                                                                                                                                                                                            
        }
        let flag = this.createNewNum(oldList);
        if(flag == 0) this.aim = 1;
        else if(flag == 2)  this.updateList();
        return this;
    }

    /** 数字图像列表右移 */
    rightRemove():NumList{
        let oldList = [];
        this.numArr.forEach((value)=>{
            oldList.push(value.getValue());
        })
        for(let i = 15;i>=0;i--){
            if(this.numArr[i].getValue() == 0){
                for(let j = i-1;j>=Math.floor(i/this.listCol)*this.listCol;j--){
                    if(this.numArr[j].getValue() != 0 ){
                        for(let k = j-1;k>=Math.floor(j/this.listCol)*this.listCol;k--){
                             if(this.numArr[k].getValue() != 0){
                                if(this.numArr[k].getValue() == this.numArr[j].getValue()){ 
                                    let n = this.numArr[j].getValue()*2;
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
            }else{
                for(let j = i-1;j>=Math.floor(i/this.listCol)*this.listCol;j--){
                    if(this.numArr[j].getValue() != 0 ){
                        if(this.numArr[j].getValue() == this.numArr[i].getValue()){
                            //i和j相加并替换
                            let n = this.numArr[j].getValue()*2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }        
        }
        let flag = this.createNewNum(oldList);
        if(flag == 0) this.aim =1;
        else if(flag == 2)  this.updateList();
        return this;
    }
    /** 数字图像列表上移 */
    upRemove():NumList {
        let oldList = [];
        this.numArr.forEach((value)=>{
            oldList.push(value.getValue());
        })
        for(let i = 0;i<this.numCount;i++){
            if(this.numArr[i].getValue() == 0){
                for(let j = i+this.listCol;j<=(this.listRow-1)*this.listCol+i%this.listCol;j+=this.listCol){
                    if(this.numArr[j].getValue() != 0 ){
                        for(let k = j+this.listCol;k<=(this.listRow-1)*this.listCol+j%this.listCol;k+=this.listCol){                      
                             if(this.numArr[k].getValue() != 0){
                                if(this.numArr[k].getValue() == this.numArr[j].getValue()){ 
                                    let n = this.numArr[j].getValue()*2;
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
            }else{
                for(let j = i+this.listCol;j<=(this.listRow-1)*this.listCol+i%this.listCol;j+=this.listCol){
                    if(this.numArr[j].getValue() != 0 ){
                        if(this.numArr[j].getValue() == this.numArr[i].getValue()){
                            //i和j相加并替换
                            let n = this.numArr[j].getValue()*2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }  
        }
        let flag = this.createNewNum(oldList);
        if(flag == 0) this.aim =1;
        else if(flag == 2)  this.updateList();
        return this;
    }
    /** 数字图像列表下移 */
    downRemove():NumList {
        let oldList = [];
        this.numArr.forEach((value)=>{
            oldList.push(value.getValue());
        })
        for(let i = this.numCount-1;i>=0;i--){
            if(this.numArr[i].getValue() == 0){
                for(let j = i-this.listCol;j>=i%this.listCol;j-=this.listCol){
                    if(this.numArr[j].getValue() != 0 ){
                        for(let k = j-this.listCol;k>=j%this.listCol;k-=this.listCol){
                             if(this.numArr[k].getValue() != 0){
                                if(this.numArr[k].getValue() == this.numArr[j].getValue()){ 
                                    let n = this.numArr[j].getValue()*2;
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
            }else{
                for(let j = i-this.listCol;j>=i%this.listCol;j-=this.listCol){
                    if(this.numArr[j].getValue() != 0 ){
                        if(this.numArr[j].getValue() == this.numArr[i].getValue()){
                            //i和j相加并替换
                            let n = this.numArr[j].getValue()*2;
                            this.numArr[i].setValue(n);
                            this.numArr[j].setValue(0);
                        }
                        break;
                    }
                }
            }  
        }
        let flag = this.createNewNum(oldList);
        if(flag == 0) this.aim =1;
        else if(flag == 2)  this.updateList();
        return this;
    }

    /** 随机生成新格子
     * 1.判断是否能产生新格子,如果不能产生新格子，返回0
     * 2.如果可以产生，判断是否与移动前相同，如果相同，返回1
     * 3.如果不相同，产生随机格子，返回2
     */
    private createNewNum(oldList):number{
        let arr=[];
        this.numArr.forEach((element,index) => {
            if(element.getValue() == 0) arr.push(index);
        });
        //判断是否能产生新格子
        if(arr.length == 0){
            return 0;
        }
        //判断是否与移动前相同
        let isDifferent = false;
        for(let i = 0;i<16;i++){
            if(oldList[i] != this.numArr[i].getValue()){
                isDifferent = true;
                break;
            } 
        }
        if(isDifferent == false){
            return 1;
        }
        //产生随机格子
        let i = arr[Math.floor(Math.random()*arr.length)];
        this.numArr[i].setValue(2);
        return 2;
    }
    /** 判断是否结束游戏
     *  如果没结束游戏，返回0；
     *  如果结束，但不需要更改最佳记录，返回1
     *  如果结束，需要修改最佳记录，返回2
     */
    testNext(best):number{
        let life = 4;
        let nums1=new NumList();
        this.numArr.forEach((value,index)=>{
            nums1.numArr[index].setValue(value.getValue());
        })
        nums1 = nums1.leftRemove();
        if(nums1.aim == 1) life--;

        let nums2=new NumList();
        this.numArr.forEach((value,index)=>{
            nums2.numArr[index].setValue(value.getValue());
        })
        nums2 = nums2.upRemove();
        if(nums2.aim == 1) life--;

        let nums3=new NumList();
        this.numArr.forEach((value,index)=>{
            nums3.numArr[index].setValue(value.getValue());
        })
        nums3 = nums3.rightRemove();
        if(nums3.aim == 1) life--;

        let nums4=new NumList();
        this.numArr.forEach((value,index)=>{
            nums4.numArr[index].setValue(value.getValue());
        })
        nums4 = nums4.downRemove();
        if(nums4.aim == 1) life--;

        if(life== 0){
            //结束游戏
            console.log("游戏结束！！！！");
            alert("游戏结束！！！");
            //修改最佳记录
            if(this.getAllValue() > best){
                return 2;
            }
            return 1;
        }
        return 0;
    }
    /** 求出总共获得的分数 */
    getAllValue():number{
        let sum = 0;
        this.numArr.forEach(Bitmap=>{
            sum += Bitmap.getValue();
        })
        return sum;
    }
}