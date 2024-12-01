import Deck from '../classes/deck.js';
import Foundation from '../classes/foundation.js';
import Tableau from '../classes/tableau.js';
//import Menu from '../classes/menu.js';

// card height = 95, width = 70

export default class Game extends Phaser.Scene {
    constructor () {
        super({ 
            key: 'Game', 
            //active: true
        });
    }
    
    preload () {
        //this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.spritesheet('cardSprites', "/client/assets/cardSprites.png", {frameHeight: 96, frameWidth : 71, endFrame: 51});
        this.load.spritesheet('deckSprites', "/client/assets/deckSprites.png", {frameHeight: 98, frameWidth : 75, endFrame: 3});
        this.load.image('foundation', '/client/assets/foundation.png');
    }

    create () {
        let deckX = 274;            // was 243, deckY = foundationY
        let tableauX = 272;         // was 243
        let tableauY = 180;         // was 230
        let foundationX = 512;      // was 543
        let foundationY = 70;       // was 100
        let textX = 798;            // was 780
        let textY = 465;            // was 748
        let horizonalSpacing = 80;  // was 90
        let verticalSpacing = 20;

        let moves = 0;
        let gameOver = false;

        this.scoreText = this.add.text(textX, textY, 'Score: ' + moves);
        this.timeText = this.add.text(textX + 110, textY);

        this.Deck = new Deck(this);
        this.Deck.createDeck();
        this.Deck.render(deckX, foundationY);

        this.Tableau = new Tableau(this, this.Deck.deal());
        this.Tableau.render(tableauX, tableauY, horizonalSpacing, verticalSpacing);

        this.Foundation = new Foundation(this);
        this.Foundation.render(foundationX, foundationY, horizonalSpacing);

        this.scene.start('Menu');
        this.scene.moveUp('Menu');
        //this.Menu = new Menu(this);
        //this.Menu.render(0, 0);

        this.input.on('drop', (pointer, card, dropZone) => {
            let target = dropZone.getData('array').at(dropZone.getData('array').length - 1);
            this.dropped = false;

            if (dropZone.getData('type') == 'foundation') {
                if (((dropZone.getData('array').length == 0) && (card.getData('number') == 1)) || ((dropZone.getData('array').length > 0) && (card.getData('number') == target.getData('number') + 1) && (card.getData('suit') == target.getData('suit')))) {
                    dropZone.getData('array').push(card.getData('location').pop(card));
                    card.setData({'location': dropZone.getData('array')});
                    this.dropped = true;
                }
            } else if (dropZone.getData('type') == 'tableau') {
                if (dropZone.getData('array').length == 0 && card.getData('number') != 13) {
                    return;
                } else if (((card.getData('number') == 13) && (dropZone.getData('array').length == 0)) || ((card.getData('number') == target.getData('number') - 1) && (target.getData('color') != card.getData('color')))) {
                    if (card.getData('group') != undefined) {
                        let groupArray = card.getData('group').getChildren();
                        for (let i = 0; i <= groupArray.length-1; i++) {
                            groupArray[i].getData('location').pop();
                            dropZone.getData('array').push(groupArray[i]);
                            groupArray[i].setData({'location': dropZone.getData('array')});
                        }
                        card.getData('group').clear();
                        card.setData({'group': undefined});
                    } else {
                        dropZone.getData('array').push(card.getData('location').pop(card));
                        card.setData({'location': dropZone.getData('array')});
                    }
                    this.dropped = true;
                }
            }
        }).on('dragend', (pointer, card, dropped) => {
            if(this.dropped) {
                this.dropped = false;
                moves = moves + 1;
                this.scoreText.setText('Score: ' + moves);
            } else if (!this.dropped) {
                this.undoMove(card);
            }

            this.Tableau.update(tableauX, tableauY, horizonalSpacing, verticalSpacing);
            this.Foundation.update(foundationX, foundationY, horizonalSpacing);
            this.winConditions();
        });

        this.winConditions = () => {
            let arrays = this.Tableau.getTableau().concat(this.Foundation.getFoundation());
            let j = 0;

            for (let i = 0; i <= arrays.length-1; i++) {
                if (arrays[i].length == 13) {
                    if (arrays[i][12].getData('number') == 13 || 1) {
                        j++;
                    }
                }
            }
            
            if (j == 4) {
                gameOver = true;

                console.log(gameOver);
                console.log(this.timer());
                console.log(moves);
                this.scene.pause('Game');
            }
        }

        this.undoMove = (card) => {
            if (card.getData('group') != undefined) {
                card.getData('group').setXY(card.getData('originX'), card.getData('originY'), 0, 20);
                card.getData('group').clear();
            } else {
                card.x = card.getData('originX');
                card.y = card.getData('originY');
            }
        }

        this.timer = () => {
            let time;
            let minutes = Math.floor((this.time.now / 1000) / 60);
            let seconds = Math.floor(this.time.now / 1000);

            if (seconds > 59) {
                seconds = seconds % 60;
            }        

            if (seconds < 10) {
                time = 'Time: ' + minutes + ':0' + seconds;
            } else {
                time = 'Time: ' + minutes + ':' + seconds;
            }

            this.timeText.setText(time);
            return time;
        }
    }

    update () {
       this.timer();
       //this.Menu.render(0, 0);
       //this.scene.launch('Menu');
       //this.scene.launch('Menu');
    }
}