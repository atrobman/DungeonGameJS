import { Game } from './src/game.js';
import { keyboard } from './src/utils.js';

//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
    width: 1200,
    height: 800,
    antialiasing: true,
    transparent: false,
    resolution: 1
}
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add("images/cat.png")
    .load(setup);

//Define any variables that are used in more than one function
let cat, state;

function setup() {

    //Create the `cat` sprite 
    cat = new Sprite(resources["images/cat.png"].texture);
    cat.y = 0;
    cat.vx = 0;
    cat.vy = 0;
    app.stage.addChild(cat);

    //Set the game state
    state = play;

    let left = keyboard(37);
    let up = keyboard(38);
    let right = keyboard(39);
    let down = keyboard(40);
    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cat.vx += -5;
    };

    //Left arrow key `release` method
    left.release = () => {
        cat.vx -= -5;
    };

    //Up
    up.press = () => {
        cat.vy += -5;
    };
    up.release = () => {
        cat.vy -= -5;
    };

    //Right
    right.press = () => {
        cat.vx += 5;
    };
    right.release = () => {
        cat.vx -= 5;
    };

    //Down
    down.press = () => {
        cat.vy += 5;
    };
    down.release = () => {
        cat.vy -= 5;
    };
    
    //Start the game loop 
    app.ticker.add(deltaTime => gameLoop(deltaTime));
}

function gameLoop(deltaTime) {
    //Update the current game state:

    state(deltaTime);
}

function play(deltaTime) {

    cat.x += cat.vx;
    cat.y += cat.vy;
}