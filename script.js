const form = document.querySelector('form');
const item = document.querySelector('#input-item');
const category = document.querySelector('#input-category');
const quantity = document.querySelector('#input-quantity');

const groceryList = document.querySelector('.grocery-list');
const quantityItems = document.querySelector('.grocery-items header p span');

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const newGrocery = {
        id: new Date().getTime(),
        item: item.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        quantity: quantity.value,
        create_at: new Date(),
    }

    addGrocery(newGrocery);
    formClear();
})

function addGrocery(newGrocery){
    try {
        const li = document.createElement('li');
        li.classList.add('grocery');

        const imgCategory = document.createElement('img');
        imgCategory.setAttribute('src', `img/${newGrocery.category_id}.png`);
        imgCategory.setAttribute('alt', `${newGrocery.category_name}`);

        const groceryInfo = document.createElement('div');
        groceryInfo.classList.add('grocery-info');
        groceryInfo.innerHTML = `<p><strong>${newGrocery.item}</strong></p> <span><small>${newGrocery.category_name}</small></span>`;

        const groceryQuantity = document.createElement('span');
        groceryQuantity.classList.add('grocery-quantity');
        groceryQuantity.innerHTML = `<strong>${newGrocery.quantity}</strong> <small>uni.</small>`;

        const removeIcon = document.createElement('img');
        removeIcon.classList.add('remove-icon');
        removeIcon.setAttribute('src', 'img/remove.png');
        removeIcon.setAttribute('alt', 'remover');

        li.append(imgCategory, groceryInfo, groceryQuantity, removeIcon);

        groceryList.append(li);

        updateTotals();

    } catch (error) {
        alert('Não foi possível adicionar o item.')
        console.log(error)
    }
}

function updateTotals(){
    try {
        const items = groceryList.children;

        quantityItems.innerText = `${items.length} ${items.length > 1 ? 'itens' : 'item'}`
    } catch (error) {
        alert('Não foi possível atualizar a lista');
        console.log(error);
    }
}

groceryList.addEventListener('click', (event) =>{
    if(event.target.classList.contains('remove-icon')){
        const element = event.target.closest('.grocery');

        element.remove();
    }

    updateTotals();
})

function formClear(){
    item.value = '';
    category.value = '';
    quantity.value = '';

    item.focus();
}