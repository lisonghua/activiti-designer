draw2d.ReceiveTask=function(configPropCallback){
	draw2d.Task.call(this,configPropCallback);
	this.setTitle("Receive Task");
};
draw2d.ReceiveTask.prototype=new draw2d.Task();
draw2d.ReceiveTask.prototype.type="draw2d.ReceiveTask";
draw2d.ReceiveTask.prototype.getIconClassName = function(){
	return "receive-task-icon";
};
draw2d.ReceiveTask.prototype.getTaskTopLeftClassName=function(){
	return 'receive-task-top-left';
}
draw2d.ReceiveTask.prototype.getTaskTopRightClassName=function(){
	return 'receive-task-top-right';
}
draw2d.ReceiveTask.prototype.getTaskHeaderClassName=function(){
	return 'receive-task-header';
}
draw2d.ReceiveTask.prototype.getStartElementXML=function(){
	var xml='<receiveTask ';
	xml=xml+this.getGeneralXML();
	xml=xml+'>\n';
	return xml;
};
draw2d.ReceiveTask.prototype.getEndElementXML=function(){
	var xml = '</receiveTask>\n';
	return xml;
};
draw2d.ReceiveTask.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getMultiInstanceXML();
	xml=xml+this.getEndElementXML();
	return xml;
}