var jq = jQuery.noConflict();

var DefaultModelTypeEnum=[
                          draw2d.Start.prototype.type,
                          draw2d.End.prototype.type,
                          draw2d.UserTask.prototype.type,
                          draw2d.ManualTask.prototype.type,
                          draw2d.ServiceTask.prototype.type,
                          draw2d.ScriptTask.prototype.type,
                          draw2d.MailTask.prototype.type,
                          draw2d.ReceiveTask.prototype.type,
                          draw2d.BusinessRuleTask.prototype.type,
                          draw2d.CallActivity.prototype.type,
                          draw2d.SubProcess.prototype.type,
                          draw2d.DecoratedConnection.prototype.type,
                          draw2d.ExclusiveGateway.prototype.type,
                          draw2d.ParallelGateway.prototype.type];
draw2d.Random=function(){};
draw2d.Random.create=function () {
	/*
	var len = 10;
	var seed = new Array 
	( 
	'abcdefghijklmnopqrstuvwxyz', 
	'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
	'1234567890' 
	); 
	var idd, i; 
	var result = ''; 
	for (i = 0; i < len; i++) { 
		idd = Math.floor(Math.random() * seed.length); 
		result += seed[idd].substr(Math.floor(Math.random() * (seed[idd].length)), 1); 
	} 
	return result;
	*/
	return new Date().getTime();
};
//Sequence=draw2d.UUID;
Sequence=draw2d.Random;
//designer base objects definition

/**
 * process object definition
 */
