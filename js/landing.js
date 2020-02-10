let navButtons = document.getElementsByClassName("nav-option");
let navOptions = []
for(let i=0;i<navButtons.length;i++) {
    navOptions.push(navButtons[i].dataset.optionname);
}

function openNewTabTo(link) {
    let li = document.createElement("a")
    li.href = link
    li.target = "_blank"
    li.click()
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
    openNewTabTo("https://github.com/g10ria")
})
mediaButtons[1].addEventListener("click", function () {
    openNewTabTo("https://www.linkedin.com/in/gloria-zhu-78a079155/")
})
mediaButtons[2].addEventListener("click", function() {
    openNewTabTo("https://www.instagram.com/_gloriazhu/")
})


document.getElementById("link-harker").addEventListener("click", function () {
    openNewTabTo("https://harker.org/")
})

document.getElementById("link-harkerdev").addEventListener("click", function() {
    openNewTabTo("https://dev.harker.org/")
})

document.getElementById("link-robotics").addEventListener("click", function () {
    openNewTabTo("https://robotics.harker.org/")
})

document.getElementById("link-roboticsstyleguide").addEventListener("click", function () {
    openNewTabTo("https://drive.google.com/file/d/1PZ_TNFjWFIxjQNMzdrw9erok3f5mJdxK/view?usp=sharing")
})

document.getElementById("link-github").addEventListener("click", function () {
    openNewTabTo("https://github.com/g10ria")
})

document.getElementById("link-limeade").addEventListener("click", function () {
    openNewTabTo("./pages/limeade.html")
})

let nav = document.getElementsByClassName("nav-container")[0]
let burger = document.getElementById("hamburger")
burger.addEventListener("click", function() {
    if (burger.classList.contains("rotated")) {
        burger.classList.remove("rotated")
    } else {
        burger.classList.add("rotated");
    }
    if (nav.classList.contains("appear")) {
        nav.classList.remove("appear")
    } else {
        nav.classList.add("appear")
    }
})