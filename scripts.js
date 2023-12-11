const pageContainer = document.createElement('div');
pageContainer.classList.add('page-container');
document.body.appendChild(pageContainer);

for (let heightIndex = 0; heightIndex < 16; heightIndex++) {
    let container = document.createElement('div');
    container.classList.add('grid');
    for(let widthIndex = 0; widthIndex < 16; widthIndex++) {
        let div = document.createElement('div');
        div.classList.add('square');
        container.appendChild(div);
        if (widthIndex == 15) {
            pageContainer.appendChild(container);
        }


    }

}





