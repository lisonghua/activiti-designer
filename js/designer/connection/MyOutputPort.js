draw2d.MyOutputPort=function(_4aff){
	draw2d.OutputPort.call(this,_4aff);
};
draw2d.MyOutputPort.prototype=new draw2d.OutputPort();
draw2d.MyOutputPort.prototype.type="MyOutputPort";
draw2d.MyOutputPort.prototype.setWorkflow=function(workflow){
	draw2d.OutputPort.prototype.setWorkflow.call(this,workflow);
};
draw2d.MyOutputPort.prototype.onDrop=function(port){
	if(this.getMaxFanOut()<=this.getFanOut()){
		return;
	}
	if(this.parentNode.id==port.parentNode.id){
	}else{
		var _4b01=new draw2d.CommandConnect(this.parentNode.workflow,this,port);
		var connection = new draw2d.DecoratedConnection();
		var id = "flow"+Sequence.create();
		connection.id=id;
		connection.lineId=id;
		//connection.lineName=id;
		//connection.setLabel(id);
		//connection.setId(id);
		_4b01.setConnection(connection);
		this.parentNode.workflow.getCommandStack().execute(_4b01);
	}
};
