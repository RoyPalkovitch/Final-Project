
const letters = 'qwertyuiopasdfghjklzxcvbnm';//letters possibility
const currentWord = 'aaeaaa'.toUpperCase();//current word to guess

function createBoard() {//creating the board dynmicly
  let main_container = document.getElementById('main'); //get the main section
  let container = document.createElement('section');//create section
  container.id = 'guess-container';//assign id to above section
  main_container.appendChild(container); //appending the section above
  let elem_row;// gonna be a row

  let elem_col;// gonna be a col inside row

  for (let i = 0; i < 6; i++) {//create 6 rows
    elem_row = document.createElement('div');
    elem_row.className = 'row';
    for (let j = 0; j < 5; j++) {//create 5 columns
      elem_col = document.createElement('input');
      elem_col.className = 'col game-tile';
      elem_col.setAttribute('maxlength', '1');
      if (j === 0 && i === 0) {
        elem_col.autofocus = true;//focus on first element
        elem_col.focus();
      } else {
        elem_col.setAttribute('disabled', '');//disabled all the buttons except the first
      }

      elem_col.addEventListener('keyup', (e) => { //add writing event
        if (j == 4 && e.key === 'Enter') {//if user pressed enter and in last coulmn
          if(e.target.value){
          e.target.setAttribute('disabled', '');//disabled all the buttons except the first
          searchCorrectWords(e.target.parentElement);// check for win
          }
        } else if (e.key === "Backspace"){
          deleteWord(e.target);
        }
        else {
          write(i, j, e);
        }
      });


      elem_row.appendChild(elem_col);
    }
    container.appendChild(elem_row);
  }
}

function write(i, j, e) {
  if (letters.includes(e.key.toLowerCase())) {//check if input is legal
    e.target.value = e.key.toUpperCase();//add value to input
    if (j !== 4) {
      e.target.setAttribute('disabled', ''); // set current input to disabled
      moveFocus(e.target.parentElement, j);//move the focus to next one
    }
  } else {
    e.target.value = '';
  }
}

function deleteWord(col){
  let parent = col.parentElement;
  for(let i = 0; i < parent.children.length; i++){
    if(parent.children[i+1] === col){
      parent.children[i].value = '';
      parent.children[i].removeAttribute('disabled');
      col.blur();
      parent.children[i].focus();
      col.setAttribute('disabled','');

    }
  }
}

function searchCorrectWords(row) {//search for correct words in the row
  if (checkWin(row)) {//if win reset the game
    alert('Winner');
    row.parentElement.remove();
    createBoard();
    return;
  }
  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    if (currentWord.includes(row.children[index].value)) {
      if (currentWord[index] === row.children[index].value) {
        row.children[index].classList.add('correct');//correct place
      } else {
        row.children[index].classList.add('exist');//exist in the given word
      }
    } else{
      row.children[index].classList.add('wrong');
    }
  }
  moveRow(row);
}

function checkWin(row) {//check if all the word are correct and in order
  let win = ''
  for (let i = 0; i < row.children.length; i++) {
    win += row.children[i].value;
  }
  if (win === currentWord) {
    return true;
  }
  return false;
}


function moveFocus(row, col) {//move the focus from correct column and remove the disabled from the next
  if (col < 4) {
    row.children[col].blur();
    row.children[col + 1].removeAttribute('disabled');
    row.children[col + 1].focus();
  }
}

function moveRow(row) {// if row is full move to next row
  let parent = row.parentElement;
  for (let i = 0; i < parent.children.length - 1; i++) {
    if (parent.children[i] === row) {
      parent.children[i + 1].children[0].removeAttribute('disabled');

      parent.children[i + 1].children[0].focus();
      return;
    }
  }
  resetBoard(row);
}

function resetBoard(row) {
  alert('Loser');
  row.parentElement.remove();
  createBoard();
  return;
}


createBoard();

