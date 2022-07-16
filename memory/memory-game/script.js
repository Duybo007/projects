const gameContainer = document.getElementById("game");
let hasFlippedCard = false
let firstCard, secondCard
let cardsFlipped = 0

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

 // TODO: Implement this function!
function handleCardClick(event) {
  
  

  // change color when click
  gameContainer.addEventListener('click', function(event){
  event.target.style.backgroundColor = event.target.classList[0]
  })
  if (!hasFlippedCard){
    // first click
    
    hasFlippedCard = true
    firstCard = this
    
  }
  else {
    // second click
    hasFlippedCard = false
    secondCard = this
      // check match
    if (firstCard.className === secondCard.className){
      // if match, remove event
      cardsFlipped += 2
      firstCard.removeEventListener('click', handleCardClick)
      secondCard.removeEventListener('click', handleCardClick)
    } else {
      // change color back
      setTimeout(() => {
        firstCard.style.backgroundColor=""
        secondCard.style.backgroundColor=""
      }, 500)
    }
  }
  if (cardsFlipped === COLORS.length) alert("game over!")
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */


