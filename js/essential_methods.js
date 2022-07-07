function show_loader(){
    $(".loader").show();
}

function hide_loader(){
    $(".loader").hide();
}

function handlespecialchars(input) {
	var inputvalue = input.value
	if (input.value) {
		var newvalue = inputvalue.split("&").join("and");
		newvalue = newvalue.split("#").join(" ");
		newvalue = newvalue.split("'").join("");
		document.getElementById(input.id).value = newvalue;
	}
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if ((charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) || (charCode == 46)) {
		return false;
	}
	return true;
}

function titleCase(str) {
	return str.toLowerCase().split(' ').map(function (word) {
		return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}

function isNumberKeyWithFloat(el, evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	var number = el.value.split('.');
	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	//just one dot
	if (number.length > 1 && charCode == 46) {
		return false;
	}
	//get the carat position
	var caratPos = getSelectionStart(el);
	var dotPos = el.value.indexOf(".");
	if (caratPos > dotPos && dotPos > -1 && (number[1].length > 2)) {
		return false;
	}
	return true;
}

String.prototype.toTitleCase = function () {
	return this.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
		return match.toUpperCase();
	});
};