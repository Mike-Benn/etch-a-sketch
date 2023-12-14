
const grid = document.querySelector('.grid');
const slider = document.querySelector('#size-slider');
const sizeValue = document.querySelectorAll('.grid-size');
const singleSizeValue = document.querySelector('.grid-size');
const clearBtn = document.querySelector('#clear');
const gridLinesBtn = document.querySelector('#grid-lines');
let squares = document.querySelectorAll('.square');
let mouseDown = false;
let gridLines = true;
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

// Sets the background color of squares to black when the mouse is pressed down and then enters other squares

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

// Removes mouseenter listener when mouseup on either the body or a square

function removeMouseEnter() {
    document.body.addEventListener('mouseup' , toggleMouse);
    squares.forEach(square => {
        square.addEventListener('mouseup' , toggleMouse)})

}

removeMouseEnter();

// Toggles grid lines on and off

function toggleGridLines() {
    gridLinesBtn.addEventListener('click' , () => {
        console.log("test");
        if (gridLines) {
            gridLines = false;
            squares.forEach(square => {
                square.style.border = "none";
            })
        } else {
            gridLines = true;
            squares.forEach(square => {
                square.style.border = "1px solid gray";
            })
        }

    })
}

toggleGridLines();
// Sets all squares to the current background color

function clearGrid() {
    clearBtn.addEventListener('click' , () => {
        squares.forEach(square => {
            square.style.backgroundColor = "white";
        })
    })    
}

clearGrid();

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
});






