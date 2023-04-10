let elForm = document.querySelector(`.js-form`);
let elInput = document.querySelector(`.js-input`);
let elList = document.querySelector(`.js-list`);
let elTemplate = document.querySelector(`#js-template`).content;
let elNumber = document.querySelector(`.number`);

let dataInStorage = JSON.parse(localStorage.getItem(`allToDo`));

let allToDos = dataInStorage ? dataInStorage : [];

let onCompleted = (id, isCompleted) => {
    allToDos.forEach(todo => {
        if(todo.id === id) {
            todo.isCompleted = isCompleted;
        }
    });
    localStorage.setItem(`allToDo`, JSON.stringify(allToDos));
    onRender(allToDos);

};

let onEdit = (id) => {
    allToDos.forEach((todo) => {
        if(todo.id === id) {
            let editedText = prompt(`Edit ToDo`, todo.text);
            todo.text = editedText;
        }
    });
    onRender(allToDos)
    localStorage.setItem(`allToDo`, JSON.stringify(allToDos)); 
};

let onDelete = (id) => {
    
    let arr = [];

    allToDos.forEach((todo) =>  {
        if (todo.id !== id) {
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

        let elLi = elToDo.querySelector(`.js-list-item`);
        let elText = elToDo.querySelector(`.js-text`);
        let elBtnEdit = elToDo.querySelector(`.js-edit-btn`);
        let elBtnDelete = elToDo.querySelector(`.js-delete-btn`);
        let elCheckBox = elToDo.querySelector(`.js-check`);

        
        if (element.isCompleted) {
            elText.classList.add(`text-decoration-line-through`);
        };
        
        elText.textContent = element.text;
        elLi.dataset.id = element.id;
        elCheckBox.checked = element.isCompleted;
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

let eventDelegation = (evt) => {
    let elParent = evt.target.closest(`.js-list-item`);
    let elId = elParent.dataset.id - 0;
    if(evt.target.matches(`.js-delete-btn`)){
        onDelete(elId);
    } else if(evt.target.matches(`.js-edit-btn`)) {
        onEdit(elId);
    } else if(evt.target.matches(`.js-check`)){
        onCompleted(elId, evt.target.checked);
    }
}

onRender(allToDos);

elForm.addEventListener(`submit`, onSubmit);
elList.addEventListener(`click`, eventDelegation);

   