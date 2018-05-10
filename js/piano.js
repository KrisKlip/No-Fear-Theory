$(document).ready(function() {
	var pianoWidth = $(".container").outerWidth();
	var factor = 1/15;
	var whiteKeyWidth = pianoWidth/15;
	var blackKeyWidth = whiteKeyWidth * 0.8;
	var paddingAmt = whiteKeyWidth - (blackKeyWidth/2);
	// console.log(whiteKeyWidth)
	$(".white-key").outerWidth(whiteKeyWidth-2)
	$(".black-key").outerWidth(blackKeyWidth-2)
	$(".black-group").css("padding-left", paddingAmt)
	$(".not-first").css("margin-left", blackKeyWidth*0.25)

	$( window ).resize(function() {
		var pianoWidth = $(".container").outerWidth();
		var factor = 1/15;
		var whiteKeyWidth = pianoWidth/15;
		var blackKeyWidth = whiteKeyWidth * 0.8;
		var paddingAmt = whiteKeyWidth - (blackKeyWidth/2);
		// console.log(whiteKeyWidth)
		$(".white-key").outerWidth(whiteKeyWidth)
		$(".black-key").outerWidth(blackKeyWidth)
		$(".black-group").css("padding-left", paddingAmt)
		$(".not-first").css("margin-left", blackKeyWidth*0.25)
	})

	$(".black-key").click(function() {
		if($( this ).css("background-color") == "rgb(0, 0, 255)"){
			$( this ).css("background-color", "#343a40")
			$( this ).removeClass( "selected-key" );
			if(autoCheck){
				removeActiveChord($(this).val())
			}
		}
		else{
			$( this ).css("background-color", "rgb(0, 0, 255)")
			$( this ).addClass( "selected-key" );
			if(autoCheck){
				addActiveChord($(this).val())
			}
			
		}	
	});
	$(".white-key").click(function() {
		if($( this ).css("background-color") == "rgb(0, 0, 255)"){
			$( this ).css("background-color", "#f8f9fa")
			$( this ).removeClass( "selected-key" );
			if(autoCheck){
				removeActiveChord($(this).val())
			}
		}
		else{
			$( this ).css("background-color", "rgb(0, 0, 255)")
			$( this ).addClass( "selected-key" );
			if(autoCheck){
				addActiveChord($(this).val())
			}
		}
	});	

	$( ".scaleCheck" ).each(function( index ) {
		for(var i =0; i<scaleSelectionArray.length;i++){
			if($(this).val() == scaleSelectionArray[i]){
				$(this).prop('checked', true);
			}
		}
	})
	$( ".chordCheck" ).each(function( index ) {
		console.log($(this).val())
		for(var i =0; i<chordTypeSelectionArray.length;i++){
			if($(this).val() == chordTypeSelectionArray[i]){
				$(this).prop('checked', true);
			}
		}
	})
	$( "#autoCheck" ).each(function( index ) {
		console.log($(this).val())
		$(this).prop('checked', true);
	})
	$( "#autoNext" ).each(function( index ) {
		console.log($(this).val())
		$(this).prop('checked', true);
	})
	initializeQuestions();
});

var currentScaleIndex;
var currentScaleName
var currentScaleTriads = [];
var currentScaleSevenths = [];
var currentChordIndex;
var currentChordName;
var currentChordNotes = [];
var currentTriadList = [];
var currentSeventhsList = [];
var currentChordsNotes = [];
var currentChordsNames = []
var currentIndex;
var currentNumSharps;
var currentNumFlats;
var currentSharps;
var currentFlats;
var allScales = [];
var numberCorrect = 0;
var totalAttempts = 0;
var numQuestions = 0;
var scaleSelectionArray = ["f"]
var chordTypeSelectionArray = ["sevenths","triads"];
var answeredQuestions = []
var numberOfQuestions = 0;
var numberAnsweredIncorrect = 0;
var questionAttempts = 3;
var totalQuestions = 0;
var remainingQuestions = 0;

