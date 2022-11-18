const main_container = document.getElementById('main'); //get the main section
const popUp = document.getElementById('popup');

function createBoard() {//creating the board dynmicly
  let container = document.createElement('section');//create section
  container.id = 'guess-container';//assign id to above section
  main_container.appendChild(container); //appending the section above
  let elem_row;// gonna be a row

  let elem_col;// gonna be a col inside row

  for (let i = 0; i < 5; i++) {//create 6 rows
    elem_row = document.createElement('div');
    elem_row.className = 'row';
    for (let j = 0; j < 5; j++) {//create 5 columns
      elem_col = document.createElement('input');
      elem_col.className = 'col game-tile';
      elem_col.setAttribute('maxlength', '1');
      if (j === 0 && i === 0) {
        elem_col.id = 'first-tile';//mark the first tile for focus on load
      } else {
        elem_col.setAttribute('disabled', '');//disabled all the buttons except the first
      }

      elem_col.addEventListener('keyup', (e) => { //add key up event
        if (j == 4 && e.key === 'Enter') {//if user pressed enter and in last coulmn
          if (e.target.value) {
            e.target.setAttribute('disabled', '');//disabled the last button while search for win
            searchCorrectWords(e.target.parentElement);// check for win
          }
        } else if (e.key === "Backspace") { // remove
          deleteWord(e.target);
        }
        else {
          write(i, j, e);//write the letter
        }
      });


      elem_row.appendChild(elem_col);
    }
    container.appendChild(elem_row);
  }
}



function showPopup(row,txt){
  popUp.style.display = 'flex';
  row.lastChild.blur();
  popUp.children[0].children[0].innerHTML = txt;
  

  popUp.children[0].children[1].addEventListener('click', (e) => {
    resetBoard(row);
  });

}



function resetBoard(row) {
  main_container.children[0].remove();
  createBoard();
  focusOnload();
  popupTxt = '';
  popUp.style.display = 'none';
  return;
}

function focusOnload() {
  let tile = document.getElementById('first-tile');
  tile.focus();
}


function createKeyboard() {
  let container = document.createElement('section');//create section
  container.id = 'keyboard';//assign id to above section
  main_container.appendChild(container); //appending the section above
  let elem_row;// gonna be a row
  let elem_col;// gonna be a col inside row

  for (let i = 0; i < 3; i++) {//create 6 rows
    elem_row = document.createElement('div');
    elem_row.className = 'row';

  }
}


createBoard();
window.onload = focusOnload;