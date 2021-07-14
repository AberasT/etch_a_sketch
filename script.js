const selector = document.getElementById('sizes');
const container = document.getElementById('board');
const paintColorSel = document.getElementById('paint-color');
const boardColorSel = document.getElementById('board-color');
let colorSwitch, greySwitch, colorFiller;
let paint;

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
            d.style.opacity = '1';
            d.style.borderColor = 'rgb(240, 240, 240)';
            d.style.backgroundColor = currentBoardColor;
            paint = true;
            d.addEventListener('mouseenter', ()=> {
                if (paint) {
                    d.style.backgroundColor = paintColorSel.value;
                };
            });
            container.appendChild(d);
        }
    }
}

//This instruction is to make a "default" grid when the user enters the website
makeGrid();

//Reset button
const resetBtn = document.getElementById('reset');
selector.addEventListener('change', ()=>{
    colorSwitch.checked = false;
    greySwitch.checked = false;
    size = selector.value;
    container.innerHTML = ''; //This line sets the cointainer to have no content
    makeGrid();
});

//Paint color change
paintColorSel.addEventListener('change', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let l = 0; l < (size*size); l++) {
        allSq[l].addEventListener('mouseenter', ()=> {
            allSq[l].style.backgroundColor = paintColorSel.value;
        });
    };
});

//Function that takes and rgb value with the format rgb(nnn, nnn, nnn) and returns it in hex code #hhhhhh
//This is necessary for the color comparisson for the board color change
function rgbToHex (rgb) {
    if (rgb == '') {
        return '';
    }
    else {
        let commas = 0;
        let index = 4;
        let r = '';
        let g = '';
        let b = '';
        while (rgb[index] !== ')') {
            if (rgb[index] == ',') {
                commas++;
            }
            else {
                switch (commas) {
                    case 0:
                        if (rgb[index] !== '') {
                            r += rgb[index];
                        };
                        break;
                    case 1:
                        if (rgb[index] !== '') {
                            g += rgb[index];
                        };
                        break;
                    default:
                        if (rgb[index] !== '') {
                            b += rgb[index];
                        };
                        break;
                };
            };
            index++;
        };
        let rHex = parseInt(r).toString(16);
        if (rHex.length == 1) {
            rHex = '0' + rHex;
        };
        let gHex = parseInt(g).toString(16);
        if (gHex.length == 1) {
            gHex = '0' + gHex;
        };
        let bHex = parseInt(b).toString(16);
        if (bHex.length == 1) {
            bHex = '0' + bHex;
        };
        return ('#'+rHex+gHex+bHex);
    }
};

 //Board color change
boardColorSel.addEventListener('change', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let q = 0; q < (size*size); q++) {
            if (rgbToHex(allSq[q].style.backgroundColor) == currentBoardColor) {
                allSq[q].style.backgroundColor = boardColorSel.value;
            };
    };
    currentBoardColor = boardColorSel.value;
});

/*NEXT:
-GRID TOGGLE
-FILL TOOL
-SIMPLE INTERFACE
-(Optional): Instead of just changing the color of your grid from black to white (for example) have each pass through it with the mouse change to a completely random RGB value. Then try having each pass just add another 10% of black to it so that only after 10 passes is the square completely black.
*/

//The reset button turns the board white
resetBtn.addEventListener('click', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = '#ffffff';
    };
    currentBoardColor = '#ffffff';
});

//Random paint checkbox
colorSwitch = document.getElementById('colorSwitch');
colorSwitch.addEventListener('change', ()=> {
    const allSq = document.getElementsByClassName('square');
    greySwitch.checked = false;
    if (colorSwitch.checked) {
        for (let h = 0; h < (size*size); h++) {
            allSq[h].addEventListener('mouseenter', ()=> {
                allSq[h].style.backgroundColor = 'rgb('+Math.round(Math.random()*255)+', '+Math.round(128 + Math.random()*127)+', '+Math.round(128 + Math.random()*127)+')';
            });
        };
    }
    else {
        for (let h = 0; h < (size*size); h++) {
            allSq[h].addEventListener('mouseenter', ()=> {
                allSq[h].style.backgroundColor = paintColorSel.value;
            });
        };
    }
});

//Grey scale paint checkbox
greySwitch = document.getElementById('greySwitch');
greySwitch.addEventListener('change', ()=> {
    const allSq = document.getElementsByClassName('square');
    colorSwitch.checked = false;
    if (greySwitch.checked) {
        for (let m = 0; m < (size*size); m++) {
            allSq[m].addEventListener('mouseenter', ()=> {
                allSq[m].style.backgroundColor = `rgba(0, 0, 0, ${allSq[m].style.opacity - 0.1})`;
            });
        };
    }
    else {
        for (let m = 0; m < (size*size); m++) {
            allSq[m].addEventListener('mouseenter', ()=> {
                allSq[m].style.backgroundColor = paintColorSel.value;
                allSq[m].style.opacity = '1';
            });
        };
    }
});

//Array to matrix (for easier color filler code)
let mat = [];
function arToMat() {
    let row = [];
    let i = 0;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            row[c] = '';
            i++;
        }
        mat[r] = row;
    }
};

//Color fill
colorFiller = document.getElementById('fillerSwitch');
colorFiller.addEventListener('change', ()=> {
    const allSq = document.getElementsByClassName('square');
    if (colorFiller.checked) {
        let p;
        paint = false;
        for (let m = 0; m < (size*size); m++) {
            allSq[m].addEventListener('click', ()=> {
                p = m;
                while (p<(size*size) && p>=0 && (rgbToHex(allSq[p].style.backgroundColor) == currentBoardColor)) {
                    allSq[p].style.backgroundColor = '#000000';
                    p--;
                }
            })
        }
    }
    else {
        paint = true;
    };
});