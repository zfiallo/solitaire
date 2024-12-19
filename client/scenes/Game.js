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
        this.paused = false;
        let clicked = false;

        let deckX = (window.innerWidth / 2) - 255;
        let deckY = (window.innerHeight / 5);
        let tableauX = deckX - 2;
        let tableauY = deckY + 110; 
        let foundationX = deckX + 238; 
        let textX = window.innerWidth - 370; 
        let textY = window.innerHeight - 49; 
        let horizonalSpacing = 80;
        let verticalSpacing = 20;
        let moves = 0;
       
        this.add.rectangle(0, window.innerHeight - 20, window.innerWidth * 2, 80, 0xFFFFFF);
        this.scoreText = this.add.text(textX, textY, 'Score: ' + moves, { fontSize: 20, color: '0x000000' });
        this.timeText = this.add.text(textX + 160, textY, '', { fontSize: 20, color: '0x000000' });

        this.Deck = new Deck(this);
        this.Deck.createDeck();
        //this.Deck.createDemo();       // winnable deck for demo
        this.Deck.render(deckX, deckY);

        this.Tableau = new Tableau(this, this.Deck.deal());
        this.Tableau.render(tableauX, tableauY, horizonalSpacing, verticalSpacing);

        this.Foundation = new Foundation(this);
        this.Foundation.render(foundationX, deckY, horizonalSpacing);
        
        /*
        // adds headers to leaderboard table
        $.ajax({
            url: libraryURL + "/leaderboard",
            type:"post",
            data: { username: 'user', score: 'score', time: 'time' },
        });
        */

        this.input.on('drop', (pointer, card, dropZone) => {
            let target = dropZone.getData('array').at(dropZone.getData('array').length - 1);
            this.dropped = false;

            // conditions for valid move
            if (dropZone.getData('type') == 'foundation') {
                if (((dropZone.getData('array').length == 0) && (card.getData('number') == 1)) || 
                ((dropZone.getData('array').length > 0) && (card.getData('number') == target.getData('number') + 1) && (card.getData('suit') == target.getData('suit')))) {
                    dropZone.getData('array').push(card.getData('location').pop(card));
                    card.setData('location', dropZone.getData('array'));
                    this.dropped = true;
                }
            } else if (dropZone.getData('type') == 'tableau') {
                if (dropZone.getData('array').length == 0 && card.getData('number') != 13) {
                    return;
                } else if (((card.getData('number') == 13) && (dropZone.getData('array').length == 0)) || 
                ((card.getData('number') == target.getData('number') - 1) && (target.getData('color') != card.getData('color')))) {
                    if (card.getData('group') != undefined) {
                        let groupArray = card.getData('group').getChildren();
                        for (let i = 0; i <= groupArray.length-1; i++) {
                            groupArray[i].getData('location').pop();
                            dropZone.getData('array').push(groupArray[i]);
                            groupArray[i].setData('location', dropZone.getData('array'));
                        }
                        card.getData('group').clear();
                        card.setData('group', undefined);
                    } else {
                        dropZone.getData('array').push(card.getData('location').pop(card));
                        card.setData('location', dropZone.getData('array'));
                    }
                    this.dropped = true;
                }
            }

            card.setData('clickTime', 0);
        });
       
        this.input.on('dragend', (pointer, card, dropped) => {
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

        // sends cards to foundation on doubleclick
        this.doubleClick = (card) => {
            let array = this.Foundation.getFoundation();
            
            // valid move conditions
            for (let i = 0; i < 4; i++) {
                if ((array[i].length == 0 && (card.getData('number') == 1))) {
                    array[i].push(card.getData('location').pop());
                    this.dropped = true;
                    break;
                } else if ((card.getData('suit') == array[i][array[i].length-1].getData('suit')) && (card.getData('number') == array[i][array[i].length-1].getData('number') + 1)) {
                    array[i].push(card.getData('location').pop());
                    this.dropped = true;
                    break;
                }
            }

            this.Foundation.setFoundation(array);
            card.setData('clickTime', 0);
        }

        // check if game is over
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
                this.paused = true;

                // render submit score button
                this.add.text(window.innerWidth - 230, 55, 'Submit Score', { fontSize: 24, textColor: 0x000000 }).setInteractive().on('pointerdown', () => {
                    let loggedIn = false;
                    let username = '';
                    let score = moves;
                    let time = this.timer();

                    // check if player is logged in
                    $.ajax({
                        url: libraryURL + "/users",
                        type: "get",
                        success: function(response){
                            let responseData = JSON.parse(response);
                            let usersTable = responseData.game;
        
                            for(let i of usersTable) {
                                if (document.getElementById('userID').textContent == i._id) {
                                    username = i.username;
                                    loggedIn = true;
                                }
                            }

                            // submit score to leaderboard
                            if (!clicked) {
                                if (loggedIn) {
                                    let jsonString = { username: username, score: score, time: time };
                                
                                    $.ajax({
                                        url: libraryURL + "/leaderboard",
                                        type:"post",
                                        data: jsonString,
                                        success: function(response){
                                            alert('Score submitted to leaderboard');
                                            clicked = true;
                                        },
                                        error: function(err){
                                            alert(err);
                                        }
                                    });
                                } else {
                                    alert('Error: not logged in');
                                }
                            }
                        },
                        error: function(err){
                            alert(err);
                        }
                    });
                });
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
                time = minutes + ':0' + seconds;
            } else {
                time = minutes + ':' + seconds;
            }

            this.timeText.setText('Time: ' + time);
            return time;
        }
    }   

    update () {
        if (!this.paused) {
            this.timer();
        }
    }
}
