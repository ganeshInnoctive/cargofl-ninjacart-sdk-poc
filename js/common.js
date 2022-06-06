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

function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}

String.prototype.toTitleCase = function () {
	return this.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
		return match.toUpperCase();
	});
};

// Prevent Ctrl+Shift+I, Ctrl+Shift+C, F12
$(document).keydown(function (event) {
	if ((event.ctrlKey && event.shiftKey) || (event.keyCode == 123)) {
		return false;
	}
});

//Disable Right Click
document.addEventListener("contextmenu", function (e) {
	e.preventDefault();
}, false);

// resize bootstrap table on window resize
$(window).resize(function () {
	if ($('.bootstrap-table table').length) {
		$('.bootstrap-table table').bootstrapTable('resetView');
	}
});

// change menu text colour
function hilightMenu(menu) {
	// $(".navbar").find('a').filter(function(){return $(this).text()==menu}).parent().parent().siblings('.dropdown-toggle').css("color", "#3299CC");
	// $(".navbar").find('a').filter(function(){return $(this).text()==menu}).css("color", "#3299CC");
}

// auto-select hilighted option in select2 by Tab key
$(document).on('select2:close', 'select', function (evt) {
	var context = $(evt.target);

	$(document).on('keydown.select2', function (e) {
		// tab
		if (e.which === 9) {
			var highlighted = context.data('select2').$dropdown.find('.select2-results__option--highlighted');
			if (highlighted) {
				if (highlighted.data('data')) {
					var id = highlighted.data('data').id;
					context.val(id).trigger('change');
				} else {
					context.val('').trigger('change');
				}
			}
		}
	});

	// unbind the event again to avoid binding multiple times
	setTimeout(function () {
		$(document).off('keydown.select2');
	}, 1);
});

// On focus open select2
$(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
	$(this).closest(".select2-container").siblings('select:enabled').select2('open');
});

// need different approach here (dont allow bootstrap validator to add class instead removing it after it has been added)
// dont add has-success class in bootstrap form
$(document).on('change', '.bv-form', function (e) {
	$(this).find('.has-success').removeClass('has-success');
});

// formats number to currency
// currency_formatter.format(10000000.1313) => ₹ 1,00,00,000.13
const currency_formatter = new Intl.NumberFormat('en-IN', {
	style: 'currency',
	currency: 'INR',
	minimumFractionDigits: 2
});

// Two date diff in milliseconds
function dateDiffInmillis(end_date, start_date) {
 // Determine the time difference between two dates
 var millisBetween = end_date.getTime() - start_date.getTime();
 //if required in days
 //millisBetween / (1000 * 3600 * 24)
 return millisBetween;
}
// return days between two dates
function getDaysBetweenDate(date1, date2) {

	raw_date1 = date1.split("-");
	date1 = raw_date1[2] + "-" + raw_date1[1] + "-" + raw_date1[0];

	raw_date2 = date2.split("-");
	date2 = raw_date2[2] + "-" + raw_date2[1] + "-" + raw_date2[0];

	date1 = new Date(date1);
	date2 = new Date(date2);

	var Difference_In_Time = date2.getTime() - date1.getTime();

	var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

	return Difference_In_Days;

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  This function and Code used for Converting Number to Words using Javascript
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function inWords(num) {
	if ((num = num.toString()).length > 9) return 'overflow';
	n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
	if (!n) return; var str = '';
	str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
	str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
	str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
	str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
	str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only ' : '';
	return str;
}

function printPage(pageSize, title) {
	var editable_fields = $('body').find('.editable');
	if (editable_fields.length) {
		editable_fields.editable('toggleDisabled');
	}
	style = document.createElement('style');
	style.media = 'print';
	style.appendChild(document.createTextNode('@page { size: ' + pageSize + '; }'));
	document.head.appendChild(style);
	document.title = title;
	window.print();
	if (editable_fields.length) {
		editable_fields.editable('toggleDisabled');
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  This function is print the invoice in Excel Format, on click of downloadexcel button.
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function downloadexcel(file_name, element_selector) {
	var editable_fields = $('body').find('.editable');
	if (editable_fields.length) {
		editable_fields.editable('toggleDisabled');
	}
	var file = new Blob([$(element_selector).html()], { type: "application/vnd.ms-excel" });
	var url = URL.createObjectURL(file);
	var a = $("<a />", {
		href: url,
		download: file_name
	}).appendTo("body").get(0).click();
	if (editable_fields.length) {
		editable_fields.editable('toggleDisabled');
	}
}

// el -> this, evt -> event, decimal_length -> max length after floating point
function isNumberKeyWithFloatUptoTwoDecimal(el, evt, decimal_length=2) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	var number = el.value.split('.');

	if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	//just one dot
	if(number.length>1 && charCode == 46){
		 return false;
	}

	//get the carat position
	var caratPos = getSelectionStart(el);
	var dotPos = el.value.indexOf(".");

	if (
		caratPos > dotPos // entering after dot
		&& (dotPos>-1 || charCode == 46) // a dot is present, or current entered key is dot
		&& (el.value.length - (charCode == 46 ? caratPos : dotPos) > decimal_length) // total length - characters after position > specified max decimal length
		){
		return false;
	}
	return true;
}

// loader for every ajax call start
$(document).ajaxStart(function(){
  $(".divLoading").addClass('show');
});

// loader for every ajax call end
$(document).ajaxComplete(function(){
  $(".divLoading").removeClass('show');
});

function isAlphanumericWithSpace(event){
	var regex = new RegExp("^[a-zA-Z0-9 ,_.-]+$");
	var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
	if (!regex.test(key)) {
	    event.preventDefault();
	    return false;
	}
}

function isAlphanumeric(evt){
var code = (evt.which) ? evt.which : evt.keyCode;
if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
}

function serialize_form(selector) {
    var paramObj = {};
    $.each($(selector).serializeArray(), function (_, kv) {
        if (paramObj.hasOwnProperty(kv.name)) {
            paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
            paramObj[kv.name].push(kv.value);
        }
        else {
            paramObj[kv.name] = kv.value;
        }
    });
    return paramObj;
}

// Get total days in current month
function daysInThisMonth(date = null) {
	if (date == null) {
		var now = new Date();
	}else{
		var now = date;
	}
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

// compare applicable month and year with closing month year
function compare_applicable_month_year_with_closing_month_year(applicable_date, closing_date) {
	var months = {'January' : '01','February' : '02','March' : '03','April' : '04','May' : '05','June' : '06','July' : '07','August': '08','September' : '09','October' : '10','November' : '11','December' : '12'};

	var from_month = months[applicable_date.split(" ")[0]];
	var to_month = months[closing_date.split(" ")[0]];

	var from_year = applicable_date.split(" ").pop();
	var to_year = closing_date.split(" ").pop();

	// IF applicable month is less than closing date then return true else false
	if ((to_month > from_month && to_year == from_year) || (to_year > from_year)){
		return true;
	}
	else{
		return false;
	}
}