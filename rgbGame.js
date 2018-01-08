// set values for html elements
var rgbValues = document.querySelector("#rgbValues");
var newColors = document.querySelector("#newColors");
var easy = document.querySelectorAll("label")[0];
var hard = document.querySelectorAll("label")[1];
var colorSquare = document.querySelectorAll(".color-square");
var youWon = document.querySelector(".youWon");

// Javascript variables
var numberSquares = 3;
var correct = "";
var correctSlot = 7;
var winningSquare = 7;

// Change the colors when clicking "New Colors"
newColors.addEventListener("click", function() {
	randomizeColorSquares();
});	

// Change number of squares and reset colors when changing the difficulty setting
easy.addEventListener("click", function() {
	numberSquares = 3;
	// Clear the extra squares back to black
	colorSquare[3].style.backgroundColor = "black";
	colorSquare[4].style.backgroundColor = "black";
	colorSquare[5].style.backgroundColor = "black";
	randomizeColorSquares();
});

hard.addEventListener("click", function() {
	numberSquares = 6;
	randomizeColorSquares();
});

// Check to see if the user clicked the right value.
winningSquare.addEventListener("click", function() { // Uncaught TypeError: winningSquare.addEventListener is not a function
	alert("That's it!");
});	

youWon.addEventListener("click", function() {
	alert("youWong");
});

// Functions
function rand255() {
	return Math.floor(Math.random() * 255);
}

function randRGB() {
	return "rgb(" + rand255() + ", " +
					rand255() + ", " +
					rand255() + ")" ;
}

function randomizeColorSquares() {
	// Get one new random RGB Value and assign it to "correct"
	correct = randRGB();

	// Assign it 
	rgbValues.innerText = correct;

	// Cycle through all of the active color-squares
	for (var i = 0; i < numberSquares; i++){
		colorSquare[i].style.backgroundColor = randRGB();
	}

	// Determine at which slot the correct rgb color will be placed, then overwrite that square;
	correctSlot = Math.floor(Math.random() * numberSquares);
	colorSquare[correctSlot].style.backgroundColor = correct;

	winningSquare = colorSquare[correctSlot];
}
