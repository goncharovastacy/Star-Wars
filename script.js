'use strict';

const button = document.querySelector('.button');
const divResult = document.querySelector('.result');
const divError = document.querySelector('.error');
const selectDefault = document.querySelector('#selectDefault');

function searchObj(){
const select = document.querySelector('#select').value;
const input = document.querySelector('.input');
try{
fetch(`https://swapi.nomoreparties.co/${select}/${input.value}`)
.then(res => res.json())
.then(obj => {
    if (obj.detail === 'Not found'){
        return Promise.reject(new Error('Не найдено'));
    }
    console.log(obj);
    createDescription(select, obj);
    clearAll(input);
})
.catch(error => console.log(error));}
catch (error){
console.log(error.message)
}
finally{}
}

// функция для создания описания объекта
function createDescription(list, item){
    if (list === 'people'){
        divResult.innerHTML = `<p>Имя персонажа: ${item.name}</p>
        <p>Год рождения: ${item.birth_year}</p>`;
    }
    else if (list === 'planets'){
        divResult.innerHTML = `<p>Название планеты: ${item.name}</p>
        <p>Население: ${item.population}</p>`;
    }
    else if (list === 'films'){
        divResult.innerHTML = `<p>Название фильма: ${item.title}</p>
        <p>Режиссер: ${item.director}</p>`;
    }
}

// функци очистки инпута и селекта
function clearAll(input) {
    input.value = '';
    selectDefault.selected = true;
}

button.addEventListener('click', searchObj);