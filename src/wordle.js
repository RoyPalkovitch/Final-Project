
const letters = 'qwertyuiopasdfghjklzxcvbnm';//letters possibility
const currentWord = 'lidan'.toUpperCase();//current word to guess

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

function deleteWord(col) {
  let parent = col.parentElement;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i + 1] === col) {
      parent.children[i].value = '';
      parent.children[i].removeAttribute('disabled');
      col.blur();
      parent.children[i].focus();
      col.setAttribute('disabled', '');

    }
  }
}

function searchCorrectWords(row) {//search for correct words in the row
  let win = checkWin(row)

  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    let val = row.children[index].value;
    if (currentWord.includes(val)) {
      if (currentWord[index] === val) {
        row.children[index].classList.add('correct');//correct place
        charCount[val] -= 1;
      }
    } else {
      row.children[index].classList.add('wrong');
    }
  }
  tried = countChar(currentWord);
  for (let index = 0; index < row.children.length; index++) {//checking each column in row
    let val = row.children[index].value;
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
    moveRow(row);
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
      charCount = countChar(currentWord);
      return;
    }
  }

  showPopup(row, 'You Lose...');
}











//document.activeElement



