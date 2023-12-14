
const grid = document.querySelector('.grid');
const slider = document.querySelector('#size-slider');
const sizeValue = document.querySelectorAll('.grid-size');
const singleSizeValue = document.querySelector('.grid-size');
let squares = document.querySelectorAll('.square');
let mouseDown = false;
makeGrid();





// Function that pulls grid size value from slider and loops until dimension value is reached 

function makeGrid() {
    dimensionIndex = slider.value;
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
    squares = document.querySelectorAll('.square');
    draw();

}

// All child nodes of grid are deleted, afterward a new grid is created from the value set from the dimension slider

function replaceGrid() {
    slider.addEventListener('change' , () => {
        while (grid.firstChild) {
            grid.firstChild.remove();
        }
        makeGrid();
        squares = document.querySelectorAll('.square');
        draw();
        
    })
}

replaceGrid();

// Gets value from the slider and sets the heading under the slider to display the dimensions in the grid-size span

function displayDimension() {
    slider.addEventListener('input' , () => {
        sizeValue.forEach(value => {
            value.textContent = slider.value;
            console.log(slider.value);
        })
    })
}

displayDimension();

// Loops through each square removing every mouseenter event listener when mouseup



function toggleMouse() {    
    console.log("mouse up");
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , blackSquare);
        console.log("squares removed");
    })
}

function removeMouseEnter() {
    document.body.addEventListener('mouseup' , toggleMouse);

}

removeMouseEnter();

// Sets event target to the background color of black

function blackSquare(event) {
    event.target.style.backgroundColor = "black";

}

// Whenever mouse button is pushed down the background color of the current target is set to black

function drawStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , blackSquare);
    })
}



function draw() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , () => {
            mouseDown = true;
            squares.forEach(square => {
                square.addEventListener('mouseenter' , blackSquare);
            })
        })
    })
    drawStart();
}



squares.forEach(square => {
    square.addEventListener('mouseup' , toggleMouse)})




document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
});






