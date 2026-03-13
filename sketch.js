function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30); // Dark grey
  fill(0, 255, 150); // Teal green
  noStroke();
  circle(mouseX, mouseY, 50);
}