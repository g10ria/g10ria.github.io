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