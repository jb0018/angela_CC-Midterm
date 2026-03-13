let magicLevel = 0; 
let isBursting = false; // Tracks if the magic is happening

function mouseClicked() {
  magicLevel++;
  
  // 1.The match glows brighter
  console.log("Match struck!");

  // 2. Delayed Action, maybe around 1.5s trigger the burst
  setTimeout(function() {
    triggerMagicBurst();
  }, 1500);
}

function triggerMagicBurst() {
  isBursting = true;
  console.log("The magic manifested!");
  
  // let the burst disappear
  setTimeout(function() {
    isBursting = false;
  }, 3000);
}

 function draw() {
  background(10, 15, 30);

  // --- DRAW THE MATCH as cursor ---
  drawMatch(mouseX, mouseY);

  // --- draw the delayed effect ---
  if (isBursting) {
    drawMagicalAura();
  }
}

