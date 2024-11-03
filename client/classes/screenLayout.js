import { Card } from '..objects/card.js';
import { Deck } from '..objects/deck.js';

export default class Zone {
    constructor(scene) {
        let foundation = [new Array(), new Array(), new Array(), new Array()];

        this.renderZone = (x,y) => {
            let dropZone = scene.add.zone(x,y, 95, 70).setRectangleDropZone(95,70)
            dropZone.setData({
                "cards": 0
            });
            return dropZone;
        }
    }
}