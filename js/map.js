class Map {
    constructor(width, height) {
        this.__container = new createjs.Container();
        this.__width = width;
        this.__height = height;

        this.initSampleMap();
    }

    get displayObject ()  { return this.__container }
    get width         ()  { return this.__width }
    get height        ()  { return this.__height }
    get mapContainer  ()  { return this.__container }

    update(regX, regY) {
        //update to register the x and y to the camera
        this.__container.regX = regX;
        this.__container.regY = regY;
    }

    addChild(displayObject) {
        this.__container.addChild(displayObject);
    }

    removeChild(displayObject) {
        this.__container.removeChild(displayObject);
    }  

    initSampleMap() {
        //sample map for testing purposes
        for (let i = 0; i <= 10000; i=i+520) {
            for (let j = 0; j <= 10000; j=j+520) {
                let rect = new createjs.Shape();
                rect.graphics.beginFill("red").drawRect(i, j, 500, 500);
                this.addChild(rect);
            }
        }
    }
}