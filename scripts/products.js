class Products {
	constructor() {
		this.items = [];
	}

	add(...products) {
		if (products.length > 0) {
			this.items = this.items.concat(products);
		}
	}

	render() {
		return this.items.length > 0
			? `
			<div class="products-page">
				${this.items.map((item) => item.render()).join("")}
			</div>
		`
			: `<p>Brak produktów w sklepie</p>`;
	}
}

class Product {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		this.id = uuidv4();
	}

	render() {
		return `
			<form data-option="basket-add-product" class="product">
				<label for="${this.id}">
					<p class="product-name">${this.name}</p>
					<p class="product-price">${this.price.toLocaleString("pl-PL", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}</p>
				</label>
				<input
					class="product-qty"
					type="number"
					id="${this.id}"
					name="quantity"
					min="1"
					value="1"
				/>
				<button type="submit">
					<i class="fa-solid fa-cart-arrow-down"></i>
				</button>
			</form>
		`;
	}
}
