// In future versions, add an average # of guesses before right. Store in a database

// set values for html elements
	var headers = document.querySelector(".headers");
	var rgbValues = document.querySelector("#rgbValues");
	var newColors = document.querySelector("#newColors");
	var easy = document.querySelectorAll("label")[0];
	var hard = document.querySelectorAll("label")[1];
	var colorSquare = document.querySelectorAll(".color-square");
	var winText = document.querySelector("#win-text");
	var nope = document.querySelectorAll(".nope");
	var message = document.querySelector("#message");

	// Javascript variables
	var numberSquares = 3;
	var correct = "";
	var correctSlot = 7;
	var winningSquare = 0;

window.addEventListener("load", function() {
	

	// Start by randomizing the board
	randomizeColorSquares();

	// Change the colors when clicking "New Colors"
	newColors.addEventListener("click", function() {
		clearNopes();
		randomizeColorSquares();
	});	

	// Change number of squares and reset colors when changing the difficulty setting
	easy.addEventListener("click", function() {
		numberSquares = 3;

		// Clear the extra squares back to black, get rid of text
		for (var i = 3; i < 6; i++) {
			colorSquare[i].style.backgroundColor = "black";
		}

		randomizeColorSquares();
	});

	hard.addEventListener("click", function() {
		numberSquares = 6;
		randomizeColorSquares();
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

	function clearNopes() {
		// for (var i = 0; i < 6; i++){
		// 	nope[i].innerText = "";
		// }
		message.innerText = "";
	}

	function randomizeColorSquares() {
		// Clear win text and nopes
		winText.innerText = "";
		clearNopes();

		// Get one new random RGB Value and assign it to "correct"
		correct = randRGB();

		// Assign it 
		rgbValues.innerText = correct;

		// Assign new random colors and clear nopes
		for (var i = 0; i < numberSquares; i++){
			colorSquare[i].style.backgroundColor = randRGB();
		}

		// Determine at which slot the correct rgb color will be placed, then overwrite that square;
		correctSlot = Math.floor(Math.random() * numberSquares);
		colorSquare[parseInt(correctSlot)].style.backgroundColor = correct;

		// Now add an event listener to see if the user clicks the correct answer
		// This code didn't work outside of this function. Figure out why. Scope issues? Perhaps because the function isn't returning any value, the event 
		// can't access to the values outside of the function? Then why do they show up in the console?
		colorSquare[parseInt(correctSlot)].addEventListener("click", function() {
			for (var j = 0; j < numberSquares; j++){
				colorSquare[j].style.backgroundColor = correct;
			}

			headers.style.backgroundColor = correct;

			winText.innerText = "You Win!";
			clearNopes();
		}, {once: true});

		// colorSquare[0].addEventListener("click", function() {
		// 			nope[0].innerText = "Nope!";	
		// 		}, {once: true});

		// Add an Event listener to display "Nope" for incorrect guesses, skipping the correctSlot
		for (var k = 0; k < numberSquares; k++) {
			if (k != correctSlot) {
				colorSquare[k].addEventListener("click", function() {
					message.innerText = "Nope!";	
				}, {once: true});
			}
		}
	}

}, {once: true});