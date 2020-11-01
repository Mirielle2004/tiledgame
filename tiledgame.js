/**
 * 2D Vector's class
 * @class Vec2d
 * 
 * @author Mirielle S.
 * Last Revision: 24th oct. 2020
 * 
 * 
 * MIT License 
 * Copyright (c) 2020 CodeBreaker
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class Vec2d {
    /**
     * @static createFrom
     * @description creates a vector from it's argument
     * @param {Object} arg Array or an Array-like to create a vector from
     * @returns {Vec2d}
     */
    static createFrom(arg) {
        if(arg instanceof Vec2d)
            return arg;
        else if(arg instanceof Array) {
            let w = arg[2] === undefined ? 1 : arg[2];
            return new Vec2d(arg[0], arg[1], w);
        }
        else if(arg instanceof Object) {
            let w = arg.w === undefined ? 1 : arg.w;
            return new Vec2d(arg.x, arg.y, w);
        } else 
            throw new Error("Insufficient vector's data");
    }

    /**
     * @static getDist
     * @description computes the distance between two points
     * @param {Object} v1 origin positional vector
     * @param {Object} v2 end positional vector
     * @returns {Number} the distance between two points
     */
    static getDist(v1, v2) {
        let diff = Vec2d.createFrom(v2).sub(Vec2d.createFrom(v1));
        return Math.hypot(diff.x, diff.y);
    }

    /**
     * @static cartToPolar
     * @description converts a vector to polar space from cartisian
     * @param {Number} a angle
     * @returns {Vec2d} vector in polar space
     */
    static cartToPolar(a) {
        return new Vec2d(Math.cos(a), Math.sin(a))
    }

    /**
     * @constructor
     * @param {Number} x x-component for the vector
     * @param {Number} y y-component for the vector
     * @param {Number} w (optional) w-component for the vector
     */
    constructor(x=0, y=0, w=1) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.o = {x:0, y:0, w:1};
        this.angle = Math.atan2(this.y, this.x);
        this.length = Math.hypot(this.x, this.y);
    }

    /**
     * @method add
     * @description add two vector's together
     * @param {Object} v vector to add with this
     * @returns {Vec2d} a new vector 
     */
    add(vec) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x + v.x, this.y + v.y);
    }

    /**
     * @method sub
     * @description subtracts a vector from this
     * @param {Object} v vector to be subtracted from this
     * @returns {Vec2d} a new vector
     */
    sub(vec) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x - v.x, this.y - v.y);
    }

    /**
     * @method scale
     * @description scales each components of a vector by a number
     * @param {Number} s scaling factor for this
     * @returns {Vec2d} scaled version of this
     */
    scale(s) {
        return new Vec2d(this.x * s, this.y * s);
    }

    /**
     * @method addScale
     * @description adds a scaled vector to this
     * @param {Object} v a vector to be added to this
     * @param {Number} s a scaling factor to this
     * @returns {Vec2d}
     */
    addScale(vec, s) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x + v.x * s, this.y + v.y * s);
    }

    /**
     * @method mult
     * @description multiply a vector by a vector
     * @param {Object} v vector to be multiplied with this
     * @returns {Vec2d}
     */
    mult(vec) {
        let v = Vec2d.createFrom(vec);
        return new Vec2d(this.x * v.x, this.y * v.y);
    }

    /**
     * @method dot
     * @description determine the dot product of this vector against the argument
     * @param {Object} v  vector to be tested against this
     * @returns {Number} how much this is similar to the other vector
     */
    dot(vec) {
        let v = Vec2d.createFrom(vec);
        return this.x * v.x + this.y * v.y;
    }

    /**
     * @method angleBetween
     * @description finds the angle between two vectors
     * @param {Vec2d} vec second vector
     */
    angleBetween(vec) {
        let v = Vec2d.createFrom(vec);
        return this.dot(v)/(this.length * v.length);
    }

    /**
     * @method getDist
     * @description get the distance between this and other vector
     * @param {Object} v positional vector 
     * @returns {Number} distance between two points
     */
    getDist(v) {
        let diff = Vec2d.createFrom(v).sub(this);
        return Math.hypot(diff.x, diff.y);
    }

    /**
     * @method inverse
     * @description get the inverse of the each component in this vector
     * @returns {Vec2d} 
     */
    inverse() {
        return new Vec2d(1/this.x, 1/this.y)
    }

    /**
     * @method normalise
     * @description get the unit vector of this
     */
    normalise() {
        if(this.length !== 0) 
            return this.scale(1/this.length);
        else 
            return new Vec2d();
    }

    /**
     * @method getOrthogonal
     * @description get the orthogonal vector to this
     */
    getOrthogonal() {
        let angle = (90 * Math.PI / 180) + this.angle;
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        return new Vec2d(x, y);
    }

    /**
     * @method applyFunc
     * @description apply a function to each component of the vector
     * @param {Function} func function to be applied
     */
    applyFunc(func) {
        return new Vec2d(func(this.x), func(this.y));
    }

    /**
     * @method useNMC
     * @description use normalised coordinate
     * @param vec origin vector
     * @returns vector in a normalised coordinate
     */
    useNMC(vec) {
        let v = Vec3d.createFrom(vec);
        this.x += 1;
        this.y += 1;
        this.x *= v.x;
        this.y *= v.y;
        return new Vec2d(this.x, this.y, 1);
    }

    /**
     * @method clone
     * @description create a copy of this
     */
    clone() {
        return new Vec2d(this.x, this.y);
    }

    /**
     * @method toArray
     * @description creates an array with each components of this vector
     * @returns {Array} containing components of this vectors
     */
    toArray() {
        return [this.x, this.y];
    }

    /**
     * @method toObject
     * @description creates an object with each components of this vector
     * @returns {Object} containing key/value components of this vector respectively
     */
    toObject() {
        return {x: this.x, y:this.y};
    }

    /**
     * @method draw
     * @description visualise this vector
     * @param {CanvasRenderingContext2D} ctx context to draw this vector
     * @param {String} stroke color
     * @param {Number} width width
     */
    draw(ctx, stroke, width=0) {
        ctx.save();
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(this.o.x, this.o.y);
        ctx.lineTo(this.o.x + this.x, this.o.y + this.y);
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.o.x + this.x, this.o.y + this.y, 3+width, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = stroke;
        ctx.fill();
        ctx.restore();
    }
}


