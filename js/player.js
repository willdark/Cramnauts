class Player {
    constructor(stage, stageWidth, stageHeight, x, y) {
        var that = this;

        this.__stage = stage;
        this.__stageWidth = stageWidth;
        this.__stageHeight = stageHeight;

        // Sprite
        this.__size = 25;
        this.__sprite = new createjs.Shape();
        this.__sprite.graphics.beginFill("black").drawRect(0, 0, this.__size, this.__size);
        this.__sprite.x = x - this.__size/2;
        this.__sprite.y = y - this.__size/2;
        this.__sprite.regX = 25/2;
        this.__sprite.regY = 25/2;
        this.__angle = 0;

        this.__maxVel= 5;
        this.__xVel = 0;
        this.__yVel = 0;
        this.__friction = 0.96;
        this.__accel = .25;

        this.__displayObject = null;

        // Projectiles
        this.__isShooting = false;
        this.__lastShotInstant = Date.now();
        this.__shotDelta = 100;
        this.__projectileSize = 6;
        this.__projectiles = [];

        // Player
        this.__particleEmitter = new LineParticleEmitter(this.__stage, 1, 50, "black", 25);

        // Movement variables
        this.__movingRight = false;
        this.__movingDown = false;
        this.__movingLeft = false;
        this.__movingUp = false;

        // Add handlers
        window.addEventListener("keydown", function(event) {
            that.keydownListener(event);
        }, false);

        window.addEventListener("keyup", function(event) {
            that.keyupListener(event);
        }, false);

        window.addEventListener("mousedown", function(event) {
            that.startShooting();
        }, false);

        window.addEventListener("mouseup", function(event) {
            that.stopShooting();
        }, false);
    }

    show() {
        this.__displayObject = this.__stage.addChild(this.__sprite);
    }

    remove() {
        this.__stage.removeChild(this.__displayObject);
    }

    update() {
       this.rotate(this.__stage.mouseX, this.__stage.mouseY);
       this.move();
       this.updateParticles();
       this.updateProjectiles();

       if (this.__isShooting) {
            this.shoot();
        }
    }

    updateProjectiles() {
        var that = this;
        this.__projectiles.forEach(function(projectile, index) {
            projectile.update();
            if(projectile.shouldBeDestroyed) {
                //Remove reference from the array
                that.__projectiles.splice(index, 1); //Could also call with 'this' instead of me and not need to reference projectiles directly
            }
        });
    }

    updateParticles() {
        if (this.isMoving()) {
            this.__particleEmitter.emit(this.__sprite.x - this.__size * Math.cos(this.__angle * Math.PI/180), this.__sprite.y - this.__size * Math.sin(this.__angle * Math.PI/180), this.__angle - 90);
        }
        this.__particleEmitter.update();
    }

    move() {
        // Set x-axis speed
        if (Math.abs(this.__xVel) <= this.__maxVel && this.isMovingLeftOrRight()) {
            if (this.__movingLeft) {
                this.__xVel -= this.__accel;
            }
            if (this.__movingRight) {
                this.__xVel += this.__accel;
            }
        }

        // Set y-axis speed
        if (Math.abs(this.__yVel) <= this.__maxVel && this.isMovingUpOrDown()) {
            if (this.__movingUp) {
                this.__yVel -= this.__accel;
            }
            if (this.__movingDown) {
                this.__yVel += this.__accel;
            }
        }

        this.__sprite.x += this.__xVel;
        this.__sprite.y += this.__yVel;

        this.applyFriction();
        this.enforceBoundaries();
    }

    rotate(mouseX, mouseY) {
        if (!mouseX || !mouseY) {
            mouseX = this.__stageWidth/2;
            mouseY = 0;
        }
        this.__angle = Math.atan2(mouseY - this.__sprite.y, mouseX - this.__sprite.x);
        this.__angle = this.__angle * (180/Math.PI);

        if(this.__angle < 0) {
            this.__angle = 360 - (-this.__angle);
        }

        this.__sprite.rotation = this.__angle;
        console.log(this.__angle);
    }

    applyFriction() {
        this.__xVel *= this.__friction;
        this.__yVel *= this.__friction;
    }

    enforceBoundaries() {
        if (this.__sprite.x < 0) {
            this.__sprite.x = 0;
        }
        if (this.__sprite.x > this.__stageWidth) {
            this.__sprite.x = this.__stageWidth;
        }
        if (this.__sprite.y < 0) {
            this.__sprite.y = 0;
        }
        if (this.__sprite.y > this.__stageHeight) {
            this.__sprite.y = this.__stageHeight;
        }
    }

    isMovingLeftOrRight() {
        return (this.__movingRight || this.__movingLeft);
    }

    isMovingUpOrDown() {
        return (this.__movingUp || this.__movingDown);
    }

    isMoving() {
        return (this.isMovingUpOrDown() || this.isMovingLeftOrRight());
    }

    shoot() {
        if (Date.now() - this.__lastShotInstant >= this.__shotDelta) {
            var projectile = new Projectile(
                this.__sprite.x + (12.5 * Math.cos(this.__angle * Math.PI/180)),
                this.__sprite.y + (12.5 * Math.sin(this.__angle * Math.PI/180)),
                this.__projectileSize,
                this.__angle,
                "black",
                this.__stage,
                this.__stageWidth,
                this.__stageHeight);
            this.__projectiles.push(projectile);
            projectile.show();

            this.__lastShotInstant = Date.now();
        }
    }

    startShooting() {
        this.__isShooting = true;
    }

    stopShooting() {
        this.__isShooting = false;
    }

    getCenter() {
        let theta = 12.5 * (Math.sin(Math.PI/2) / 17.67);
        let thataPrime = (this.__angle * Math.PI/180) - theta;
        let x = this.__sprite.x + (17.67 * Math.cos(this.__angle * Math.PI/180));
        let y = this.__sprite.y + (17.67 * Math.sin(this.__angle * Math.PI/180));
        return { x : x, y : y };
    }

    keydownListener(event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 68: //d
                this.__movingRight = true;
                break;
            case 83: //s
                this.__movingDown = true;
                break;
            case 65: //a
                this.__movingLeft = true;
                break;
            case 87: //w
                this.__movingUp = true;
                break;
        }
    }

    keyupListener(event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 68: //d
                this.__movingRight = false;
                break;
            case 83: //s
                this.__movingDown = false;
                break;''
            case 65: //a
                this.__movingLeft = false;
                break;
            case 87: //w
                this.__movingUp = false;
                break;
        }
    }
}