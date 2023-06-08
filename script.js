'use strict';

const button = document.querySelector('.button');
const input = document.querySelector('.input');
const divResult = document.querySelector('.result');
const divError = document.querySelector('.error');
const selectDefault = document.querySelector('#selectDefault');
const wrapper = document.querySelector('.wrapper');
const resultFinally = document.createElement('h3');
const loader = document.querySelector('.loader');

// значения по умолчанию
input.value = '';
selectDefault.selected = true;
loader.hidden = true;

async function searchObj(){
    resultFinally.innerText = '';
    divResult.innerHTML = '';
    divError.innerHTML = '';
    try {
    const select = document.querySelector('#select').value;
    loader.hidden = false;
    const res = await fetch(`https://swapi.nomoreparties.co/${select}/${input.value}`);
    const obj = await res.json();
        if (obj.detail === 'Not found'){
            createErrorText();
            return Promise.reject(new Error(`Не найдено`));
        }
        else if (!input.value){
            divError.innerHTML = `<p>Упс, вы не выбрали значения</p>`;
            divResult.innerHTML = '';
            throw new Error('Не выбраны значения');
        }
        console.log(obj);
        createDescription(select, obj);
    }
    catch(error) {
        console.log(error.message);
    }
    finally {
        loader.hidden = true;
        resultFinally.innerText = `Результат поиска:`;
        wrapper.prepend(resultFinally);
        clearAll(input);
    }
    }

// функция для создания описания объекта
function createDescription(list, item){
    if (list === 'people'){
        divResult.innerHTML = `<p>Имя персонажа: ${item.name}</p>
        <p>Год рождения: ${item.birth_year}</p>`;
        divError.innerHTML = '';
    }
    else if (list === 'planets'){
        divResult.innerHTML = `<p>Название планеты: ${item.name}</p>
        <p>Население: ${item.population}</p>`;
        divError.innerHTML = '';
    }
    else if (list === 'films'){
        divResult.innerHTML = `<p>Название фильма: ${item.title}</p>
        <p>Режиссер: ${item.director}</p>`;
        divError.innerHTML = '';
    }
}

function createErrorText(){
    divError.innerHTML = `<p>Упс, не найдено</p>
    <p>Попробуйте выбрать другие значения</p>`;
    divResult.innerHTML = '';
}

// функци очистки инпута и селекта
function clearAll(inp) {
    inp.value = '';
    selectDefault.selected = true;
}

button.addEventListener('click', searchObj);