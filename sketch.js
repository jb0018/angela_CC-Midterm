let magicLevel = 0; 
let isBursting = false; 
let trail = [] //array
let starCount=0 //i want to use count to see when is the timing for the magic to happen. 
let magicStage=0; // i plan to have different stage, more star count add more elements to the food, step by step

function setup() {
  // make canvas as windowsize
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adjusts the canvas if you shrink/expand the browser
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() { // will change this part to changing different cuisines, so it's like a magic chef.
  magicLevel++;
  console.log("Match struck!");
  // Delay effect
  setTimeout(function() {
    triggerMagicBurst();
  }, 1500); // for 1.5 sec
}

function triggerMagicBurst() {
  isBursting = true;
  console.log("The magic manifested!");
  // Disappear after 3 seconds
  setTimeout(function() {
    isBursting = false;
  }, 3000);
}

function draw() {
  background(10, 15, 30); // Deep blue
// added the star count, only if it reaches certian count, let the magic happen
    let newStar={
        x:mouseX,
        y:mouseY,
        alpha:255,
        size: random(2,15)
    };
    trail.push(newStar);
    starCount++;

    if (trail.length>100) {
    trail.shift();
    }
  
//set up the logic

  if (starCount>650){
    magicStage=4; //meat/tofu
  } else if (starCount > 500) {
    magicStage =3; // Veggies
  } else if (starCount > 350) {
    magicStage = 2; // Noodles
  } else if (starCount > 200) {
    magicStage = 1; // Bowl
  }
drawTrail();
  
  if (magicStage > 0) {
    let hover = sin(frameCount * 0.05) * 10;
    drawThaiFood(width / 2, height / 2 + hover, magicStage); 
  }

  // Draw the matchstick at cursor
  drawMatch(mouseX, mouseY);

  // Draw the blue aura if isBursting is true
  if (isBursting) {
    drawMagicalAura();
  }
}

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    // Make older stars fade out and get smaller
    p.alpha -= 5; 
    let pulse=p.size*(p.alpha/255);
    noStroke();
    fill(255, 200, 50, p.alpha);
    circle(p.x,p.y,pulse);
  }
}

function drawMatch(x, y) {
  push();
  translate(x, y);
  stroke(250, 200, 125);
  strokeWeight(4);
  line(0, 0, 0, 40); // The stick
  
  noStroke();
  fill(255, 100, 0); 
  ellipse(0, 0, 12, 14); // The head
  pop();
}

function drawMagicalAura() {
  noStroke();
  fill(0, 200, 255, 50); // Semi-transparent blue
  circle(mouseX, mouseY, 100);
}

function drawThaiFood(x,y,stage){
    push()
    translate(x,y);
//stage 1
if (stage >= 1) {
    fill(200, 50, 50); // Bright Red Bowl
    noStroke();
    arc(0, 0, 240, 170, 0, PI, CHORD);
  }
  //stage 2
  if (stage >= 2) {
   stroke(255, 200, 100); 
    strokeWeight(2);
    noFill();
    for (let i = 0; i < 20; i++) {
      let x1 = -90; 
      let x2 = 90;
      let yStrand = map(i, 0, 19, -30, 10);
      beginShape();
      // Using curves instead for the shape
      curveVertex(x1, yStrand - 20);
      curveVertex(x1 + random(-5,5), yStrand); 
      curveVertex(0 + random(-10,10), yStrand + random(-10,10)); 
      curveVertex(x2 + random(-5,5), yStrand); 
      curveVertex(x2, yStrand - 20); 
      endShape();
    }
  }
  noStroke();
  
//stage 3
  if (stage >= 3) {
    fill(50, 150, 50); // Fresh Green
    circle(-20, -5, 15);
    circle(10, -10, 10);
    circle(30, 5, 12);
    circle(14, 2, 8);
    circle(20, 10, 10);
    circle(-20, -5, 20);
  }
  //stage 4 tofu/meat
  if (stage >= 4) {
    fill(230, 170, 150); // Tofu color
    rectMode(CENTER);
    square(-10, 5, 20);
    square(25, 10, 18);
    square(5, -15, 15);
     square(20, 15, 19);
     square(15, 5, 18);
  }
  pop();
}