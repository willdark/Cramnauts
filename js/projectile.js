// todo: Definitely need a manager class
class Projectile {
    constructor(x, y, radius, angle, color, stage, stageWidth, stageHeight) {
        this.__stage = stage;
        this.__stageWidth = stageWidth;
        this.__stageHeight = stageHeight;

        this.__radius = radius;
        this.__sprite = new createjs.Shape();
        this.__sprite.graphics.beginFill(color).drawCircle(0, 0, this.__radius);
        this.__displayObject = null;

        this.__sprite.x = x;
        this.__sprite.y = y;
        this.__sprite.regX = this.__radius;
        this.__sprite.regY = this.__radius;
        this.__angle = angle;

        this.__vel = 10;
        this.__xVel = Math.cos(this.__angle * Math.PI/180) * this.__vel;
        this.__yVel = Math.sin(this.__angle * Math.PI/180) * this.__vel;
        this.__sprite.rotation = 90 + this.__angle;

        // state tracking
        this.__distanceTraveled = 0;
        this.__shouldBeDestroyed = false;

        this.__damage = 20;

    }

    set shouldBeDestroyed (val) { this.__shouldBeDestroyed = val}
    get shouldBeDestroyed ()    { return this.__shouldBeDestroyed }

    show() {
        this.__displayObject = this.__stage.addChild(this.__sprite);
    }

    remove() {
        this.__stage.removeChild(this.__displayObject);
    }

    update() {
        this.move();
        this.enforceBoundaries();
        if (this.__shouldBeDestroyed) {
            this.remove();
        }
    }

    move() {
        this.__sprite.x += this.__xVel;
        this.__sprite.y += this.__yVel;
        this.__distanceTraveled += this.__xVel + this.__yVel;
    }

    enforceBoundaries() {
        if (this.__sprite.x < 0) {
            this.__sprite.x = 0;
            this.__shouldBeDestroyed = true;
        }
        if (this.__sprite.x > this.__stageWidth) {
            this.__sprite.x = this.__stageWidth;
            this.__shouldBeDestroyed = true;
        }
        if (this.__sprite.y < 0) {
            this.__sprite.y = 0;
            this.__shouldBeDestroyed = true;
        }
        if (this.__sprite.y > this.__stageHeight) {
            this.__sprite.y = this.__stageHeight;
            this.__shouldBeDestroyed = true;
        }
    }
}

class ProjectileManager {
    constructor() {}
}