class Camera {
    constructor(viewWidth, viewHeight, xView, yView, mapWidth, mapHeight) {
        this.__viewWidth = viewWidth || 0;
        this.__viewHeight = viewHeight || 0;
        this.__xView = xView;
        this.__yView = yView;
        this.__mapWidth = mapWidth;
        this.__mapHeight = mapHeight;
    }
    
    get xView () { return this.__xView }
    get yView () { return this.__yView }

    follow(gameObject) {
        this.__followed = gameObject;
    }

    update() {
        //Center the camera on the followed gameObject
        this.__xView = this.__followed.x - this.__viewWidth/2;
        this.__yView = this.__followed.y - this.__viewHeight/2;

        // if (this.__xView < 0) {
        //     this.__xView = 0;
        // }
        // if (this.__xView + this.__viewWidth > this.__mapWidth) {
        //     this.__xView = this.__mapWidth - this.__viewWidth;
        // }
        // if (this.__yView < 0) {
        //     this.__yView = 0;
        // }
        // if (this.__yView + this.__viewHeight > this.__mapHeight) {
        //     this.__yView = this.__mapHeight - this.__viewHeight;
        // }
    }
}