class Ending {
  constructor () {
    this.endingImage = loadImage('assets/endingImage.png');
    this.endLines = new Dialogue ([
      "Because of you, everything has changed.",
      "You stepped into danger, dodged those cranky guards, and found the truth.",
      "Now there's a new leader, who truly understand everyone from two worlds.",
      "The new leader has agreed to work with both the animals and the humans to create a better world.",
      "Now everyone is free because of you.",
      "You’re our human hero!"
    ]);
  }
  
  preload () {
  }
  
  setup () {
    endMusic.loop();
  }
  
  update () {
  }
  
  draw () {
    // draw background image
    imageMode(CENTER);
    this.endingImage.resize(960,0);
    image(this.endingImage,width/2,height/2);
    imageMode(CORNER);
    
    
    // draw the dialogue if the user hasn't read it yet
    if (!this.endLines.done) {
      this.endLines.draw();
      this.endLines.active = true;
      
      textAlign(CENTER, CENTER);
      textFont('monospace');
      textSize(40);
      fill('rgb(206,40,138)');
      strokeWeight(2);
      stroke('white');
      text('1 year later...',width/2,70);
    }
    else {
      textAlign(CENTER, CENTER);
      textFont('monospace');
      textSize(40);
      fill('rgb(206,40,138)');
      strokeWeight(2);
      stroke('white');
      text('The End',width/2,70);
    }
  }
  
  keyPressed () {
    if (this.endLines.active) {
      this.endLines.keyPressed();
    }
  }
}