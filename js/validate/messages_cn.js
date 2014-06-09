/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: CN
 */
jQuery.extend(jQuery.validator.messages, {
        required: "必选字段",
		remote: "请修正该字段",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "只能输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: "请再次输入相同的值",
		accept: "请输入拥有合法后缀名的字符串",
		maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
		minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
		rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
		range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
		min: jQuery.validator.format("请输入一个最小为 {0} 的值"),
		//extend
		mobile:"手机号码格式错误",
		phone:"电话号码格式错误",
		zipCode:"邮政编码格式错误",
		qq:"qq号码格式错误",
		ip:"Ip地址格式错误",
		chrnum:"只能输入数字、字母、下划线(字符A-Z, a-z, 0-9, _ )",
		chinese:"只能输入中文",
		byteRangeLength:jQuery.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"),
		simpleDate:"请输入合法的日期格式:yyyy-MM-dd"
});