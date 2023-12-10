const dimension = 16;

for (let heightIndex = 0; heightIndex < 16; heightIndex++) {
    let container = document.createElement('div');
    for(let widthIndex = 0; widthIndex < 16; widthIndex++) {
        let div = document.createElement('div');
        container.appendChild(div);
        if (widthIndex == 15) {
            document.body.appendChild(container);
        }


    }

}
