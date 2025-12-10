class GameScene {
  constructor () {
    this.gameSceneImage = loadImage('assets/office.png');
    
    // variables for border
    // need to keep movement within these map bounds
    this.leftEdgeX = 20;
    this.rightEdgeX = width - 20;
    this.topEdgeY = 20;
    this.bottomEdgeY = height - 20;
    this.wallEdgeY = 150;
    
    this.guards = [];
    this.guardsCount = 5;
    this.files = [];
    this.fileImage = null;
    this.correctFile = int(random(2)); // randomly pick a file to be the correct one
    
    this.playerX = 160;
    this.playerY = 450;
    this.playerSpeed = 5;
    
    this.lost = false;
    this.lostImage = loadImage('assets/lose.png');
    this.won = false;
    this.wonImage = loadImage('assets/win.png')

    this.lines = new Dialogue ([
      "You’ve made it inside the Human Facility.",
      "Somewhere in here, the Cyber Key is hidden among fake documents.",
      "But be careful… the guards are patrolling everywhere.",
      "Touch the correct document to claim it.",
      "And whatever you do… don’t let the guards catch you.",
    ]);
  }
  
  preload () {
    this.fileImage = loadImage('assets/file.png');
  }
  
  setup () {
    gameSong.loop(); 
    
    this.fileImage.resize(60, 0);
    for (let i = 0; i < this.guardsCount; i++) {
      this.guards.push(new Guards(this.rightEdgeX, this.leftEdgeX, this.bottomEdgeY, this.topEdgeY));
    }
    
    for (let i = 0; i < 3; i++) {
      this.files.push({
        image: this.fileImage,
        x: random(this.leftEdgeX, this.rightEdgeX-this.fileImage.width),
        y: random(this.topEdgeY, this.bottomEdgeY-this.fileImage.height)
      });
    }
  }
  
  update () {
    if (this.lines.done && !this.lost && !this.won) {
      this.collision();
    
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
        if (this.playerX + playerImage.width < this.rightEdgeX) {
          this.playerX += this.playerSpeed;
        }
      } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
        if (this.playerX > this.leftEdgeX) {
          this.playerX -= this.playerSpeed;
        }
      } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
        if (this.playerY > this.topEdgeY) {
          this.playerY -= this.playerSpeed;
        }
      } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
        if (this.playerY + playerImage.height < this.bottomEdgeY) {
          this.playerY += this.playerSpeed;
        }
      } 
    }
  }
  
  draw () {
    // draw background + character
    this.gameSceneImage.resize(960,0);
    image(this.gameSceneImage,0,0);
    image(playerImage,this.playerX,this.playerY);
    
    // draw the guards
    for (let i = 0; i < this.guardsCount; i++) {
      this.guards[i].draw();
    }
    
    // draw the files
    for (let i = 0; i < this.files.length; i++) {
      this.files[i].image.resize(60, 0);
      image(this.files[i].image,this.files[i].x,this.files[i].y);
    }
  
    // draw either the instructions, guards moving, or the lose/win screen
    if (!this.lines.done) {
      // draw the instructions if they haven't read them yet
      this.lines.draw();
      this.lines.active = true;
    } else if (this.lines.done && !this.lost && !this.won) {
      // move the guards when the game is active
      for (let i = 0; i < this.guardsCount; i++) {
        this.guards[i].move();
      }
    } else if (this.lines.done && this.lost) {
      // draw the you lose pop up
      this.lostImage.resize(400,0);
      imageMode(CENTER);
      image(this.lostImage,width/2,height/2);
      imageMode(CORNER);
    } else if (this.lines.done && this.won) {
      // draw the you won pop up
      this.wonImage.resize(400,0);
      imageMode(CENTER);
      image(this.wonImage,width/2,height/2);
      imageMode(CORNER);
    }
  }
  
  collision () {
    // collide with the files
    for (let i = 0; i < this.files.length; i++) {
      if (this.collidesWithPlayer(this.files[i].x,this.files[i].y,this.files[i].image.width,this.files[i].image.height)) {
        if (i == this.correctFile) {
          winSound.play();
          this.won = true;
        } else {
          this.wrongFilePopUp();
        }
      }
    }
    
    // collide with guards
    for (let i = 0; i < this.guards.length; i++) {
      if (this.collidesWithPlayer(this.guards[i].guardX, this.guards[i].guardY, this.guards[i].guardImage.width, this.guards[i].guardImage.height)) {
        loseSound.play();
        this.lost = true;
      }
    }
  }
  
  collidesWithPlayer (x,y,w,h) {
    if (this.playerX < x + w && this.playerX + playerImage.width > x && this.playerY < y + h && this.playerY + playerImage.height > y) {
      return true;
    } else {
      return false;
    }
  }
  
  wrongFilePopUp () {
    let padding = 20;
    fill(0,180);
    noStroke();
    rectMode(CENTER);
    rect(width/2,height-padding-40,200,80,8);
    // text
    textAlign(CENTER, CENTER);
    textFont('monospace');
    textSize(16);
    fill(210);
    text("It's a fake!",width/2,height-padding-40);
    rectMode(CORNER); // reset for the other rects in the game
  }
  
  resetPos (idx,whichOne,w,h) {
    let safe = false;
    
    while(!safe) {
      let newX = random(this.leftEdgeX, this.rightEdgeX-w);
      let newY = random(this.topEdgeY, this.bottomEdgeY-h);
    
      if (!this.collidesWithPlayer(newX,newY,w,h)) {
        if (whichOne == 1) {
          this.guards[idx].guardX = newX;
          this.guards[idx].guardY = newY;
        } else {
          this.files[idx].x = newX;
          this.files[idx].y = newY;
        }
        safe = true;
      }  
    }
  }
  
  keyPressed () {
    if (this.lines.active) {
      this.lines.keyPressed();
    } else if (key === ' ' && this.lost == true) {
      // if they press space on the you lose screen they can play again
      // have the guards change pos, change the file pos, and reassign which is the correct file
      this.lost = false; // rest the lost variable
      
      // reset the player
      this.playerX = 160;
      this.playerY = 450;
      
      //reset the guards
      for (let i = 0; i < this.guardsCount; i++) {
        this.resetPos(i,1,this.guards[i].guardImage.width,this.guards[i].guardImage.height);
      }
      
      // reset the files
      for (let i = 0; i < this.files.length; i++) {
        this.resetPos(i,2,this.fileImage.width,this.fileImage.height);
      }
      this.correctFile = int(random(2));
      
    } else if (key === ' ' && this.won == true) {
      // if they win they can go to the ending scene
      gotFile = true;
      gameSong.stop();
      changeScene('map',195,65);
    }
  }
}