//  Sets the size input to a variable and asigns the default value
const selector = document.getElementById('sizes'); 
let size = selector.value;


/*  With the size value, creates a grid of divs.
Each div is assigned to a row and a column and setted to "currentBoardColor". */
const container = document.getElementById('board');
let currentBoardColor = '#ffffff';
function makeGrid() {
    for (let i = 1; i <= size; i++) {  //One 'for' loop is for the rows (i) and the other one is for the columns (j).
        for (let j = 1; j <= size ; j++) {
            let d = document.createElement('div');
            d.setAttribute('class', 'square');
            d.style.gridRow = i;
            d.style.gridColumn = j;
            d.style.backgroundColor = currentBoardColor; //At the start, that current board color is white.
            container.appendChild(d); //The finished div is contained by the board.
        };
    };
};

//  Sets another variable with the board but just for changing its border color as an indicator
const ind = document.querySelector("#board");
ind.style.borderColor = '#5c5c74';

/*  "updateSwitches" sets the menu style to indicate the current setting. 
The first parameter is the one activated.
The "normal" setting is the default */
const normalText = document.querySelector("#normal-text");
const rndmText = document.querySelector("#rndm-text");
const lightenText = document.querySelector("#lighten-text");
const darkenText = document.querySelector("#darken-text");
function updateSwitches(swUp,swDown1,swDown2,swDown3) {
    swUp.style.color = '#f5efc7';
    swUp.style.textShadow = '0 0 4px #e2d99e';
    swUp.style.textDecoration = 'underline';
    swDown1.style.color = '#b6b191';
    swDown1.style.textShadow = 'none';
    swDown1.style.textDecoration = 'none';
    swDown2.style.color = '#b6b191';
    swDown2.style.textShadow = 'none';
    swDown2.style.textDecoration = 'none';
    swDown3.style.color = '#b6b191';
    swDown3.style.textShadow = 'none';
    swDown3.style.textDecoration = 'none';
};
updateSwitches(normalText,rndmText,lightenText,darkenText);

/*  setGame creates and sets all the elements necessary to play.
This function is called at the start and then each time the size changes. */
let allSq;
let paint = false;
function setGame() {
    makeGrid();
    allSq = Array.from(document.getElementsByClassName('square'));
    allSq.forEach(square => square.addEventListener('click', () => { // If a div is clicked, the painting mode goes 'on' or 'off'
        paint = !paint;
        (paint) ? ind.style.borderColor = '#e2d99e' : ind.style.borderColor = '#5c5c74'; // Indication border
    }));
    allSq.forEach(square => square.addEventListener('mouseover', coloring)); // Sets each div and event listener to call the "coloring" function
};
setGame();

/*  This function gets a rgb string value such as "rgb(255, 255, 255)" and returns that value in hex code like "#ffffff"
Solves some errors when trying to compare color values in different formats. */
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

//  Function that receives a color and adds that color a bit of red, green and blue, unless it is already white (full rgb values).
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

//  Function that receives a color and removes that color a bit of red, green and blue, unless it is already black (minimum rgb values).
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

//  According to the current setting, "coloring" paints the div.
let setting = 'normal'; // By default
const paintColorSel = document.getElementById('paint-color');
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

//  Event listeners for the settings switches / buttons. Each one changes the current setting and updates the styles

normalText.addEventListener('click', () => {
    setting = 'normal';
    lightenSwitch.checked = false;
    darkenSwitch.checked = false;
    rndmSwitch.checked = false;
    updateSwitches(normalText,rndmText,lightenText,darkenText);
});
const rndmSwitch = document.getElementById('rndmSwitch');
rndmSwitch.addEventListener('change', () => {
    if (rndmSwitch.checked) {
        setting = 'rndm';
        lightenSwitch.checked = false;
        darkenSwitch.checked = false;
        updateSwitches(rndmText,lightenText,darkenText,normalText);
    } else {
        setting = 'normal';
        updateSwitches(normalText,rndmText,lightenText,darkenText);
    }
});
const lightenSwitch = document.getElementById('lightenSwitch');
lightenSwitch.addEventListener('change', () => {
    if (lightenSwitch.checked) {
        setting = 'lighten';
        rndmSwitch.checked = false;
        darkenSwitch.checked = false;
        updateSwitches(lightenText,rndmText,darkenText,normalText);
    } else {
        setting = 'normal';
        updateSwitches(normalText,rndmText,lightenText,darkenText);
    }
});
const darkenSwitch = document.getElementById('darkenSwitch');
darkenSwitch.addEventListener('change', () => {
    if (darkenSwitch.checked) {
        setting = 'darken';
        rndmSwitch.checked = false;
        lightenSwitch.checked = false;
        updateSwitches(darkenText,lightenText,rndmText,normalText);
    } else {
        setting = 'normal';
        updateSwitches(normalText,rndmText,lightenText,darkenText);
    }
});

//  Size changer. Deletes the board and sets a new game with the new size.
selector.addEventListener('change', ()=>{
    size = selector.value;
    container.innerHTML = '';
    setGame();
});

//  Reset button that turns the board white.
const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', ()=>{
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = '#ffffff';
    };
    currentBoardColor = '#ffffff';
});

 // Board color changer.
 const boardColorSel = document.getElementById('board-color');
 boardColorSel.addEventListener('change', ()=>{
    for (let q = 0; q < (size*size); q++) {
            if (rgbToHex(allSq[q].style.backgroundColor) == currentBoardColor) {
                allSq[q].style.backgroundColor = boardColorSel.value;
            };
    };
    currentBoardColor = boardColorSel.value;
});