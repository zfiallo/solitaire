const deck = [];
let stockStack = [];
let wasteStack = [];
/*let f1 = [];
let f2 = [];
let f3 = [];
let f4 = [];*/
const foundation = [new Array(), new Array(), new Array(), new Array()];
const tableau = [];

window.onload = function() {
    var game = new Phaser.game();
}
//import Phaser from './phaser.min.js';

class Card {
    constructor(suit, number) {
        this.suit = suit
        this.number = number
    }
}

function newDeck() {
    // spades = 1, hearts = 2, clubs = 3, diamonds = 4
    for (let s = 1; s <= 4; s++) {
        for (n = 1; n <= 13; n++) {
            deck.push(new Card(s, n));
        }
    }
    return deck;
}

function shuffle(deck) {
    let temp = [];
    for (let i = 0; i <= 52; i++) {
        let j = Math.floor(Math.random() * 53);
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // Deletes any undefined cards
    let k = deck.length;
    for (let k = 0; k <= 52; k++) {
        if (deck[k] == undefined) {
            deck.splice(k, 1);
        }
    }
}

function deal(deck) {
    for (let i = 1; i <= 7; i++) {
        tableau.push(new Array(deck.pop()));
    }
    for (let i = 1; i <= 6; i++) {
        tableau[6].push(deck.pop());
    }
    for (let i = 1; i <= 5; i++) {
        tableau[5].push(deck.pop());
    }
    for (let i = 1; i <= 4; i++) {
        tableau[4].push(deck.pop());
    }
    for (let i = 1; i <= 3; i++) {
        tableau[3].push(deck.pop());
    }
    for (let i = 1; i <= 2; i++) {
        tableau[2].push(deck.pop());
    }
    tableau[1].push(deck.pop());
}

function moveCard(card, target, x, y) {

    isValid(target, card)
    card.x = x;
    card.y = y;

//    if target - 1 = card.number && target.suit =
// if target - 1 = card number && card.suit != red or black
// add to target stack
// cancel move, play move card back animation
// check if 4 stacks are full, if yes end game

document.getElementById("card")

Card.input.enableDrag(true);

}

function isValid() {

}

function isOver() {
    
}

newDeck();
shuffle(deck);
deal(deck);
console.log(deck);
console.log(tableau);