class Guards {
  constructor (rightEdge, leftEdge, bottomEdge, topEdge) {
    this.rightEdge = rightEdge;
    this.leftEdge = leftEdge;
    this.bottomEdge = bottomEdge;
    this.topEdge = topEdge;
    
    this.guardImage = loadImage('assets/placeholderGuard.png');
    this.guardImage.resize(70,0);
    
    this.guardX = random(this.leftEdge, this.rightEdge-this.guardImage.width);
    this.guardY = random(this.topEdge, this.bottomEdge-this.guardImage.height);
    this.guardSpeed = 3;
    this.guardDirection = int(random(4)); // move right for 0, left for 1, up for 2, down for 3
  }
  
  draw () {
    this.guardImage.resize(70,0);
    image(this.guardImage,this.guardX,this.guardY);
  }
  
  move () {
    if (random(1) < 0.01) {   // randomly change directions
      this.guardDirection = int(random(4));
    }
    
    if (this.guardDirection == 0) {
      if (this.guardX + this.guardImage.width < this.rightEdge) {
        this.guardX += this.guardSpeed;
      } else {
        this.guardDirection = random([1, 2, 3]);
      }
    } else if (this.guardDirection == 1) {
      if (this.guardX > this.leftEdge) {
        this.guardX -= this.guardSpeed;
      } else {
        this.guardDirection = random([0, 2, 3]);
      }
    } else if (this.guardDirection == 2) {
      if (this.guardY > this.topEdge) {
        this.guardY -= this.guardSpeed;
      } else {
        this.guardDirection = random([0, 1, 3]);
      }
    } else if (this.guardDirection == 3) {
      if (this.guardY + this.guardImage.height < this.bottomEdge) {
        this.guardY += this.guardSpeed;
      } else {
        this.guardDirection = random([0, 1, 2]);
      }
    }
  }
}