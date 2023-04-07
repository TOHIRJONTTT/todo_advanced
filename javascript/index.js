let elForm = document.querySelector(`.js-form`);
let elInput = document.querySelector(`.js-input`);
let elList = document.querySelector(`.js-list`);
let elTemplate = document.querySelector(`#js-template`).content;
let elNumber = document.querySelector(`.number`);

let dataInStorage = JSON.parse(localStorage.getItem(`allToDo`));

let allToDos = dataInStorage ? dataInStorage : [];

let onEdit = (evt) => {
    allToDos.forEach((todo) => {
        if(todo.id === evt.target.dataset.id -0) {
            let editedText = prompt(`Edit ToDo`, todo.text);
            todo.text = editedText;
        }
    });
    onRender(allToDos)
    localStorage.setItem(`allToDo`, JSON.stringify(allToDos)); 
};

let onDelete = (evt) => {
    
    let arr = [];

    allToDos.forEach((todo) =>  {
        if (todo.id !== evt.target.dataset.id - 0) {
            arr.push(todo);
        }
    });     

    allToDos = arr;
    onRender(arr);
    localStorage.setItem(`allToDo`, JSON.stringify(arr));
};

let onRender = (arr) => {
    elList.innerHTML = null; 
    elNumber.textContent = arr.length;
    arr.forEach((element) => {
        
        let elToDo = elTemplate.cloneNode(true);
        elToDo.querySelector(`.js-text`).textContent = element.text;

        let elBtnEdit = elToDo.querySelector(`.js-edit-btn`);
        elBtnEdit.dataset.id = element.id;
        
        let elBtnDelete = elToDo.querySelector(`.js-delete-btn`);
        elBtnDelete.dataset.id = element.id;

        elBtnDelete.addEventListener(`click`, onDelete);
        elBtnEdit.addEventListener(`click`, onEdit);

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

 localStorage.setItem(`allToDo`, JSON.stringify(allToDos));


 elInput.value = null;
 elInput.focus();

};

onRender(allToDos);

elForm.addEventListener(`submit`, onSubmit);

   