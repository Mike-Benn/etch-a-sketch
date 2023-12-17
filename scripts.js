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
let penSelected = true;
let fillSelected = false;
let pickerSelected = false;
let eraserSelected = false;
let prismaticSelected = false;
let darkenSelected = false;
let brightenSelected = false;

function stringToRGB(str) {
    startingIndex = str.indexOf("(") + 1;
    finishingIndex = str.lastIndexOf(")");
    str = str.substring(startingIndex , finishingIndex);
    strArray = str.split(",");
    return strArray;
}

function rgbToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}




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
            div.style.backgroundColor = "#ffffff"
            container.setAttribute('draggable' , 'false');
            container.appendChild(div);
            if (widthIndex == dimensionIndex - 1) {
                grid.appendChild(container);
            }
        }
    }
    
    squares = document.querySelectorAll('.square');
    if (gridLines == false) {
        squares.forEach(square => {
            square.style.border = "none";
        })    
    }
    draw();
    
    
    
    
    

}

// All child nodes of grid are deleted, afterward a new grid is created from the value set from the dimension slider

function replaceGrid() {
    slider.addEventListener('change' , () => {
        deselectButtons();
        while (grid.firstChild) {
            grid.firstChild.remove();
        }
        makeGrid();
        squares = document.querySelectorAll('.square');
        
        
    })
}



// Gets value from the slider and sets the heading under the slider to display the dimensions in the grid-size span

function displayDimension() {
    slider.addEventListener('input' , () => {
        sizeValue.forEach(value => {
            value.textContent = slider.value;
            console.log(slider.value);
        })
    })
}




// Sets event target to the value of "Pen Color"

function setForeColor(event) {
    event.target.style.backgroundColor = foregroundColor.value;
    console.log("Pen");

}

// Sets event target to the value of "Background Color"

function setBackColor(event) {
    console.log("Eraser");
    event.target.style.backgroundColor = backgroundColor.value;
}

function setPrismColor(event) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    console.log("Prism");
    event.target.style.backgroundColor = rgbToHex(r , g , b);
}

// Loops through each square removing every mouseenter event listener when mouseup

function togglePenDrag() {    
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setForeColor);
    })
}







// Pen listener removers

function removePenEnter() {
    document.body.addEventListener('mouseup' , togglePenDrag);
    squares.forEach(square => {
        square.addEventListener('mouseup' , togglePenDrag);
    })

}

function removePen() {
    penSelected = false;
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setForeColor);
        square.removeEventListener('mousedown' , drawHelper);
        square.removeEventListener('mousedown' , setForeColor);
        square.removeEventListener('mouseup' , togglePenDrag);
    })
    document.body.removeEventListener('mouseup' , togglePenDrag);
}




// Eraser listener removers

function removeEraseEnter() {
    document.body.addEventListener('mouseup' , toggleEraserDrag);
    squares.forEach(square => {
        square.addEventListener('mouseup' , toggleEraserDrag);
    })
}

function toggleEraserDrag() {
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setBackColor);
    })
}

function removeEraser() {
    eraserSelected = false;
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setBackColor);
        square.removeEventListener('mousedown' , drawEraseHelper);
        square.removeEventListener('mousedown' , setBackColor);
        square.removeEventListener('mouseup' , toggleEraserDrag);
    })
    document.body.removeEventListener('mouseup' , toggleEraserDrag);
}

// Remove fill functions

function removeFill() {
    fillSelected = false;
    grid.removeEventListener('mousedown' , fillGridHelper);
}

// Remove color picker functions

function removePicker() {
    pickerSelected = false;
    squares.forEach(square => {
        square.removeEventListener('mousedown' , colorPickerHelper);
    })
}

// Remove prismatic functions

function togglePrismDrag() {    
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setPrismColor);
    })
}

function removePrismEnter() {
    document.body.addEventListener('mouseup' , togglePrismDrag);
    squares.forEach(square => {
        square.addEventListener('mouseup' , togglePrismDrag);
    })
}

function removePrism() {
    prismaticSelected = false;
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setPrismColor);
        square.removeEventListener('mousedown' , drawPrismHelper);
        square.removeEventListener('mousedown' , setPrismColor);
        square.removeEventListener('mouseup' , togglePrismDrag);
    })
    document.body.removeEventListener('mouseup' , togglePrismDrag);
}

