export default class Foundation {
    constructor(scene) {
        let foundation = [[], [], [], []];

        this.render = (x, y) => {
            let s = 80;     // horizontal spacing
            
            /*
            for (let i = 0; i > 4; i++) {
                scene.add.image(x + s*i, y, 'foundation').setScale(1,1);
                scene.add.zone(x + s*i, y).setRectangleDropZone(70, 95).setInteractive({
                    dropZone: true
                }).setData({
                    "cards": 0
                });
            }
            */
            
            scene.add.image(x, y, 'foundation').setScale(1,1);
            scene.add.image(x + s, y, 'foundation').setScale(1,1);
            scene.add.image(x + (s * 2), y, 'foundation').setScale(1,1);
            scene.add.image(x + (s * 3), y, 'foundation').setScale(1,1);
            
            scene.add.zone(x, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let f2 = scene.add.zone(x + s, y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let f3 = scene.add.zone(x + (s * 2), y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
            let f4 = scene.add.zone(x + (s * 3), y, 95, 70).setRectangleDropZone(95,70).setScale(1,1).setInteractive({
                dropZone: true
            }).setData({
                "cards": 0
            });
        }
    }
}