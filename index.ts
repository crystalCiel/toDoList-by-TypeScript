const newItem: HTMLElement = document.getElementById('newTodoItem') as HTMLElement;
const addNewItemBtn: HTMLElement = document.getElementById('addTodoItem') as HTMLElement;
const itemTotal: HTMLElement = document.getElementById('itemTotal') as HTMLElement;
const doneItemTotal: HTMLElement = document.getElementById('completeTotal') as HTMLElement;
const undoneItemTotal: HTMLElement = document.getElementById('undoneTotal') as HTMLElement;
const table: HTMLElement = document.querySelector('.todoListTable') as HTMLElement;

let itemTotalNumber: number = 0;
let doneItemTotalNumber: number = 0;
let undoneItemTotalNumber: number = 0;

// 改變總和的函數
function subTotal ():void {
    itemTotal.innerHTML = '全部' + itemTotalNumber;
    doneItemTotal.innerHTML = '完成' + doneItemTotalNumber;
    undoneItemTotal.innerHTML = '未完成' + undoneItemTotalNumber;
}

class TodoList {
    table: HTMLElement;
    todoList: HTMLElement = document.createElement('div') as HTMLElement;
    checkBox: HTMLElement = document.createElement('input') as HTMLElement;
    todoText: HTMLElement = document.createElement('div') as HTMLElement;
    reviseText: HTMLElement = document.createElement('input') as HTMLElement;
    reWriteBtn: HTMLElement = document.createElement('button') as HTMLElement;
    deletBtn: HTMLElement = document.createElement('button') as HTMLElement;
    reviseSwitch: string = '';

    constructor (tableId: string) {
        this.table = document.querySelector(tableId) as HTMLElement;
    }

    created (content: string): void {
        this.todoList.classList.add('todoList');
        this.todoList.classList.add('undone');
        this.table.appendChild(this.todoList);

        this.checkBox.classList.add('checkbox');
        this.checkBox.setAttribute('type','checkBox');
        this.todoList.appendChild(this.checkBox);

        this.todoText.classList.add('textItem');
        this.todoText.innerText = content;
        this.todoList.appendChild(this.todoText);

        this.reviseText.classList.add('reviseText');
        this.reviseText.setAttribute('value', content);
        this.reviseText.setAttribute('placeholder', '刪除此代辦事項');
        this.todoList.appendChild(this.reviseText);
        this.reviseText.style.display = 'none';

        this.reWriteBtn.classList.add('reWriteBtn');
        this.reWriteBtn.innerText = '編輯';
        this.todoList.appendChild(this.reWriteBtn);

        this.deletBtn.classList.add('deleteBtn');
        this.deletBtn.innerText = '刪除';
        this.todoList.appendChild(this.deletBtn);

        itemTotalNumber += 1;
        undoneItemTotalNumber +=1;
        subTotal();

        // 按鈕的功能
        this.checkBox.addEventListener('click',(): void => {
            this.checkFunction();
        });

        this.reWriteBtn.addEventListener('click',(): void => {
            this.reWriteFunction();
        });

        this.deletBtn.addEventListener('click',(): void => { 
            if (confirm(`是否確認刪除「${this.todoText.innerText}」?`)) {
                this.deleteFunction();
            }
        });

        this.reviseText.addEventListener('blur',(): void => {
            if (this.reviseSwitch === '') {

                if ((this.reviseText as HTMLInputElement).value.length < 1) {
                    this.deleteFunction();
                } else {
                    this.reWriteFunction();
                }

            }
        });

        this.reviseText.addEventListener('keyup',(e): void => {
            if( e.keyCode === 13 ){
                this.reviseSwitch = 'keyup';

                if ((this.reviseText as HTMLInputElement).value.length < 1) {
                    this.deleteFunction();
                } else {
                    this.reWriteFunction();
                }
            }
        }, false);
    }

    checkFunction (): void {
        if ((this.checkBox as HTMLInputElement).checked) {
            undoneItemTotalNumber -= 1;
            doneItemTotalNumber += 1;

            this.todoList.classList.remove('undone');
            this.todoList.classList.add('done');
            this.todoText.classList.add('complete');

        } else {
            undoneItemTotalNumber += 1;
            doneItemTotalNumber -= 1;
            this.todoList.classList.remove('done');
            this.todoList.classList.add('undone');
            this.todoText.classList.remove('complete');

        }

        subTotal();
    }

    reWriteFunction (): void {

        if (this.reWriteBtn.innerText === '編輯') {
            this.reviseSwitch = '';
            this.todoText.style.display = 'none';
            this.reviseText.style.display = 'block';
            this.reWriteBtn.innerText = '完成';
        } else {
            let text = (this.reviseText as HTMLInputElement).value;
            this.todoText.innerText = text;
            this.todoText.style.display = 'block';
            this.reviseText.style.display = 'none';
            this.reWriteBtn.innerText = '編輯';
        }
    }

    deleteFunction (): void {
        this.table.removeChild(this.todoList);
            itemTotalNumber -= 1;
            if ((this.checkBox as HTMLInputElement).checked) {
                doneItemTotalNumber -= 1;
            } else {
                undoneItemTotalNumber -= 1;
            }

            subTotal();
    }
}

newItem.setAttribute('placeholder', '新增代辦事項');
addNewItemBtn.innerHTML = '新增';
subTotal();


addNewItemBtn.addEventListener('click', (): void => {
    let newItemValue = (newItem as HTMLInputElement).value;
    if (newItemValue !== '') {
        new TodoList('.todoListTable').created(newItemValue);
        (newItem as HTMLInputElement).value = '';
    } else {
        alert('未輸入文字');
    }
});

newItem.addEventListener('keyup', (e): void => {
    if (e.keyCode === 13) {;
        if ((newItem as HTMLInputElement).value === '') {
            alert('未輸入文字');
        } else {
            let list = new TodoList('.todoListTable').created((newItem as HTMLInputElement).value);
            (newItem as HTMLInputElement).value = '';
        }
    }
}, false);

itemTotal.addEventListener('click', (): void => {
    let list = document.getElementsByClassName('todoList');
    for (let ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickUndown');
        list[ii].classList.remove('clickDown');
        
    }

})

doneItemTotal.addEventListener('click', (): void => {
    let list = document.getElementsByClassName('todoList');
    for (let ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickDown');
        list[ii].classList.add('clickUndown');
        
    }

})

undoneItemTotal.addEventListener('click', (): void => {
    let list = document.getElementsByClassName('todoList');
    for (let ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickUndown');
        list[ii].classList.add('clickDown');
    }
})