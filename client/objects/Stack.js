export default class Stack {
    constructor (scene) {
        this.renderZone = (x,y) => {
            let dropZone = scene.add.zone(x,y, 95, 70).setRectangleDropZone(95,70);
            dropZone.setData({
                "cards": 0
            });
            return dropZone;
        }
    }
}