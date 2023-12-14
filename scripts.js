const grid = document.querySelector('.grid');
const slider = document.querySelector('#size-slider');
const sizeValue = document.querySelectorAll('.grid-size');
const singleSizeValue = document.querySelector('.grid-size');
const fillBtn = document.querySelector('#fill-button');
const pickBtn = document.querySelector('#picker-button');
const clearBtn = document.querySelector('#clear');
const gridLinesBtn = document.querySelector('#grid-lines');
const foregroundColor = document.querySelector('#forecolor');
const backgroundColor = document.querySelector('#backcolor');
const eraserBtn = document.querySelector('#eraser');
const prismaticBtn = document.querySelector('#prismatic');
const darkenBtn = document.querySelector('#darken');
const brightenBtn = document.querySelector('#brighten');

let squares = document.querySelectorAll('.square');
let mouseDown = false;

// Button status variables

let gridLines = true;
let fillSelected = false;
let pickerSelected = false;
let eraserSelected = false;
let prismaticSelected = false;
let darkenSelected = false;
let brightenSelected = false;

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
    event.target.style.backgroundColor = foregroundColor.value;

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

// Selects or deslects the color fill tool

function fillToggle() {
    fillBtn.addEventListener('click' , () => {
        if (fillSelected) {
            fillSelected = false;
            fillBtn.style.color = "#9fd3c7";
            fillBtn.style.backgroundColor = "#385170";
        } else {
            fillSelected = true;
            fillBtn.style.color = "#385170";
            fillBtn.style.backgroundColor = "#9fd3c7";
        }
    })
}

fillToggle();

// Selects or deselects the color picker tool

function colorPickerToggle() {
    pickBtn.addEventListener('click' , () => {
        if (pickerSelected) {
            pickerSelected = false;
            pickBtn.style.color = "#9fd3c7";
            pickBtn.style.backgroundColor = "#385170";
        } else {
            pickerSelected = true;
            pickBtn.style.color = "#385170";
            pickBtn.style.backgroundColor = "#9fd3c7";
            
        }
    })
}

colorPickerToggle();

// Selects or deselects the eraser tool

function eraserToggle() {
    eraserBtn.addEventListener('click' , () => {
        if (eraserSelected) {
            eraserSelected = false;
            eraserBtn.style.color = "#9fd3c7";
            eraserBtn.style.backgroundColor = "#385170";
        } else {
            eraserSelected = true;
            eraserBtn.style.color = "#385170";
            eraserBtn.style.backgroundColor = "#9fd3c7";
        }
    })
    
}

eraserToggle();

// Selects or deselects the prismatic tool

function prismaticToggle() {
    prismaticBtn.addEventListener('click' , () => {
        if (prismaticSelected) {
            prismaticSelected = false;
            prismaticBtn.style.color = "#9fd3c7";
            prismaticBtn.style.backgroundColor = "#385170";
        } else {
            prismaticSelected = true;
            prismaticBtn.style.color = "#385170";
            prismaticBtn.style.backgroundColor = "#9fd3c7";
        }
    })
}

prismaticToggle();

// Selects or deselects the darken tool

function darkenToggle() {
    darkenBtn.addEventListener('click' , () => {
        if (darkenSelected) {
            darkenSelected = false;
            darkenBtn.style.color = "#9fd3c7";
            darkenBtn.style.backgroundColor = "#385170";
        } else {
            darkenSelected = true;
            darkenBtn.style.color = "#385170";
            darkenBtn.style.backgroundColor = "#9fd3c7";
        }
    })
}

darkenToggle();

// Selects or deselects the brighten tool

function brightenToggle() {
    brightenBtn.addEventListener('click' , () => {
        if (brightenSelected) {
            brightenSelected = false;
            brightenBtn.style.color = "#9fd3c7";
            brightenBtn.style.backgroundColor = "#385170";
        } else {
            brightenSelected = true;
            brightenBtn.style.color = "#385170";
            brightenBtn.style.backgroundColor = "#9fd3c7";
        }
    })
}

brightenToggle();

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
            square.style.backgroundColor = backgroundColor.value;
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






