setTimeout(function () {
    document.body.classList.add("loaded")
}, 200)

function openNewTabTo(link) {
    let li = document.createElement("a")
    li.href = link
    li.target = "_blank"
    li.click()
}

document.getElementById("copyright-link").addEventListener("click", function () {
    openNewTabTo("https://github.com/g10ria/portfolio")
})