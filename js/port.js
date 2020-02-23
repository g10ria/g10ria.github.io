let pics = document.getElementsByClassName("tilepic")

let picDialog = document.getElementById("picDialog")
let picInDialog = document.getElementById("picInDialog")
let titleInDialog = document.getElementById("titleInDialog")
let descInDialog = document.getElementById("descriptionInDialog")
let closebuttonInDialog = document.getElementById("closebuttonInDialog")

let everything = document.getElementsByClassName("content")[0]
let body = document.body

document.getElementById("backarrow").addEventListener("click", function() {
    document.body.classList.remove("loaded")
    setTimeout(function () {
        window.location.href = "../"
    }, 500)
})

for (let i = 0; i < pics.length;i++) {
    let picName = pics[i].dataset.link
    let isVertical = pics[i].dataset.orientation == "vertical"
    let pieceName = pics[i].dataset.name
    let pieceDescription = pics[i].dataset.description
    let pieceAwards = pics[i].dataset.awards.split(";")
   
    pics[i].addEventListener("click", function() {
        body.classList.add("no-scroll")
        picInDialog.src = `../pix/${picName}.JPG`
        if (isVertical) {
            picDialog.classList.add("tallDialog")
            picInDialog.classList.add("verticalPic")
        }
        else {
            picDialog.classList.add("wideDialog")
            picInDialog.classList.add("horizontalPic")
        }
        everything.classList.add("low-opacity")
        picDialog.classList.remove("no-show")
        
        titleInDialog.innerHTML = pieceName;

        let currDesc = pieceDescription
        if (pieceAwards.length!=0 && pieceAwards[0]!="") {
            currDesc += "<br><br>"
            for (let j = 0; j < pieceAwards.length; j++)
                currDesc += `🏅 ${pieceAwards[j]}<br>`
        }
        
        descInDialog.innerHTML = currDesc;
    })
}

closebuttonInDialog.addEventListener("click", function() {
    picDialog.classList.add("no-show");
    everything.classList.remove("low-opacity")
    picInDialog.src = ""
    picInDialog.classList.remove("verticalPic");
    picInDialog.classList.remove("horizontalPic")

    picDialog.classList.remove("tallDialog")
    picDialog.classList.remove("wideDialog")

    titleInDialog.innerHTML = ""
    descInDialog.innerHTML = ""

    body.classList.remove("no-scroll")
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