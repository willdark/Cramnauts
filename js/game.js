class Game {
    constructor(canvas, stage) {
        this.__stage = stage;
        this.__canvas = canvas;

        this.__player = null;
    }

    update() {
        if(this.__player) { 
            this.__player.update(); 
        }
        
        this.__stage.update();
    }

    start() {
        this.initPlayer();
        this.initTicker();
        this.__stage.update();
    }

    initPlayer() {
        this.__player = new Player(this.__stage, this.__canvas.width, this.__canvas.height, this.__canvas.width/2, this.__canvas.height/2);
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
