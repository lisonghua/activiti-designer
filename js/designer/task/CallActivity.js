draw2d.CallActivity=function(configPropCallback){
	draw2d.Task.call(this,configPropCallback);
	this.setDimension(170,60);
	this.setTitle("Call Activity");
	this.callElement=null;
	this.inputParams=new draw2d.ArrayList();
	this.outputParams=new draw2d.ArrayList(); 
};
draw2d.CallActivity.prototype=new draw2d.Task();
draw2d.CallActivity.prototype.type="draw2d.CallActivity";
draw2d.CallActivity.prototype.setIcon = function(){
	return "callactivity-icon";
};
draw2d.CallActivity.prototype.getTaskTopLeftClassName=function(){
	return 'call-activity-top-left';
}
draw2d.CallActivity.prototype.getTaskTopRightClassName=function(){
	return 'call-activity-top-right';
}
draw2d.CallActivity.prototype.getTaskHeaderClassName=function(){
	return 'call-activity-header';
}
draw2d.CallActivity.prototype.getStartElementXML=function(){
	var xml='<callActivity ';
	xml=xml+this.getGeneralXML();
	if(this.callElement!=null&&this.callElement!='')
		xml=xml+' calledElement="'+this.callElement+'"';
	xml=xml+'>\n';
	return xml;
};
draw2d.CallActivity.prototype.getExtensionElementsXML=function(){
	if(this.listeners.getSize()==0&&this.inputParams.getSize()==0&&this.outputParams.getSize()==0)
		return '';
	var xml = '<extensionElements>\n';
	xml=xml+this.getListenersXML();
	xml=xml+this.getInputParamsXML();
	xml=xml+this.getOutputParamsXML();
	xml=xml+'</extensionElements>\n';
	return xml;
};
draw2d.CallActivity.prototype.getInputParamsXML=function(){
	var xml='';
	for(var i=0;i<this.inputParams.getSize();i++){
		var param = this.inputParams.get(i);
		xml=xml+param.toXML();
	}
	return xml;
}
draw2d.CallActivity.prototype.getOutputParamsXML=function(){
	var xml='';
	for(var i=0;i<this.outputParams.getSize();i++){
		var param = this.outputParams.get(i);
		xml=xml+param.toXML();
	}
	return xml;
}
draw2d.CallActivity.prototype.getEndElementXML=function(){
	var xml = '</callActivity>\n';
	return xml;
};
draw2d.CallActivity.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getMultiInstanceXML();
	xml=xml+this.getEndElementXML();
	return xml;
}
draw2d.CallActivity.prototype.getInputParam=function(id){
	for(var i=0;i<this.inputParams.getSize();i++){
		var param = this.inputParams.get(i);
		if(param.id== id){
			return param;
		}
	}
}
draw2d.CallActivity.prototype.deleteInputParam=function(id){
	var param=this.getInputParam(id);
	this.inputParams.remove(param);
}
draw2d.CallActivity.prototype.getOutputParam=function(id){
	for(var i=0;i<this.outputParams.getSize();i++){
		var param = this.outputParams.get(i);
		if(param.id== id){
			return param;
		}
	}
}
draw2d.CallActivity.prototype.deleteOutputParam=function(id){
	var param=this.getOutputParam(id);
	this.outputParams.remove(param);
}

draw2d.CallActivity.Parameter=function(){
	this.id=draw2d.UUID.create();
	this.source=null;
	this.sourceExpression=null;
	this.target=null;
}
draw2d.CallActivity.Parameter.prototype.type="draw2d.CallActivity.Parameter";
draw2d.CallActivity.Parameter.prototype.getStartElementName=function(){
}
draw2d.CallActivity.Parameter.prototype.getEndElementXML=function(){
	var xml='</'+this.getStartElementName()+'>\n'
	return xml;
}
draw2d.CallActivity.Parameter.prototype.getStartElementXML=function(){
	var xml='<'+this.getStartElementName();
	if(this.source!=null&&this.source!='')
		xml=xml+' source="'+this.source+'"';
	if(this.source!=null&&this.source!='')
		xml=xml+' sourceExpression="'+this.sourceExpression+'"';
	xml=xml+' target="'+this.target+'"';
	xml=xml+'>'
	return xml;
}
draw2d.CallActivity.Parameter.prototype.toXML=function(){
	var xml=''
	xml=xml+this.getStartElementXML();
	xml=xml+this.getEndElementXML();
	return xml;
}

draw2d.CallActivity.Parameter.InputParameter=function(){
	draw2d.CallActivity.Parameter.call(this);
}
draw2d.CallActivity.Parameter.InputParameter.prototype=new draw2d.CallActivity.Parameter();
draw2d.CallActivity.Parameter.InputParameter.prototype.type="draw2d.CallActivity.Parameter.InputParameter";
draw2d.CallActivity.Parameter.InputParameter.prototype.getStartElementName=function(){
	return 'activiti:in';
}

draw2d.CallActivity.Parameter.OutputParameter=function(){
	draw2d.CallActivity.Parameter.call(this);
}
draw2d.CallActivity.Parameter.OutputParameter.prototype=new draw2d.CallActivity.Parameter();
draw2d.CallActivity.Parameter.OutputParameter.prototype.type="draw2d.CallActivity.Parameter.OutputParameter";
draw2d.CallActivity.Parameter.OutputParameter.prototype.getStartElementName=function(){
	return 'activiti:out';
}