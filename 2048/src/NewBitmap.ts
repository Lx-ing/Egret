class NewBitmap extends egret.Bitmap{
    /** 格子中的数值 */
    private value:number;

    public constructor() {
            super();
    }
    setValue(value:number){
        this.value = value;
    }
    getValue(){
        return this.value;
    }
}