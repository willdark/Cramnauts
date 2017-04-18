class Camera {
    constructor(viewWidth, viewHeight, xView, yView) {
        this.__viewWidth = viewWidth;
        this.__viewHeight = viewHeight;
        this.__xView = xView;
        this.__yView = yView;
    }
    
    get xView () { return this.__xView }
    get yView () { return this.__yView }

    follow(gameObject) {
        this.__followed = gameObject;
    }

    update() {
        this.__xView = this.__followed.x;
        this.__yView = this.__followed.y;
    }
}