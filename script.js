const selector = document.getElementById('sizes');
const container = document.getElementById('board');
const paintColorSel = document.getElementById('paint-color');
const boardColorSel = document.getElementById('board-color');
let currentBoardColor = '#ffffff';
let size = selector.value;
const resetBtn = document.getElementById('reset');

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
            container.appendChild(d);
        };
    };
};
let allSq;
let paint = false;
const ind = document.querySelector(".indicator");
ind.style.backgroundColor = '#FF0000';

function setGame() {
    makeGrid();
    allSq = Array.from(document.getElementsByClassName('square'));
    allSq.forEach(square => square.addEventListener('click', () => {
        paint = !paint;
        (paint) ? ind.style.backgroundColor = '#00FF00' : ind.style.backgroundColor = '#FF0000';
    }));
    allSq.forEach(square => square.addEventListener('mouseover', coloring ));
}
function rgbToHex (rgb) {
    if (rgb[0] == '#') {
        return rgb;
    } else {
        if (rgb == '') {
            return '#ffffff';
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
function lighten(color) {
    let red, green, blue;
    if (color !== '#000')  {
        red = parseInt((color[1]+color[2]),16);
        red > 238 ? red = 'ff' : red = (red + 16).toString(16);

        green = parseInt((color[3]+color[4]),16);
        green > 238 ? green = 'ff' : green = (green + 16).toString(16);

        blue = parseInt((color[5]+color[6]),16);
        blue > 238 ? blue = 'ff' : blue = (blue + 16).toString(16);
    }
    return '#'+red+green+blue;
};
function darken(color) {
    let red, green, blue;
    if (color !== '#000' && color !== '#000000')  {
        red = parseInt((color[1]+color[2]),16);
        red < 32 ? red = '00' : red = (red - 16).toString(16);

        green = parseInt((color[3]+color[4]),16);
        green < 32 ? green = '00' : green = (green - 16).toString(16);

        blue = parseInt((color[5]+color[6]),16);
        blue < 32 ? blue = '00' : blue = (blue - 16).toString(16);
    }
    return '#'+red+green+blue;
};

//Function that takes and rgb value with the format rgb(nnn, nnn, nnn) and returns it in hex code #hhhhhh
//This is necessary for the color comparisson for the board color change


setGame();

let setting = 'normal';


//Setting the event listener to the grid

function coloring() {
    if (paint) {
        switch(setting) {
            case 'normal':
                this.style.backgroundColor = paintColorSel.value;
                break;
            case 'rndm':
                this.style.backgroundColor = 'rgb('+Math.round(Math.random()*255)+', '+Math.round(128 + Math.random()*127)+', '+Math.round(128 + Math.random()*127)+')';
                break;
            case 'lighten':
                this.style.backgroundColor = lighten(rgbToHex(this.style.backgroundColor));
                break;
            case 'darken':
                this.style.backgroundColor = darken(rgbToHex(this.style.backgroundColor));
        }   
    }
};

//Switches to change 'setting'
const rndmSwitch = document.getElementById('rndmSwitch');
rndmSwitch.addEventListener('change', () => {
    if (rndmSwitch.checked) {
        setting = 'rndm';
        lightenSwitch.checked = false;
        darkenSwitch.checked = false;
    } else {
        setting = 'normal';
    }
});

const lightenSwitch = document.getElementById('lightenSwitch');
lightenSwitch.addEventListener('change', () => {
    if (lightenSwitch.checked) {
        setting = 'lighten';
        rndmSwitch.checked = false;
        darkenSwitch.checked = false;
    } else {
        setting = 'normal';
    }
});

const darkenSwitch = document.getElementById('darkenSwitch');
darkenSwitch.addEventListener('change', () => {
    if (darkenSwitch.checked) {
        setting = 'darken';
        rndmSwitch.checked = false;
        lightenSwitch.checked = false;
    } else {
        setting = 'normal';
    }
});

//Size changer
selector.addEventListener('change', ()=>{
    size = selector.value;
    container.innerHTML = ''; //This line sets the cointainer to have no content
    setGame();
});

//Reset button to turn the board white
resetBtn.addEventListener('click', ()=>{
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = '#ffffff';
    };
    currentBoardColor = '#ffffff';
});

 //Board color change
 boardColorSel.addEventListener('change', ()=>{
    for (let q = 0; q < (size*size); q++) {
            if (rgbToHex(allSq[q].style.backgroundColor) == currentBoardColor) {
                allSq[q].style.backgroundColor = boardColorSel.value;
            };
    };
    currentBoardColor = boardColorSel.value;
});

