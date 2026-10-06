// ---------------------------- DIMENSIONS
let windowWidth;    // 1707 on this laptop
let windowHeight;   // 898 on this laptop

let oldX = -1
let oldY = -1

// how visible the mouse trail is, 0-255 (lower = fainter)
const TRAIL_ALPHA = 28

// canvas background follows --bg from styles/theme.css
let bgRGB = [255, 255, 255]

function setup() {
    bgRGB = color(getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()).levels

    setAndCalculateDimensions();
    // Create canvas
    createCanvas(windowWidth, windowHeight);
    stroke(190, 213, 232, TRAIL_ALPHA)
    fill("#afc2d4")
}

const strokeMin = 1
const strokeScale = 10

const maxVel = 5
const threshold = 0.1

const easing = 0.1

function draw() {
    background(bgRGB[0], bgRGB[1], bgRGB[2], 10);

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

// clears the canvas on click (disabled)
// function mouseClicked() {
//     background(bgRGB[0], bgRGB[1], bgRGB[2], 255)
// }

function windowResized() {
    setAndCalculateDimensions();
    resizeCanvas(windowWidth, windowHeight);
}

function setAndCalculateDimensions() {
    windowWidth = window.windowWidth;
    windowHeight = window.windowHeight;
}