"use strict";
var newItem = document.getElementById('newTodoItem');
var addNewItemBtn = document.getElementById('addTodoItem');
var itemTotal = document.getElementById('itemTotal');
var doneItemTotal = document.getElementById('completeTotal');
var undoneItemTotal = document.getElementById('undoneTotal');
var table = document.querySelector('.todoListTable');
var itemTotalNumber = 0;
var doneItemTotalNumber = 0;
var undoneItemTotalNumber = 0;
// 改變總和的函數
function subTotal() {
    itemTotal.innerHTML = '全部' + itemTotalNumber;
    doneItemTotal.innerHTML = '完成' + doneItemTotalNumber;
    undoneItemTotal.innerHTML = '未完成' + undoneItemTotalNumber;
}
var TodoList = /** @class */ (function () {
    function TodoList(tableId) {
        this.todoList = document.createElement('div');
        this.checkBox = document.createElement('input');
        this.todoText = document.createElement('div');
        this.reviseText = document.createElement('input');
        this.reWriteBtn = document.createElement('button');
        this.deletBtn = document.createElement('button');
        this.reviseSwitch = '';
        this.table = document.querySelector(tableId);
    }
    TodoList.prototype.created = function (content) {
        var _this = this;
        this.todoList.classList.add('todoList');
        this.todoList.classList.add('undone');
        this.table.appendChild(this.todoList);
        this.checkBox.classList.add('checkbox');
        this.checkBox.setAttribute('type', 'checkBox');
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
        undoneItemTotalNumber += 1;
        subTotal();
        // 按鈕的功能
        this.checkBox.addEventListener('click', function () {
            _this.checkFunction();
        });
        this.reWriteBtn.addEventListener('click', function () {
            _this.reWriteFunction();
        });
        this.deletBtn.addEventListener('click', function () {
            if (confirm("\u662F\u5426\u78BA\u8A8D\u522A\u9664\u300C" + _this.todoText.innerText + "\u300D?")) {
                _this.deleteFunction();
            }
        });
        this.reviseText.addEventListener('blur', function () {
            if (_this.reviseSwitch === '') {
                if (_this.reviseText.value.length < 1) {
                    _this.deleteFunction();
                }
                else {
                    _this.reWriteFunction();
                }
            }
        });
        this.reviseText.addEventListener('keyup', function (e) {
            if (e.keyCode === 13) {
                _this.reviseSwitch = 'keyup';
                if (_this.reviseText.value.length < 1) {
                    _this.deleteFunction();
                }
                else {
                    _this.reWriteFunction();
                }
            }
        }, false);
    };
    TodoList.prototype.checkFunction = function () {
        if (this.checkBox.checked) {
            undoneItemTotalNumber -= 1;
            doneItemTotalNumber += 1;
            this.todoList.classList.remove('undone');
            this.todoList.classList.add('done');
            this.todoText.classList.add('complete');
        }
        else {
            undoneItemTotalNumber += 1;
            doneItemTotalNumber -= 1;
            this.todoList.classList.remove('done');
            this.todoList.classList.add('undone');
            this.todoText.classList.remove('complete');
        }
        subTotal();
    };
    TodoList.prototype.reWriteFunction = function () {
        if (this.reWriteBtn.innerText === '編輯') {
            this.reviseSwitch = '';
            this.todoText.style.display = 'none';
            this.reviseText.style.display = 'block';
            this.reWriteBtn.innerText = '完成';
        }
        else {
            var text = this.reviseText.value;
            this.todoText.innerText = text;
            this.todoText.style.display = 'block';
            this.reviseText.style.display = 'none';
            this.reWriteBtn.innerText = '編輯';
        }
    };
    TodoList.prototype.deleteFunction = function () {
        this.table.removeChild(this.todoList);
        itemTotalNumber -= 1;
        if (this.checkBox.checked) {
            doneItemTotalNumber -= 1;
        }
        else {
            undoneItemTotalNumber -= 1;
        }
        subTotal();
    };
    return TodoList;
}());
newItem.setAttribute('placeholder', '新增代辦事項');
addNewItemBtn.innerHTML = '新增';
subTotal();
addNewItemBtn.addEventListener('click', function () {
    var newItemValue = newItem.value;
    if (newItemValue !== '') {
        new TodoList('.todoListTable').created(newItemValue);
        newItem.value = '';
    }
    else {
        alert('未輸入文字');
    }
});
newItem.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        ;
        if (newItem.value === '') {
            alert('未輸入文字');
        }
        else {
            var list = new TodoList('.todoListTable').created(newItem.value);
            newItem.value = '';
        }
    }
}, false);
itemTotal.addEventListener('click', function () {
    var list = document.getElementsByClassName('todoList');
    for (var ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickUndown');
        list[ii].classList.remove('clickDown');
    }
});
doneItemTotal.addEventListener('click', function () {
    var list = document.getElementsByClassName('todoList');
    for (var ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickDown');
        list[ii].classList.add('clickUndown');
    }
});
undoneItemTotal.addEventListener('click', function () {
    var list = document.getElementsByClassName('todoList');
    for (var ii = 0, ll = list.length; ii < ll; ii++) {
        list[ii].classList.remove('clickUndown');
        list[ii].classList.add('clickDown');
    }
});
