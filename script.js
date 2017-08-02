var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	//input (checkbox)
	var checkBox=document.createElement("input");//checkbx
	//label
	var label=document.createElement("label");//label
	//input (text)
	var editInput=document.createElement("input");//text
	//button.edit
	var editButton=document.createElement("button");//edit button

	//button.delete
	var deleteButton=document.createElement("button");//delete button

	label.innerText=taskString;

	//Each elements, needs appending
	checkBox.type="checkbox";
	editInput.type="text";

	editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
	editButton.className="edit";
	deleteButton.innerText="Delete";
	deleteButton.className="delete";

	//and appending.
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}



var addTask=function(){
	//Create a new list item with the text from the #new-task:
	var listItem=createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

//Edit an existing task.

var editTask=function(){

var listItem=this.parentNode;
var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
var text = document.getElementById("edit_text").firstChild;
		//If class of the parent is .editmode
	if(containsClass){
	//switch to .editmode
	//label becomes the inputs value.
		label.innerText=editInput.value;
   		text.data = text.data == "Edit" ? "Save" : "Edit";
	}else{
		editInput.value=label.innerText;
   		text.data = text.data == "Edit" ? "Save" : "Edit";
	}
	//toggle .editmode on the parent.
	listItem.classList.toggle("editMode");

}




//Delete task.
var deleteTask=function(){

	var listItem=this.parentNode;
	var ul=listItem.parentNode;
	ul.removeChild(listItem);//Remove the parent list item from the ul.

}

//Mark task completed
var taskCompleted=function(){
	
	//Append the task list item to the #completed-tasks
	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
/*Mark task as incomplete when the checkbox is unchecked then append 
the task list item to the #incomplete-tasks.*/
	var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}

//Set the click handler to the addTask function.
addButton.onclick=addTask;

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
//select ListItems children
	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var editButton=taskListItem.querySelector("button.edit");
	var deleteButton=taskListItem.querySelector("button.delete");

	//Bind Tasks to buttons.
	editButton.onclick=editTask;
	deleteButton.onclick=deleteTask;
	checkBox.onchange=checkBoxEventHandler;
}

//loop over incompleteTaskHolder ul list items
	for (var i=0; i<incompleteTaskHolder.children.length;i++){

		//bind events to the list items chldren
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}

//loop over completedTasksHolder
	for (var i=0; i<completedTasksHolder.children.length;i++){
	//bind events to the list items chldren
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}