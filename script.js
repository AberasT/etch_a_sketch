const selector = document.getElementById('sizes');
const container = document.getElementById('board');
const paintColorSel = document.getElementById('paint-color');
const boardColorSel = document.getElementById('board-color');
let colorSwitch, greySwitch, colorFiller;
let currentBoardColor = '';
let size = selector.value;

/* REESTRUCTURAR:
    EVENT LISTENER CON UNA FUNCION QUE CHEQUEA QUÉ
    ESTÁ SWITCHEADO. EN BASE A ESO SE HACEN DISTINTAS COSAS
    VARIABLES PARA C/OPCION

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
            d.style.opacity = '1';
            d.style.backgroundColor = currentBoardColor;
            /*d.addEventListener('mouseenter', ()=> {
                if (paint) {
                    d.style.backgroundColor = paintColorSel.value;
                };
            }); */
            container.appendChild(d);
        };
    };
};

//This instruction is to make a "default" grid when the user enters the website
makeGrid();

//---------------------------------
//---------------------------------
//---------------------------------


let setting = 'black';


//Setting the event listener to the grid
let allSq = Array.from(document.getElementsByClassName('square'));
allSq.forEach(square => square.addEventListener('mouseover', coloring ));

function coloring() {
    switch(setting) {
        case 'black':
            this.style.backgroundColor = '#000000';
            break;
    }   
}

/*

//Reset button and size changer
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
    colorSwitch.checked = false;
    for (let l = 0; l < (size*size); l++) {
        allSq[l].addEventListener('mouseenter', ()=> {
            allSq[l].style.backgroundColor = paintColorSel.value;
        });
    };
});



//Function that takes and rgb value with the format rgb(nnn, nnn, nnn) and returns it in hex code #hhhhhh
//This is necessary for the color comparisson for the board color change
function rgbToHex (rgb) {
    if (rgb[0] == '#') {
        return rgb;
    } else {
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
    }
};

 //Board color change
boardColorSel.addEventListener('change', ()=>{
    for (let q = 0; q < (size*size); q++) {
            if (rgbToHex(allSq[q].style.backgroundColor) == currentBoardColor) {
                allSq[q].style.backgroundColor = boardColorSel.value;
            };
    };
    currentBoardColor = boardColorSel.value;
});


//The reset button turns the board white
resetBtn.addEventListener('click', ()=>{
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = '#ffffff';
    };
    currentBoardColor = '#ffffff';
});

//Random paint checkbox
colorSwitch = document.getElementById('colorSwitch');
colorSwitch.addEventListener('change', ()=> {
    if (colorSwitch.checked) {
        greySwitch.checked = false;
        for (let h = 0; h < (size*size); h++) {
            allSq[h].addEventListener('mouseenter', ()=> {
                allSq[h].style.backgroundColor = 'rgb('+Math.round(Math.random()*255)+', '+Math.round(128 + Math.random()*127)+', '+Math.round(128 + Math.random()*127)+')';
            });
        };
    }
    else {
        setDefault();
    }
});

function lighten(color) {
    let red, green, blue;
    if (color !== '#000')  {
        red = parseInt((color[1]+color[2]),16);
        if (red > 238) {
            red = 'ff';
        } else {
            red = (red + 16).toString(16);
        };
        green = parseInt((color[3]+color[4]),16);
        if (green > 238) {
            green = 'ff';
        } else {
            green = (green + 16).toString(16);
        };
        blue = parseInt((color[5]+color[6]),16);
        if (blue > 238) {
            blue = 'ff';
        } else {
            blue = (blue + 16).toString(16);
        };
        
    }
    return '#'+red+green+blue;
};

//Lighten checkbox (CHANGE NAME!!!)
greySwitch = document.getElementById('greySwitch');
greySwitch.addEventListener('change', ()=> {
    if (greySwitch.checked) {
        colorSwitch.checked = false;
        for (let m = 0; m < (size*size); m++) {
            allSq[m].addEventListener('mouseenter', ()=> {
                allSq[m].style.opacity = `${allSq[m].style.opacity - 0.1}`;
            });
        };
    }
    else {
        setDefault();
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
*/