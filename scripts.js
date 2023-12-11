const pageContainer = document.createElement('div');
pageContainer.classList.add('page-container');
pageContainer.setAttribute('draggable' , 'false');
document.body.appendChild(pageContainer);

for (let heightIndex = 0; heightIndex < 24; heightIndex++) {
    let container = document.createElement('div');
    container.classList.add('grid');
    container.setAttribute('draggable' , 'false');
    for(let widthIndex = 0; widthIndex < 24; widthIndex++) {
        let div = document.createElement('div');
        div.classList.add('square');
        div.setAttribute('draggable' , 'false');
        container.appendChild(div);
        if (widthIndex == 15) {
            pageContainer.appendChild(container);
        }

    }

}

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


/*
squares.forEach(square => {
    square.addEventListener('mousedown' , () => {
        square.addEventListener('mousehover' , () => {
            square.style.backgroundColor = "black";
        })
        square.addEventListener('mouseup' , () => {
            square.removeEventListener('mousehover')
        })
    })
})

squares.forEach(square => {
    square.addEventListener('mousedown' , continuousFire)
    
});


squares.forEach(square => {
    square.addEventListener('mouseup' , () => {
        mouseDown = false;
        console.log("mouse up");
    })
})
*/




