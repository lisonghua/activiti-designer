draw2d.ServiceTask=function(configPropCallback){
	draw2d.Task.call(this,configPropCallback);
	this.setTitle("Service Task");
	this._type=null;
	this._javaClass=null;
	this._expression=null;
	this.delegateExpression=null;
	this.resultVariable=null;
	this.fields=new draw2d.ArrayList();
};
draw2d.ServiceTask.prototype=new draw2d.Task();
draw2d.ServiceTask.prototype.type="draw2d.ServiceTask";
draw2d.ServiceTask.prototype.getIconClassName = function(){
	return "service-task-icon";
};
draw2d.ServiceTask.prototype.getTaskTopLeftClassName=function(){
	return 'service-task-top-left';
}
draw2d.ServiceTask.prototype.getTaskTopRightClassName=function(){
	return 'service-task-top-right';
}
draw2d.ServiceTask.prototype.getTaskHeaderClassName=function(){
	return 'service-task-header';
}
draw2d.ServiceTask.prototype.getStartElementXML=function(){
	var xml='<serviceTask ';
	xml=xml+this.getGeneralXML();
	xml=xml+this.getServiceXML();
	xml=xml+'>\n';
	return xml;
};
draw2d.ServiceTask.prototype.getServiceXML=function(){
	var xml='';
	if(this._type=='javaClass'){
		if(this._javaClass!=null&&this._javaClass!='')
			xml=xml+' activiti:class="'+this._javaClass+'" '
	}else if(this._type=='expression'){
		if(this._expression!=null&&this._expression!='')
			xml=xml+' activiti:expression="'+this._expression+'" '
	}else if(this._type=='delegateExpression'){
		if(this.delegateExpression!=null&&this.delegateExpression!='')
			xml=xml+' activiti:delegateExpression="'+this.delegateExpression+'" '
	}
	if(this.resultVariable!=null&&this.resultVariable!=''){
		xml=xml+'activiti:resultVariableName="'+this.resultVariable+'" '
	}
	return xml;
};
draw2d.ServiceTask.prototype.getDocumentationXML=function(){
	if(this.documentation==null||this.documentation=='')return '';
	var xml='<documentation>';
	xml=xml+this.documentation;
	xml=xml+'</documentation>';
	return xml;
};
draw2d.ServiceTask.prototype.getExtensionElementsXML=function(){
	if(this.listeners.getSize()==0&&this.fields.getSize()==0)return '';
	var xml = '<extensionElements>\n';
	xml=xml+this.getListenersXML();
	xml=xml+this.getFieldsXML();
	xml=xml+'</extensionElements>\n';
	return xml;
};
draw2d.ServiceTask.prototype.getFieldsXML=function(){
	var xml = "";
	for(var i=0;i<this.fields.getSize();i++){
		var field = this.fields.get(i);
		xml=xml+field.toXML();
	}
	return xml;
};
draw2d.ServiceTask.prototype.getEndElementXML=function(){
	var xml = '</serviceTask>\n';
	return xml;
};
draw2d.ServiceTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getMultiInstanceXML();
	xml=xml+this.getDocumentationXML();
	xml=xml+this.getEndElementXML();
	return xml;
}
draw2d.ServiceTask.prototype.getFields=function(id){
	for(var i=0;i<this.fields.getSize();i++){
		var field = this.fields.get(i);
		if(field.id== id){
			return field;
		}
	}
}
draw2d.ServiceTask.prototype.addField=function(field){
	this.fields.add(field);
}
draw2d.ServiceTask.prototype.deleteField=function(id){
	var field=this.getFields(id);
	this.fields.remove(field);
}