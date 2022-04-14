const handleSubmit = (e) => {
	e.preventDefault();
	switch (e.target.dataset.option) {
		// Add product to basket
		case "basket-add-product":
			const product = products.items.find(
				(item) => item.id === e.target.quantity.id
			);
			const qty = +e.target.quantity.value;
			basket.add(product, qty);
			e.target.quantity.value = 1;
			basketQtyStatus.textContent = `(${basket.getTotalQty()})`;
			break;

		// Remove product from basket
		case "basket-remove-product":
			basket.remove(e.target.id);
			mainHtml.innerHTML = basket.render();
			basketQtyStatus.textContent = `(${basket.getTotalQty()})`;
			break;

		// Add product to products list
		case "product-list-add-product":
			const name = e.target.productName.value;
			const price = +e.target.productPrice.value;
			const newProduct = new Product(name, price);
			products.add(newProduct);
			e.target.productName.value = "";
			e.target.productPrice.value = "";
			const adminMessage = `Dodano produkt "${name}"`;
			admin.showMessage(adminMessage);
			break;

		// Send order
		case "basket-send-order":
			basket.sendOrder();
			mainHtml.innerHTML = basket.render();
			basketQtyStatus.textContent = `(${basket.getTotalQty()})`;
			break;

		default:
			break;
	}
};

const productsButton = document.querySelector("#products-link");
const basketButton = document.querySelector("#basket-link");
const adminButton = document.querySelector("#admin-link");
const mainHtml = document.querySelector("main");
const basketQtyStatus = document.querySelector("#basket-qty");

const products = new Products();
const basket = new Basket();
const admin = new Admin();

const testProduct1 = new Product("Produkt testowy nr 1", 10259);
const testProduct2 = new Product("Produkt testowy nr 2", 999.99);
const testProduct3 = new Product("Produkt testowy nr 3", 3999);
products.add(testProduct1, testProduct2, testProduct3);

mainHtml.addEventListener("submit", handleSubmit);
productsButton.addEventListener(
	"click",
	() => (mainHtml.innerHTML = products.render())
);
basketButton.addEventListener(
	"click",
	() => (mainHtml.innerHTML = basket.render())
);
adminButton.addEventListener(
	"click",
	() => (mainHtml.innerHTML = admin.render())
);

mainHtml.innerHTML = products.render();