var midiMode = false;
var scaleMode = false;
var autoCheck = true;
var autoNext = true;
var infiniteMode = false;
var showingScales = false;
var gameOver = false;
var timerEnd = false;

function findRandomChord(string) {
	console.log(string)
};
function addActiveChord(value){
	note = parseInt(value)
	// 		// add the note to the active chord array
	if(note > octaveValue && note <octaveValue+26){
		activeChord.push(note);
	}
	console.log(activeChord)
// 		// If the array is the same length as the correct chord, compare
	console.log("activeChord length = " + activeChord.length + " " + "currentChordNotes Length = " + currentChordNotes.length)
	if (activeChord.length == currentChordNotes.length) {
		var match = true;
		checkAnswer();
	}
}
function removeActiveChord(value){
	console.log(activeChord)
	note = parseInt(value)
	// 		// add the note to the active chord array
	if(note > octaveValue && note <octaveValue+26){
		for(x in activeChord){
			console.log(activeChord[x])
			console.log(note)
			if(note == activeChord[x]){
				activeChord.splice(x,1)
				console.log(activeChord);
			}
		}
	}
}
function checkSelected(value) { 
	// console.log("checking")
	$( ".piano-note" ).each(function( index ) {
		if(parseInt($(this).val()) == value){
			var ind = parseInt($(this).val())
			for(x in activeChord){
				console.log(ind)
				console.log(activeChord[x])
				if(ind == activeChord[x]){
					resetKey($(this))
				}
			}
		}
	}); 
	return false; 
};
function applySettings(){
	closeNav()
	initializeQuestions();
}

