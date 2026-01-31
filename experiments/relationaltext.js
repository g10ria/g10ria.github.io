function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

function createNewText(fulltext, interactableIndices, level) {
    let words = fulltext.split(" ")
    let str = "<div>" + words[0]
    let interactableIndex = 0

    for(let i=1;i<words.length;i++) {
        console.log(words[i])
        if (words[i].trim() == interactableIndices[interactableIndex]) {
            str += " <span class=\"interactable\">" + words[i] + "</span>"
            interactableIndex++
        } else {
            str += " " + words[i];
        }
    }
    str += "</div>"
    return create(str)
}

// var fragment = createNewText("the frog jumped over the log", ["frog","log"], 0)

var fragment = createNewText(`
The MIT School of Architecture and Planning (SA+P) and the LUMA Foundation announced today the 
establishment of the MIT-LUMA Lab to advance paradigm-shifting innovations at the nexus of 
art, science, technology, conservation, and design. The aim is to empower innovative thinkers to realize their ambitions, 
support local communities as they seek to address climate-related issues, and scale solutions to pressing challenges 
facing the Mediterranean region.
`, ["art,", "science,", "technology,", "conservation,", "design.", "climate-related", "Mediterranean"], 0)

document.body.appendChild(fragment);