draw2d.Process=function(){
	this.id=null;
	this.name=null;
	this.category=null;
	this.documentation=null;
	this.listeners=new draw2d.ArrayList();
	this.variables=new draw2d.ArrayList();
};
draw2d.Process.prototype.getListener=function(id){
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		if(listener.getId()=== id){
			return listener;
		}
	}
};
draw2d.Process.prototype.deleteListener=function(id){
	var listener = this.getListener(id);
	this.listeners.remove(listener);
};
draw2d.Process.prototype.addListener=function(listener){
	this.listeners.add(listener);
};
draw2d.Process.prototype.setListeners=function(listeners){
	this.listeners = listeners;
};
draw2d.Process.prototype.getVariable=function(id){
	for(var i=0;i<this.variables.getSize();i++){
		var variable = this.variables.get(i);
		if(variable.id=== id){
			return variable;
		}
	}
};
draw2d.Process.prototype.deleteVariable=function(id){
	var variable = this.getVariable(id);
	this.variables.remove(variable);
};
draw2d.Process.prototype.addVariable=function(variable){
	this.variables.add(variable);
};
draw2d.Process.prototype.getVariablesJSONObject=function(){
	return JSON.stringify(this.variables.data);
};
draw2d.Process.prototype.getListenersXML=function(){
	var xml = '';
	for(var i=0;i<this.listeners.getSize();i++){
		var listener = this.listeners.get(i);
		xml=xml+listener.toXML();
	}
	return xml;
};
draw2d.Process.prototype.getExtensionElementsXML=function(){
	if(this.listeners.getSize()==0)return '';
	var xml = '<extensionElements>\n';
	xml=xml+this.getListenersXML();
	xml=xml+'</extensionElements>\n';
	return xml;
};
draw2d.Process.prototype.getDocumentationXML=function(){
	var documentation = trim(this.documentation);
	if(documentation==null||documentation=='')return '';
	var xml='<documentation>';
	xml=xml+this.documentation;
	xml=xml+'</documentation>';
	return xml;
};
draw2d.Process.variable=function(){
	this.id=draw2d.UUID.create();
	this.name=null;
	this.type=null;
	this.scope=null;
	this.defaultValue=null;
	this.remark=null;
};
//form porperties object
draw2d.UserTask.FormProperty=function(){
	this.id=null;
	this.name=null;
	this.type=null;
	this.expression=null;
	this.variable=null;
	this.defaultValue=null;
	this.datePattern=null;
	this.readable=null;
	this.writeable=null;
	this.required=null;
	this.values=new draw2d.ArrayList();
};
draw2d.UserTask.FormProperty.prototype.getPropValuesXML=function(){
	var xml = "";
	for(var i=0;i<this.values.getSize();i++){
		var val = this.values.get(i);
		xml=xml+val.toXML();
	}
	return xml;
};
draw2d.UserTask.FormProperty.prototype.toXML=function(){
	var xml = '<activiti:formProperty id="'+this.id+'" name="'+this.name+'" ';
	if(this.type!=null){
		xml=xml+'type="'+this.type+'" ';
	}
	if(this.expression!=null&&this.expression!=''){
		xml=xml+'expression="'+this.expression+'" ';
	}
	if(this.variable!=null&&this.variable!=''){
		xml=xml+'variable="'+this.variable+'" ';
	}
	if(this.defaultValue!=null&&this.defaultValue!=''){
		xml=xml+'default="'+this.defaultValue+'" ';
	}
	if(this.datePattern!=null&&this.datePattern!=''){
		xml=xml+'datePattern="'+this.datePattern+'" ';
	}
	if(this.readable!=null&&this.readable!=''){
		xml=xml+'readable="'+this.readable+'" ';
	}
	if(this.writeable!=null&&this.writeable!=''){
		xml=xml+'writeable="'+this.writeable+'" ';
	}
	if(this.required!=null&&this.required!=''){
		xml=xml+'required="'+this.required+'" ';
	}
	xml=xml+'>\n';
	xml=xml+this.getPropValuesXML();
	xml=xml+'</activiti:formProperty>\n'
	return xml;
};
draw2d.UserTask.FormProperty.prototype.getFormValue=function(id){
	for(var i=0;i<this.values.getSize();i++ ){
		var v = this.values.get(i);
		if(v.id == id){
			return v;
		}
	}
};
draw2d.UserTask.FormProperty.prototype.deleteFormValue=function(id){
	var field = this.getFormValue(id);
	this.values.remove(field);
};
draw2d.UserTask.FormProperty.prototype.getValuesString=function(){
	var f = '';
	for(var i=0;i<this.values.getSize();i++){
		var v = this.values.get(i);
		f=f+v.id+":"+v.name+",";
	}
	return f;
};
draw2d.UserTask.FormProperty.FormValue=function(){
	this.id=null;
	this.name=null;
}
draw2d.UserTask.FormProperty.FormValue.prototype.toXML=function(){
	var xml = '<activiti:value id="'+this.id+'" name="'+this.name+'"></activiti:value>\n';
  return xml
};
//excution listener object
draw2d.Process.Listener=function(){
	this.id=draw2d.UUID.create();
	this.event=null;
	this.serviceType=null;
	this.serviceClass=null;
	this.serviceExpression=null;
	this.fields=new draw2d.ArrayList();
};
draw2d.Process.Listener.prototype.setId=function(id){
	this.id=id;
};
draw2d.Process.Listener.prototype.getId=function(){
	return this.id;
};
draw2d.Process.Listener.prototype.setField=function(field){
	this.fields.add(field);
};
draw2d.Process.Listener.prototype.getField=function(id){
	for(var i=0;i<this.fields.getSize();i++ ){
		var field = this.fields.get(i);
		if(field.id == id){
			return field;
		}
	}
};
draw2d.Process.Listener.prototype.deleteField=function(id){
	var field = this.getField(id);
	this.fields.remove(field);
};
draw2d.Process.Listener.prototype.getServiceImplementation=function(){
	if(this.serviceType=='javaClass')
		return this.serviceClass;
	else if(this.serviceType=='expression')
		return this.serviceExpression;
};
draw2d.Process.Listener.prototype.getFieldsString=function(){
	var f = '';
	var v = '';
	for(var i=0;i<this.fields.getSize();i++){
		var field = this.fields.get(i);
		f=f+field.name+":"+field.value+",";
	}
	return f;
};
draw2d.Process.Listener.prototype.toJSON=function(){
	var json={
			id:this.id,
			event:this.event,
			serviceType:this.serviceType,
			serviceClass:this.serviceClass,
			serviceExpression:this.serviceExpression,
			fields:this.fields.data
	};
	return JSON.stringify(json);
};
draw2d.Process.Listener.prototype.parseJSON=function(){
	var jsonString = this.toJSON();
	return JSON.parse(jsonString);
};
draw2d.Process.Listener.prototype.getFieldsXML=function(){
	var xml = "";
	for(var i=0;i<this.fields.getSize();i++){
		var field = this.fields.get(i);
		xml=xml+field.toXML();
	}
	return xml;
};
draw2d.Process.Listener.prototype.toXML=function(){
	var xml = '<activiti:executionListener event="'+this.event+'" ';
	if(this.serviceType=='javaClass'){
		xml=xml+'class="'+this.serviceClass+'" ';
	}else if(this.serviceType=='expression'){
		xml=xml+'expression="'+this.serviceExpression+'" ';
	}
	xml=xml+'>\n';
	xml=xml+this.getFieldsXML();
	xml=xml+'</activiti:executionListener>\n'
	return xml;
};
/**
 * Process field object
 */
