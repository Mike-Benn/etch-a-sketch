const pageContainer = document.createElement('div');
pageContainer.classList.add('page-container');
document.body.appendChild(pageContainer);

for (let heightIndex = 0; heightIndex < 24; heightIndex++) {
    let container = document.createElement('div');
    container.classList.add('grid');
    for(let widthIndex = 0; widthIndex < 24; widthIndex++) {
        let div = document.createElement('div');
        div.classList.add('square');
        container.appendChild(div);
        if (widthIndex == 15) {
            pageContainer.appendChild(container);
        }

    }

}

const squares = document.querySelectorAll('.square');


squares.forEach(square => {
    square.addEventListener('click' , () => {
        square.style.backgroundColor = "black";
    })
})

squares.forEach(square => {
    square.addEventListener('dragover' , () => {
        square.style.backgroundColor = "black";
    })
})







