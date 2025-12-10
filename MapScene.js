class MapScene {
  constructor (playerX,playerY) {
    this.mapImage = loadImage('assets/map.png');
    this.playerX = playerX;
    this.playerY = playerY;
    this.playerSpeed = 5;
    
    this.catImage = loadImage('assets/cat.png');
    
    this.lines = new Dialogue ([
      "Hi there! Welcome to the Post-Climate Cute World!",
      "Animals became super smart after the big disaster…",
      "Humans built fancy shiny cities… but they kind of turned evil.",
      "Rumor says the leader is hiding all the yummy food..while citizens are starving!",
      "Some animals say they know more. Maybe go find a cat who can talk…",
      "Your mission? Go find the truth. And maybe pet that cat.",
      "Move around to explore! But careful, guards are grumpy."
    ]);
    
    this.authLines = new Dialogue ([
      "All done! You survived the makeover inspection.",
      "Now go explore the Human City.",
      "Head left from here—you’ll see the big gray facility.",
      "Somewhere in there… the secret file is waiting.",
    ]);
    
    this.endLines = new Dialogue ([
      "Perfect! Let's go give Momo the secret file now..."
    ]);

  }
  
  preload () {
  }
  
  setup () {
    mainSong.loop();
  }
  
  update () {
    // make sure to mark the dialogue as read to not repeat once they enter the map again
    if (!mapIntroRead && this.lines.done) {
      mapIntroRead = true;
    }
    
    if ((!authLinesRead && this.authLines.done) || (authLinesRead && !this.authLines.done)) {
      authLinesRead = true;
      this.authLines.done = true;
    }
    
    
    // after the intro, they can move around
    // but if they're authorized they need to read the next instructions first
    if (mapIntroRead && (!gotAuthorized || (gotAuthorized && this.authLines.done)) && (!gotFile || (gotFile && this.endLines.done))) {
      this.collision();
    
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        if (this.playerX + playerImage.width < width) {
          this.playerX += this.playerSpeed;
        }
      } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        if (this.playerX > 0 && gotAuthorized) {
          this.playerX -= this.playerSpeed;
        } else if (this.playerX > 170 && !gotAuthorized) {
          this.playerX -= this.playerSpeed;
        }
      } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
        if (this.playerY > 0) {
          this.playerY -= this.playerSpeed;
        }
      } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
        if (this.playerY + playerImage.height < height) {
          this.playerY += this.playerSpeed;
        }
      }
    }
  }
  
  draw () {
    // draw the map, character, and cat
    this.mapImage.resize(width,0);
    image(this.mapImage,0,0);
    
    image(playerImage,this.playerX,this.playerY);
    
    this.catImage.resize(65,0);
    image(this.catImage,800,350);
    
    // draw the dialogue and set it to active if they haven't read it yet
    if (!mapIntroRead) {
      this.lines.draw();
      this.lines.active = true;
    } else if (gotAuthorized && !authLinesRead) {
      this.authLines.draw();
      this.authLines.active = true;
    } else if (gotFile && !this.endLines.done) {
      this.endLines.draw();
      this.endLines.active = true;
    }
  }
  
  collision () {
    // if they try to enter the human world before getting authorized
    if (this.playerX == 170 && !gotAuthorized) {
      this.denied(2);
    }
    
    // checks if they can enter the authorization zone after talking to the cat
    if (this.playerX > 270 && this.playerX + playerImage.width < 375 && this.playerY < 140 && this.playerY > 50 ) {
      if (talkedToCat) {
        gotAuthorized = true;
        mainSong.stop();
        changeScene('authorization',this.playerX,this.playerY); 
      } else {
        this.denied(1);
      }
    }
    
    // if they try to enter the human world after authorization
    if (this.playerX < 160 && this.playerY > 38 && this.playerY + playerImage.height < 150) {
      if (gotAuthorized) {
        mainSong.stop();
        changeScene('game',this.playerX,this.playerY);
      } else {
        this.denied(2);
      }
    }
    
    // collision zone for entering the animal world
    if (this.playerX < 800+this.catImage.width && this.playerX + playerImage.width > 800 && this.playerY < 350 + this.catImage.height && this.playerY + playerImage.height > 350) {
      mainSong.stop();
      changeScene('animalWorld',this.playerX,this.playery);
    }
  }
  
  // this function gives them hints about where to go if they enter an area they can't yet
  denied (num) {
    let padding = 20;
    fill(0,180);
    noStroke();
    rect(padding,height-padding-80,width-(2*padding),80,8);
    // text
    textAlign(CENTER, CENTER);
    textFont('monospace');
    textSize(16);
    fill(210);
    if (num == 1) {
      text("I think we need to talk to the cat first...",width/2,height-padding-40);
    } else if (num == 2) {
      text("You can't enter yet! Go to the authorization zone first...",width/2,height-padding-40);
    }
  }
  
  keyPressed () {
    if (this.lines.active) {
      this.lines.keyPressed();
    } else if (this.authLines.active) {
      this.authLines.keyPressed();
    } else if (this.endLines.active) {
      this.endLines.keyPressed();
    }
  }
}