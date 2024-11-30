const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (this.word.includes(letter) && !this.correctLetters.includes(letter)) { // if correct letter & not previously guessed
 // *** SOLVE THIS ***     
      this.displayWord = this.word.split('') // update displayWord to disp letter instead of _
      this.correctLetters.push(letter) // add letter to correctLetters array
    } else { // if incorrect letter
      this.remainingGuesses -= 1 // decrement remainingGuesses by 1
      this.incorrectLetters.push(letter) // add letter to incorrectLetters array
    }
  }


  // implement the updateScreen function:
  // should update HTML with data from the object
  updateScreen() {
    // update #remaining-guesses with value in remainingGuesses
    document.getElementById('remaining-guesses').textContent = this.remainingGuesses
    // update #incorrect-letters with value in incorrectLetters
    document.getElementById('incorrect-guess').textContent = this.incorrectLetters.join('')
    // update #word-to-guess with value in displayWord
    document.getElementById('word-to-guess').textContent = this.displayWord
  }

  // implement the isGameOver function:
  // should return true if game is over, false if game is not over
  // default is false
  isGameOver() {
    // (true) game is over if:
      // remainingGuesses <= 0
      // if word === displayedWord
  }

  // implement the getWinOrLoss function:
  // should return "win", "loss" when game is done or "null" if game is in progress
  getWinOrLoss() {
    // user has won if word === displayedWord AND remainingGuesses > 0
    // user has lost if displayedWord is not equal to word AND remainingGuesses <= 0
  }
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()