/**
 * 3D Vector's class
 * @class Vec2d
 * 
 * @author Mirielle S.
 * Last Revision: 24th oct. 2020
 * 
 * 
 * MIT License 
 * Copyright (c) 2020 CodeBreaker
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class Vec3d {
    /**
     * @static createFrom
     * @description creates a vector from it's argument
     * @param {Object} arg Array or an Array-like to create a vector from
     * @returns {Vec3d}
     */
    static createFrom(arg) {
        if(arg instanceof Vec3d)
            return arg;
        else if(arg instanceof Array) {
            let w = arg[3] === undefined ? 1 : arg[3];
            return new Vec3d(arg[0], arg[1], arg[2], w);
        }
        else if(arg instanceof Object) {
            let w = arg.w === undefined ? 1 : arg.w;
            return new Vec3d(arg.x, arg.y, arg.z, w);
        } else 
            throw new Error("Insufficient vector's data");
    }

    /**
     * @static getDist
     * @description computes the distance between two points
     * @param {Object} v1 origin positional vector
     * @param {Object} v2 end positional vector
     * @returns {Number} the distance between two points
     */
    static getDist(v1, v2) {
        let diff = Vec3d.createFrom(v2).sub(Vec3d.createFrom(v1));
        return Math.hypot(diff.x, diff.y);
    }
    
    /**
     * @constructor
     * @param {Number} x x-component of the vector
     * @param {Number} y y-component of the vector
     * @param {Number} z z-component of the vector
     * @param {Number} w (optional) w-component for the vector
     */
    constructor(x=0, y=0, z=0, w=1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.o = {x:0, y:0, z:0, w:1};
        this.length = Math.hypot(this.x, this.y, this.z);
    }

    /**
     * @method add
     * @description add two vector's together
     * @param {Object} v vector to add with this
     * @returns {Vec3d} a new vector 
     */
    add(vec) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    /**
     * @method sub
     * @description subtracts a vector from this
     * @param {Object} v vector to be subtracted from this
     * @returns {Vec3d} a new vector
     */
    sub(vec) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    /**
     * @method scale
     * @description scales each components of a vector by a number
     * @param {Number} s scaling factor for this
     * @returns {Vec3d} scaled version of this
     */
    scale(s) {
        return new Vec2d(this.x * s, this.y * s, this.z * s);
    }

    /**
     * @method addScale
     * @description adds a scaled vector to this
     * @param {Object} v a vector to be added to this
     * @param {Number} s a scaling factor to this
     * @returns {Vec3d}
     */
    addScale(vec, s) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x + v.x * s, this.y + v.y * s, this.z + v.z * s);
    }

    /**
     * @method mult
     * @description multiply a vector by a vector
     * @param {Object} v vector to be multiplied with this
     * @returns {Vec3d}
     */
    mult(vec) {
        let v = Vec3d.createFrom(vec);
        return new Vec3d(this.x * v.x, this.y * v.y, this.z * v.z);
    }

    /**
     * @method dot
     * @description determine the dot product of this vector against the argument
     * @param {Object} v  vector to be tested against this
     * @returns {Number} how much this is similar to the other vector
     */
    dot(vec) {
        let v = Vec3d.createFrom(vec);
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /**
     * @method cross
     * @description creates a vector perpendicular to this and the other vector
     * @param {Object} vec other vector
     * @returns {Vec3d} vector perpendicular to this and the other vector
     */
    cross(vec) {
        let v = Vec3d.createFrom(vec);
        let x = this.y * v.z - this.z * v.y;
        let y = this.z * v.x - this.x * v.z;
        let z = this.x * v.y - this.y * v.x;
        return new Vec3d(x, y, z);
    }

    /**
     * @method angleBetween
     * @description get the angle between two vectors
     * @param {Object} vec second vector
     * @return {Number} angle between this and other vector in radian
     */
    angleBetween(vec) {
        let v = Vec3d.createFrom(vec);
        return this.dot(v)/(this.length * v.length);
    }

    /**
     * @method getDist
     * @description get the distance between this and other vector
     * @param {Object} v positional vector 
     * @returns {Number} distance between two points
     */
    getDist(v) {
        let diff = Vec3d.createFrom(v).sub(this);
        return Math.hypot(diff.x, diff.y, diff.z);
    }

    /**
     * @method inverse
     * @description get the inverse of the each component in this vector
     * @returns {Vec3d} 
     */
    inverse() {
        return new Vec3d(1/this.x, 1/this.y, 1/this.z)
    }

    /**
     * @method normalise
     * @description get the unit vector of this
     */
    normalise() {
        if(this.length !== 0) 
            return this.scale(1/this.length);
        else 
            return new Vec3d();
    }

    applyFunc(func) {
        return new Vec3d(func(this.x), func(this.y), func(this.z));
    }

    /**
     * @method useNMC
     * @description use normalised coordinate
     * @param vec origin vector 
     * @returns vector in a normalised coordinate
     */
    useNMC(vec) {
        let v = Vec3d.createFrom(vec);
        this.x += 1;
        this.y += 1;
        this.x *= v.x;
        this.y *= v.y;
        return new Vec3d(this.x, this.y, this.z, this.w);
    }

    /**
     * @method clone
     * @description create a copy of this
     * @returns {Vec3d} clone of this
     */
    clone() {
        return new Vec3d(this.x, this.y, this.z);
    }

    /**
     * @method toArray
     * @description creates an array with each components of this vector
     * @returns {Array} containing components of this vectors
     */
    toArray() {
        return [this.x, this.y, this.z, this.w];
    }

    /**
     * @method toObject
     * @description creates an object with each components of this vector
     * @returns {Object} containing key/value components of this vector respectively
     */
    toObject() {
        return {x: this.x, y:this.y, z:this.z, w:this.w};
    }

    draw(ctx, o, stroke, width) {
        let vo = Vec3d.createFrom(o);
        ctx.save();
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(vo.x, vo.y);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.scale(1,1);
        ctx.arc(0, 0, 3, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = stroke;
        ctx.fill();
        ctx.restore();
    }
}

/**
 * @class Sprite
 * Principal class for sprites animation
 */
class Sprite {
    /**
     * @constructor
     * @param {Object} frames object contain animation frames data array
     * @param {Number} col number of columns in the spritesheet
     * @param {Number} delay animation delay
     */
    constructor(frames, col, delay=5) {
        this.col = col;
        this.frames = frames;
        this.currentFrames = [];
        this.frameName = null;
        for(const i in this.frames) {
            this.setFrame(i);
            break;
        }
        this.delay = delay;
        this.index = {x:null, y:null};
        this._delayCounter = 0;
        this._frameCounter = 0;
        this.state = false;
    }

    /**
     * @method setFrame
     * @description sets the current animation's frame
     * @param {String} frameName animation's frame name
     */
    setFrame(frameName) {
        if(this.frames.hasOwnProperty(frameName)) {
            if(this.frames[frameName] instanceof Array) {
                this.currentFrames = this.frames[frameName];
                this.frameName = frameName;
            } else 
                throw TypeError("Sprite's current frame must be an instance of an Array");
        }
        else 
            throw new Error(`Sprite Frame name does not exists`);
    }

    /**
     * @method getSource
     * @description gets the source vectors for the animation. This 
     * method must be called in a loop for an effective animation
     */
    getSource() {
        this._delayCounter++;
        if(this._delayCounter > this.delay) {
            this._delayCounter = 0;
            this._frameCounter++;
            if(this._frameCounter >= this.currentFrames.length) {
                this.state = false;
                this._frameCounter = 0;
            } else {
                this.state = true;
            }
            let value = this.currentFrames[this._frameCounter] - 1;
            let x = value % this.col;
            let y = value / this.col;
            this.index = {x:x, y:y};
        }
    } 
};


const __GLOBAL__ = {

    scene: null,
    fpsTimeStarted: performance.now(),
    elapsedTimeStarted: performance.now(),

};


class Platformer2D {

    static getFPS() {
        let timeEnded = performance.now();
        let fps = 1000 / (timeEnded - __GLOBAL__.fpsTimeStarted)
        __GLOBAL__.fpsTimeStarted = timeEnded;
        return fps;
    }

    static getElapsedTime() {
        let timeEnded = performance.now();
        let elapsed = 0.001 * (timeEnded - __GLOBAL__.elapsedTimeStarted);
        __GLOBAL__.elapsedTimeStarted = timeEnded;
        if(elapsed > 0.2) 
            elapsed = 0;
        return elapsed;
    }

    static objectToCSSFormat(word) {
        for(let chr of word) {
            if(chr.charCodeAt() >= 65 && chr.charCodeAt() <= 90) {
                let s = chr;
                word = word.replaceAll(chr, `-${s.toLowerCase()}`);
            }
        }
        return word;
    }

    static getTileSetIndex(id, col) {
        return new Vec2d(id % col, id / col)
    }
}


/**
 * @todo
 * vertices collision
 */
class Component {
    
    constructor(pos, dimension) {
        this.pos = Vec2d.createFrom(pos);
        this.dimension = Vec2d.createFrom(dimension);
        this.velocity = new Vec2d();
        this.rotation = 0;
        this.vertices = [];

        this.lastPos = null;
        this.nextPos = null;
        this.currentPos = null;

        this._minpos = null;
        this._maxpos = null;
    }

    orthCollision(map, velocity, {left=null, top=null}) {
        if(map.size !== undefined && map.dimension !== undefined) {
            // X-AXIS
            this.lastPos = this.pos;
            this.nextPos = Vec2d.createFrom({
                x: player.pos.x + velocity.x,
                y: this.lastPos.y
            });
            this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
                .applyFunc(Math.floor);
            this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
                (map.size).inverse()).applyFunc(Math.ceil);

            for(let r=this._minPos.y; r < this._maxPos.y; r++) {
                for(let c=this._minPos.x; c < this._maxPos.x; c++) {
                    this.currentPos = map.map[r * map.dimension.x + c];
                    if(typeof left === "function")
                        left();
                }
            }
            this.pos = this.nextPos;
            // Y-AXIS
            this.lastPos = this.pos;
            this.nextPos = Vec2d.createFrom({
                x: this.lastPos.x,
                y: this.lastPos.y + velocity.y
            });
            this._minPos = this.nextPos.mult(Vec2d.createFrom(map.size).inverse())
                .applyFunc(Math.floor);
            this._maxPos = this.nextPos.add(this.dimension).mult(Vec2d.createFrom
                (map.size).inverse()).applyFunc(Math.ceil);

            for(let r=this._minPos.y; r < this._maxPos.y; r++) {
                for(let c=this._minPos.x; c < this._maxPos.x; c++) {
                    this.currentPos = map.map[r * map.dimension.x + c];
                    if(typeof top === "function")
                        top();
                }
            }
            this.pos = this.nextPos;
        }
        
    }

}


