

// process  nitrous oxide totals for a day
function noTotals(csvPath){
	var noTotal;

	$.get(csvPath, function(csvString) {

		var arrayData = $.csv.toObjects(csvString);

		console.log("hi");
		console.log(arrayData[3][5]);

	});


	return noTotal;
}