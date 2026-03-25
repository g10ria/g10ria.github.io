let details_open = false 

var expander = document.getElementById("expand-collapse")
var detailsElementsQuery = document.querySelectorAll('details');
const detailsElements = Array.from(detailsElementsQuery);
detailsElements.shift(); // Removes the first element

const expandText = "[Expand All]"
const collapseText = "[Collapse All]"

expander.addEventListener('click', (e) => {
    if (expander.innerText == expandText) {
        detailsElements.forEach(el => {
            el.open = true
        })
        expander.innerText = collapseText
    } else {
        detailsElements.forEach(el => {
            el.open = false
        })
        expander.innerText = expandText
    }
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkIfNoneOpen() {
    let noneOpen = true
    detailsElements.forEach(el2 => {
        if (el2.open) {
            noneOpen = false
        }
    })
    return noneOpen
}

console.log(expander)
console.log(detailsElements)
detailsElements.forEach(el => {
    el.addEventListener('click', async () => {
        await delay(30) // let the DOM resolve first
        if (checkIfNoneOpen()) {
            expander.innerText = expandText
        } else {
            expander.innerText = collapseText
        }
    })
})

function toggleAllDetails(isOpen) {
    
    detailsElements.forEach(element => {
        element.open = isOpen;
    });
}