/**
 * @class orthographicMap
 * principal class for creating an orthographic map
 */
class OrthographicMap {

    /**
     * @static getMapId
     * @description get the value of an index from the map
     * @param {Array} map Array representing the map
     * @param {Vec2d} pos the [x,y] index in the array
     * @param {Number} size number of columns in the array
     * @returns {Object} index value from the map
     */
    static getMapId(map, pos, size=0) {
        let p = Vec2d.createFrom(pos);
        if(map[0][0] !== undefined)
            return map[p.y][p.x];
        return map[p.y * size + p.x];
    }

    /**
     * @constructor
     * @param {Array} map map data
     * @param {Vec2d} size size of each tiles in the map
     */
    constructor(map, size) {
        if(map instanceof Array) {
            this.map = map;
            this.size = Vec2d.createFrom(size);
            if(this.map[0][0] != undefined) {
                this.type = "2D";
                this.dimension = Vec2d.createFrom({
                    x: this.map[0].length,
                    y: this.map.length
                });
            }  else {
                this.type = "1D";
                this.dimension = new Vec2d();
            }
            this.index = new Vec2d();
            this.id = null; 
            // view
            this.minView = new Vec2d();
            this.maxView = new Vec2d();
        } else {
            throw TypeError(`Failed to Initialize Map: expects an instance of an Array`);
        }
    }
    
