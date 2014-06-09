draw2d.BusinessRuleTask=function(configPropCallback){
	draw2d.Task.call(this,configPropCallback);
	this.setDimension(170,60);
	this.setTitle("Business Rule Task");
	this.ruleName=null;
	this.inputVariable=null;
	this.excluded=null;
	this.resultVariable=null;
};
draw2d.BusinessRuleTask.prototype=new draw2d.Task();
draw2d.BusinessRuleTask.prototype.type="draw2d.BusinessRuleTask";
draw2d.BusinessRuleTask.prototype.getIconClassName = function(){
	return "business-rule-task-icon";
};
draw2d.BusinessRuleTask.prototype.getTaskTopLeftClassName=function(){
	return 'business-rule-task-top-left';
}
draw2d.BusinessRuleTask.prototype.getTaskTopRightClassName=function(){
	return 'business-rule-task-top-right';
}
draw2d.BusinessRuleTask.prototype.getTaskHeaderClassName=function(){
	return 'business-rule-task-header';
}
draw2d.BusinessRuleTask.prototype.getStartElementXML=function(){
	var xml='<businessRuleTask ';
	xml=xml+this.getGeneralXML();
	xml=xml+this.getMainConfigXML();
	xml=xml+'>\n';
	return xml;
};
draw2d.BusinessRuleTask.prototype.getMainConfigXML=function(){
	var xml='';
	if(this.inputVariable!=null&&this.inputVariable!='')
		xml=xml+' activiti:ruleVariablesInput="'+this.inputVariable+'"'; 
	if(this.ruleName!=null&&this.ruleName!='')
		xml=xml+' activiti:rules="'+this.ruleName+'"';
	if(this.resultVariable!=null&&this.resultVariable!='') 
		xml=xml+' activiti:resultVariable="'+this.resultVariable+'"'; 
	if(this.excluded!=null&&this.excluded!='')
		xml=xml+' activiti:exclude="'+this.excluded+'"';
	return xml;
}
draw2d.BusinessRuleTask.prototype.getEndElementXML=function(){
	var xml = '</businessRuleTask>\n';
	return xml;
};
draw2d.BusinessRuleTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getMultiInstanceXML();
	xml=xml+this.getEndElementXML();
	return xml;
}