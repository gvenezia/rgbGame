// In future versions, add an average # of guesses before right. Store in a database

// set values for html elements
var headers = document.querySelector(".headers");
var rgbValues = document.querySelector("#rgbValues");
var newColors = document.querySelector("#new-colors");
var easy = document.querySelectorAll("label")[0];
var hard = document.querySelectorAll("label")[1];
var colorSquare = document.querySelectorAll(".color-square");
var winText = document.querySelector("#win-text");
var message = document.querySelector("#message");

// Javascript variables
var numberSquares = 3;
var correct = "";
var correctSlot = 7;
var winningSquare = 0;
var won = false;

// Make sure the page is loaded before affecting the page, 
// do this only once to release memory
window.addEventListener("load", function() {
	// Start by randomizing the board
	randomizeColorSquares();

	// Change the colors when clicking "New Colors"
	newColors.addEventListener("click", function() {
		randomizeColorSquares();
	});	

	// Change number of squares and reset colors when changing the difficulty setting
	// For the easy setting, use 3 squares, and clear the rest
	easy.addEventListener("click", function() {
		numberSquares = 3;

		// Clear the extra squares back to black
		for (var i = 3; i < 6; i++) {
			colorSquare[i].style.backgroundColor = "black";
		}

		randomizeColorSquares();
	});

	// For the hard setting
	hard.addEventListener("click", function() {
		numberSquares = 6;
		randomizeColorSquares();
	});

	// Functions
	function rand256() {
		return Math.floor(Math.random() * 256);
	}

	function randRGB() {
		return "rgb(" + rand256() + ", " +
						rand256() + ", " +
						rand256() + ")" ;
	}

	function clearNopes() {
		message.innerText = "";
	}

	function randomizeColorSquares() {
		// Clear win text and nopes
		winText.innerText = "";
		clearNopes();

		// Assign new random colors and clear nopes
		for (var i = 0; i < numberSquares; i++){
			colorSquare[i].style.backgroundColor = randRGB();
		}

		// Determine which slot will be the correct rgb value
		correctSlot = Math.floor(Math.random() * numberSquares);
		correct = colorSquare[parseInt(correctSlot)].style.backgroundColor;

		// Dispaly in the header text
		rgbValues.innerText = correct;

		// Add an Event listener to each colorSquare
		for (var k = 0; k < numberSquares; k++) {
			colorSquare[k].addEventListener("click", function() {
				// for incorrect guesses, display "Nope" and change background to black
				if (this.style.backgroundColor != correct) {
					message.innerText = "Nope!";
					this.style.backgroundColor = "black";
				} else { 
				// if the user clicks the correct answer then...
					// Clear Nope!
					clearNopes();

					// Set all the remaining squares to the correct color 
					for (var j = 0; j < numberSquares; j++){
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


// Does it need a closure? (e.g. a function wrapping the .addEventListener? )
/* for (var k = 0; k < numberSquares; k++) {
	colorSquare[k].addEventListener("click", function() {
		alert("square" + k + "clicked"); 
		message.innerText = "Nope!";
		temp[k] = k;
		colorSquare[temp[k]].style.backgroundColor = "white";	// 
	});
} // End for loop

*/