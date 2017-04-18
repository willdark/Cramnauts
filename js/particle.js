class ParticleEmitter {
    constructor(map, delta, fadeTime, color) {
        this.__map = map;
        this.__particles = [];
        this.__delta = delta; //time between particles
        this.__fadeTime = fadeTime;
        this.__color = color;
        this.__lastEmitInst = 0;
    }

    emit(x, y) {
        //emit particles semi-randomly around 
    }
}

//Emits particles along a line
class LineParticleEmitter extends ParticleEmitter {
    constructor(map, delta, fadeTime, color, length) {
        super(map, delta, fadeTime, color);
        this.__length = length;
    }

    emit(x, y, angle) {
        //emit particles along the line
        //x and y are expected to be at the midpoint of the line

        if (Date.now() - this.__lastEmitInst >= this.__delta) {
            //get a random number along the line
            let posOnLine = getRandomInRange(0, this.__length) - this.__length/2;
            let _x = x + (posOnLine) * Math.cos(angle * Math.PI/180);
            let _y = y + (posOnLine) * Math.sin(angle * Math.PI/180);

            let particle = new Particle(_x, _y, this.__fadeTime, this.__color);
            this.__particles.push(particle);

            particle.displayObject = this.__map.addChild(particle.sprite);

            this.__lastEmitInst = Date.now();
        }
    }

    update() {
        var that = this;
        this.__particles.forEach(function(particle, index, particles) {
            particle.update();

            //clean up old particles
            if (particle.canBeDestroyed) {
                //particle.__sprite.graphics.clear();
                that.__map.removeChild(particle.displayObject);
                particles.splice(index, 1);
            }
        });
    }
}

class Particle {
    constructor(x, y, fadeTime, color) {
        if (!color) {
            this.__color = "white";
        }
        
        this.__sprite = new createjs.Shape();
        this.__sprite.graphics.beginFill(color).drawCircle(x, y, 3);

        this.__createdInst = Date.now();
        this.__fadeTime = fadeTime;

        this.__canBeDestroyed = false;
    }

    set displayObject    (displayObject) { this.__displayObject = displayObject }
    get displayObject    ()              { return this.__displayObject }
    get sprite           ()              { return this.__sprite }
    get canBeDestroyed   ()              { return this.__canBeDestroyed }

    update() {
        //fade the particle by turning down the opacity
        //if opacity is zero, destroy
       this.__sprite.alpha -= .02;
       if (this.__sprite.alpha <= 0) {

            this.__canBeDestroyed = true;
        }
    }
}

//could also make particle emitters for cirlces or elipses?