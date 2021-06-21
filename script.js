const selector = document.getElementById('sizes');

const container = document.getElementById('board');

let size = selector.value;

//I don't know why if I dont divide by 10 then it creates a grid of size*10xsize*10
//And that only happens when It makes the grid as a function
function makeGrid() {
    for (let i = 1; i < (size + 1)/10 ; i++) { 
        for (let j = 1; j < (size + 1)/10 ; j++) {
            let d = document.createElement('div');
            d.setAttribute('class', 'square');
            d.style.gridRow = i;
            d.style.gridColumn = j;
            d.addEventListener('mouseover', ()=> {
                d.style.backgroundColor = 'black';
            })
            container.appendChild(d);
        }
    }
}

//This instruction is to make a "default" grid when the user enters the website
makeGrid();

const resetBtn = document.getElementById('reset');

selector.addEventListener('change', ()=>{
    size = selector.value;
    container.innerHTML = '';
    console.log(size);
    makeGrid();
});

resetBtn.addEventListener('click', ()=>{
    const allSq = document.getElementsByClassName('square');
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = 'white';
    };
});

