let tiles = document.getElementsByClassName("tile")
let tileNamesElements = document.getElementsByClassName("tilename")

for (let i = 0; i < tiles.length;i++) {
   let name = tileNamesElements[i].innerHTML.toLowerCase()
   tiles[i].addEventListener("click", function() {
      window.location.href=`./art/${name}.html`
   })
}