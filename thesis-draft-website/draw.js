// ---------------------------- DIMENSIONS
let windowWidth;    // 1707 on this laptop
let windowHeight;   // 898 on this laptop

let grid_size = 30

const enable_cycle = false
const cycle = 30
let cycle_idx = 0

function setup() {
    setAndCalculateDimensions();
    // Create canvas
    createCanvas(windowWidth, windowHeight);
    // stroke("#7689dbff")
    // fill("#5d73d4")

    stroke("white")
    fill("gray")
}

function draw() {
    clear()

    if (enable_cycle) {
        cycle_idx++
        if (cycle_idx == cycle) {
            cycle_idx = 0
            grid_size = int(random() * 40) + 20
        }
    }

    noStroke()
    fill(130, 130, 130, 50)

    let nearestX = mouseX - mouseX % grid_size
    let nearestY = mouseY - mouseY % grid_size

    rect(nearestX, nearestY, grid_size, grid_size)
}
function windowResized() {
    setAndCalculateDimensions();
    resizeCanvas(windowWidth, windowHeight);
}

function setAndCalculateDimensions() {
    windowWidth = window.windowWidth;
    windowHeight = window.windowHeight;
}