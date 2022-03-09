var hangman = new Vue({
    //Only applies to the div with ID of app
    el: "#app",
    data: {
        //Page Title
        title: "New Testament Hangman",
        //Word to guess
        wordToGuess: "",
        //Array of all letters in english alphabet
        alphabet: [
            {letter: "a", display: true},
            {letter: "b", display: true},
            {letter: "c", display: true},
            {letter: "d", display: true},
            {letter: "e", display: true},
            {letter: "f", display: true},
            {letter: "g", display: true},
            {letter: "h", display: true},
            {letter: "i", display: true},
            {letter: "j", display: true},
            {letter: "k", display: true},
            {letter: "l", display: true},
            {letter: "m", display: true},
            {letter: "n", display: true},
            {letter: "o", display: true},
            {letter: "p", display: true},
            {letter: "q", display: true},
            {letter: "r", display: true},
            {letter: "s", display: true},
            {letter: "t", display: true},
            {letter: "u", display: true},
            {letter: "v", display: true},
            {letter: "w", display: true},
            {letter: "x", display: true},
            {letter: "y", display: true},
            {letter: "z", display: true},
        ],
        //Array of possible words for the user to guess
        possibleWords: [
            {word: "Peter", hint: ""},
            {word: "Simon", hint: ""},
            {word: "Andrew", hint: ""},
            {word: "James", hint: ""},
            {word: "Zebedee", hint: ""},
            {word: "John", hint: ""},
            {word: "Philip", hint: ""},
            {word: "Bartholomew", hint: ""},
            {word: "Thomas", hint: ""},
            {word: "Matthew", hint: ""},
            {word: "James son of Alphaeus", hint: ""},
            {word: "Thaddaeus", hint: ""},
            {word: "Simon the Canaanite", hint: ""},
            {word: "Judas Iscariot", hint: ""},
            {word: "Apostle", hint: ""},
            {word: "Mark", hint: ""},
            {word: "Luke", hint: ""},
            {word: "The Acts of the Apostles", hint: ""},
            {word: "Pharisee", hint: ""},
            {word: "Sadducee", hint: ""},
            {word: "Temple", hint: ""},
            {word: "New Testament", hint: ""},
            {word: "Messiah", hint: ""},
            {word: "Jesus of Nazareth", hint: ""},
            {word: "Jerusalem", hint: ""},
            {word: "Mary", hint: ""},
            {word: "Joseph", hint: ""},
            {word: "Stable", hint: ""},
            {word: "Bethlehem", hint: ""},
            {word: "Galilee", hint: ""},
            {word: "Capernaum", hint: ""},
            {word: "Samaria", hint: ""},
            {word: "Widow of Nain", hint: ""},
            {word: "Mary Magdalene", hint: ""},
            {word: "Martha", hint: ""},
            {word: "He is Risen", hint: ""},
            {word: "Golgotha", hint: ""},
            {word: "Exegesis", hint: ""},
            {word: "Eisegesis", hint: ""},
            {word: "Hermeneutics", hint: ""},
        ],
    },
    methods: {
        //Resets the game; chooses new word and resets letters
        reset() {
            console.log("You clicked the reset button!");
        },
        //Guess a letter
        guessLetter(letter) {
            letter.display = false;
        },
        //Function to run on page load and choose a random word in the possibleWords array
        chooseWord() {
            let size = this.possibleWords.length;
            //Choose a random index in the possibleWords array
            let index = Math.floor(Math.random() * size);
            this.wordToGuess = this.possibleWords[index].word;
        }
    },
    computed: {
        //Returns a new array of only letters that have not been guessed
        letters() {
            return this.alphabet.filter(item => { return item.display; });
        },
    },
    //This will run on page load
    beforeMount(){
        this.chooseWord();
     },
})