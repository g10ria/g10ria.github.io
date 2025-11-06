document.addEventListener('DOMContentLoaded', function() {
  const elementsWithClass = document.getElementsByClassName('attach-link');
  for (let i = 0; i < elementsWithClass.length; i++) {
    let element = elementsWithClass[i];
    element.addEventListener('click', (event) => {
        window.location=element.dataset.targetLink
    });
  }
});