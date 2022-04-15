class Basket {
	constructor() {
		this.items = JSON.parse(localStorage.getItem("miniShopBasket")) || [];
		this.isOrderDisabled = true;
	}

	saveToLs() {
		localStorage.setItem("miniShopBasket", JSON.stringify(this.items));
	}

	getTotalQty() {
		return this.items.reduce((acc, cur) => acc + cur.qty, 0);
	}

	add(product, qty) {
		const index = this.items.indexOf(
			this.items.find((item) => item.id === product.id)
		);

		if (index === -1) {
			this.items = this.items.concat({ ...product, qty });
		} else {
			this.items[index].qty += qty;
		}
		this.saveToLs();
	}

	remove(productId) {
		this.items = this.items.filter((item) => item.id !== productId);
		this.saveToLs();
	}

	sendOrder() {
		this.items.length = 0;
		this.saveToLs();
		window.alert("Zamówienie wysłane!");
	}

	renderBasketItem(item) {
		return `
		<form data-option="basket-remove-product" class="basket-product" id="${
			item.id
		}">
			<p class="basket-product-name">${item.name}</p>
			<p class="basket-product-qty">${item.qty}szt.</p>
			<p class="basket-product-total">${(item.price * item.qty).toLocaleString(
				"pl-PL",
				{
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}
			)}</p>
			<button type="submit"><i class="fa-solid fa-xmark"></i></button>
		</form>
		`;
	}

	render() {
		if (this.items.length > 0) {
			this.isOrderDisabled = false;
		} else {
			this.isOrderDisabled = true;
		}

		const totalValue = this.items.reduce(
			(acc, cur) => acc + cur.qty * cur.price,
			0
		);

		return `
		<div class="basket-page">
			${this.items.map((item) => this.renderBasketItem(item)).join("")}
			<p class="basket-topay">Do zapłaty: <span class="basket-value">${totalValue.toLocaleString(
				"pl-PL",
				{
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}
			)}</span></p>
			<form data-option="basket-send-order">
				<button type="submit" class="basket-send" ${
					this.isOrderDisabled && `disabled`
				}>Wyślij zamówienie</button>
			</form>
		<div>
		`;
	}
}
