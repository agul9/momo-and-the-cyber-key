class AnimalScene {
  constructor () {
    // variables
    this.mapImages = [];
    this.landImages = [];
    this.oceanImages = [];
    this.insectImages = [];
    this.introLines = new Dialogue ([
      "Meow! You must be the human everyone’s whispering about.",
      "I’m Whisker Agent No. 3. But you can call me ‘Momo’.",
      "The humans are hiding a secret file called the Cyber Key.",
      "Inside it, there’s proof that the leader is hoarding food and resources.",
      "Bring it back to us, okay? We believe in you. Tiny paws up!"
    ]);
    this.endLines = new Dialogue ([
      "Meow! You're back! I was so worried you'd get caught.",
      "Did you… did you really get it? The Cyber Key?",
      "Let me see, oh whiskers… this is real. This is REALLY real.",
      "Inside this document… everything is here. All the proof.",
      "The leader, the food, the stolen resources… It's worse than we imagined.",
      "You did it, tiny human. You actually did it!"
    ]);
    this.extraLines = new Dialogue ([
      "Why are you back so soon? Go complete your mission!"
    ]);
    
  }
  
  preload () {
    //  Map
  this.mapImages[0] = loadImage('assets/animalScene/Landscape87.png');                  // map3
  this.mapImages[1] = loadImage('assets/animalScene/资源 5.png');                         // map2
  this.mapImages[2] = loadImage('assets/animalScene/Landscape elements (14).png');       // cloud
  this.mapImages[3] = loadImage ('assets/animalScene/Plant53-min.png'); // plants
  //this.mapImages[4] = loadImage ('assets/animalScene/Background20.jpg');

  // Land
  this.landImages[0] = loadImage('assets/animalScene/Animals (12).png');  
  this.landImages[1] = loadImage('assets/animalScene/Pyramid_1_-_Tall0003.png');
  this.landImages[2] = loadImage('assets/animalScene/Plant50.png'); 
  this.landImages[3] = loadImage('assets/animalScene/task_01k9fvc72aed58zke5nrn0xats_1762542468_img_1-removebg.png'); 
  this.landImages[4] = loadImage('assets/animalScene/Animal55.png'); 
  //this.landImages[5] = loadImage('assets/animalScene/Animal44.png'); 
  //this.landImages[6] = loadImage('assets/animalScene/bird 1-min.png'); 

  // Ocean
  this.oceanImages[0] = loadImage('assets/animalScene/Animal37-min.png'); 
  this.oceanImages[1] = loadImage('assets/animalScene/Cube_Rounded0003-min.png'); 
  this.oceanImages[2] = loadImage('assets/animalScene/water.png'); 
  this.oceanImages[3] = loadImage('assets/animalScene/fish 1-min.png'); 
  this.oceanImages[4] = loadImage('assets/animalScene/Animal57-min.png'); 

  //  Insects
  this.insectImages[0] = loadImage('assets/animalScene/Plant29.png'); 
  this.insectImages[1] = loadImage('assets/animalScene/Platonic_3_-_Icosa0003.png'); 
  this.insectImages[2] = loadImage('assets/animalScene/Animal81.png'); 
  this.insectImages[3] = loadImage('assets/animalScene/Plant23.png'); 
  this.insectImages[4] = loadImage('assets/animalScene/Insects (2).png'); 
  this.insectImages[5] = loadImage('assets/animalScene/Animal62.png'); 
  this.insectImages[6] = loadImage('assets/animalScene/Insects (19).png'); 
  }
  
  setup () {
    momoTalking.loop();
  }
  
  update () {
    
  }
  
  draw () {
  //  Map Layer
  image(this.mapImages[0], 0, 0, 960, 540);      // map3
  image(this.mapImages[1], 0, 60, 900, 400);       // map2
  image(this.mapImages[2], 0, 200, 300, 120);      // cloud left
  image(this.mapImages[2], 580, 200, 400, 220);    // cloud right
  image(this.mapImages[3], 0,350,400,220);
  //image(this.mapImages[4],0, 0, 1400, 1000);

  // Land Layer
  image(this.landImages[0], 140, 300, 120, 80);    // fox
  image(this.landImages[1], 260, 100, 450, 450);   // pyramid
  image(this.landImages[2], 200, 150, 180, 200);   // plant
  image(this.landImages[3], 350, 200, 250, 350);   // cat
  image(this.landImages[4], 360, 60, 300, 200);   // birds
  //image(this.landImages[5], 500, 230, 240, 260);   // deer
  //image(this.landImages[6], 540, 150, 120, 180);    // eagle


  // Ocean Layer
  image(this.oceanImages[0], 50, 60, 180, 180);    // fish1
  image(this.oceanImages[1], 20, 10, 270, 270);  // cube
  image(this.oceanImages[2], 30, 30, 180, 120);    // water
  image(this.oceanImages[3], 120, 70, 220, 220);    // fish2
  image(this.oceanImages[4], 140, -10, 260, 220);  // bird2


  // Insects Layer
  image(this.insectImages[0], 660, -30, 180, 200); // plant2
  image(this.insectImages[1], 600, -40, 350, 350); // platonic
  image(this.insectImages[2], 800, 60, 100, 120);   // frog
  image(this.insectImages[3], 700, 20, 120, 140);   // plant3
  image(this.insectImages[4], 680, 100, 100, 90);    // butterfly
  image(this.insectImages[5], 640, 30, 100, 90);    // insect1
  image(this.insectImages[6], 780, 160, 120, 90);  // insect2
    
  if (talkedToCat && !this.introLines.done) {
    this.introLines.done = true;
  }

  if (!talkedToCat) {
    this.introLines.draw();
    this.introLines.active = true;
    } else if (gotFile) {
      this.endLines.draw();
      this.endLines.active = true;
    } else {
      this.extraLines.draw();
      this.extraLines.active = true;
    }
  }
  
  keyPressed () {
    if (!talkedToCat && this.introLines.idx == this.introLines.lines.length-1 && keyCode === RIGHT_ARROW) {
      talkedToCat = true;
      momoTalking.stop();
      changeScene('map',710,350);
    }
    
    if (talkedToCat && (!gotFile || !gotAuthorized) && this.extraLines.idx == this.extraLines.lines.length-1 && keyCode === RIGHT_ARROW) {
      momoTalking.stop();
      changeScene('map',710,350);
    }
    
    if (talkedToCat && gotFile && this.endLines.idx == this.endLines.lines.length-1 && keyCode === RIGHT_ARROW) {
      momoTalking.stop();
      changeScene('ending',195,65); 
    }
    
    if (this.introLines.active) {
      this.introLines.keyPressed();
    } else if (this.endLines.active) {
      this.endLines.keyPressed();
    } else if (this.extraLines.active) {
      this.extraLines.keyPressed();
    }
    
  }
}