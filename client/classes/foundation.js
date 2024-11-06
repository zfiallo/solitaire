export default class Foundation {
    constructor(scene) {
        let foundation = [new Array(), new Array(), new Array(), new Array()];

        this.render = (x,y) => {
            //spacing
            let s = 80;

            scene.add.image(x, y, 'foundation').setScale(1,1);
            scene.add.image(x + s, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*2, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*3, y, 'foundation').setScale(1,1);

            let f1 = scene.add.zone(x, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let f2 = scene.add.zone(x + 80, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let f3 = scene.add.zone(x + 160, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let f4 = scene.add.zone(x + 240, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
        }

    }
}