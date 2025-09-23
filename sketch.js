//something more than sustenance
//by anita solak
//sustenance = food is care, memory, intimacy, nostalgia
//sustenance += connection as nourishment
//all code is based on p5.js references, many a google search &
//learnt while watching the coding train youtube playlists on p5.js,
//from Allison Parrish's post on Text and type at https://creative-coding.decontextualize.com/text-and-type/
//& examples in the p5js editor & Glitch

/* globals loadStrings loadSound log radians rotateY texture mouseIsPressed copyTouch handleStart handleMove bg touches createVideo bgLoad cursor loadImage createImage image createGraphics pixelDensity Hammer myHammer handlePan myElement myOptions cursor rectMode rect p5 showGlossary createCanvas windowWidth windowHeight height mouseX mouseY textFont random width background fill textSize textAlign LEFT RIGHT CENTER text mouseIsPressed createButton */

//variables
var bubbles = [];
var y = [];
var x = [];
var foodLines;
var moreLines;
var poem;
var words = [];
var wordFall = setInterval(makeWord, 100);
var poemWords = [
  "food",
  "ppl",
  "remember",
  "cauliflower",
  "ingredients",
  "taste",
  "whole",
  "soup",
  "warm",
  "garlic",
  "kafa",
  "feed",
  "rot",
  "share",
  "komšija",
  "eat",
  "friend",
  "time",
  "wanted",
  "baba",
  "mama",
  "tata",
  "tetka",
  "teco",
  "rodjak",
  "rodica",
  "love",
  "meal",
  "bread",
  "eggs",
  "jaje",
  "jelo",
  "learning",
  "ask",
  "baby",
  "vatra",
  "Bosnia",
  "sestra",
  "tomatoes",
  "paradajz",
  "cook",
  "miss",
  "salt",
  "zajedno",
  "together",
];
var button;
var playTest = false;
let pos = 100;
let bg;
//let img;
var blur;
var R, G, B;
var restartText;

function preload() {
  foodLines = loadStrings("food.txt");
  moreLines = loadStrings("more.txt");
  poem = loadSound(
    "Boiling.m4a"
  );
  bg = loadImage(
    "IMG_1936.PNG"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //poem.setVolume(1);
  pixelDensity(1);
  blur = createGraphics(windowWidth, windowHeight);
  blur.clear();
  // scrollPoem();
  resetPoem();
  playPoem();
  pausePoem();
}

function mouseDragged() {
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
  return false;
}

function draw() {
  background(bg);
  showResetButton();
  showPlayButton();
  showPauseButton();
  
  fill(255);
  textSize(25);
  text('LEFT 4 SLOW', 10, 400);
  text('RIGHT 4 FAST', width - 170, 400);

  cursor(
    "2426-24x24x32.png"
  );

  for (var w = words.length - 1; w >= 0; w--) {
    words[w].display();
    words[w].move();
    //  if (words[w].isOffScreen()) {
    // words.splice(w, 1);
    //  }
  }

  for (var i = 0; i < moreLines.length; i++) {
    var shake = 0;
    if (mouseIsPressed) {
      shake = random(-10, 50);
      R = random(100, 255);
      G = random(100, 255);
      B = random(100, 255);
      fill(R, G, B);
    }
    blur.fill(R, G, B, 10);
    blur.textAlign(LEFT);
    blur.textSize(35);
    blur.textFont("Garamond");
    //blur.text(moreLines[i], x, 200 + i * 20);
    // blur/text(moreLines[i], 0, 0);
    blur.text(moreLines[i], 350 + i + shake, pos + i * 20 + shake);
  }
  for (var i = 0; i < moreLines.length; i++) {
    blur.fill(245, 222, 179, 10);
    blur.textAlign(LEFT);
    blur.textSize(25);
    //blur.text(moreLines[i], x, 200 + i * 20);
    // blur/text(moreLines[i], 0, 0);
    blur.text(moreLines[i], 350, y + i * 20);
  }
  image(blur, 0, 0);

  // for (var t = 0; t < touches.length; t++) {
  for (var i = 0; i < foodLines.length; i++) {
    //if (mouseX > 200) {
    y = y - (mouseX / 1500) * 0.1;

    //  var shake = 0;
    //  if (mouseIsPressed) {
    //   shake = random(-10, 50);
    // R = random(100, 255);
    //G = random(100, 255);
    //B = random(100, 255);
    //fill(R, G, B);
    // }

    // fill(128 + i * 10);
    // fill(150, 100, 50);
    // fill(R, G, B);
    textFont("Garamond");
    textAlign(LEFT);
    text(foodLines[i], 400 + shake, y + i * 20 + shake);
    //text(foodLines[i], 100 + i + shake, pos + i * 20 + shake);
  }
  // }

  for (let bubble of bubbles) {
    bubble.move();
    bubble.show();
  }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

function mouseWheel(event) {
  print(event.delta);
  // move the poem according to the vertical scroll amount
  pos -= event.delta;
  //uncomment to block page scrolling
  return false;
}

function makeWord() {
  words.push(new Word());
  console.log(words.length);
}

class Word {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.speed = 1;
    this.l = random(poemWords);
  }

  move() {
    this.y += this.speed;
  }
  display() {
    fill(100, 20, 50);
    text(this.l, this.x, this.y);
  }
  isOffScreen() {
    if (this.y > height) {
      return true;
    }
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    fill(100, 20, 50);
    text("sustain", this.x, this.y, this.r * 2);
  }
}

function showPlayButton() {
  button = createButton("read 4 me pls");
  //button.position(width - 250, 10, 65);
  button.position(10, 150);

  button.style("background-color", "transparent");
  button.style("color", "rgb(255, 255, 255)");
  button.style("font-size", "30pt");

  button.style("border", "1px solid #326464");
  button.style("border-radius", "5px");
  button.mousePressed(playPoem);
}

function playPoem() {
  poem.play();
  poem.setVolume(0.3);
}

function showPauseButton() {
  button = createButton("pause reading pls");
  //button.position(width - 250, 10, 65);
  button.position(10, 200);

  button.style("background-color", "transparent");
  button.style("color", "rgb(255, 255, 255)");
  button.style("font-size", "30pt");

  button.style("border", "1px solid #326464");
  button.style("border-radius", "5px");
  button.mousePressed(pausePoem);
}

function pausePoem() {
  poem.pause();
}

function showResetButton() {
  button = createButton("back 2 beginning pls");
  //button.position(width - 250, 160, 65);
  button.position(10, 100);

  button.style("background-color", "transparent");
  button.style("color", "rgb(255, 255, 255)");
  button.style("font-size", "30pt");

  button.style("border", "1px solid #326464");
  button.style("border-radius", "5px");
  button.mousePressed(resetPoem);
}

function resetPoem() {
  y = 0;
}