draw2d.Process.Listener.Field=function(){
	this.id=draw2d.UUID.create();
	this.name=null;
	this.type=null;
	this.value=null;
};
draw2d.Process.Listener.Field.prototype.toJSON=function(){
	var json = {
			id:this.id,
			name:this.name,
			type:this.type,
			value:this.value
	};
	return JSON.stringify(json);
};
draw2d.Process.Listener.Field.prototype.toXML=function(){
	var xml = '<activiti:field name="'+this.name+'">\n';
	if(this.type=='string'){
		xml=xml+'<activiti:string>'+this.value+'</activiti:string>\n';
	}else if(this.type='expression'){
		xml=xml+'<activiti:expression>'+this.value+'</activiti:expression>\n';
	}
	xml=xml+'</activiti:field>\n';
  	return xml
};
/**
 * Task listener object definition
 */
draw2d.Task.Listener=function(){
	draw2d.Process.Listener.call(this);
};
draw2d.Task.Listener.prototype=new draw2d.Process.Listener();
draw2d.Task.Listener.prototype.toXML=function(){
	var xml = '<activiti:executionListener event="'+this.event+'" ';
	if(this.serviceType=='javaClass'){
		xml=xml+'class="'+this.serviceClass+'" ';
	}else if(this.serviceType=='expression'){
		xml=xml+'expression="'+this.serviceExpression+'" ';
	}
	xml=xml+'>\n';
	xml=xml+this.getFieldsXML();
	xml=xml+'</activiti:executionListener>\n'
	return xml;
};
draw2d.UserTask.TaskListener=function(){
	draw2d.Process.Listener.call(this);
};
draw2d.UserTask.TaskListener.prototype=new draw2d.Process.Listener();
draw2d.UserTask.TaskListener.prototype.toXML=function(){
	var xml = '<activiti:taskListener event="'+this.event+'" ';
	if(this.serviceType=='javaClass'){
		xml=xml+'class="'+this.serviceClass+'" ';
	}else if(this.serviceType=='expression'){
		xml=xml+'expression="'+this.serviceExpression+'" ';
	}
	xml=xml+'>\n';
	xml=xml+this.getFieldsXML();
	xml=xml+'</activiti:taskListener>\n'
	return xml;
};

/**
 * Task listener field object definition
 */
draw2d.Task.Listener.Field=function(){
	draw2d.Process.Listener.Field.call(this);
};
draw2d.Task.Listener.Field.prototype=new draw2d.Process.Listener.Field();

/**
 * Line listener object definition
 */
draw2d.DecoratedConnection.Listener=function(){
	draw2d.Process.Listener.call(this);
};
draw2d.DecoratedConnection.Listener.prototype=new draw2d.Process.Listener();
draw2d.DecoratedConnection.Listener.prototype.toXML=function(){
	var xml = '<activiti:executionListener ';
	if(this.serviceType=='javaClass'){
		xml=xml+'class="'+this.serviceClass+'" ';
	}else if(this.serviceType=='expression'){
		xml=xml+'expression="'+this.serviceExpression+'" ';
	}
	xml=xml+'>\n';
	xml=xml+this.getFieldsXML();
	xml=xml+'</activiti:executionListener>\n'
	return xml;
};
/**
 * Line listener field object definition
 */
