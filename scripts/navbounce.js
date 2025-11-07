document.addEventListener('DOMContentLoaded', function() {
  const elementsWithClass = document.getElementsByClassName('navoption');
  for (let i = 0; i < elementsWithClass.length; i++) {
    let element = elementsWithClass[i];
    const childYarndings = element.querySelector(`.yarndings`);
    if (childYarndings) {
        element.addEventListener('mouseenter', (event) => {
            childYarndings.textContent = get_random_ascii(childYarndings.textContent)
        });
    }

  }
});

function hasChildWithClass(parentElement, className) {
  const selector = `.${className}`;
  const childElement = parentElement.querySelector(selector);
  return childElement !== null;
}

function get_random_ascii(current) {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    function generateAlphabet(capital = false) {
    return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
    }

    const lowerCaseLetters = generateAlphabet();
    const upperCaseLetters = generateAlphabet(true);

    const allNumbersAndLetters = [...numbers, ...lowerCaseLetters, ...upperCaseLetters];

    let c = getRandomElement(allNumbersAndLetters)
    while (c == current) {
        c = getRandomElement(allNumbersAndLetters)
    }
    return c
}

function getRandomElement(arr) {
  const randomIndex = Math.random();
  const scaledIndex = randomIndex * arr.length;
  const floorIndex = Math.floor(scaledIndex);
  return arr[floorIndex];
}