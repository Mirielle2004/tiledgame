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
