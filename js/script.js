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
        guessesLeft: 7,
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
            { word: "Peter", hint: "" },
            { word: "Simon", hint: "" },
            { word: "Andrew", hint: "" },
            { word: "James", hint: "" },
            { word: "Zebedee", hint: "" },
            { word: "John", hint: "" },
            { word: "Philip", hint: "" },
            { word: "Bartholomew", hint: "" },
            { word: "Thomas", hint: "" },
            { word: "Matthew", hint: "" },
            { word: "James son of Alphaeus", hint: "" },
            { word: "Thaddaeus", hint: "" },
            { word: "Simon the Canaanite", hint: "" },
            { word: "Judas Iscariot", hint: "" },
            { word: "Apostle", hint: "" },
            { word: "Mark", hint: "" },
            { word: "Luke", hint: "" },
            { word: "The Acts of the Apostles", hint: "" },
            { word: "Pharisee", hint: "" },
            { word: "Sadducee", hint: "" },
            { word: "Temple", hint: "" },
            { word: "New Testament", hint: "" },
            { word: "Messiah", hint: "" },
            { word: "Jesus of Nazareth", hint: "" },
            { word: "Jerusalem", hint: "" },
            { word: "Mary", hint: "" },
            { word: "Joseph", hint: "" },
            { word: "Stable", hint: "" },
            { word: "Bethlehem", hint: "" },
            { word: "Galilee", hint: "" },
            { word: "Capernaum", hint: "" },
            { word: "Samaria", hint: "" },
            { word: "Widow of Nain", hint: "" },
            { word: "Mary Magdalene", hint: "" },
            { word: "Martha", hint: "" },
            { word: "He is Risen", hint: "" },
            { word: "Golgotha", hint: "" },
            { word: "Exegesis", hint: "" },
            { word: "Eisegesis", hint: "" },
            { word: "Hermeneutics", hint: "" },
        ],
    },
    //TODO: possibly put guesses left above letters instead of to right
    methods: {
        //Resets the game; chooses new word and resets letters
        reset() {
            console.log("You clicked the reset button!");
            this.guessesLeft = 7;
            //TODO: Make reset work
            for (letter in this.alphabet) {
                letter.display = true;
            }
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

                //TODO: display hangman part on wrong guess
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

                //TODO: Make guessing work with upper and lower case;
                //Check if it is uppercase
                let addChar = myChar;
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
        },
        showHangmanPiece() {

        },
        //Function to run on page load and choose a random word in the possibleWords array
        chooseWord() {
            let size = this.possibleWords.length;
            //Choose a random index in the possibleWords array
            let index = Math.floor(Math.random() * size);
            this.wordToGuess = this.possibleWords[index].word;
            
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
        }
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
        //displayWord() {
        // let displayWord = "";
        // let temp = this.wordToGuess;

        // for (let i = 0; i < this.wordToGuess.length; ++i) {
        //     //Get the first char of wordToGuess
        //     let myChar = temp.charAt(0);

        //     //TODO: Make guessing work with upper and lower case;
        //     //Check if it is uppercase
        //     let addChar = myChar;
        //     let wasUpper = false;
        //     if (myChar == myChar.toUpperCase()) {
        //         //So that there are no issues with array finding
        //         myChar = myChar.toLowerCase();
        //         wasUpper = true;
        //     }

        //     //Check if the char is a letter
        //     if (myChar.match(/[a-z]/i) != null) { //match returns an array of results; null means none found
        //         //If so, see if that letter has been guessed
        //         //Make a temp letter object to search for it
        //         if (this.guessedLetters.indexOf(myChar) != -1) {
        //             //That letter has been guessed so display it
        //             //But first check if it should be uppercase
        //             if (wasUpper) {
        //                 displayWord += myChar.toUpperCase();
        //             }
        //             else {
        //                 displayWord += myChar;
        //             }
        //         }
        //         else {
        //             //Else add a dash to displayWord
        //             displayWord += "-";
        //             //Decrement number of guesses left
        //             if (this.guessedLetters.length != 0) {
        //                 --this.guessesLeft;
        //             }
        //             //TODO: display hangman part on wrong guess
        //         }
        //     }
        //     else {
        //         displayWord += myChar;
        //     }
        //     //Remove first char from temp
        //     temp = temp.substring(1);
        // }
        // return displayWord;
        //},
    },
    //This will run on page load
    beforeMount() {
        this.chooseWord();
        this.formatDisplayWord();
    },
})