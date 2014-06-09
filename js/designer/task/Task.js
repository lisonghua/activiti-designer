draw2d.Task = function(configPropCallback) {
	this.cornerWidth = 15;
	this.cornerHeight = 15;
	this.rightOutputPort = null;
	this.bottomOutputPort = null;
	this.topOutputPort = null;
	this.leftOutputPort = null;
	draw2d.Node.call(this);
	this.setDimension(130,60);
	this.originalHeight = -1;
	this.taskId=null;
	this.taskName="";
	this.documentation=null;
	this.listeners=new draw2d.ArrayList();
	this.asynchronous=null;
	this.exclusive=true;
	this.isSequential=false;
	this._loopCardinality=null;
	this._collection=null;
	this._elementVariable=null;
	this._completionCondition=null;
	this.openPropertiesCallBack=configPropCallback;
	this.setIcon();
};
draw2d.Task.prototype = new draw2d.Node();
draw2d.Task.prototype.type = "Task";
draw2d.Task.prototype.generateId=function(){
	this.id="task"+Sequence.create();
	this.taskId=this.id;
};
draw2d.Task.prototype.getTaskTopLeftClassName=function(){
	return 'task-top-left';
}
draw2d.Task.prototype.getTaskTopRightClassName=function(){
	return 'task-top-right';
}
draw2d.Task.prototype.getTaskHeaderClassName=function(){
	return 'task-header';
}
draw2d.Task.prototype.createHTMLElement = function() {
	var item = document.createElement("div");
	item.id = this.id;
	item.style.position = "absolute";
	item.style.left = this.x + "px";
	item.style.top = this.y + "px";
	item.style.height = this.width + "px";
	item.style.width = this.height + "px";
	item.className="task";
	item.style.zIndex = "" + draw2d.Figure.ZOrderBaseIndex;
	
	this.top_left = document.createElement("div");
	this.top_left.className=this.getTaskTopLeftClassName();
	this.top_left.style.width = this.cornerWidth + "px";
	this.top_left.style.height = this.cornerHeight + "px";
	
	this.top_right = document.createElement("div");
	this.top_right.className=this.getTaskTopRightClassName();
	this.top_right.style.width = this.cornerWidth + "px";
	this.top_right.style.height = this.cornerHeight + "px";
	
	this.bottom_left = document.createElement("div");
	this.bottom_left.className="bottom-top-left";
	this.bottom_left.style.width = this.cornerWidth + "px";
	this.bottom_left.style.height = this.cornerHeight + "px";
	
	this.bottom_right = document.createElement("div");
	this.bottom_right.className="bottom-top-right";
	this.bottom_right.style.width = this.cornerWidth + "px";
	this.bottom_right.style.height = this.cornerHeight + "px";
	
	this.header = document.createElement("div");
	this.header.className=this.getTaskHeaderClassName();
	this.header.style.position = "absolute";
	this.header.style.left = this.cornerWidth + "px";
	this.header.style.top = "0px";
	this.header.style.height = (this.cornerHeight) + "px";
	this.disableTextSelection(this.header);
	
	this.footer = document.createElement("div");
	this.footer.className="task-footer";
	this.footer.style.position = "absolute";
	this.footer.style.left = this.cornerWidth + "px";
	this.footer.style.top = "0px";
	this.footer.style.height = (this.cornerHeight - 1) + "px";
	
	this.textarea = document.createElement("div");
	this.textarea.className="task-textarea";
	this.textarea.style.position = "absolute";
	this.textarea.style.left = "0px";
	this.textarea.innerText = this.taskName;
	this.textarea.style.top = this.cornerHeight + "px";
	this.disableTextSelection(this.textarea);
	
	item.appendChild(this.top_left);
	item.appendChild(this.header);
	item.appendChild(this.top_right);
	item.appendChild(this.textarea);
	item.appendChild(this.bottom_left);
	item.appendChild(this.footer);
	item.appendChild(this.bottom_right);
	
	return item;
};
draw2d.Task.prototype.setDimension = function(w, h) {
	try{
		draw2d.Node.prototype.setDimension.call(this, w, h);
		if (this.top_left !== null) {
			this.top_right.style.left = (this.width - this.cornerWidth) + "px";
			this.bottom_right.style.left = (this.width - this.cornerWidth) + "px";
			this.bottom_right.style.top = (this.height - this.cornerHeight) + "px";
			this.bottom_left.style.top = (this.height - this.cornerHeight) + "px";
			this.textarea.style.width = (this.width - 2) + "px";
			this.textarea.style.height = (this.height - this.cornerHeight * 2)
					+ "px";
			this.header.style.width = (this.width - this.cornerWidth * 2) + "px";
			this.footer.style.width = (this.width - this.cornerWidth * 2) + "px";
			this.footer.style.top = (this.height - this.cornerHeight) + "px";
		}
		if (this.rightOutputPort !== null) {
			this.rightOutputPort.setPosition(this.width + 5, this.height / 2);
		}
		if (this.bottomOutputPort !== null) {
			this.bottomOutputPort.setPosition(this.width/2, this.height + 5);
		}
		if (this.leftOutputPort !== null) {
			this.leftOutputPort.setPosition(-5, this.height / 2);
		}
		if (this.topOutputPort !== null) {
			this.topOutputPort.setPosition(this.width/2, -5);
		}
	}catch(e){
	}
};
draw2d.Task.prototype.setTitle = function(title) {
	this.header.innerHTML = title;
};
draw2d.Task.prototype.setContent = function(_5014) {
	this.textarea.innerHTML = _5014;
};
draw2d.Task.prototype.onDragstart = function(x, y) {
	var _5017 = draw2d.Node.prototype.onDragstart.call(this, x, y);
	if (this.header === null) {
		return false;
	}
	if (y < this.cornerHeight && x < this.width
			&& x > (this.width - this.cornerWidth)) {
		this.toggle();
		return false;
	}
	if (this.originalHeight == -1) {
		if (this.canDrag === true && x < parseInt(this.header.style.width)
				&& y < parseInt(this.header.style.height)) {
			return true;
		}
	} else {
		return _5017;
	}
};
draw2d.Task.prototype.setCanDrag = function(flag) {
	draw2d.Node.prototype.setCanDrag.call(this, flag);
	this.html.style.cursor = "";
	if (this.header === null) {
		return;
	}
	if (flag) {
		this.header.style.cursor = "move";
	} else {
		this.header.style.cursor = "";
	}
};
draw2d.Task.prototype.setWorkflow = function(_5019) {
	draw2d.Node.prototype.setWorkflow.call(this, _5019);
	if (_5019 !== null && this.leftOutputPort === null) {
		this.leftOutputPort = new draw2d.MyOutputPort();
		this.leftOutputPort.setWorkflow(_5019);
		this.leftOutputPort.setName("leftOutputPort");
		this.addPort(this.leftOutputPort, -5, this.height / 2);
		
		this.topOutputPort = new draw2d.MyOutputPort();
		this.topOutputPort.setWorkflow(_5019);
		this.topOutputPort.setName("topOutputPort");
		this.addPort(this.topOutputPort, this.width/2, -5);
		
		this.rightOutputPort = new draw2d.MyOutputPort();
		this.rightOutputPort.setMaxFanOut(5);
		this.rightOutputPort.setWorkflow(_5019);
		this.rightOutputPort.setName("rightOutputPort");
		this.addPort(this.rightOutputPort, this.width + 5, this.height / 2);
		
		this.bottomOutputPort = new draw2d.MyOutputPort();
		this.bottomOutputPort.setMaxFanOut(5);
		this.bottomOutputPort.setWorkflow(_5019);
		this.bottomOutputPort.setName("bottomOutputPort");
		this.addPort(this.bottomOutputPort, this.width/2, this.height + 5);
	}
};
draw2d.Task.prototype.toggle = function() {
	if (this.originalHeight == -1) {
		this.originalHeight = this.height;
		this.setDimension(this.width, this.cornerHeight * 2);
		this.setResizeable(false);
	} else {
		this.setDimension(this.width, this.originalHeight);
		this.originalHeight = -1;
		this.setResizeable(true);
	}
};

