import Deck from '../classes/deck.js';
import Foundation from '../classes/foundation.js';
import Tableau from '../classes/tableau.js';

export class Game extends Phaser.Scene {
    constructor () {
        super('Game');
    }
    
    preload () {
        this.load.spritesheet('cardSprites', "/client/assets/cardSprites.png", {frameHeight: 96, frameWidth : 71, endFrame: 51});
        this.load.spritesheet('deckSprites', "/client/assets/deckSprites.png", {frameHeight: 98, frameWidth : 75, endFrame: 3});
        this.load.image('foundation', '/client/assets/foundation.png');
    }

    create () {
        // for demo script get winnable game then save game scene file for script
        // get deck, deck error on .setDraggable, try game for saving game
        /*
        this.saveFile = () => {
            var file = {
                deck: this.Deck.getDeck(),
                //tableau: this.Tableau.getTableau()
            };
            localStorage.setItem('saveFile',JSON.stringify(file));
        };
        
        this.loadFile = () => {
            var file = JSON.parse(localStorage.getItem('saveFile'));
            this.Deck.setDeck(file.deck);
            //this.Tableau.setTableau(file.tableau);
        };
        */

        let deckX = (window.innerWidth / 2 ) - 255;
        let deckY = (window.innerHeight / 5);
        let tableauX = deckX - 2;
        let tableauY = deckY + 110; 
        let foundationX = deckX + 238; 
        let textX = window.innerWidth - 370; 
        let textY = window.innerHeight - 50; 
        let horizonalSpacing = 80;
        let verticalSpacing = 20;

        let moves = 0;
        let gameOver = false;

        this.scoreText = this.add.text(textX, textY, 'Score: ' + moves, { fontSize: 24 });
        this.timeText = this.add.text(textX + 160, textY, '', { fontSize: 24 });

        this.Deck = new Deck(this);
        //this.loadFile();
        this.Deck.createDeck();
        //localStorage.clear();
        //this.saveFile();
        this.Deck.render(deckX, deckY);

        this.Tableau = new Tableau(this, this.Deck.deal());
        this.Tableau.render(tableauX, tableauY, horizonalSpacing, verticalSpacing);

        this.Foundation = new Foundation(this);
        this.Foundation.render(foundationX, deckY, horizonalSpacing);

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
            this.Foundation.update(foundationX, deckY, horizonalSpacing);
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

                this.scene.pause('Game');
                /*
                this.scoreText = this.add.text(0, 40, 'Submit Score').on('pointerdown', () => {
                    var username = data.firstName;
                    var time = this.timer();
                    var score = moves;
    
                    var jsonString = {username: username, time: time, score: score};
            
                    $.ajax({
                        url: libraryURL + "/index",
                        type:"post",
                        data: jsonString,
                        success: function(response){
                            var test1 = "";
                            alert(response);
                        },
                        error: function(err){
                            var test2 = "";
                            alert(err);
                        }
                    });
                });
                */
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
    }
}
