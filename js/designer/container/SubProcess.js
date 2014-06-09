draw2d.SubProcess=function(configPropCallback,configSubProcessCallback){
	draw2d.Task.call(this,configPropCallback);
	this.setTitle("SubProcess");
	this.subProcess=null;
	this.configSubProcessCallback=configSubProcessCallback;
};
draw2d.SubProcess.prototype = new draw2d.Task();
draw2d.SubProcess.prototype.type = "draw2d.SubProcess";
draw2d.SubProcess.prototype.getIconClassName = function(){
	return "subprocess-icon";
};
draw2d.SubProcess.prototype.getStartElementXML=function(){
	var xml='<subProcess ';
	xml=xml+this.getGeneralXML();
	xml=xml+'>\n';
	return xml;
};
draw2d.SubProcess.prototype.getEndElementXML=function(){
	var xml = '</subProcess>\n';
	return xml;
};
draw2d.SubProcess.prototype.toXML=function(){
	var xml=this.getStartElementXML();
	xml=xml+this.getExtensionElementsXML();
	xml=xml+this.getMultiInstanceXML();
	xml=xml+this.getEndElementXML();
	return xml;
}
draw2d.SubProcess.prototype.getContextMenu=function(){
	var menu = draw2d.Task.prototype.getContextMenu.call(this);
	if(menu!=null){
		var data = {task:this};
		menu.appendMenuItem(new draw2d.ContextMenuItem("Open Process", "process-icon",data,function(x,y)
		{
			var data = this.getData();
			var task = data.task;
			if(typeof task.configSubProcessCallback == "function"){
				task.configSubProcessCallback(task);
			}
		}));
	}
	return menu;
}