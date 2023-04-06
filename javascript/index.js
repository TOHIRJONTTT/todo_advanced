let elForm = document.querySelector(`.js-form`);
let elInput = document.querySelector(`.js-input`);
let elList = document.querySelector(`.js-list`);
let elTemplate = document.querySelector(`#js-template`).content;
let allToDos = [];

let onEdit = (evt) => {
    allToDos.forEach((todo) => {
        if(todo.id === evt.target.dataset.id -0) {
            let editedText = prompt(`Edit ToDo`, todo.text);
            todo.text = editedText;
            console.log(editedText);
        }
    });
    onRender(allToDos)
      
};

let onDelete = (evt) => {

    allToDos.forEach((todo) =>  {
        let arr = [];

        if (todo.id != Number(evt.target.dataset.id)){
            arr.push(todo);
        }
        allToDos = arr;
        onRender(arr);
    });     
};

let onRender = (arr) => {
    elList.innerHTML = null; 

    arr.forEach((element) => {
        
        let elToDo = elTemplate.cloneNode(true);
        elToDo.querySelector(`.js-text`).textContent = element.text;

        let elBtnEdit = elToDo.querySelector(`.js-edit-btn`);
        elBtnEdit.dataset.id = element.id;
        
        let elBtnDelete = elToDo.querySelector(`.js-delete-btn`);
        elBtnDelete.dataset.id = element.id;

        elBtnDelete.addEventListener(`click`, onDelete);
        elBtnEdit.addEventListener(`click`, onEdit);

        console.log(elToDo);


        elList.appendChild(elToDo);
    });

};

let onSubmit = (evt) => {
evt.preventDefault();

let inputValue = elInput.value.trim();

if(!inputValue) {
    alert(`Input ToDo`);
};

let newToDo = {
    id: allToDos.at(0) ? allToDos.at(0)?.id + 1 : 1,
    text: inputValue,
    isCompleted: false,
};



allToDos.unshift(newToDo);
onRender(allToDos);

elInput.value = null;
elInput.focus();

};

elForm.addEventListener(`submit`, onSubmit);

   