function randomize() {
	allScales = [];
	currentTriadList = [];
	currentChordNotes = []
	currentScaleTriads = [];
	currentScaleSevenths = [];
	currentSeventhsList = [];
	currentChordsList = [];
	currentChordsNames = [];
	currentChordsNotes = [];
	numberOfQuestions = 0;
	var scales = theory.scales
	Object.keys(scales).forEach(function(key1) {
		for(var i =0; i<scaleSelectionArray.length;i++){
			if(key1 == scaleSelectionArray[i]){
				allScales.push(key1)
			}
		}
	});
	var randScaleIndex = Math.floor(Math.random());     // returns a number between 0 and 9
	currentScaleIndex = randScaleIndex;
	// currentScaleName = allScales[currentScaleIndex]
	for(x in allScales){
		currentScaleName = allScales[x]
		Object.keys(scales).forEach(function(key1) {
			if(key1 == currentScaleName){
				currentNumFlats = scales[key1].numOfFlats
				currentNumSharps = scales[key1].numOfSharps
				for(var i = 0; i<chordTypeSelectionArray.length; i++){
					var chordType = scales[key1];
					Object.keys(chordType).forEach(function(key2) {
						if(key2 == chordTypeSelectionArray[i]){
							Object.keys(chordType[key2]).forEach(function(key3) {
								var currentChord = chordType[key2];
								currentChordsNames.push(key3);
								currentChordsNotes.push(currentChord[key3])
								numberOfQuestions++;
							})
						}
					})
				}
			}
		})

	}
	// console.log(currentChordsNames.length);
	console.log("chords notes = " + currentChordsNotes)
	console.log("chords notes = " + currentChordsNotes.length)
	console.log("chords names = " + currentChordsNames)
	console.log("chords names = " + currentChordsNames.length)
}
function selectRandomChord(){
	var randChordIndex = Math.floor(Math.random() * currentChordsNames.length);     // returns a number between 0 and 9
	console.log("randChordIndex = " + randChordIndex)
	// console.log("chords notes = " + currentChordsNotes)
	// console.log("chords notes = " + currentChordsNames)
	currentChordIndex = randChordIndex
	currentChordName = currentChordsNames[currentChordIndex]
	currentChordNotes = currentChordsNotes[currentChordIndex]
	createCorrectChord(currentChordNotes)
	currentChordName = changeChordName(currentChordName);
	console.log("current chord notes = " + currentChordNotes)
}
function nextQuestion(){
	spliceFromArray();
	checkIfGameOver();
	console.log(findRemainingQuestions(numberOfQuestions))
	if(!gameOver){
		console.log("sdkjfskdhfksjdhfkjshdfkjh")
		selectRandomChord();
		updateUI();
		if(!infiniteMode){
			answeredQuestions.push(currentChordNotes);
		}
		resetAttempts();
		updateStats();
	}
	console.log(answeredQuestions.length)
	console.log(numberOfQuestions)
}
function skipQuestion(){
	selectRandomChord();
	checkIfGameOver();
	updateUI();
}
function resetAllVariables(){
	numberCorrect = 0;
	totalAttempts = 0;
	numQuestions = 0;
	answeredQuestions = []
	numberOfQuestions = 0;
	numberAnsweredIncorrect = 0;
	questionAttempts = 3;
	activeChord = [];

}
function initializeQuestions(){
	console.log("inintialize")
	resetKeys();
	resetAllVariables();
	resetStats();
	randomize();
	selectRandomChord();
	totalQuestions = (findRemainingQuestions(numberOfQuestions))+1;
	remainingQuestions = totalQuestions
	checkIfGameOver();
	if(!infiniteMode){
		answeredQuestions.push(currentChordNotes);
	}
	numQuestions = 0;
	updateUI();
	updateStats();
	startTimer();
	console.log("total questions = " + totalQuestions)
	console.log("remaining questions = " + remainingQuestions)
	console.log("active chord = " + activeChord)


}
function checkIfGameOver(){
	var remainingQs = remainingQuestions;
	if(remainingQs<2){
		gameOver = true;
		answeredQuestions.push(currentChordNotes);
		numQuestions++;
		console.log("game over")
		updateStats();
		resetKeys();
		$("#current").html("Well Done!");
	}
}
function updateUI(){
	console.log("update UI")
	updateText(currentChordName);
	resetKeys();
}
function updateStats(){
	remainingQuestions = totalQuestions - answeredQuestions.length
	if(numberOfQuestions && !infiniteMode){
		$("#remainingQuestions").html(remainingQuestions);
	}
	if(infiniteMode){
		$("#remainingQuestions").html("");
	}
	$("#correct").html(numberCorrect);
	$("#numQuestions").html(numQuestions);
	$("#incorrect").html(questionAttempts);
}
function checkIfAnySelected(){
	var anySelected = false;
	$( ".piano-note" ).each(function( index ) {
		if($(this).hasClass("selected-key")){
			anySelected = true;
		}
	})
	if(anySelected){
		return true;
	}
	else{
		return false;
	}
}
function findRemainingQuestions(value){
	var remaining = value - answeredQuestions.length;
	return remaining;
}
function addToChordNameArray(array){
	for(var i = 0; i<array.length;i++){
		currentChordsNames.push(array[i])
	}
}
function spliceFromArray(){
	// for(x in answeredQuestions){
	// 	for (y in currentChordsNames){
	// 		if(answeredQuestions[x] == changeChordName(currentChordsNames[y])){
	// 			currentChordsNames.splice(y,1)
	// 			currentChordsNotes.splice(y,1)
	// 		}
	// 	}
	// 	// if(answeredQuestions[x])
	// }
	currentChordsNames.splice(currentChordIndex, 1)
	currentChordsNotes.splice(currentChordIndex, 1)
}
function addToChordNotesArray(array){
	for(var i = 0; i<array.length;i++){
		currentChordsNotes.push(array[i])
	}
}
function changeChordName(chordName){
	// console.log(chordName)
	var name;
	var index = parseInt(chordName)
	var index = index -1;
	if(chordName == 1 || chordName == 4){
		name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Maj"
	}
	if(chordName == 5){
		if(currentChordNotes.length< 4){
			name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Maj"
		}
		else{
			name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1)
		}
	}
	if(chordName == 2 || chordName == 3 || chordName == 6){
		name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Min"
	}
	if(chordName == 7){
		name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Dim"
	}
	if(currentChordNotes.length > 3){
		name = name + "7"
	}
	return(name);
}
function updateText(text){
	$("#current").html(text);
	currentScaleName = currentScaleName.charAt(0).toUpperCase() + currentScaleName.charAt(1);
	if(currentScaleName=="Fs"){
		currentScaleName ="F#"
	}
	$("#currentScale").html(currentScaleName);
	$("#numFlats").html(currentNumFlats);
	$("#numSharps").html(currentNumSharps);
}
function updateKeys(){
	showScales(currentChordNotes)
}

