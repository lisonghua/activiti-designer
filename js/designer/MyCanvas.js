draw2d.MyCanvas=function(id){
		draw2d.Workflow.call(this,id);
		this.html.style.backgroundImage="";//remove default backgourd
		this.html.className="MyCanvas";
		this.disabled=false;
		//this.processCategory=null;
		//this.processId=null;
		//this.processName=null;
		this.process=new draw2d.Process();
		//this.listeners=new draw2d.ArrayList();
};
draw2d.MyCanvas.prototype = new draw2d.Workflow();
draw2d.MyCanvas.prototype.type = "MyCanvas";
/*
draw2d.MyCanvas.prototype.showConnectionLine=function(x1, y1, x2, y2){
	var connectionLine = new draw2d.DecoratedConnection();
	connectionLine.setStartPoint(x1, y1);
	connectionLine.setEndPoint(x2, y2);
	if (connectionLine.canvas === null) {
		draw2d.Canvas.prototype.addFigure.call(this, connectionLine);
	}
};
*/
draw2d.MyCanvas.prototype.setDisabled = function(){
	this.disabled = true;
	return this.readOnly;
};
draw2d.MyCanvas.prototype.addFigure = function(figure, xPos, yPos){
	var parent = this.getBestCompartmentFigure(xPos,yPos);
	if(parent === null){
		draw2d.Workflow.prototype.addFigure.call(this,figure, xPos, yPos);
	}else{
		this.getCommandStack().execute(new draw2d.CommandAdd(this,figure,xPos,yPos,parent));
	}
};
draw2d.MyCanvas.prototype.addModel = function(figure, xPos, yPos){
	var parent = this.getBestCompartmentFigure(xPos,yPos);
	this.getCommandStack().execute(new draw2d.CommandAdd(this,figure,xPos,yPos,parent));
};
draw2d.MyCanvas.prototype.getContextMenu=function(){
	if(this.readOnly)return null;
	var menu =new draw2d.ContextMenu(100, 50);
	var data = {workflow:this};
	menu.appendMenuItem(new draw2d.ContextMenuItem("Properties", "properties-icon",data,function(x,y)
	{
		var data = this.getData();
		var workflow = data.workflow;
		var pid = workflow.processId;
		openProcessProperties(pid);
	}));
	return menu;
	
};
/*
draw2d.MyCanvas.prototype.getListener=function(id){
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		if(listener.getId()=== id){
			return listener;
		}
	}
};
draw2d.MyCanvas.prototype.deleteListener=function(id){
	var listener = this.getListener(id);
	this.listeners.remove(listener);
};
draw2d.MyCanvas.prototype.setListener=function(listenser){
	this.listeners.add(listener);
};
*/
draw2d.MyCanvas.prototype.onContextMenu=function(x,y){
	if(this.readOnly)return;
	var f = this.getBestFigure(x, y);
	if(f==null)
		f = this.getBestLine(x, y);
	if(f !=null){
		var menu = f.getContextMenu();
		if (menu !== null) {
			this.showMenu(menu, x, y);
		}
	}else{
		var menu = this.getContextMenu();
		if (menu !== null) {
			this.showMenu(menu, x, y);
		}
	}
};
draw2d.MyCanvas.prototype.getXMLHeader=function(){
	var xml='<?xml version="1.0" encoding="UTF-8"?>\n';
	return xml;
};
draw2d.MyCanvas.prototype.getDefinitionsStartXML=function(){
	var xml = '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" '
		+'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
		+'xmlns:activiti="http://activiti.org/bpmn" '
		+'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" '
		+'xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" '
		+'xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" '
		+'typeLanguage="http://www.w3.org/2001/XMLSchema" '
		+'expressionLanguage="http://www.w3.org/1999/XPath" '
		+'targetNamespace="'+this.process.category+'">\n';
	return xml;
};
draw2d.MyCanvas.prototype.getDefinitionsEndXML=function(){
	var xml='</definitions>\n';
	return xml;
};

draw2d.MyCanvas.prototype.toXML=function(){
	var xml = this.getXMLHeader();
	xml = xml+this.getDefinitionsStartXML();
	xml=xml+'<process id="'+this.process.id+'" name="'+this.process.name+'">\n';
	xml=xml+this.process.getDocumentationXML();
	xml=xml+this.process.getExtensionElementsXML();
	var bpmnDigramXml='<bpmndi:BPMNDiagram id="BPMNDiagram_'+this.process.id+'">\n'
	bpmnDigramXml=bpmnDigramXml+'<bpmndi:BPMNPlane bpmnElement="'+this.process.id+'" id="BPMNPlane_'+this.process.id+'">\n'
	var models = this.getFigures();
	for(var i=0;i<models.getSize();i++){
		var model=models.get(i);
		for(var j=0;j<DefaultModelTypeEnum.length;j++){
			if(DefaultModelTypeEnum[j]==model.type){
				//alert(model.type);
				xml=xml+model.toXML();
				bpmnDigramXml=bpmnDigramXml+model.toBpmnDI();
				break;
			}
		}
	}
	var lines = this.getLines();
	for(var i=0;i<lines.getSize();i++){
		var line = lines.get(i);
		for(var j=0;j<DefaultModelTypeEnum.length;j++){
			if(DefaultModelTypeEnum[j]==line.type){
				//alert(line.type);
				xml=xml+line.toXML();
				bpmnDigramXml=bpmnDigramXml+line.toBpmnDI();
				break;
			}
		}
	}
	xml=xml+'</process>\n';
	bpmnDigramXml=bpmnDigramXml+'</bpmndi:BPMNPlane>\n'
	bpmnDigramXml=bpmnDigramXml+'</bpmndi:BPMNDiagram>\n';
	xml=xml+bpmnDigramXml;
	xml=xml+this.getDefinitionsEndXML();
	xml=formatXml(xml);
	return xml;
};