// ---------------------------- DIMENSIONS
let windowWidth;    // 1707 on this laptop
let windowHeight;   // 898 on this laptop

let oldX = -1
let oldY = -1

function setup() {
    setAndCalculateDimensions();
    // Create canvas
    createCanvas(windowWidth, windowHeight);
    stroke("#7689dbff")
    fill("#5d73d4")
}

const strokeMin = 1
const strokeScale = 10

const maxVel = 5
const threshold = 0.1

const easing = 0.1

function draw() {
    background(255,255,255,10);

    let newX = (mouseX-oldX) * easing + oldX
    let newY = (mouseY-oldY) * easing + oldY
    // set magnitude
    let dx = newX - oldX 
    let dy = newY - oldY
    let v = sqrt(dx * dx + dy * dy)
    let widthTemp = strokeScale * (1-v/maxVel)
    let clippedWidth = max(widthTemp, strokeMin)
    
    strokeWeight(clippedWidth)

    if (oldX != -1 && oldX != 0) {
        if (v >= threshold) {
            line(oldX, oldY, mouseX, mouseY)
        }
    }

    if (oldX <= 3) {
        oldX = mouseX
        oldY = mouseY
    } else {
        oldX = newX 
        oldY = newY
    }
}

function mouseClicked() {
    background(255, 255, 255, 255)
}

function windowResized() {
    setAndCalculateDimensions();
    resizeCanvas(windowWidth, windowHeight);
}

function setAndCalculateDimensions() {
    windowWidth = window.windowWidth;
    windowHeight = window.windowHeight;
}