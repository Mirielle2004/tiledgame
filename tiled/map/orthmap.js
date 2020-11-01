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