// Remove darken square listeners

function removeDarken() {
    darkenSelected = false;
    squares.forEach(square => {
        square.removeEventListener('mousedown' , darkenSquareHelper);
    })
}

// Remove brighten square listeners

function removeBrighten() {
    brightenSelected = false;
    squares.forEach(square => {
        square.removeEventListener('mousedown' , brightenSquareHelper);
    })
}

// Finds and removes the button currently selected and it's listeners

function deselectButtons() {
    if (penSelected) {
        removePen();
    } else if (eraserSelected) {
        eraserBtn.style.color = "#9fd3c7";
        eraserBtn.style.backgroundColor = "#385170";
        removeEraser();
    } else if (prismaticSelected) {
        prismaticBtn.style.color = "#9fd3c7";
        prismaticBtn.style.backgroundColor = "#385170";
        removePrism();
    } else if (fillSelected) {
        fillBtn.style.color = "#9fd3c7";
        fillBtn.style.backgroundColor = "#385170";
        removeFill();
    } else if (pickerSelected) {
        pickBtn.style.color = "#9fd3c7";
        pickBtn.style.backgroundColor = "#385170";
        removePicker();
    } else if (darkenSelected) {
        darkenBtn.style.color = "#9fd3c7";
        darkenBtn.style.backgroundColor = "#385170";
        removeDarken();
    } else if (brightenSelected) {
        brightenBtn.style.color = "#9fd3c7";
        brightenBtn.style.backgroundColor = "#385170";
        removeBrighten();
    }
    
}
// Selects or deslects the color fill tool

function fillToggle() {
    fillBtn.addEventListener('click' , () => {
        if (fillSelected) {
            fillSelected = false;
            fillBtn.style.color = "#9fd3c7";
            fillBtn.style.backgroundColor = "#385170";
            removeFill();
            draw();
            
        } else {
            fillBtn.style.color = "#385170";
            fillBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            fillSelected = true;
            fillGrid();

        }
    })
}



// Selects or deselects the color picker tool

function colorPickerToggle() {
    pickBtn.addEventListener('click' , () => {
        if (pickerSelected) {
            pickerSelected = false;
            pickBtn.style.color = "#9fd3c7";
            pickBtn.style.backgroundColor = "#385170";
            deselectButtons();
            draw();

        } else {
            pickBtn.style.color = "#385170";
            pickBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            pickerSelected = true;
            colorPicker();
        }
    })
}



// Selects or deselects the eraser tool

function eraserToggle() {
    eraserBtn.addEventListener('click' , () => {
        if (eraserSelected) {
            eraserBtn.style.color = "#9fd3c7";
            eraserBtn.style.backgroundColor = "#385170";
            removeEraser();
            draw();
            

        } else {
            eraserBtn.style.color = "#385170";
            eraserBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            eraserSelected = true;
            console.log(penSelected);
            drawErase();
            
            
            
        }
    })
    
}



// Selects or deselects the prismatic tool

function prismaticToggle() {
    prismaticBtn.addEventListener('click' , () => {
        if (prismaticSelected) {
            prismaticSelected = false;
            prismaticBtn.style.color = "#9fd3c7";
            prismaticBtn.style.backgroundColor = "#385170";
            removePrism();
            draw();
        } else {
            prismaticBtn.style.color = "#385170";
            prismaticBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            prismaticSelected = true;
            drawPrism();
        }
    })
}



// Selects or deselects the darken tool

function darkenToggle() {
    darkenBtn.addEventListener('click' , () => {
        if (darkenSelected) {
            darkenSelected = false;
            darkenBtn.style.color = "#9fd3c7";
            darkenBtn.style.backgroundColor = "#385170";
            removeDarken();
            draw();
        } else {
            darkenBtn.style.color = "#385170";
            darkenBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            darkenSelected = true;
            darkenSquare();
        }
    })
}



// Selects or deselects the brighten tool

function brightenToggle() {
    brightenBtn.addEventListener('click' , () => {
        if (brightenSelected) {
            brightenSelected = false;
            brightenBtn.style.color = "#9fd3c7";
            brightenBtn.style.backgroundColor = "#385170";
            removeBrighten();
            draw();
        } else {
            brightenBtn.style.color = "#385170";
            brightenBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            brightenSelected = true;
            brightenSquare();
        }
    })
}



