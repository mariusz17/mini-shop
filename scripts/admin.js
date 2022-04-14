class Admin {
	constructor() {}

	showMessage(message) {
		const messageHtml = document.querySelector("#admin-message");
		messageHtml.textContent = message;
	}

	render() {
		return `
		<div class="admin-page">
			<h3>Dodaj nowy produkt do sklepu:</h3>
			<form data-option="product-list-add-product">
				<input
					type="text"
					name="productName"
					placeholder="Podaj nazwę"
					required
				/>
				<input
					type="number"
					name="productPrice"
					placeholder="Podaj cenę"
					min="0.01"
					step="0.01"
					required
				/>
				<button type="submit">
					Dodaj
				</button>
			</form>
			<p id="admin-message"></p>
		</div>
		`;
	}
}
