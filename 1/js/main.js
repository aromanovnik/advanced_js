
const img = 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-space-gray-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1603332211000';
const products = [
    {id: 1, title: 'Notebook', price: 2000, img},
    {id: 2, title: 'Mouse', price: 20, img},
    {id: 3, title: 'Keyboard', price: 200, img},
    {id: 4, title: 'Gamepad', price: 50, img},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = ({title, price, img}) => { // OR item
    return `<div class="product-item">
                <img src="${img}" alt="${title}">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);
