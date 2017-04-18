class Game {
    constructor(canvas, stage) {
        this.__stage = stage;
        this.__canvas = canvas;

        this.__player = null;
        this.__camera = null;
        this.__map = null;
    }

    update() {
        if(this.__player) { 
            this.__player.update(); 
        }

        if (this.__camera) {
            this.__camera.update();
        }

        if (this.__map) {
            this.__map.update(this.__camera.xView, this.__camera.yView); //update the map position to reflect where the camera is pointed
        }

        this.__stage.update();
    }

    start() {
        this.initMap();
        this.initPlayer();
        this.initTicker();
        this.initCamera(this.__player, this.__map); //pass the player and map explicitly since those are subject to change
        this.__stage.update();
    }

    initMap() {
        this.__map = new Map(10000, 10000);
        this.__stage.addChild(this.__map.mapContainer);
    }

    initCamera(follow, map) {
        this.__camera = new Camera(this.__canvas.width, this.__canvas.height, follow.x, follow.y, map.width, map.height);
        this.__camera.follow(follow);
    }

    initPlayer() {
        this.__player = new Player(this.__stage, this.__canvas.width, this.__canvas.height, this.__map.mapContainer, this.__map.width, this.__map.height, this.__map.width/2, this.__map.height/2);
        this.__player.show();
    }

    initTicker() {
        var that = this;
        createjs.Ticker.setFPS(144);
        createjs.Ticker.addEventListener("tick", function() {
            that.update(); //addEventListener does not like it when we pass class methods instead of function literals
        });
    }
}
