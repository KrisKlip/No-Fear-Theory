$(document).ready(function() {
	var scaleSize = Object.keys(theory.scales).length;
	var allScales = theory.scales
	var cnotes = theory.scales.c.notes
	var scales = theory.scales
	Object.keys(scales).forEach(function(key1) {
		var notes = scales[key1].notes;
		var triads = scales[key1].triads
		var sevenths = scales[key1].sevenths
		var currentChord = [];
		var i = 0
		Object.keys(triads).forEach(function(key2) {
			var triadNum = i+1
			var three = i+2
			var five = i+4
			if(three > 6){
				three = three - 7
			}
			if(five >6){
				five = five - 7
			}

			currentChord = [notes[i], notes[three], notes[five]]
			
			triads[key2] = currentChord;
			i ++;
		  // console.log(key2, triads[key2]);
		});
		i = 0;
		Object.keys(sevenths).forEach(function(key2) {
			var triadNum = i+1
			var three = i+2
			var five = i+4
			var seven = i+6
			if(three > 6){
				three = three - 7
			}
			if(five >6){
				five = five - 7
			}
			if(seven >6){
				seven = seven - 7
			}

			currentChord = [notes[i], notes[three], notes[five],  notes[seven]]
			
			sevenths[key2] = currentChord;
			i ++;
		  // console.log(key2, sevenths[key2]);
		});
	});
	theory.scales.c.rhfingering = [1,2,3,1,2,3,4,5]
	theory.scales.g.rhfingering = []
	theory.scales.d.rhfingering = []
	theory.scales.a.rhfingering = []
	theory.scales.e.rhfingering = []
	theory.scales.b.rhfingering = []
	theory.scales.fs.rhfingering = []
	theory.scales.bb.rhfingering = []
	theory.scales.eb.rhfingering = []
	theory.scales.ab.rhfingering = []
	theory.scales.db.rhfingering = []
	theory.scales.gb.rhfingering = []
	

	theory.scales.c.lhfingering = [5,4,3,2,1,3,2,1]
	theory.scales.g.lhfingering = []
	theory.scales.d.lhfingering = []
	theory.scales.a.lhfingering = []
	theory.scales.e.lhfingering = []
	theory.scales.b.lhfingering = []
	theory.scales.fs.lhfingering = []
	theory.scales.bb.lhfingering = []
	theory.scales.eb.lhfingering = []
	theory.scales.ab.lhfingering = []
	theory.scales.db.lhfingering = []
	theory.scales.gb.lhfingering = []


});
