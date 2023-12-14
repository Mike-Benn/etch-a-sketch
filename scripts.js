const grid = document.querySelector('.grid');
const slider = document.querySelector('#size-slider');
const sizeValue = document.querySelectorAll('.grid-size');
const singleSizeValue = document.querySelector('.grid-size');


// Function that pulls grid size value from slider and loops until dimension value is reached 

function makeGrid() {
    dimensionIndex = parseInt(singleSizeValue.textContent);
    for (let heightIndex = 0; heightIndex < dimensionIndex; heightIndex++) {
        let container = document.createElement('div');
        container.classList.add('grid-row');
        container.setAttribute('draggable' , 'false');
        for (let widthIndex = 0; widthIndex < dimensionIndex; widthIndex++) {
            let div = document.createElement('div');
            div.classList.add('square');
            div.setAttribute('draggable' , 'false');
            container.setAttribute('draggable' , 'false');
            container.appendChild(div);
            if (widthIndex == dimensionIndex - 1) {
                grid.appendChild(container);
            }
        }
    }
}

makeGrid();

slider.addEventListener('input' , () => {
    sizeValue.forEach(value => {
        value.textContent = slider.value;
    })
})



slider.addEventListener('change' , () => {
    while (grid.firstChild) {
        grid.firstChild.remove();
    }
    makeGrid();
})



const squares = document.querySelectorAll('.square');
let mouseDown = false;
document.body.addEventListener('mouseup' , toggleMouse);
function toggleMouse() {
    mouseDown = false;
    console.log("mouse up");
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , blackSquare);
        console.log("squares removed");
    })
}

function blackSquare(event) {
    event.target.style.backgroundColor = "black";

}



squares.forEach(square => {
    square.addEventListener('mousedown' , blackSquare);
})

squares.forEach(square => {
    square.addEventListener('mousedown' , () => {
        mouseDown = true;
        squares.forEach(square => {
            square.addEventListener('mouseenter' , blackSquare);
        })
    })
})

squares.forEach(square => {
    square.addEventListener('mouseup' , toggleMouse)})




document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
});






