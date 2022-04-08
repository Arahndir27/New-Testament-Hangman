var hangman = new Vue({
    //Only applies to the div with ID of app
    el: "#app",
    data: {
        //Page Title
        title: "New Testament Hangman",
        //Word to guess
        wordToGuess: "",
        lettersInWord: new Set(),
        displayWord: "",
        userLost: false,
        userWon: false,
        guessesLeft: 7,
        imagePath: "/images/hangman-blank.png",

        //Array of all letters in english alphabet
        alphabet: [
            { letter: "a", display: true },
            { letter: "b", display: true },
            { letter: "c", display: true },
            { letter: "d", display: true },
            { letter: "e", display: true },
            { letter: "f", display: true },
            { letter: "g", display: true },
            { letter: "h", display: true },
            { letter: "i", display: true },
            { letter: "j", display: true },
            { letter: "k", display: true },
            { letter: "l", display: true },
            { letter: "m", display: true },
            { letter: "n", display: true },
            { letter: "o", display: true },
            { letter: "p", display: true },
            { letter: "q", display: true },
            { letter: "r", display: true },
            { letter: "s", display: true },
            { letter: "t", display: true },
            { letter: "u", display: true },
            { letter: "v", display: true },
            { letter: "w", display: true },
            { letter: "x", display: true },
            { letter: "y", display: true },
            { letter: "z", display: true },
        ],
        //Array of possible words for the user to guess
        possibleWords: [
            { word: "Peter", hint: "", used: false },
            { word: "Simon", hint: "", used: false },
            { word: "Andrew", hint: "", used: false },
            { word: "James", hint: "", used: false },
            { word: "Zebedee", hint: "", used: false },
            { word: "John", hint: "", used: false },
            { word: "Philip", hint: "", used: false },
            { word: "Bartholomew", hint: "", used: false },
            { word: "Thomas", hint: "", used: false },
            { word: "Matthew", hint: "", used: false },
            { word: "James son of Alphaeus", hint: "", used: false },
            { word: "Thaddaeus", hint: "", used: false },
            { word: "Simon the Canaanite", hint: "", used: false },
            { word: "Judas Iscariot", hint: "", used: false },
            { word: "Apostle", hint: "", used: false },
            { word: "Mark", hint: "", used: false },
            { word: "Luke", hint: "", used: false },
            { word: "The Acts of the Apostles", hint: "", used: false },
            { word: "Pharisee", hint: "", used: false },
            { word: "Sadducee", hint: "", used: false },
            { word: "Temple", hint: "", used: false },
            { word: "New Testament", hint: "", used: false },
            { word: "Messiah", hint: "", used: false },
            { word: "Jesus of Nazareth", hint: "", used: false },
            { word: "Jerusalem", hint: "", used: false },
            { word: "Mary", hint: "", used: false },
            { word: "Joseph", hint: "", used: false },
            { word: "Stable", hint: "", used: false },
            { word: "Bethlehem", hint: "", used: false },
            { word: "Galilee", hint: "", used: false },
            { word: "Capernaum", hint: "", used: false },
            { word: "Samaria", hint: "", used: false },
            { word: "Widow of Nain", hint: "", used: false },
            { word: "Mary Magdalene", hint: "", used: false },
            { word: "Martha", hint: "", used: false },
            { word: "He is Risen", hint: "", used: false },
            { word: "Golgotha", hint: "", used: false },
            { word: "Exegesis", hint: "", used: false },
            { word: "Eisegesis", hint: "", used: false },
            { word: "Hermeneutics", hint: "", used: false },
        ],
    },
    //TODO: possibly put guesses left above letters instead of to right
    methods: {
        //Resets the game; chooses new word and resets letters
        reset() {
            console.log("You clicked the reset button!");
            //Reset initial values
            this.userLost = false;
            this.userWon = false;
            this.guessesLeft = 7;
            this.imagePath = "/images/hangman-blank.png";

            //Reset which letters should appear
            for (let i = 0; i < this.alphabet.length; ++i) {
                this.alphabet[i].display = true;
            }

            //Choose a new word
            this.chooseWord();
            this.formatDisplayWord();
        },
        //Guess a letter
        guessLetter(letter) {
            //Set that letter as guessed
            letter.display = false;

            //Decrement number of guesses left
            if (!this.lettersInWord.has(letter.letter)) {
                //Wrong guess!
                --this.guessesLeft;
                if (this.guessesLeft === 0) {
                    this.userLost = true;
                }

                //Display hangman part on wrong guess
                this.showHangmanPiece();
            }

            //Format the display word
            this.formatDisplayWord();
        },
        formatDisplayWord() {
            let displayWordBuilder = "";
            let temp = this.wordToGuess;

            for (let i = 0; i < this.wordToGuess.length; ++i) {
                //Get the first char of wordToGuess
                let myChar = temp.charAt(0);

                //Check if it is uppercase
                let wasUpper = false;
                if (myChar == myChar.toUpperCase()) {
                    //So that there are no issues with array finding
                    myChar = myChar.toLowerCase();
                    wasUpper = true;
                }

                //Check if the char is a letter
                if (myChar.match(/[a-z]/i) != null) { //match returns an array of results; null means none found
                    //If so, see if that letter has been guessed
                    //Make a temp letter object to search for it
                    if (this.guessedLetters.indexOf(myChar) != -1) {
                        //That letter has been guessed so display it
                        //But first check if it should be uppercase
                        if (wasUpper) {
                            displayWordBuilder += myChar.toUpperCase();
                        }
                        else {
                            displayWordBuilder += myChar;
                        }
                    }
                    else {
                        //Else add a dash to displayWord
                        displayWordBuilder += "-";
                    }
                }
                else {
                    displayWordBuilder += myChar;
                }
                //Remove first char from temp
                temp = temp.substring(1);
            }
            this.displayWord = displayWordBuilder;

            //Check and see if the user guessed the whole word
            if ((this.guessesLeft > 0) && (this.displayWord === this.wordToGuess)) {
                //The user wins!
                this.userWon = true;
            }
        },
        showHangmanPiece() {
            switch (this.guessesLeft) {
                case 6:
                    this.imagePath = "/images/hangman-0.png";
                    break;
                case 5:
                    this.imagePath = "/images/hangman-1.png";
                    break;
                case 4:
                    this.imagePath = "/images/hangman-2.png";
                    break;
                case 3:
                    this.imagePath = "/images/hangman-3.png";
                    break;
                case 2:
                    this.imagePath = "/images/hangman-4.png";
                    break;
                case 1:
                    this.imagePath = "/images/hangman-5.png";
                    break;
                case 0:
                    this.imagePath = "/images/hangman-6.png";
                    break;
            }
        },
        //Function to run on page load and choose a random word in the unusedWords array
        chooseWord() {
            //Check if I need to reset the possibleWords array
            if (this.unusedWords.length === 0) {
                for (word in this.possibleWords) {
                    word.used = false;
                }
            }

            let size = this.unusedWords.length;
            //Choose a random index in the unusedWords array
            let index = Math.floor(Math.random() * size);
            this.wordToGuess = this.unusedWords[index].word;

            //Mark that word as used
            let indexToMark = this.possibleWords.findIndex(word => word = this.wordToGuess);
            this.possibleWords[indexToMark].used = true;

            //Add letters in word to set
            this.createLetterSet();
        },
        createLetterSet() {
            //Add letters in word to set
            let temp = this.wordToGuess;
            for (let i = 0; i < this.wordToGuess.length; ++i) {
                let myChar = temp.charAt(i);
                //Only add letters to the set
                if (myChar.match(/[a-z]/i) != null) {
                    this.lettersInWord.add(myChar.toLowerCase());
                }
            }
        },
        //This function is so that no hover effects occur on a mobile screen
        watchForHover() {
            // lastTouchTime is used for ignoring emulated mousemove events
            // that are fired after touchstart events. Since they're
            // indistinguishable from real events, we use the fact that they're
            // fired a few milliseconds after touchstart to filter them.
            let lastTouchTime = 0

            function enableHover() {
                if (new Date() - lastTouchTime < 500) return
                document.body.classList.add('hasHover')
            }

            function disableHover() {
                document.body.classList.remove('hasHover')
            }

            function updateLastTouchTime() {
                lastTouchTime = new Date()
            }

            document.addEventListener('touchstart', updateLastTouchTime, true)
            document.addEventListener('touchstart', disableHover, true)
            document.addEventListener('mousemove', enableHover, true)

            enableHover()
        },
    },
    computed: {
        //Returns a new array of only letters that have not been guessed
        letters() {
            return this.alphabet.filter(item => { return item.display; });
        },
        guessedLetters() {
            //Get array of guessed letters
            let temp = this.alphabet.filter(item => { return !item.display; });
            //Extract them so I just have an array of strings, not objects
            let guessedLetters = [];
            for (let i = 0; i < temp.length; ++i) {
                guessedLetters.push(temp[i].letter);
            }
            return guessedLetters;
        },
        unusedWords() {
            return this.possibleWords.filter(item => { return !item.used; });
        }
    },
    //This will run on page load
    beforeMount() {
        this.chooseWord();
        this.formatDisplayWord();
    },
    mounted() {
        this.watchForHover();
    }
})