/*
 * Translated messages for the jQuery validation plugin.
 * Locale: EN
 */
jQuery.extend(jQuery.validator.messages, {
        required: "Not Null",
		remote: "Please input again!",
		email: "Email format is false!",
		url: "URL format is false!",
		date: "Data format is false!",
		dateISO: "Data format is false(ISO).",
		number: "It must number format!",
		digits: "It must digital format!",
		creditcard: "Credit card number format is false!",
		equalTo: "Please input the same value!",
		accept: "Please input a String of correct suffix!",
		maxlength: jQuery.validator.format("Please input a string which the max length is {0}!"),
		minlength: jQuery.validator.format("Please input a string which the min length is {0}!"),
		rangelength: jQuery.validator.format("Please input a string which the lenght is between {0} and {1} !"),
		range: jQuery.validator.format("Please input a value between {0} and {1} !"),
		max: jQuery.validator.format("Please input a value which the max is {0} !"),
		min: jQuery.validator.format("Please input a value which the min is {0} !"),
		//extend
		mobile:"Moblile format is false!",
		phone:"Phone format is false!",
		zipCode:"ZipCode format is false!",
		qq:"QQ format is false!",
		ip:"IP format is false!",
		chrnum:"Please input a string or number or underline(Character:A-Z, a-z, 0-9, _ )!",
		chinese:"Please input a chinese!",
		byteRangeLength:jQuery.validator.format("Please input a value hich the lenght is between {0} and {1} characters (A chinese is two characters)!"),
		simpleDate:"Please enter a correct date, format is 'yyyy-MM-dd'"
});