$(document).ready(function() {
	var pianoWidth = $(".container").outerWidth();
	var factor = 1/15;
	var whiteKeyWidth = pianoWidth/15;
	var blackKeyWidth = whiteKeyWidth * 0.8;
	var paddingAmt = whiteKeyWidth - (blackKeyWidth/2);
	console.log(whiteKeyWidth)
	$(".white-key").outerWidth(whiteKeyWidth)
	$(".black-key").outerWidth(blackKeyWidth)
	$(".black-group").css("padding-left", paddingAmt)
	$(".not-first").css("margin-left", blackKeyWidth*0.25)

	$( window ).resize(function() {
		// console.log($(".container").outerWidth());
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
		}
		else{
			$( this ).css("background-color", "rgb(0, 0, 255)")
			$( this ).addClass( "selected-key" );
		}
		// checkSelected();
		
	});
	$(".white-key").click(function() {
		if($( this ).css("background-color") == "rgb(0, 0, 255)"){
			$( this ).css("background-color", "#f8f9fa")
			$( this ).removeClass( "selected-key" );
		}
		else{
			$( this ).css("background-color", "rgb(0, 0, 255)")
			$( this ).addClass( "selected-key" );
		}
		// checkSelected();
		
	});	

	$( ".scaleCheck" ).each(function( index ) {
		// console.log($(this).val())
		for(var i =0; i<scaleSelectionArray.length;i++){
			// console.log($(this).val())
			// console.log(scaleSelectionArray[i])
			if($(this).val() == scaleSelectionArray[i]){
				$(this).prop('checked', true);
			}
			// else{
			// 	$(this).prop('checked', false);
			// }
		}
	})
	$( ".chordCheck" ).each(function( index ) {
		console.log($(this).val())
		for(var i =0; i<chordTypeSelectionArray.length;i++){
			if($(this).val() == chordTypeSelectionArray[i]){
				$(this).prop('checked', true);
			}
			// else{
			// 	$(this).prop('checked', false);
			// }
		}
	})
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
var numberIncorrect = 0;
var numQuestions = 0;
var scaleSelectionArray = ["c", "g"]
var chordTypeSelectionArray = ["sevenths","triads"];

function findRandomChord() {

};

function checkSelected() { 
	// console.log("checking")
	$( ".selected-key" ).each(function( index ) {
	  console.log( index + ": " + $( this ).text() );
	});  
};
function applySettings(){
	closeNav()
	randomize();
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
	var scales = theory.scales
	Object.keys(scales).forEach(function(key1) {
		console.log(key1)
		for(var i =0; i<scaleSelectionArray.length;i++){
			if(key1 == scaleSelectionArray[i]){
				allScales.push(key1)
			}
		}
		// console.log(allScales)
	});
	var randScaleIndex = Math.floor(Math.random() * allScales.length);     // returns a number between 0 and 9
	currentScaleIndex = randScaleIndex;
	currentScaleName = allScales[currentScaleIndex]
	Object.keys(scales).forEach(function(key1) {
		if(key1 == currentScaleName){
			// var triads = scales[key1].triads
			// var sevenths = scales[key1].sevenths
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
						})
					}
				})
				// Object.keys(triads).forEach(function(key2) {
				// 	console.log(scales[key1])
				// 	currentTriadList.push(key2);
				// 	currentScaleTriads.push(triads[key2])
				// })
				// Object.keys(sevenths).forEach(function(key2) {
				// 	currentSeventhsList.push(key2);
				// 	currentScaleSevenths.push(sevenths[key2])
				// })
			}
			
			// addToChordNameArray(currentTriadList)
			// addToChordNameArray(currentSeventhsList)
			// addToChordNotesArray(currentScaleTriads)
			// addToChordNotesArray(currentScaleSevenths)
			var randChordIndex = Math.floor(Math.random() * currentChordsNames.length);     // returns a number between 0 and 9
			currentChordIndex = randChordIndex
			currentChordName = currentChordsNames[currentChordIndex]
			currentChordNotes = currentChordsNotes[currentChordIndex]
			console.log(currentChordNotes)
		}
	})
	// console.log(currentScaleName)
	currentChordName = changeChordName(currentChordName);
	// console.log(currentChordNotes);
	updateText(currentChordName);
	resetKeys();
}
function addToChordNameArray(array){
	for(var i = 0; i<array.length;i++){
		currentChordsNames.push(array[i])
	}
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
	if(chordName == 1 || chordName == 4 || chordName == 5){
		name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Maj"
		// console.log(name);
	}
	if(chordName == 2 || chordName == 3 || chordName == 6){
		name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Min"
		// console.log(name);
	}
	if(chordName == 7){
		name = currentChordNotes[0].charAt(0).toUpperCase() + currentChordNotes[0].charAt(1) + "Dim"
		// console.log(name);
	}
	if(currentChordNotes.length == 4){
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
	$( ".piano-note" ).each(function( index ) {
		for(x in notesArray){
			var note = notesArray[x];
			var firstNote = ($(this).text()).substring(0,2)
			var secondNote = ($(this).text()).substring(3,5)
			// console.log(firstNote)
			// console.log(secondNote)
			if($(this).hasClass(note)){
				$( this ).css("background-color", "rgb(0, 0, 255)")
				$( this ).addClass( "selected-key" );
			}

			// else{
			// 	$( this ).css("background-color", "#f8f9fa")
			// 	$( this ).removeClass( "selected-key" );
			// }
		}
	  
	});  

	// var currentArray = notesArray
	// var count = 0;
	// var note = currentArray[0];
	// $( ".piano-note" ).each(function( index ) {
	// 	// console.log(nte);
	// 	for (var i = 1; i <26; i++) {
	// 		var currentKey = i.toString();
	// 		// console.log(note)
	// 		if ($(this).hasClass(currentKey)){
	// 			console.log($(this).class)
	// 			// console.log("true")
	// 			if($(this).hasClass(note)){
	// 				console.log("true")
	// 				$( this ).css("background-color", "rgb(0, 0, 255)")
	// 				$( this ).addClass( "selected-key" );
	// 				currentArray.splice(0,1);
	// 				note = currentArray[0];
	// 			}
	// 		}
	// 	};
	
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
function correctKeys(){
	$( ".selected-key" ).each(function( index ) {
		$( this ).css("background-color", "rgb(0,225,0)")
		$( this ).addClass( "selected-key" );
	})
}
function checkAnswer(){
	var numSelected = 0;
	var numCorrect = 0;
	numQuestions++;
	$("#numQuestions").html(numQuestions);
	if($(".selected-key")){
		$( ".selected-key" ).each(function( index ) {
			numSelected++;
			console.log($(this).text())
			for(x in currentChordNotes){
				var note = currentChordNotes[x];
				// console.log(firstNote)
				// console.log(secondNote)
				if($(this).hasClass(note)){
					numCorrect ++;
				}
			}
		})
		if(numSelected == numCorrect && numSelected>0){
			console.log("CORRECT!")
			numberCorrect++
			$("#correct").html(numberCorrect);
			correctKeys();
			
		}
		else{
			console.log("Try AGAIN!")
			numberIncorrect++;
			$("#incorrect").html(numberIncorrect);
			resetKeys();
		}
	}
};
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
    console.log(chordTypeSelectionArray)
});

// 343a40
// f8f9fa