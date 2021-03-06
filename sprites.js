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
