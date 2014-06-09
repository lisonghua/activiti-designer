//comply jQuery easyUI
//$.extend($.validator.defaults,
//		{
//			onfocusin : function(element) {
//				//alert($(element).attr('class'));
//				var hiddenElement = null;
//				if ($(element).parent().hasClass('combo')) {
//					hiddenElement = $(element).parent().find(".combo-value").get(0);
//				} else {
//					hiddenElement = element;
//				}
//				this.lastActive = element;
//
//				// hide error label and remove error class on focus if enabled
//				if (this.settings.focusCleanup && !this.blockFocusCleanup) {
//					this.settings.unhighlight
//							&& this.settings.unhighlight.call(this, element,
//									this.settings.errorClass,
//									this.settings.validClass);
//					this.errorsFor(hiddenElement).hide();
//				}
//			},
//			onfocusout : function(element) {
////				alert($(element).attr('class'));
//				var hiddenElement = null;
//				if ($(element).parent().hasClass('combo')) {
//					hiddenElement = $(element).parent().find(".combo-value").get(0);
//				} else {
//					hiddenElement = element;
//				}
//				
//				if (!this.checkable(element)
//						&& (hiddenElement.name in this.submitted || !this
//								.optional(element))) {
//					this.element(element);
//				}
//			},
//			onkeyup : function(element) {
////				alert($(element).attr('class'));
//				var hiddenElement = null;
//				if ($(element).parent().hasClass('combo')) {
//					hiddenElement = $(element).parent().find(".combo-value").get(0);
//				} else {
//					hiddenElement = element;
//				}
//				if (hiddenElement.name in this.submitted
//						|| element == this.lastElement) {
//					this.element(element);
//				}
//			},
//			onclick : function(element) {
////				alert($(element).attr('class'));
//				var hiddenElement = null;
//				if ($(element).parent().hasClass('combo')) {
//					hiddenElement = $(element).parent().find(".combo-value").get(0);
//				} else {
//					hiddenElement = element;
//				}
//				// click on selects, radiobuttons and checkboxes
//				if (hiddenElement.name in this.submitted)
//					this.element(element);
//				// or option elements, check parent select in that case
//				else if (element.parentNode.name in this.submitted)
//					this.element(element.parentNode);
//			}
//		});
function simpleDateFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
}
function simpleDateParser(s){
	var t = _isSimpleDate(s);
	if (t) {
		var a = s.split('-');
		var y = new Number(a[0]);
		var m = new Number(a[1]);
		var d = new Number(a[2]);
		var dd = new Date(y, m - 1, d);
		return dd;
	} else {
		return new Date();
	}
}
function _isSimpleDate(s){
	var re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
	if( re.test(s)){
		var adata = s.split('-');
		var yyyy = parseInt(adata[0],10);
		var mm = parseInt(adata[1],10);
		var dd = parseInt(adata[2],10);
		var xdata = new Date(yyyy,mm-1,dd);
		if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
			return true;
		else
			return false;
	}else{
		return false;
	}
}
function showErrors() {
	var t = this;
	for ( var i = 0; this.errorList[i]; i++) {
		var errorElement = null;
		var valueElement = null;
		var error = this.errorList[i];
		// comply jQuery easyUI
		if ($(error.element).parent().hasClass('combo')) {
			errorElement = $(error.element).parent().find(".combo-text").get(0);
			valueElement = $(error.element).parent().find(".combo-value").get(0);
			//errorElement.addClass('input-error');
		} else {
			errorElement = error.element;
			valueElement = error.element;
		}
		this.settings.highlight
				&& this.settings.highlight.call(this, errorElement,
						this.settings.errorClass, this.settings.validClass);

		var elename = this.idOrName(valueElement);
		// 错误信息div
		var errdiv = $('div[htmlfor=' + elename + ']');
		var errimg = $('img[htmlfor=' + elename + ']');
		if (errdiv.length == 0) { // 没有div则创建

			// 纯css不用图片的圆角div，存在在IE6下显示过长的问题
			// errdiv = $('<div>'
			// + '<b class="rtop"><b class="r1"></b><b class="r2"></b><b
			// class="r3"></b><b class="r4"></b></b>'
			// + '<span class="errmsg"> </span>'
			// + '<b class="rbottom"><b class="r4"></b><b class="r3"></b><b
			// class="r2"></b><b class="r1"></b></b> '
			// + '</div> ');

			// 带图片的圆角div在所有浏览器兼容
			errdiv = $('<div class="error-tip">'
					+ '<div class="error-tip-content">' 
					+ '</div>'
					+ '<div class="error-tip-pointer">' 
					+ '</div>' 
					+ '</div>');

			errdiv.attr( {
				"htmlfor" : elename,
				generated : true
			}).addClass(this.settings.errorClass);
			// errdiv.css({left : $.getLeft(error.element) + 'px',top :
			// $.getTop(error.element) + 'px'}); // 显示在控件的下面
			errdiv.appendTo($('body'));
		}
		errdiv.find(".error-tip-content").html(error.message || "");
		// 鼠标放到控件上显示错误
		$(errorElement).hover(function(e) {
			// comply jQuery easyUI
			if ($(this).parent().hasClass('combo')) {
				errorElement = $(this).parent().find(".combo-text").get(0);
				valueElement = $(this).parent().find(".combo-value").get(0);
				//errorElement.addClass('input-error');
			} else {
				errorElement = this;
				valueElement = this;
			}
			$('div[htmlfor="' + t.idOrName(valueElement) + '"]').css( {
				left : ($(this).offset().left + $(this).outerWidth()),
				top : ($(this).offset().top)
			}); 
				$('div[htmlfor="' + t.idOrName(valueElement) + '"]').fadeIn(200);
			}, function() {
				$('div[htmlfor="' + t.idOrName(valueElement) + '"]').fadeOut(200);
			});
	}

	// 校验成功的去掉错误提示
	for ( var i = 0; this.successList[i]; i++) {
		// comply jQuery easyUI
		if ($(this.successList[i]).parent().hasClass('combo')) {
			errorElement = $(this.successList[i]).parent().find(".combo-text").get(0);
			valueElement = $(this.successList[i]).parent().find(".combo-value").get(0);
			//errorElement.addClass('input-error');
		} else {
			errorElement = this.successList[i];
			valueElement = this.successList[i];
		}
		$('div[htmlfor="' + this.idOrName(valueElement) + '"]').remove();
	}

	// 自定义高亮
	if (this.settings.unhighlight) {
		for ( var i = 0, elements = this.validElements(); elements[i]; i++) {
			// comply jQuery easyUI
			if ($(elements[i]).parent().hasClass('combo')) {
				errorElement = $(elements[i]).parent().find(".combo-text").get(0);
				valueElement = $(elements[i]).parent().find(".combo-value").get(0);
				//errorElement.addClass('input-error');
			} else {
				errorElement = elements[i];
				valueElement = elements[i];
			}
			this.settings.unhighlight.call(this, errorElement,
					this.settings.errorClass, this.settings.validClass);
		}
	}
}
//$.extend( {
//	getLeft : function(object) {
//		var go = object;
//		var oParent, oLeft = go.offsetLeft;
//		while (go.offsetParent != null) {
//			oParent = go.offsetParent;
//			oLeft += oParent.offsetLeft;
//			go = oParent;
//		}
//		return oLeft;
//	},
//	getTop : function(object) {
//		var go = object;
//		var goHeight = go.height;
//		var oParent, oTop = go.offsetTop;
//		while (go.offsetParent != null) {
//			oParent = go.offsetParent;
//			oTop += oParent.offsetTop;
//			go = oParent;
//		}
//		return oTop + 22;// 之所以加22不加控件高度,为了兼容ie6.
//}
//});