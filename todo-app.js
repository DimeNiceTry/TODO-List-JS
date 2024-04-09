(function() {

    function createAppTitle(title){
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm(){
        let form =  document.createElement('form');
        let input =  document.createElement('input');
        let buttonWraper =  document.createElement('div');
        let button =  document.createElement('button');

        form.classList.add('input-group','mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWraper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        
        const checkInputValue = () => {
            if (input.value === '') {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        };
    
        input.addEventListener('input', checkInputValue);
    
        checkInputValue();

        buttonWraper.append(button);
        form.append(input);
        form.append(buttonWraper);

        return{
            
            form,
            input,
            button,
        }
        
    }



    function createTOdoList(){
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }
    function createTodoItem(name){
        let item = document.createElement('li');

        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let paragraph = document.createElement('div');

        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        paragraph.textContent = name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готовo';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';
        paragraph.classList.add('margin-bottom');

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(paragraph);
        item.append(buttonGroup);

        return{
            item,
            doneButton,
            deleteButton,
            paragraph,
        };
    }
    
    function createTOdoApp(container, title = 'Список дел', donePlans = []){
 
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTOdoList();
        let temp = [];


        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        if (JSON.parse(localStorage.getItem(('donePlans'))) != null){
            for (k of JSON.parse(localStorage.getItem(('donePlans')))){
                temp.push(k);
            }
        }

        for (j of donePlans){
            temp.push(j);
        }
        
        localStorage.setItem('donePlans', JSON.stringify(temp));
        for (i of temp){
            let todoItem = createTodoItem(i.name);
            
            if (i.done){
                todoItem.item.classList.toggle('list-group-item-success')
                
            }
            todoItem.doneButton.addEventListener('click', (function(item){
                return function(){
                    todoItem.item.classList.toggle('list-group-item-success');
                    const index = temp.findIndex(t => t.id ===item.id);
                    if (index !== -1){
                        temp[index].done = !temp[index].done;
                        localStorage.setItem('donePlans', JSON.stringify(temp));
                    }
                }
               
            })(i));
            todoItem.deleteButton.addEventListener('click', (function(item) {
                return function() {
                    if (confirm('Вы уверены?')) {
                        todoItem.item.remove();
                        const index = temp.findIndex(t => t.id === item.id);
                        if (index !== -1) {
                            temp.splice(index, 1);
                            localStorage.setItem('donePlans', JSON.stringify(temp));
                        }
                    }
                };
            })(i)); // Передаём текущее значение i в функцию-обёртку
            todoList.append(todoItem.item);
        }
        
        
        
        

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            
            if (!todoItemForm.input.value){
                return;
            }

        let todoItem = createTodoItem(todoItemForm.input.value);



        todoItem.doneButton.addEventListener('click', function(){
            todoItem.item.classList.toggle('list-group-item-success');
            chekDoneFlag();

            
        });
        todoItem.deleteButton.addEventListener('click', function(){
            if (confirm('Вы уверены?')){
                todoItem.item.remove();

            }
            
            
        });
        let doneFlag = false;
        todoList.append(todoItem.item);
        let chekDoneFlag= () =>{
            if(todoItem.item.classList.contains('list-group-item-success')){
                doneFlag = true;
            }
            else{
                doneFlag = false;
            }
        };
     
        let savedPlan = {name: todoItem.paragraph.textContent, done: doneFlag};
        temp.push(savedPlan);
        
        localStorage.setItem('donePlans', JSON.stringify(temp));

        


       
        
        todoItemForm.input.value = ''; 
        todoItemForm.button.disabled = true;
        });
        
    }

    window.createTodoApp=createTOdoApp;
})();