draw2d.DecoratedConnection.Listener.Field=function(){
	draw2d.Process.Listener.Field.call(this);
};
draw2d.DecoratedConnection.Listener.Field.prototype=new draw2d.Process.Listener.Field();

/**
 * designer UI objects definition
 */
draw2d.ContextMenu=function(w,h){
	draw2d.Menu.call(this);
	this.setDimension(w,h);
	this.item = null;
	this.width = w;
	this.height = h;
};
draw2d.ContextMenu.prototype = new draw2d.Menu();
draw2d.ContextMenu.prototype.type = "draw2d.ContextMenu";
draw2d.ContextMenu.prototype.setDimension=function(w,h){
	//draw2d.Menu.prototype.setDimension.call(this,w,h);
	this.item.style.width = w+"px";
	this.item.style.height = h+"px";
	/*
	this.shadow.css( {
		display : "block",
		zIndex : this.getZOrder()-1,
		left : this.menu.css("left"),
		top : this.menu.css("top"),
		width : w+3,
		height : h+3
	});
	*/
};
draw2d.ContextMenu.prototype.createHTMLElement = function() {
	this.item = document.createElement("div");
	this.item.style.left = this.x + "px";
	this.item.style.top = this.y + "px";
	this.item.style.cursor = "pointer";
	this.item.style.width = this.width+"px";
	this.item.style.height = this.height+"px";
	this.item.className = "context-menu";
	return this.item;
};
draw2d.ContextMenu.prototype.createList = function() {
	this.dirty = false;
	this.html.innerHTML = "";
	var oThis = this;
	for ( var i = 0; i < this.menuItems.getSize(); i++) {
		var item = this.menuItems.get(i);
		var li = document.createElement("div");
		li.className = "context-menu-item";
		var mtext = document.createElement("div");
		mtext.innerHTML = item.getLabel();
		mtext.className="context-menu-text";
		li.appendChild(mtext);
		var micon = document.createElement("div");
		micon.className = "context-menu-icon "+item.iconCls;
		li.appendChild(micon);
		li.menuItem = item;
		this.html.appendChild(li);
		if (li.addEventListener) {
			li.addEventListener("click", function(event) {
				var _508f = arguments[0] || window.event;
				_508f.cancelBubble = true;
				_508f.returnValue = false;
				var diffX = _508f.clientX;
				var diffY = _508f.clientY;
				var _5092 = document.body.parentNode.scrollLeft;
				var _5093 = document.body.parentNode.scrollTop;
				var target=event.srcElement ? event.srcElement : event.target;
				if(target.className.indexOf("context-menu-item")!=-1){
					target.menuItem.execute(diffX + _5092, diffY
							+ _5093);
				}else{
					target.parentNode.menuItem.execute(diffX + _5092, diffY
							+ _5093);
				}
			}, false);
			li.addEventListener("mouseup", function(event) {
				//alert("mouseup");
				event.cancelBubble = true;
				event.returnValue = false;
			}, false);
			li.addEventListener("mousedown", function(event) {
				//alert("mousedown");
				event.cancelBubble = true;
				event.returnValue = false;
			}, false);
			li.addEventListener("mouseover", function(event) {
				var target=event.srcElement ? event.srcElement : event.target;
				if(target.className.indexOf("context-menu-item")!=-1)
					target.className="context-menu-item context-menu-active";
				else
					target.parentNode.className="context-menu-item context-menu-active";
			}, false);
			li.addEventListener("mouseout", function(event) {
				var target=event.srcElement ? event.srcElement : event.target;
				if(target.className.indexOf("context-menu-active")!=-1)
					target.className="context-menu-item";
				else
					target.parentNode.className="context-menu-item";
			}, false);
		} else {
			if (li.attachEvent) {
				li.attachEvent("onclick", function(event) {
					var _5099 = arguments[0] || window.event;
					_5099.cancelBubble = true;
					_5099.returnValue = false;
					var diffX = _5099.clientX;
					var diffY = _5099.clientY;
					var _509c = document.body.parentNode.scrollLeft;
					var _509d = document.body.parentNode.scrollTop;
					var target=event.srcElement ? event.srcElement : event.target;
					if(target.className.indexOf("context-menu-item")!=-1)
						target.menuItem.execute(diffX + _509c, diffY
								+ _509d);
					else
						target.parentNode.menuItem.execute(diffX + _509c, diffY
								+ _509d);
				});
				li.attachEvent("onmousedown", function(event) {
					event.cancelBubble = true;
					event.returnValue = false;
				});
				li.attachEvent("onmouseup", function(event) {
					event.cancelBubble = true;
					event.returnValue = false;
				});
				li.attachEvent("onmouseover", function(event) {
					var target=event.srcElement ? event.srcElement : event.target;
					if(target.className.indexOf("context-menu-item")!=-1)
						target.className="context-menu-item context-menu-active";
					else
						target.parentNode.className="context-menu-item context-menu-active";
				});
				li.attachEvent("onmouseout", function(event) {
					var target=event.srcElement ? event.srcElement : event.target;
					if(target.className.indexOf("context-menu-active")!=-1)
						target.className="context-menu-item";
					else
						target.parentNode.className="context-menu-item";
				});
			}
		}
	}
};
draw2d.ContextMenuItem=function(label, iconCls, data ,action){
	draw2d.MenuItem.call(this,label,"",action);
	this.data = data;
	this.iconCls = iconCls;
};
draw2d.ContextMenuItem.prototype = new draw2d.MenuItem();
draw2d.ContextMenuItem.prototype.type = "draw2d.ContextMenuItem";
draw2d.ContextMenuItem.prototype.setIconCls=function(iconCls){
	this.iconCls = iconCls;
};
draw2d.ContextMenuItem.prototype.setData=function(data){
	this.data = data;
};
draw2d.ContextMenuItem.prototype.getData=function(){
	return this.data;
};
draw2d.ContextMenuItem.prototype.execute = function(x, y,f) {
	this.parentMenu.workflow.showMenu(null);
	this.action(x, y,f);
};
String.prototype.removeLineEnd = function()
{
    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g,'$1 $2')
};
function formatXml(text)
{
    //去掉多余的空格
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g,function($0, name, props)
    {
        return name + ' ' + props.replace(/\s+(\w+=)/g," $1");
    }).replace(/>\s*?</g,">\n<");
    
    //把注释编码
    text = text.replace(/\n/g,'\r').replace(/<!--(.+?)-->/g,function($0, text)
    {
        var ret = '<!--' + escape(text) + '-->';
        //alert(ret);
        return ret;
    }).replace(/\r/g,'\n');
    
    //调整格式
    var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    var nodeStack = [];
    var output = text.replace(rgx,function($0,all,name,isBegin,isCloseFull1,isCloseFull2 ,isFull1,isFull2){
        var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
        //alert([all,isClosed].join('='));
        var prefix = '';
        if(isBegin == '!')
        {
            prefix = getPrefix(nodeStack.length);
        }
        else 
        {
            if(isBegin != '/')
            {
                prefix = getPrefix(nodeStack.length);
                if(!isClosed)
                {
                    nodeStack.push(name);
                }
            }
            else
            {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }

        
        }
            var ret =  '\n' + prefix + all;
            return ret;
    });
    
    var prefixSpace = -1;
    var outputText = output.substring(1);
    
    //把注释还原并解码，调格式
    outputText = outputText.replace(/\n/g,'\r').replace(/(\s*)<!--(.+?)-->/g,function($0, prefix,  text)
    {
        //alert(['[',prefix,']=',prefix.length].join(''));
        if(prefix.charAt(0) == '\r')
            prefix = prefix.substring(1);
        text = unescape(text).replace(/\r/g,'\n');
        var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix ) + '-->';
        //alert(ret);
        return ret;
    });
    
    return outputText.replace(/\s+$/g,'').replace(/\r/g,'\r\n');
}

function getPrefix(prefixIndex)
{
    var span = '    ';
    var output = [];
    for(var i = 0 ; i < prefixIndex; ++i)
    {
        output.push(span);
    }
    
    return output.join('');
}