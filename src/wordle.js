
let charCount = countChar(currentWord);
let correct = {};
let tried = {};






function countChar(currentWord) {
  let count = {};
  for (let i = 0; i < currentWord.length; i++) {
    if (count[currentWord[i]])
      count[currentWord[i]] += 1;
    else {
      count[currentWord[i]] = 1;
    }
  }
  return count;
}

function write(e) {
  if (letters.includes(e.toLowerCase())) {//check if input is legal
    current_focus.value = e.toUpperCase();//add value to input
    if (current_focus.nextSibling) {
      current_focus.setAttribute('disabled', ''); // set current input to disabled
    }
    moveFocus();//move the focus to next one
  } else {
    current_focus.value = '';
  }
}

function deleteWord() {

  let prev = current_focus.previousSibling;
  if(current_focus.value !== ''){
    current_focus.value = '';
    return;
  } else if (prev){
    current_focus.blur();
    current_focus.setAttribute('disabled','');
    current_focus = prev;
    current_focus.removeAttribute('disabled');
    current_focus.focus();
  }
}

function searchCorrectWords(row) {//search for correct words in the row
  let win = checkWin(row)
  let keyboard;
  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    let val = row.children[index].value;
    keyboard = document.getElementById(val);
    if (currentWord.includes(val)) {
      if (currentWord[index] === val) {
        row.children[index].classList.add('correct');//correct place
        keyboard.classList.add('correct');
        keyboard.classList.remove('exist');
        charCount[val] -= 1;
      }else{
        if(!keyboard.className.includes('correct')){
        keyboard.classList.add('exist');
        }
      }
    } else {
      row.children[index].classList.add('wrong');
      keyboard.classList.add('wrong');
    }
  }
  tried = countChar(currentWord);
  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    let val = row.children[index].value;
    //keyboard = document.getElementById(val);
    if (currentWord.includes(val) && currentWord[index] !== val) {
      if (tried[val] > 0 && !row.children[index].classList.contains('correct') && charCount[val] >= 1) {
        row.children[index].classList.add('exist');//exist in the given word
        tried[val] -= 1;
      }
      else {
        row.children[index].classList.add('wrong');

      }
    }
  }


  if (!win) {
    moveRow();
  }
}

function checkWin(row) {//check if all the word are correct and in order
  let win = ''
  for (let i = 0; i < row.children.length; i++) {
    win += row.children[i].value;
  }
  if (win === currentWord) {
    showPopup(row, 'You Win!');
    return true;
  }
  return false;
}


function moveFocus() {//move the focus from correct column and remove the disabled from the next
  if (current_focus.nextSibling) {
    current_focus.blur();
    current_focus = current_focus.nextSibling;
    current_focus.removeAttribute('disabled');
    current_focus.focus();
  }
  current_focus.focus();
}

function moveRow() {// if row is full move to next row
  let row = current_focus.parentElement;
  let next_row = row.nextSibling;
  if(next_row){
    current_focus = next_row.children[0];
    current_focus.removeAttribute('disabled');
    current_focus.focus();
    charCount = countChar(currentWord);
    return;
  }
  showPopup(row, 'You Lose...');
}