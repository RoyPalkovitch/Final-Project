
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


function deleteWord() {
  let prev = current_focus.previousSibling;
  current_focus.innerHTML = '';
  if (prev) {
      current_focus.classList.remove('focus');
      current_focus = prev;
      current_focus.classList.add('focus');
    }
  
}

function searchCorrectWords(row) {//search for correct words in the row
  let win = checkWin(row)
  let keyboard;
  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    let val = row.children[index].innerHTML;
    keyboard = document.getElementById(val);
    if (currentWord.includes(val)) {
      if (currentWord[index] === val) {
        row.children[index].classList.add('correct');//correct place
        keyboard.classList.add('correct');
        keyboard.classList.remove('exist');
        charCount[val] -= 1;
      } else {
        if (!keyboard.className.includes('correct')) {
          keyboard.classList.add('exist');
        }
      }
    } else {
      row.children[index].classList.add('wrong');
      keyboard.classList.add('wrong');
    }
  }
  //tried = countChar(currentWord) tried[val] > 0 && ;
  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    let val = row.children[index].innerHTML;
    if (currentWord.includes(val) && currentWord[index] !== val) {
      if (!row.children[index].classList.contains('correct') && charCount[val] >= 1) {
        row.children[index].classList.add('exist');//exist in the given word
        charCount[val] -= 1;
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
    win += row.children[i].innerHTML;
  }
  if (win === currentWord) {
    showPopup(row, 'You Win!');
    return true;
  }
  return false;
}


function write(e) {
  if (letters.includes(e.toLowerCase())) {//check if input is legal
    if(current_focus.innerHTML && current_focus.nextSibling){
      moveFocus();
      current_focus.innerHTML = e.toUpperCase();//add value to input
    } else if (current_focus.nextSibling) {
      current_focus.innerHTML = e.toUpperCase();//add value to input
      moveFocus();//move the focus to next one
    }else{
      current_focus.innerHTML = e.toUpperCase();//add value to input
    }
  } else {
    current_focus.innerHTML = '';
  }
}


function moveFocus() {//move the focus from correct column and remove the disabled from the next
  if (current_focus.nextSibling) {
    current_focus.classList.remove('focus');//remove focus class
    current_focus = current_focus.nextSibling;// move the focus to sibling
    current_focus.classList.add('focus');//add focus class
  }
}

function moveRow() {// if row is full move to next row
  let row = current_focus.parentElement;//get the current row
  let next_row = row.nextSibling;//move to next row
  if (next_row) {//if not last row
    current_focus.classList.remove('focus');
    current_focus = next_row.children[0];//change current focus for first element in next row
    current_focus.classList.add('focus');//add focus class

    charCount = countChar(currentWord);
    return;
  }
  showPopup(row, 'You Lose...');
}