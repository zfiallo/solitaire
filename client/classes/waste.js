import { Card } from '..objects/card.js';
import { Deck } from '..objects/deck.js';

export default class Waste {
    constructor(scene) {
        this.waste = [];

        if (waste.length > 2) {
            Deck.push(waste);
        }

        this.render = (x, y) => {
            let card = scene.add.image(Card, waste[0].sprite).setScale(1,1).setInteractive.setData({
                "sprite": this.sprite
            });
            return waste;
        }

        this.addCard = () => {
            this.waste.push(Card);
        }

    }

}