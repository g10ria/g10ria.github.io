let pics = document.getElementsByClassName("tilepic")

let picDialog = document.getElementById("picDialog")
let picInDialog = document.getElementById("picInDialog")
let titleInDialog = document.getElementById("titleInDialog")
let descInDialog = document.getElementById("descriptionInDialog")
let closebuttonInDialog = document.getElementById("closebuttonInDialog")

let everything = document.getElementsByClassName("content")[0]

document.getElementById("backarrow").addEventListener("click", function () {
    window.location.href = "../"
})

for (let i = 0; i < pics.length; i++) {
    let picName = pics[i].dataset.link
    let orientation = pics[i].dataset.orientation
    let pieceName = pics[i].dataset.name
    let pieceDescription = pics[i].dataset.description
    let pieceAwards = pics[i].dataset.awards.split(";")

    pics[i].addEventListener("click", function () {
        picInDialog.src = `../pix/design/${picName}.jpg`
        if (orientation == "vertical") {
            picDialog.classList.add("tallDialog")
            picInDialog.classList.add("verticalPic")
        }
        else if (orientation == "horizontal") {
            picDialog.classList.add("wideDialog")
            picInDialog.classList.add("horizontalPic")
        } else { // square
            picDialog.classList.add("squareDialog");
            picInDialog.classList.add("squarePic")
        }
        everything.classList.add("low-opacity")
        picDialog.classList.remove("no-show")

        titleInDialog.innerHTML = pieceName;

        let currDesc = pieceDescription
        if (pieceAwards.length != 0 && pieceAwards[0] != "") {
            currDesc += "<br><br>"
            for (let j = 0; j < pieceAwards.length; j++)
                currDesc += `🏅 ${pieceAwards[j]}<br>`
        }

        descInDialog.innerHTML = currDesc;
    })
}

closebuttonInDialog.addEventListener("click", function () {
    picDialog.classList.add("no-show");
    everything.classList.remove("low-opacity")
    picInDialog.src = ""
    picInDialog.classList.remove("verticalPic");
    picInDialog.classList.remove("horizontalPic")
    picInDialog.classList.remove("squarePic")

    picDialog.classList.remove("tallDialog")
    picDialog.classList.remove("wideDialog")
    picDialog.classList.remove("squareDialog")

    titleInDialog.innerHTML = ""
    descInDialog.innerHTML = ""
})