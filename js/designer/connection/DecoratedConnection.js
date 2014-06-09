draw2d.DecoratedConnection=function(){
	draw2d.Connection.call(this);
	var decorator = new draw2d.ArrowConnectionDecorator();
	var black = new draw2d.Color(0,0,0);
	decorator.setBackgroundColor(black);
	this.setTargetDecorator(decorator);
	this.setRouter(new draw2d.ManhattanConnectionRouter());
	this.setLineWidth(1);
	this.setColor(black);
	this.lineId=null;
	this.lineName=null;
	this.condition=null;
	this.listeners=new draw2d.ArrayList();
	this.label=null;
};
draw2d.DecoratedConnection.prototype=new draw2d.Connection();
draw2d.DecoratedConnection.prototype.type="DecoratedConnection";
draw2d.DecoratedConnection.prototype.getConditionXML=function(){
	var xml = '';
	if(this.condition != null&&this.condition!=''){
		xml = '<conditionExpression xsi:type="tFormalExpression"><![CDATA['+this.condition+']]></conditionExpression>\n';
	}
	return xml;
}
draw2d.DecoratedConnection.prototype.toXML=function(){
	var sourceId = null;
	var type=this.getSource().getParent().type;
	if(type=='draw2d.Start'){
		sourceId = this.getSource().getParent().eventId;
	}	
	else if(type=='draw2d.ExclusiveGateway'){
		sourceId = this.getSource().getParent().gatewayId;
	}else if(type=='draw2d.ParallelGateway'){
		sourceId = this.getSource().getParent().gatewayId;
	}else{
		sourceId = this.getSource().getParent().taskId;
	}
	var targetId = null;
	type=this.getTarget().getParent().type;
	if(type=='draw2d.End'){
		targetId = this.getTarget().getParent().eventId;
	}else if(type=='draw2d.ExclusiveGateway'){
		targetId = this.getTarget().getParent().gatewayId;
	}else if(type=='draw2d.ParallelGateway'){
		targetId = this.getTarget().getParent().gatewayId;
	}else{
		targetId = this.getTarget().getParent().taskId;
	}
	var name = this.lineId;
	var lineName = trim(this.lineName);
	if(lineName != null && lineName != "")
		name = lineName;
	var xml = '<sequenceFlow id="'+this.lineId+'" name="'+name+'" sourceRef="'+sourceId+'" targetRef="'+targetId+'">\n';
	xml = xml+this.getConditionXML();
	xml = xml+'</sequenceFlow>\n';
	return xml;
};
draw2d.DecoratedConnection.prototype.setLabel=function(text){
	if(this.label == null){
		this.label=new draw2d.Label(text);
		this.label.setFontSize(10);
		this.label.setAlign("left");
		//label.setBackgroundColor(new draw2d.Color(230,230,250));
		//label.setBorder(new draw2d.LineBorder(1));
		this.addFigure(this.label,new draw2d.ManhattanMidpointLocator(this));
	}else{
		this.label.setText(text);
	}
};
draw2d.DecoratedConnection.prototype.toBpmnDI=function(){
	var xml='<bpmndi:BPMNEdge bpmnElement="'+this.lineId+'" id="BPMNEdge_'+this.lineId+'">\n';
	var startX = this.getSource().getAbsoluteX();
	var startY = this.getSource().getAbsoluteY();
	var endX = this.getTarget().getAbsoluteX();
	var endY = this.getTarget().getAbsoluteY();
	xml=xml+'<omgdi:waypoint x="'+startX+'" y="'+startY+'"/>\n';
    xml=xml+'<omgdi:waypoint x="'+endX+'" y="'+endY+'"/>\n';
	xml=xml+'</bpmndi:BPMNEdge>\n';
	return xml;
};
draw2d.DecoratedConnection.prototype.onDoubleClick=function(){
	openFlowProperties(this);
};
draw2d.DecoratedConnection.prototype.getContextMenu=function(){
	if(this.workflow.disabled)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {line:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("Properties", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var line = data.line;
		if(typeof openFlowProperties != "undefined"){
			openFlowProperties(line);
		}
	}));
	menu.appendMenuItem(new draw2d.ContextMenuItem("Delete", "icon-remove",data,function(x,y)
	{
		var data = this.getData();
		var line = data.line;
		var lid = line.getId();
		var wf = line.getWorkflow();
		wf.getCommandStack().execute(new draw2d.CommandDelete(line));
		//wf.removeFigure(line);
	}));
	
	return menu;
};
draw2d.DecoratedConnection.prototype.getListener=function(id){
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		if(listener.getId()=== id){
			return listener;
		}
	}
};
draw2d.DecoratedConnection.prototype.deleteListener=function(id){
	var listener = this.getListener(id);
	this.listeners.remove(listener);
};
draw2d.DecoratedConnection.prototype.setListener=function(listener){
	this.listeners.add(listener);
};