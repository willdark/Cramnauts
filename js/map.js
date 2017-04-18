class Map {
    constructor(width, height) {
        this.__container = new createjs.Container();
        this.__width = width;
        this.__height = height;
    }

    get displayObject ()  { return this.__container }
    get width         ()  { return this.__width }
    get height        ()  { return this.__height }

    addChild(displayObject) {
        this.__container.addChild(displayObject);
    }  
}