draw2d.Task.prototype.onDoubleClick=function(){
	if(typeof this.openPropertiesCallBack == "function"){
			this.openPropertiesCallBack(this);
		}
};

draw2d.Task.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 100);
	var data = {task:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("Properties", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var task = data.task;
		//var tid = task.getId();
		if(typeof task.openPropertiesCallBack == "function"){
			task.openPropertiesCallBack(task);
		}
	}));
	menu.appendMenuItem(new draw2d.ContextMenuItem("Delete", "icon-remove",data,function(x,y)
	{
		var data = this.getData();
		var task = data.task;
		var tid = task.getId();
		var wf = task.getWorkflow();
		wf.getCommandStack().execute(new draw2d.CommandDelete(task));
		//wf.removeFigure(task);
	}));
	
	return menu;
};
draw2d.Task.prototype.getIconClassName = function(){
};
draw2d.Task.prototype.setIcon = function(){
	this.icon = document.createElement("div");
	this.icon.style.position = "absolute";
	this.icon.style.width = this.cornerWidth + "px";
	this.icon.style.height = this.cornerHeight + "px";
	this.icon.style.left = "10px";
	this.icon.style.top = "2px";
	this.icon.className = this.getIconClassName();
	this.getHTMLElement().appendChild(this.icon);
	return this.icon;
};
draw2d.Task.prototype.getListener=function(id){
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		if(listener.getId()=== id){
			return listener;
		}
	}
};
draw2d.Task.prototype.deleteListener=function(id){
	var listener = this.getListener(id);
	this.listeners.remove(listener);
};
draw2d.Task.prototype.addListener=function(listener){
	this.listeners.add(listener);
};
draw2d.Task.prototype.setListeners=function(listeners){
	this.listeners = listeners;
};
draw2d.Task.prototype.setHighlight=function(){
	this.getHTMLElement().className="task-highlight";
};
draw2d.Task.prototype.onMouseEnter=function(){
	if(typeof onTaskMouseEnter != "undefined"){
		onTaskMouseEnter(this);
	}
};
draw2d.Task.prototype.onMouseLeave=function(){
	if(typeof onTaskMouseLeave != "undefined"){
		onTaskMouseLeave(this);
	}
};
draw2d.Task.prototype.getStartElementXML=function(){
	
};
draw2d.Task.prototype.getGeneralXML=function(){
	var name = this.taskId;
	var taskName = trim(this.taskName);
	if(taskName != null && taskName != "")
		name = taskName;
	var xml=' id="'+this.taskId+'" name="'+name+'" ';
	if(this.asynchronous){
		xml=xml+'activiti:async="true" '
	}
	if(!this.exclusive){
		xml=xml+'activiti:exclusive="false" '
	}
	return xml;
}
draw2d.Task.prototype.getEndElementXML=function(){
	
};
draw2d.Task.prototype.getDocumentationXML=function(){
	return "";
};
draw2d.Task.prototype.getMultiInstanceXML=function(){
	var xml = '';
	if(this.isSequential){
		xml=xml+'<multiInstanceLoopCharacteristics ';
		if(this._elementVariable!=null&&this._elementVariable!='')
			xml=xml+'activiti:elementVariable="'+this._elementVariable+'" ';
		if(this._collection!=null&&this._collection!='')
			xml=xml+'activiti:collection="'+this._collection+'" ';
		xml=xml+'>\n'
		if(this._loopCardinality!=null&&this._loopCardinality!='')
			xml=xml+'<loopCardinality>'+this._loopCardinality+'</loopCardinality>\n';
		if(this._completionCondition!=null&&this._completionCondition!='')
			xml=xml+'<completionCondition>'+this._completionCondition+'</completionCondition>\n'
		xml=xml+'</multiInstanceLoopCharacteristics>\n';
	}
	return xml;
};
draw2d.Task.prototype.getExtensionElementsXML=function(){
	if(this.listeners.getSize()==0)return '';
	var xml = '<extensionElements>\n';
	xml=xml+this.getListenersXML();
	xml=xml+'</extensionElements>\n';
	return xml;
};
draw2d.Task.prototype.getListenersXML=function(){
	var xml = '';
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		xml=xml+listener.toXML();
	}
	return xml;
};

draw2d.Task.prototype.getMainConfigXML=function(){
	return "";
};
draw2d.Task.prototype.toXML=function(){
	return "";
};
draw2d.Task.prototype.toBpmnDI=function(){
	var w=this.getWidth();
	var h=this.getHeight();
	var x=this.getAbsoluteX();
	var y=this.getAbsoluteY();
	var xml='<bpmndi:BPMNShape bpmnElement="'+this.taskId+'" id="BPMNShape_'+this.taskId+'">\n';
	xml=xml+'<omgdc:Bounds height="'+h+'" width="'+w+'" x="'+x+'" y="'+y+'"/>\n';
	xml=xml+'</bpmndi:BPMNShape>\n';
	return xml;
};