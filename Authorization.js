class Authorization {
  constructor (playerX,playerY) {
    // variables
    this.playerX = playerX;
    this.playerY = playerY;
    
    this.video = null;
    this.faceMesh = null;
    this.faces = [];
    this.maskImg = loadImage('assets/makeup_mask.png');
    this.fingersImg = loadImage('assets/fingers.png');
    this.hospitalImg = loadImage('assets/hospital.png');
    

    this.lines = new Dialogue ([
      "Welcome, you’ve entered the monitor room", //idx = 0
      "Let’s see if your face is still beautiful.", //idx = 1
      "Press right arrow when you are ready.", //idx = 2
      "Loading", //idx = 3
      "You are UGLY!!!", //idx = 4
      "You have no choice but to get surgery done NOW!!!", //idx = 5
      "Loading", //idx = 6
      "Wow. So beautiful.", //idx = 7
      "You are now qualified to get food and resources here in our human world.", //idx = 8
      "Exit." //idx = 9
    ]);
    
    this.retryAuthLines = new Dialogue ([
      "Thanks for coming back, but you've already met your rations for today."
    ]);
  }
  
  preload() {
    let self = this; // need to reference 'this' in callback functions in classes

    this.faceMesh = ml5.faceMesh(function() {
        self.modelReady = true; // checks to make sure the ml5 model loaded, or else it will be null
        if (self.video) {
            self.startDetection();
        }
    });
}
  
  setup () {
    authoEnterSound.play();
    heartbeat.loop();
    
    this.video = createCapture(VIDEO);
    this.video.size(500,300);
    this.video.hide();
    
    if (this.modelReady) {
      this.startDetection();
    }
  }
  
  gotFaces(result) {
    this.faces = result;
  }  
  
  startDetection() {
    let self = this;
    this.faceMesh.detectStart(this.video, function(result) {
      self.gotFaces(result);
    });
  }
  
  update () {
  }
  
  draw () {
    // draw background image and video
    this.hospitalImg.resize(width,0);
    image(this.hospitalImg,0,0);
    image(this.video, 240, 90, 500, 300);
    
    if (!finAutho) {
      // draw the images based on the dialogue
      if (this.lines.idx == 4) {
        this.fingersImg.resize(width,0);
        image(this.fingersImg,0,0);
      } else if (this.lines.idx >= 7) {
        this.maskFrame();
      }

      // draw the dialogue
      this.lines.draw();
      if (!this.lines.done) {
        this.lines.active = true;
      }
    } else {
      this.retryAuthLines.draw();
      this.retryAuthLines.active = true;
      this.maskFrame();
    }
  }
  
  maskFrame () {
    if (this.faces.length > 0) {
      let face = this.faces[0];
      let keypoints = face.keypoints;
      
      // get hte keypoints of where the eyes end
      let leftEye = keypoints[33];
      let rightEye = keypoints[263];
      
      // used chatgpt for help with some math calculations
      let centerX = (leftEye.x + rightEye.x) / 2; // this finds the middle point of the face to get the x value
      let centerY = (leftEye.y + rightEye.y) / 2 + 10; // this finds the avg y position of the eyes to find the y value
      let eyeDist = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y); // finds the distance between the eyes to scale correctly

      let maskWidth = eyeDist * 1.7; // scale the width based on the eye distance
      let maskHeight = maskWidth * (this.maskImg.height / this.maskImg.width); // scale the height based on the width - times the width by the original aspect ratio

      // draw the image centered on the face
      imageMode(CENTER);
      image(this.maskImg, centerX+240, centerY+90, maskWidth, maskHeight);
      imageMode(CORNER);
  }
}
  
  keyPressed() {
    // clicking right at the end of the dialogue brings them back to the map
    if (!finAutho && this.lines.idx == this.lines.lines.length-1 && keyCode === RIGHT_ARROW) {
      finAutho = true;
      this.exit();
      changeScene('map',195,65);
    }
    
    if (finAutho && this.retryAuthLines.idx == this.retryAuthLines.lines.length-1 && keyCode === RIGHT_ARROW) {
      this.exit();
      changeScene('map',195,65);
    }
    
    if (this.lines.active) {
      this.lines.keyPressed();
    } else if (this.retryAuthLines.active) {
      this.retryAuthLines.keyPressed();
    }
  }
  
  // function to end sound loop immediately
  exit() {
    if (heartbeat.isPlaying()) {
      heartbeat.stop();
    }
  }
}
