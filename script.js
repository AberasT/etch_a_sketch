let size = 16; //window.prompt('New size?', 8);
const container = document.getElementById('board');
container.style.width = '80vh';
container.style.height = '80vh';
container.style.borderStyle = 'solid';

const allSq = document.getElementsByClassName('square');
const resetBtn = document.getElementById('reset');

for (let i = 1; i < (size+1) ; i++) {
    for (let j = 1; j < (size+1) ; j++) {
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

resetBtn.addEventListener('click', ()=>{
    for (let k = 0; k < (size*size); k++) {
        allSq[k].style.backgroundColor = 'white';
    };
});
