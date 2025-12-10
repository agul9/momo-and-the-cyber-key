class Dialogue {
  constructor (lines) {
    this.lines = lines;
    this.idx = 0;
    this.done = false;
    this.active = false;
    
  }
  
  preload () {
  }
  
  setup () {
    
  }
  
  update () {
    
  }
  
  draw () {
    // box
    let padding = 20;
    fill(0,180);
    noStroke();
    rect(padding,height-padding-80,width-(2*padding),80,8);
    
    // text
    textAlign(CENTER, CENTER);
    textFont('monospace');
    textSize(16);
    fill(210);
    text(this.lines[this.idx],width/2,height-padding-40);
    if (this.idx != 0) {
      text("← prev",padding+40,height-padding-15);
    }
    text("next →",width-padding-40,height-padding-15); 
  }
  
  keyPressed () {
    if (keyCode === RIGHT_ARROW && this.idx < this.lines.length) {
      if (this.idx == this.lines.length - 1) {
        this.done = true;
        this.active = false;
      } else {
        this.idx++;
      }
    }
    if (keyCode === LEFT_ARROW && this.idx > 0) {
      this.idx--;
    }
  }
}