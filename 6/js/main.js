const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        isVisibleCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://placehold.it/50x100',
        products: [],
        imgProduct: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filterGoods() {
            if (!this.searchLine.trim().length) {
                this.filtered = this.products;
            }
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }

});
