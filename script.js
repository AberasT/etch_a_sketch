const selector = document.getElementById('sizes');
const container = document.getElementById('board');
const paintColorSel = document.getElementById('paint-color');
const boardColorSel = document.getElementById('board-color');

let currentBoardColor = '';

let size = selector.value;

/*I don't know why if I dont divide by 10 then it creates a grid of size*10xsize*10 
The size value is correct, I guess the problem is in the loops (CONSOLE.LOGS IN THE LOOPS FOR DEBUG)
And that only happens when It makes the grid as a function*/
function makeGrid() {
    for (let i = 1; i < (size + 1)/10 ; i++) { 
        for (let j = 1; j < (size + 1)/10 ; j++) {
            let d = document.createElement('div');
            d.setAttribute('class', 'square');
            d.style.gridRow = i;
            d.style.gridColumn = j;
            d.style.borderStyle = 'solid';
            d.style.borderWidth = '1px';
            d.style.borderColor = 'rgb(240, 240, 240)';
            d.addEventListener('mouseover', ()=> {
                d.style.backgroundColor = paintColorSel.value;
            });
            container.appendChild(d);
        }
    }
}

//This instruction is to make a "default" grid when the user enters the website
makeGrid();

const resetBtn = document.getElementById('reset');

selector.addEventListener('change', ()=>{
    size = selector.value;
    container.innerHTML = ''; //This line sets the cointainer to have no content
    makeGrid();
});

//Paint color change
paintColorSel.addEventListener('change', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let l = 0; l < (size*size); l++) {
        allSq[l].addEventListener('mouseover', ()=> {
            allSq[l].style.backgroundColor = paintColorSel.value;
        });
    };
});

 //Board color change
 //Error at the comparison of the color values in the if sentence because of different formats 
boardColorSel.addEventListener('change', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let q = 0; q < (size*size); q++) {
            if (allSq[q].style.backgroundColor === currentBoardColor) {
                allSq[q].style.backgroundColor = boardColorSel.value;
            };
    };
    currentBoardColor = boardColorSel.value;
});

/*NEXT:
-GRID TOGGLE
-CHANGE BACKGROUND COLOR
-SIMPLE INTERFACE
-(Optional): Instead of just changing the color of your grid from black to white (for example) have each pass through it with the mouse change to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.
*/

//The reset button turns the board white
resetBtn.addEventListener('click', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = 'white';
    };
});

