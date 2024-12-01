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
  // if correct letter & not previously guessed
    // update displayWord to disp letter instead of _
    // add letter to correctLetters array
  // if incorrect letter
  guessLetter(letter) {
    console.log(this.displayWord)
    if (this.word.includes(letter) && !this.correctLetters.includes(letter)) { 
      this.displayWord = this.word.split('').map(char => {
        return this.correctLetters.includes(char) || char === letter ? char : '_'
      }).join('') 
      this.correctLetters.push(letter) 
    } else { 
      if (!this.incorrectLetters.includes(letter)) {
      this.remainingGuesses -= 1 // decrement remainingGuesses by 1
      this.incorrectLetters.push(letter) // add letter to incorrectLetters array
      }
    }
  }


  // implement the updateScreen function:
  // should update HTML with data from the object
  // update #remaining-guesses with value in remainingGuesses
  // update #incorrect-letters with value in incorrectLetters
  // update #word-to-guess with value in displayWord
  updateScreen() {
    document.getElementById('remaining-guesses').textContent = this.remainingGuesses
    console.log(this.remainingGuesses)
    document.getElementById('incorrect-letters').textContent = this.incorrectLetters.join(', ')
    document.getElementById('word-to-guess').textContent = this.displayWord
  }

  // implement the isGameOver function:
  // should return true if game is over, false if game is not over
  isGameOver() {
    if (this.displayWord == this.word || this.remainingGuesses <= 0) {
      return true
    } else {
      return false
    }
  }

  // implement the getWinOrLoss function:
  // should return "win", "loss" when game is done or "null" if game is in progress
  // user has won if word === displayedWord AND remainingGuesses > 0
  // user has lost if displayedWord is not equal !== to word AND remainingGuesses <= 0
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return 'win'
    } 
    if (this.displayWord !== this.word && this.remainingGuesses <= 0) {
      return 'loss'
    } else {
      return null
    }
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