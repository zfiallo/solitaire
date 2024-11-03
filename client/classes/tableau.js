import { Card } from '..objects/card.js';
import { Deck } from '..objects/deck.js';

export default class Tableau {
    constructor(scene) {
        this.tableau = [new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array()];

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
        })


    }
}