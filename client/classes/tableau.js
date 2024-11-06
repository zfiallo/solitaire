export default class Tableau {
    constructor(scene) {
        this.tableau = [new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array()];

        this.render = (x,y) => {
            //spacing
            let s = 90;

            scene.add.image(x, y, 'foundation').setScale(1,1);
            scene.add.image(x + s, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*2, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*3, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*4, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*5, y, 'foundation').setScale(1,1);
            scene.add.image(x + s*6, y, 'foundation').setScale(1,1);


            let t1 = scene.add.zone(x, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t2 = scene.add.zone(x + 80, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t3 = scene.add.zone(x + 160, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t4 = scene.add.zone(x + 240, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t5 = scene.add.zone(x + 320, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t6 = scene.add.zone(x + 400, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
            let t7 = scene.add.zone(x + 480, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setData({
                "cards": 0
            });
        }
    }
}