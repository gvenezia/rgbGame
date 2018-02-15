// In future versions, add an average # of guesses before right. Store in a database

;
(function IIFE(){
	'use strict'

// =================== Variables ======================
// set values for html elements
var headers 	= document.querySelector(".headers"),
	rgbValues 	= document.querySelector("#rgbValues"),
	newColors 	= document.querySelector("#new-colors"),
 	easy 		= document.querySelectorAll("label")[0],
 	hard 		= document.querySelectorAll("label")[1],
 	colorSquare = document.querySelectorAll(".color-square"),
 	winText 	= document.querySelector("#win-text"),
	message 	= document.querySelector("#message");

// Javascript variables, default values
var numberSquares 	= 3,
	correct 		= "",
	correctSlot 	= 7,
	winningSquare 	= 0,
	won 			= false;

// =================== On Page Load ====================== 
// do this only once to release memory
window.addEventListener("load", function runJavascriptOnLoad() {
	// Start by randomizing the board
	randomizeColorSquares();

	// =================== Event Listeners ======================
	// Change the colors when clicking "New Colors"
	newColors.addEventListener("click", function addNewColorsEvent() {
		randomizeColorSquares();
	});	

	// Change number of squares and reset colors when changing the difficulty setting
	// For the easy setting, use 3 squares, and clear the rest
	easy.addEventListener("click", function addEasySettingEvent() {
		numberSquares = 3;

		// Clear the extra squares back to black
		for (let i = 3; i < 6; i++) {
			colorSquare[i].style.backgroundColor = "black";
		}

		randomizeColorSquares();
	});

	// For the hard setting, use 6 squares
	hard.addEventListener("click", function addHardSettingEvent() {
		numberSquares = 6;
		randomizeColorSquares();
	});

	// ====================== Functions ==========================
	// Randomizer Functions
	function rand255() {
		return Math.floor(Math.random() * 256);
	}

	function randRGB() {
		return "rgb(" + rand255() + ", " +
						rand255() + ", " +
						rand255() + ")" ;
	}

	function clearNopes() {
		message.innerText = "";
	}

	function randomizeColorSquares() {
		// Clear win text and nopes
		winText.innerText = "";
		clearNopes();

		// Assign new random colors and clear nopes
		for (let i = 0; i < numberSquares; i++){
			colorSquare[i].style.backgroundColor = randRGB();
		}

		// Determine which slot will be the correct rgb value
		correctSlot = Math.floor(Math.random() * numberSquares);
		correct = colorSquare[parseInt(correctSlot)].style.backgroundColor;

		// Dispaly in the header text
		rgbValues.innerText = correct;

		// Add an Event listener to each colorSquare
		for (let k = 0; k < numberSquares; k++) {
			colorSquare[k].addEventListener("click", function addColorSquareClickEvent() {
				// for incorrect guesses, display "Nope" and change background to black
				if (this.style.backgroundColor != correct) {
					message.innerText = "Nope!";
					this.style.backgroundColor = "black";
				} else { 
				// if the user clicks the correct answer then...
					// Clear Nope!
					clearNopes();

					// Set all the remaining squares to the correct color 
					for (let j = 0; j < numberSquares; j++){
						if (colorSquare[j].style.backgroundColor != "black") {
							colorSquare[j].style.backgroundColor = correct;
						}
					}

					// Set the header background to the correct color
					headers.style.backgroundColor = correct;

					// Tell the user they've won!
					winText.innerText = "You Win!";
				}
			}, {once: true});
		} // End for loop
	} // End randomizeColorSquares()

}, {once: true}); // End "load" event listener

})();
