let magicLevel = 0; 
let isBursting = false; 
let trail = [] //array
let starCount=0 //i want to use count to see when is the timing for the magic to happen. 
let magicStage=0; // i plan to have different stage, more star count add more elements to the food, step by step
let puffs=[];
let lastStage=0; 
let onFire=false;
let fireTimer=0;

function setup() {
  // make canvas as windowsize
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  // Adjusts the canvas if you shrink/expand the browser
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() { // will change this part to changing different cuisines, so it's like a magic chef. I don't like this blue aura but going to keep it for now
  magicLevel++;
  onFire=true;
  fireTimer=40;
  setTimeout(function() { 
    triggerMagicBurst();
  }, 1500); // for 1.5 sec
}

function triggerMagicBurst() {
  isBursting = true;
  // Disappear after 3 seconds
  setTimeout(function() {
    isBursting = false;
  }, 3000);
}

function draw() {
  background(10, 15, 30); // Deep blue
// only add stars if mouse is actually moving.
let moved=dist (mouseX,mouseY,pmouseX,pmouseY);
if (moved >2){
    let newStar={
        x:mouseX,
        y:mouseY,
        alpha:255,
        size: random(2,15)
    };
    trail.push(newStar);
    starCount++;
}
    if (trail.length>100) {
    trail.shift();
 }
  
//set up the logic

  if (starCount > 900) {
    magicStage = 7; // Chopsticks
  } else if (starCount > 800) {
    magicStage = 6; // Thai Iced Tea
  } else if (starCount > 650) {
    magicStage = 5; // STEAM (The new addition)
   } else if (starCount>550){
    magicStage=4; //meat/tofu
  } else if (starCount > 450) {
    magicStage =3; // Veggies
  } else if (starCount > 300) {
    magicStage = 2; // Noodles
  } else if (starCount > 200) {
    magicStage = 1; // Bowl
  }
    if (magicStage>lastStage){
        triggerPuff();
        lastStage=magicStage;
    }
drawTrail();
drawPuffs();
  
  if (magicStage > 0) {
    let hover = sin(frameCount * 0.05) * 10;
    drawThaiFood(width / 4, height / 4 + hover, magicStage); 
  }

  // Draw the matchstick at cursor
  drawMatch(mouseX, mouseY);
drawFlame(mouseX,mouseY);

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
    fill(255, 255, 255, p.alpha);
    drawStar(p.x,p.y,pulse/2,pulse,5); //change to star from circle
  }
}

function drawStar (x,y,r1,r2,npoints){
    let angle=TWO_PI/npoints;
    let halfAngle=angle/2;
    beginShape();
    for (let a=0; a<TWO_PI; a+=angle){
        let sx=x+cos(a)*r2;
        let sy=y+sin(a)*r2;
        vertex(sx,sy);
        sx=x+cos(a+halfAngle)*r1;
        sy=y+sin(a+halfAngle)*r1;
        vertex(sx,sy);
    }
    endShape(CLOSE);
}


function drawMatch(x, y) {
  push();
  translate(x, y);
  if (onFire){
    rotate(radians(60)); //when on fire, tilted
  }else{
    rotate(radians(30)); //normal
  }
  stroke(270, 225, 125);
  strokeWeight(8);
  line(0, 0, 0, 80); // The stick

  noStroke();
  fill(255, 100, 0); 
  ellipse(0, 0, 18, 20); // The head
  pop();
}

function drawMagicalAura() {
  noStroke();
  fill(0, 200, 255, 50); // Semi-transparent blue
  circle(mouseX, mouseY, 100);
}

function triggerPuff(){
    for (let i = 0; i<6; i++){
        puffs.push({
            x:width/2,
            y:height/2,
            size:random(80,200),
            alpha: 150,
            dx:random(-2,2), // let them dirft sideways
            dy: random(-3,-1) //up and down
        });
    }
}

function drawPuffs(){
    noStroke();
    for (let i = puffs.length-1; i>=0; i--){
        let p=puffs[i];
        fill(200,200,200,p.alpha);
        circle(p.x,p.y,p.size);
        p.x+=p.dx;
        p.y+=p.dy;
        p.alpha-=3;
        p.size+=1;
        if (p.alpha<=0){
            puffs.splice(i,1); //will disappear when they go invisible
        }
    }
}

function drawFlame(x,y){
    if (!onFire)return; //only draw flame if its onfire
    push();
    translate(x,y);
    rotate(radians(60)); 
    noStroke();
    fill(255,80,0,fireTimer*4);
    ellipse(0,-20,35,55); //inner flame
    fill(255,200,0,fireTimer*5);
    ellipse(0,-28,22,38);
    fill(255,255,200,fireTimer*6);
    ellipse(0,-38,12,22); 

    pop();

    fireTimer--; //count down 
    if(fireTimer<=0){
        onFire=false;
    }
}

function drawThaiFood(x,y,stage){
    push()
    scale (2);
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
      curveVertex(x1 + random(-5,5), yStrand);  //random position assign within the given range so will have a vibrating effect. reference found using the online vocabulary
      curveVertex(0 + random(-2,2), yStrand + random(-2,2)); 
      curveVertex(x2 + random(-7,7), yStrand); 
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
    square(0, 10, 18);
    square(5, -15, 15);
     square(20, 15, 19);
     square(15, 5, 18);
  }
  //stage 5 the steam
  if (stage>=5){
    stroke(255,255,255,80);
    strokeWeight(2);
    noFill();

    for (let s =0; s<3; s++){
    let xOffset = -40+(s*40);
    //googled how to create left and right movement 
    let steam = sin(frameCount*0.05+s)*10;
beginShape();
curveVertex(xOffset + steam, -30); 
      curveVertex(xOffset + steam, -40);
      curveVertex(xOffset - steam, -70); 
      curveVertex(xOffset + steam, -100); 
      curveVertex(xOffset, -110); // End
      endShape();
  }
}
  noStroke();

  //stage 6 the beverage
  if (stage >= 6) {
    fill(255, 220, 180, 180);
    noStroke();
    rect(150, -80, 80, 140, 5);
    fill(255, 140, 0);
    rect(156, -50, 68, 95, 2);
    fill(255, 255, 255, 200); 
    rect(156, -75, 68, 30, 2);
    stroke (220,80,80);
    strokeWeight(5);
    line(150,-120,140,40);
    noStroke(); //straw
  }

  //stage 7 chopsticks
  if (stage>=7){
    stroke(80, 50, 20); 
    strokeWeight(5);
    line(-70, -30, 70, -80);
    line(-60, -45, 80, -90);
  }
  pop();
}