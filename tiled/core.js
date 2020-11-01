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
