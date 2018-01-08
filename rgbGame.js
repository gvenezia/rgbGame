/* 
Generate two (or five) random colors
	assign to var's randRGB1 and randRGB2

Randomly assign all the colors to containers in html

*/

// set values for html elements
var rgbValues = document.querySelector("#rgbValues");
var newColors = document.querySelector("#newColors");
var easy = document.querySelectorAll("label")[0];
var hard = document.querySelectorAll("label")[1];

var correct = rand255();

// Javascript variables
var numberSquares = 3;

easy.addEventListener("click", function() {
	numberSquares = 3;
});

hard.addEventListener("click", function() {
	numberSquares = 6;
});

// Change the colors when clikcing "New Colors"
newColors.addEventListener("click", function() {
	randomizeColorSquares();
});	

function rand255() {
	return Math.floor(Math.random() * 255);
}

function randRGB() {
	correct = "rgb(" + rand255() + ", " +
					rand255() + ", " +
					rand255() + ");" ;
	return correct;
}

function randomizeColorSquares() {
	// Get one new random RGB Value
	correct = randRGB();

	// Assign it 
	rgbValues.innerText = correct;



	// Determine at which slot the correct rgb color will be placed, then overwrite that square;
	var correctSlot = Math.floor(Math.random() * numberSquares);
	slot[correctSlot] = correct;
}