    /**
     * @method setDimension
     * @description manually set the dimension of the map
     * @param {Vec2d} dimension of the map
     */
    setDimension(vec) {
        this.dimension = Vec2d.createFrom(vec);
    }

    /**
     * @method setView
     * @description set the minimum and maximum visible area in the tile
     * @param {Vec2d} min minimum view vector 
     * @param {Vec2d} max maximum view vector
     */
    setView(min, max) {
        this.minView = Vec2d.createFrom(min);
        this.maxView = Vec2d.createFrom(max);
    }

    /**
     * @method render
     * @description API for rendering map to the screen
     * @param {Function} callback callback to render map
     */
    render(callback) {
        for(let r=this.minView.y; r < this.maxView.y; r++) {
            for(let c=this.minView.x; c < this.maxView.x; c++) {
                this.index = new Vec2d(c, r);
                this.id = OrthographicMap.getMapId(this.map, this.index, this.dimension.x);
                callback();
            }
        }
    }
}


/**
 *  * @todo 
 * - camera transformation
 * - camera scaling
 * - camera rotation
 * - camera skaling
 * - shaking
 */
class OrthographicCamera extends Component {

    constructor(pos=new Vec3d(), dimension=new Vec3d()) {
        super(pos, dimension);
        this.minPos = new Vec3d();
        this.maxPos = new Vec3d();
    }

