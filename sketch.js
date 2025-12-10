// Momo + The Cyber Key
// LMC 6310 - Fall 2025
// Ayesha, Esther, and Lew


// References:

// used ChatGPT for the following:
// - advice on general file set up and scene management
// - generate text, dialogue, and game name
// - create pixel art for the guards, ending image, and start/welcome image
// for general debugging

// sounds from: https://www.epidemicsound.com/ 
// momo talking from animal crossing: https://www.youtube.com/watch?v=YekLRkiIW4Y 

let currentScene; // the scene object to display which world
let playerImage; // the character image used throughout the gamed
let playerImage1; // var to store the char image before surgery
let playerImage2; // var to store the chat image after surgery

// variables to keep track of the story state and dialogues
let mapIntroRead = false; // if the user read the intro
let authLinesRead = false; // if the user read the instructions after being authorized
let gotAuthorized = false; // if the user ENTERED the authorization zon // to keep track if they can enter the human world yet
let finAutho = false; // if the user FINISHED going through the autho zone
let talkedToCat = false; // to keep track of if they can go to the authorization zone yet
let gotFile = false; // if they won the game and got the file

let startImage; // the start/welcome screen
let gameStarted = false; // if they pressed space to start the game

// sounds/music
let mainSong;
// game scene
let loseSound, winSound, gameSong;
// authorization
let authoEnterSound, heartbeat;
// animal scene
let momoTalking;
// ending
let endMusic;

function preload () {
  // load sounds
  mainSong = loadSound('assets/sounds/mainSong.mp3');
  momoTalking = loadSound('assets/sounds/momoTalking.mp3');
  authoEnterSound = loadSound('assets/sounds/authoZone.mp3');
  heartbeat = loadSound('assets/sounds/heartbeat.mp3');
  winSound = loadSound('assets/sounds/win.mp3');
  loseSound = loadSound('assets/sounds/lose.mp3');
  gameSong = loadSound('assets/sounds/gameSong.mp3');
  endMusic = loadSound('assets/sounds/endMusic.mp3');
  
  startImage = loadImage('assets/StartScene.png');
  
  playerImage1 = loadImage('assets/char-1.png');
  playerImage2 = loadImage('assets/prettyChar.png');
}
function setup() {
  createCanvas(960, 540);
  
  changeScene('map',260,height-100);
}

function draw() {
  background('white');
  
  if (gotAuthorized) {
    playerImage = playerImage2;
  } else {
    playerImage = playerImage1;
  }
  
  if (!gameStarted) {
    startImage.resize(966,0);
    image(startImage,0,0);
  } else {
    playerImage.resize(60,0);
  
    currentScene.draw();
    currentScene.update();
  }
}

function changeScene(sceneName,playerX,playerY) {
  if (sceneName == 'map') {
    currentScene = new MapScene(playerX,playerY);
  } else if (sceneName == 'animalWorld') {
    currentScene = new AnimalScene();
  } else if (sceneName == 'authorization') {
    currentScene = new Authorization(playerX,playerY);
  } else if (sceneName == 'game') {
    currentScene = new GameScene();
  } else if (sceneName == 'ending') {
    currentScene = new Ending();
  }
  
  currentScene.preload();
  currentScene.setup();
}

function keyPressed() {
  if(!gameStarted) {
    if (key === ' ') {
      gameStarted = true;
    }
  } else {
    currentScene.keyPressed();
  }
}