document.getElementById("backarrow").addEventListener("click", function () {
    document.body.classList.remove("loaded")
    setTimeout(function () {
        window.location.href = "../"
    }, 500)
})

function openNewTabTo(link) {
    let li = document.createElement("a")
    li.href = link
    li.target = "_blank"
    li.click()
}

document.getElementById("copyright-link").addEventListener("click", function () {
    openNewTabTo("https://github.com/g10ria/g10ria.github.io")
})

let links = document.getElementsByClassName("contact")
/**
 * ORDER:
 * email, github, instagram1, instagram2, linkedin, discord, youtube
 */
const destinations = [
    "",
    "https://github.com/g10ria",
    "https://www.instagram.com/_gloriazhu/",
    "https://www.instagram.com/design.gz/",
    "https://www.linkedin.com/in/gloria-zhu-78a079155/",
    "",
    "https://www.youtube.com/channel/UCYKR8ApN3YTlm2_bzxYN0lw"
]
for(let i=0;i<links.length;i++) {
    if (i!=0 && i!=5) { // ignoring email and discord
        links[i].classList.add("linkable")
        links[i].addEventListener("click", function () {
            openNewTabTo(destinations[i])
        })
    }
}