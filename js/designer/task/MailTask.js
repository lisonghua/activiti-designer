draw2d.MailTask=function(configPropCallback){
	draw2d.Task.call(this,configPropCallback);
	this.setTitle("Mail Task");
	this.to=null;
	this.from=null;
	this.subject=null;
	this.cc=null;
	this.bcc=null;
	this._charset=null;
	this._text=null;
	this._html=null;
};
draw2d.MailTask.prototype=new draw2d.Task();
draw2d.MailTask.prototype.type="draw2d.MailTask";
draw2d.MailTask.prototype.getIconClassName = function(){
	return "mail-task-icon";
};
draw2d.MailTask.prototype.getTaskTopLeftClassName=function(){
	return 'mail-task-top-left';
}
draw2d.MailTask.prototype.getTaskTopRightClassName=function(){
	return 'mail-task-top-right';
}
draw2d.MailTask.prototype.getTaskHeaderClassName=function(){
	return 'mail-task-header';
}
draw2d.MailTask.prototype.getStartElementXML=function(){
	var xml='<serviceTask ';
	xml=xml+this.getGeneralXML();
	xml=xml+' activiti:type="mail">\n';
	return xml;
};
draw2d.MailTask.prototype.getEndElementXML=function(){
	var xml = '</serviceTask>\n';
	return xml;
};
draw2d.MailTask.prototype.getExtensionElementsXML=function(){
	if(this.listeners.getSize()==0
	&&(this.to==null||this.to=='')
	&&(this.from==null||this.from=='')
	&&(this.subject==null||this.subject=='')
	&&(this.cc==null||this.cc=='')
	&&(this.bcc==null||this.bcc=='')
	&&(this._charset==null||this._charset=='')
	&&(this._text==null||this._text=='')
	&&(this._html==null||this._html==''))
		return '';
	var xml = '<extensionElements>\n';
	xml=xml+this.getListenersXML();
	xml=xml+this.getFieldsXML();
	xml=xml+'</extensionElements>\n';
	return xml;
};
draw2d.MailTask.prototype.getFieldsXML=function(){
	var xml = "";
	if(this.to!=null&&this.to!=''){
		xml=xml+'<activiti:field name="to">\n';
		xml=xml+'<activiti:string>'+this.to+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this.from!=null&&this.from!=''){
		xml=xml+'<activiti:field name="from">\n';
		xml=xml+'<activiti:string>'+this.from+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this.subject!=null&&this.subject!=''){
		xml=xml+'<activiti:field name="subject">\n';
		xml=xml+'<activiti:string>'+this.subject+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this.cc!=null&&this.cc!=''){
		xml=xml+'<activiti:field name="cc">\n';
		xml=xml+'<activiti:string>'+this.cc+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this.bcc!=null&&this.bcc!=''){
		xml=xml+'<activiti:field name="bcc">\n';
		xml=xml+'<activiti:string>'+this.bcc+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this._charset!=null&&this._charset!=''){
		xml=xml+'<activiti:field name="charset">\n';
		xml=xml+'<activiti:string>'+this.to+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this._html!=null&&this._html!=''){
		xml=xml+'<activiti:field name="html">\n';
		xml=xml+'<activiti:string>'+this._html+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	if(this._text!=null&&this._text!=''){
		xml=xml+'<activiti:field name="text">\n';
		xml=xml+'<activiti:string>'+this._text+'</activiti:string>\n';
		xml=xml+'</activiti:field>\n'
	}
	return xml;
};
draw2d.MailTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getMultiInstanceXML();
	xml=xml+this.getEndElementXML();
	return xml;
}