function showScales(notesArray){
	console.log("working")
	resetKeys();
	var count = 0;
	if(!showingScales){
		$( ".piano-note" ).each(function( index ) {
			for(x in notesArray){
				var note = notesArray[x];
				if($(this).hasClass(note)){
					$( this ).css("background-color", "rgb(0, 0, 255)")
					$( this ).addClass( "selected-key" );
				}
			}
		  
		});
		showingScales = true;
	}  
	else{
		resetKeys();
		showingScales = false;
	}
}
function resetKeys(){
	$( ".selected-key" ).each(function( index ) {
		if($(this).hasClass("black-key")){
			$( this ).css("background-color", "#343a40")
			$( this ).removeClass( "selected-key" );
		}
		if($(this).hasClass("white-key")){
			$( this ).css("background-color", "#f8f9fa")
			$( this ).removeClass( "selected-key" );
		}
	})
}
function resetKey(element){
	if(element.hasClass("black-key")){
		element.css("background-color", "#343a40")
		element.removeClass( "selected-key" );
	}
	if(element.hasClass("white-key")){
		element.css("background-color", "#f8f9fa")
		element.removeClass( "selected-key" );
	}																						
}
function correctKeys(){
	$( ".selected-key" ).each(function( index ) {
		$( this ).css("background-color", "rgb(0,225,0)")
		$( this ).addClass( "selected-key" );
	})
}
function incorrectKeys(){
	$( ".selected-key" ).each(function( index ) {
		$( this ).css("background-color", "rgb(225,0,0)")
		$( this ).addClass( "selected-key" );
	})
}
function correctAnswer(){
	numberCorrect++
}
function incorrectAttempt(){
	totalAttempts++
	questionAttempts--
}
function checkAnswer(){
	if(showingScales){
		resetKeys();
		showingScales = false;
		return;
	}
	if(gameOver){
		gameOver = false;
		initializeQuestions()
		return false;
	}
	if(timerEnd){
		if(gameOver){
			return false;
		}
		else{
			console.log("timerEnd")
			incorrectAndNext();
		}
	}
	var numSelected = 0;
	var numCorrect = 0;
	var selected = checkIfAnySelected();
	console.log("selectec =" + selected)
	if(selected){
		$( ".selected-key" ).each(function( index ) {

			numSelected++;
			console.log($(this).text())
			for(x in currentChordNotes){
				var note = currentChordNotes[x];
				if($(this).hasClass(note)){
					numCorrect ++;
				}
			}
		})
		if(numSelected == numCorrect && numSelected>0){
			numQuestions++;
			console.log("CORRECT!")
			correctAnswer();
			correctKeys()
			if(autoNext){
				setTimeout( function() {
				    nextQuestion();
				    resetAttempts();
				  }, 750);
			}
		}
		else{
			console.log("Try AGAIN!")
			incorrectAttempt();
			incorrectKeys();
			setTimeout( function() {
			    if(questionAttempts<1){
					incorrectAndNext();
				}
				else{
					resetKeys();
				}
			  }, 500);
		}
	}
	updateStats();
	activeChord = [];
};
function incorrectAndNext(){
	console.log("incorrectAndNext")
	numberAnsweredIncorrect++;
	numQuestions++;
	nextQuestion();
	resetAttempts();
	updateUI();
	resetTimer();
}
function resetAttempts(){
	questionAttempts = 3;
}
$('.scaleCheck').change(function() {
    // this will contain a reference to the checkbox   
    var value = $(this).val();
    if (this.checked) {
    	var canAppend = true;
        for(var i = 0; i<scaleSelectionArray.length;i++){
        	if(scaleSelectionArray[i]==value){
        		canAppend = false;
        	}
        }
        if(canAppend){
        	scaleSelectionArray.push(value)
        }
    } 
    else {
        for(var i = 0; i<scaleSelectionArray.length;i++){
        	if(scaleSelectionArray[i]==value){
        		scaleSelectionArray.splice(i,1);
        	}
        }
    }
    console.log(scaleSelectionArray)
});
$('.chordCheck').change(function() {
    // this will contain a reference to the checkbox 
    var value = $(this).val();
    if(value == "triads"){
    	$("#majortriads").prop('checked', false);
    	$("#minortriads").prop('checked', false);
    	$("#diminishedtriads").prop('checked', false);
    	for(var j = 0; j<4; j++){
    		for(var i = 0; i<chordTypeSelectionArray.length;i++){
	        	if(chordTypeSelectionArray[i]=="majortriads" || chordTypeSelectionArray[i] == "minortriads"|| chordTypeSelectionArray[i]=="diminishedtriads"){
	        		chordTypeSelectionArray.splice(i,1);
	        	}
	        }
    	}
    }
    if(value == "majortriads" || value == "minortriads" || value == "diminishedtriads"){
    	$("#triads").prop('checked', false);
    	for(var i = 0; i<chordTypeSelectionArray.length;i++){
        	if(chordTypeSelectionArray[i]=="triads"){
        		chordTypeSelectionArray.splice(i,1);
        	}
        }
    }
    if(value == "sevenths"){
    	$("#majorsevenths").prop('checked', false);
    	$("#minorsevenths").prop('checked', false);
    	$("#diminishedsevenths").prop('checked', false);
    	$("#dominantsevenths").prop('checked', false);
    	for(var j = 0; j<4; j++){
    		for(var i = 0; i<chordTypeSelectionArray.length;i++){
	        	if(chordTypeSelectionArray[i]=="majorsevenths" || chordTypeSelectionArray[i] == "minorsevenths"|| chordTypeSelectionArray[i]=="diminishedsevenths" || chordTypeSelectionArray[i] == "dominantsevenths"){
	        		chordTypeSelectionArray.splice(i,1);
	        	}
	        }
    	}
    }
    if(value == "majorsevenths" || value == "minorsevenths" || value == "diminishedsevenths" || value == "dominantsevenths"){
    	$("#sevenths").prop('checked', false);
    	for(var i = 0; i<chordTypeSelectionArray.length;i++){
        	if(chordTypeSelectionArray[i]=="sevenths"){
        		chordTypeSelectionArray.splice(i,1);
        	}
        }
    }
    if (this.checked) {
    	var canAppend = true;
        for(var i = 0; i<chordTypeSelectionArray.length;i++){
        	if(chordTypeSelectionArray[i]==value){
        		canAppend = false;
        	}
        }
        if(canAppend){
        	chordTypeSelectionArray.push(value)
        }
    } 
    else {
        for(var i = 0; i<chordTypeSelectionArray.length;i++){
        	if(chordTypeSelectionArray[i]==value){
        		chordTypeSelectionArray.splice(i,1);
        	}
        }
    }
    // console.log(chordTypeSelectionArray)
});
$('#midiMode').change(function() {
	if(this.checked){
		midiMode = true;
		console.log(midiMode)
	}
	else{
		midiMode = false;
	}
});
$('#scaleMode').change(function() {
	if(this.checked){
		scaleMode = true;
		console.log(scaleMode)
	}
	else{
		scaleMode = false;
	}
});
$('#autoCheck').change(function() {
	if(this.checked){
		autoCheck = true;
		console.log(autoCheck)
	}
	else{
		autoCheck = false;
	}
});
$('#autoNext').change(function() {
	if(this.checked){
		autoNext = true;
		console.log(autoNext)
	}
	else{
		autoNext = false;
	}
});
function resetStats(){
	answeredQuestions = [];
	numberCorrect = 0;
	totalAttempts = 0;
}
$('#infiniteMode').change(function() {
	if(this.checked){
		infiniteMode = true;
		console.log(infiniteMode)

	}
	else{
		infiniteMode = false;
	}
});