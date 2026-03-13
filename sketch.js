let magicLevel = 0; 
let isBursting = false; 
let trail = [] //array

function setup() {
  // make canvas as windowsize
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adjusts the canvas if you shrink/expand the browser
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  magicLevel++;
  console.log("Match struck!");

  // Delay effect
  setTimeout(function() {
    triggerMagicBurst();
  }, 1500);
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

  // DRAW THE MATCH
  drawMatch(mouseX, mouseY);

  // DRAW THE DELAYED EFFECT
  if (isBursting) {
    drawMagicalAura();
  }
}
let newStar = {
    x: mouseX,
    y: mouseY,
    size: random(2, 15),
    alpha: 255 // Starts fully visible
  };
  trail.push(newStar);

  // limit the trail length (keep only the last 40 stars)
  if (trail.length > 40) {
    trail.shift(); 
  }

  // the trail
  drawTrail();

  drawMatch(mouseX, mouseY);

  if (isBursting) {
    drawMagicalAura();
  }


function drawTrail() {
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    
    // Make older stars fade out and get smaller
    p.alpha -= 5; 
    
    fill(255, 255, 150, p.alpha); // Pale yellow "Star" color
    
    //  "twinkling" star
    push();
    translate(p.x, p.y);
    // Complexity: making them flicker
    circle(0, 0, p.size + random(-1, 1)); 
    pop();
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

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    
    p.alpha -= 5; 
    let pulse = p.size * (p.alpha / 255); 
    
    fill(255, 230, 150, p.alpha);
  }
}

function draw() {
  background(10, 15, 30);

  // save the mouse position into the trail
  let newStar = {
    x: mouseX,
    y: mouseY,
    alpha: 255,
    size: random(2, 15)
  };
  trail.push(newStar);

  // set limit
  if (trail.length > 50) {
    trail.shift();
  }

  drawTrail();

  drawMatch(mouseX, mouseY);

  if (isBursting) {
    drawMagicalAura();
  }
}

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    
    // Fade out over time
    p.alpha -= 5; 

    noStroke();
    
    let pulse = p.size * (p.alpha / 255); 
    

    fill(255, 200, 50, p.alpha); 

    circle(p.x, p.y, pulse); 
  }
}