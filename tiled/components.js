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