    lookAt(map, sizee) {
        let size = sizee === undefined ? map.size : Vec3d.createFrom(sizee);
        this.minPos = this.pos.mult(size.inverse()).applyFunc(Math.floor);
        this.maxPos = this.pos.add(this.dimension).mult(
            size.inverse()).applyFunc(Math.ceil);
    }

    setMapClamp(minn, maxx) {
        let min = Vec3d.createFrom(minn);
        let max = Vec3d.createFrom(maxx);
        if(this.minPos.x < min.x) 
            this.minPos.x = min.x;
        else if(this.maxPos.x > max.x)
            this.maxPos.x = max.x;

        if(this.minPos.y < min.y) 
            this.minPos.y = min.y;
        else if(this.maxPos.y > max.y)
            this.maxPos.y = max.y;
    }

    setPosClamp(minn, maxx) {
        let min = Vec3d.createFrom(minn);
        let max = Vec3d.createFrom(maxx);
        if(this.pos.x < min.x)
            this.pos.x = min.x;
        else if(this.pos.x + this.dimension.x > max.x)
            this.pos.x = max.x - this.dimension.x;

        if(this.pos.y < min.y)
            this.pos.y = min.y;
        else if(this.pos.y + this.dimension.y > max.y)
            this.pos.y = max.y - this.dimension.y;

        if(this.pos.z < min.z) this.pos.z = min.z;
        else if(this.pos.z > max.z) this.pos.z = max.z;
    }

    follow(poss, dimensionn) {
        let pos = Vec3d.createFrom(poss);
        let dimension = Vec3d.createFrom(dimensionn);
        this.pos = pos.add(dimension.scale(0.5)).sub(this.dimension.scale(0.5));
    }

}
