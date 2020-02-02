let navButtons = document.getElementsByClassName("nav-option");
let navOptions = []
for(let i=0;i<navButtons.length;i++) {
    navOptions.push(navButtons[i].dataset.optionname);
}

for(let i=0;i<navButtons.length;i++) {
    navButtons[i].addEventListener("click", function() {
        window.location.href = `./pages/${navOptions[i]}.html`
    })
    navButtons[i].addEventListener("mouseenter", function() {
        navButtons[i].children[0].classList.add("arrow-appear")
    })
    navButtons[i].addEventListener("mouseleave", function () {
        navButtons[i].children[0].classList.remove("arrow-appear")
    })
}

let mediaButtons = document.getElementsByClassName("media-icon")
// gotta hardcode :(
mediaButtons[0].addEventListener("click", function() {
    window.location.href = "https://github.com/g10ria";
})
mediaButtons[1].addEventListener("click", function () {
    window.location.href = "https://www.linkedin.com/in/gloria-zhu-78a079155/"
})
mediaButtons[2].addEventListener("click", function() {
    window.location.href = "https://www.instagram.com/_gloriazhu/"
})