// Toggles grid lines on and off

function toggleGridLines() {
    gridLinesBtn.addEventListener('click' , () => {
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



// Sets all squares to the current background color

function clearGrid() {
    clearBtn.addEventListener('click' , () => {
        squares.forEach(square => {
            square.style.backgroundColor = backgroundColor.value;
        })
        console.log("Clear");
    })    
}




// Whenever mouse button is pushed down the background color of the current target is set to black

function drawStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , setForeColor);
    })
}

function drawHelper() {
    squares.forEach(square => {
        square.addEventListener('mouseenter' , setForeColor);
    })
}

function draw() {
    penSelected = true;
    squares.forEach(square => {
        square.addEventListener('mousedown' , drawHelper);
    })

    drawStart();
    removePenEnter();
}

// Sets the color of square elements to the selected background color

function drawEraseStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , setBackColor);
    })
}

function drawEraseHelper() {
    squares.forEach(square => {
        square.addEventListener('mouseenter' , setBackColor);
    })
}
function drawErase() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , drawEraseHelper);
    })
    drawEraseStart();
    removeEraseEnter();
}
        
// Color fill functions

function fillGridHelper() {
    squares.forEach(square => {
        square.style.backgroundColor = foregroundColor.value;
    })
    console.log("fill");
}

function fillGrid() {
    if (fillSelected) {
        grid.addEventListener('mousedown' , fillGridHelper); 
    }
        
}

// Color picker functions

function colorPickerHelper(event) {
    rgbValue = stringToRGB(event.target.style.backgroundColor);
    r = parseInt(rgbValue[0]);
    g = parseInt(rgbValue[1]);
    b = parseInt(rgbValue[2]);
    foregroundColor.value = rgbToHex(r , g , b);
    deselectButtons();
    draw();
}

function colorPicker() {
    if (pickerSelected) {
        squares.forEach(square => {
            square.addEventListener('mousedown' , colorPickerHelper) 
        })
    }
}

function darkenSquareHelper(event) {
    rgbValue = stringToRGB(event.target.style.backgroundColor);
    r = parseInt(rgbValue[0]);
    g = parseInt(rgbValue[1]);
    b = parseInt(rgbValue[2]);

    if (r - 26 < 0) {
        r = 0;
    } else {
        r = r - 26;
    }

    if (g - 26 < 0) {
        g = 0;
    } else {
        g = g - 26;
    }

    if (b - 26 < 0) {
        b = 0;
    } else {
        b = b - 26;
    }
    console.log("Darken");
    event.target.style.backgroundColor = rgbToHex(r , g , b);
    

}

function darkenSquare() {
    if (darkenSelected) {
        squares.forEach(square => {
            square.addEventListener('mousedown' , darkenSquareHelper);
        })
    }
}

function brightenSquareHelper(event) {
    rgbValue = stringToRGB(event.target.style.backgroundColor);
    r = parseInt(rgbValue[0]);
    g = parseInt(rgbValue[1]);
    b = parseInt(rgbValue[2]);

    if (r + 26 > 255) {
        r = 255;
    } else {
        r = r + 26;
    }

    if (g + 26 > 255) {
        g = 255;
    } else {
        g = g + 26;
    }

    if (b + 26 > 255) {
        b = 255;
    } else {
        b = b + 26;
    }
    console.log("Brighten");
    event.target.style.backgroundColor = rgbToHex(r , g , b);
    

}

function brightenSquare() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , brightenSquareHelper);
    })
}

// Draw prism color

function drawPrismStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , setPrismColor);
    })
}

function drawPrismHelper() {
    squares.forEach(square => {
        square.addEventListener('mouseenter' , setPrismColor);
    })
}
function drawPrism() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , drawPrismHelper);
    })
    drawPrismStart();
    removePrismEnter();
}


document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    makeGrid();
    replaceGrid();
    displayDimension();
    fillToggle();
    colorPickerToggle();
    eraserToggle();
    prismaticToggle();
    darkenToggle();
    brightenToggle();
    toggleGridLines();
    clearGrid();
    

});

