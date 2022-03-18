$(document).ready(() => {

	// DECLARACIÓN DE VARIABLES.
	const addToCartButton = document.querySelectorAll('.addToCartButton');
	const cartItemList = document.querySelector('.cart-screen-container__items-list')
	let cart = [];

	// -----------------------------------------------------------------------------

	// CADA VEZ QUE SE HAGA CLICK EN EL BOTÓN "AGREGAR AL CARRITO" UN PRODUCTO
	// SERÁ AGREGADO AL MISMO, MEDIANTE LA FUNCIÓN "addToCartItem".
	addToCartButton.forEach(btn => {
		btn.addEventListener('click', addToCartItem)
	})

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA CREAR UN ITEM QUE IRÁ EN EL ARRAY DEL CARRITO, JUNTO CON
	// LA DECLARACIÓN DE ALGUNAS VARIABLES MÁS QUE SERÁN DE UTILIDAD PARA DICHOS
	// ITEMS.
	function addToCartItem(e) {
		const button = e.target;
		const item = button.closest('.product');
		const itemTitle = item.querySelector('.product-title').textContent;
		const itemImage = item.querySelector('.product-image').src;
		const itemDesc = item.querySelector('.product-desc').textContent;
		const itemPrice = item.querySelector('.product-price').textContent;

		const newItem = {
			title: itemTitle,
			price: itemPrice,
			img: itemImage,
			cant: 1
		}

		addItemToCartArray(newItem)

	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA AGREGAR PRODUCTOS (OBJETOS) DENTRO DEL ARRAY DEL CARRITO, Y HACER
	// QUE ESTOS NO SEAN AGREGADOS SI YA FUERON AÑADIDOS ANTERIORMENTE A LA LISTA DEL
	// CARRITO, EN SU LUGAR, QUE AUMENTE SU CANTIDAD A COMPRAR.
	function addItemToCartArray(newItem) {

		const cantElement = $('.itemCant')

		for(let i = 0; i < cart.length; i++) {
			if (cart[i].title.trim() === newItem.title.trim()) {
				cart[i].cant++;

				const cantValue = cantElement[i];
				cantValue.value++;

				totalItemsInCart()
				TotalCartPrice()

				return null;
			}
		}

		cart.push(newItem)

		renderCart()
	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA RENDERIZAR EL CARRITO Y ASÍ PODER MOSTRAR LOS PRODUCTOS Y LOS
	// CAMBIOS AGREGADOS AL MISMO.
	function renderCart() {
		cartItemList.innerHTML = '';

		cart.map(item => {
			$('.cart-screen-container__items-list').append(`

				<div class='product-in-cart'>

					<div class='product-in-cart-img'>
						<img src=${item.img} alt=''>
					</div>

					<div class='product-in-cart-nYp'>
						<span class='product-title'>${item.title}</span>
						<div class='product-priceAndCant-container'>
							<span>${item.price}</span>
							<input type='number' min='1' value='${item.cant}' class='itemCant' style='color: black'>
						</div>
						
					</div>

					<div class='product-in-cart-delete'>
						-
					</div>

				</div>
			`)

			$('.cart-screen-container__items-list .product-in-cart-delete').click(removeItemCart)
			$('.cart-screen-container__items-list .itemCant').change(sumCant)

		})

		totalItemsInCart()
		TotalCartPrice()
	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA PODER VISUALIZAR LA CANTIDAD TOTAL DE PRODUCTOS QUE ESTÁN EN EL CARRITO.
	function totalItemsInCart() {
		var totalCount = cart.reduce((total, currentItem) => (total + parseInt(currentItem.cant)), 0);
		$('#cart').html(totalCount)
	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA PODER VISUALIZAR EL PRECIO TOTAL DE PRODUCTOS QUE ESTÁN EN EL CARRITO.
	function TotalCartPrice() {
		const cartTotalPriceDiv = $('.cart-total-price span')

		var Total = cart.reduce((Total, item) => Total + (+item.price.replace('$', '') * +item.cant), 0);

		$('.cart-total-price span').html(`Total: $${Total}`)

		addLocalStorage();
	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA PODER REMOVER UN PRODUCTO DEL CARRITO
	function removeItemCart(e) {
		const buttonDelete = e.target;
		const fatherBox = buttonDelete.closest('.product-in-cart')
		const title = fatherBox.querySelector('.product-title').textContent

		for(let i = 0; i < cart.length; i++) {
			if (cart[i].title.trim() === title.trim()) {
				cart.splice(i, 1);
			}
		}

		fatherBox.remove()

		totalItemsInCart()
		TotalCartPrice()
	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA QUE AL MODIFICAR LA CANTIDAD DE PRODUCTOS A COMPRAR DENTRO DEL CARRITO,
	// MEDIANTE EL USO DE LAS FLECHASDE LOS ELEMENTOS INPUT, ESTE TAMBIÉN SE TENGA EN CUENTA
	// A LA HORA DE ACTUALIZAR TANTO EL PRECIO COMO LA CANTIDAD DENTRO DEL CARRITO.
	function sumCant(e) {
		const sumInput = e.target;
		const fatherBox = sumInput.closest('.product-in-cart');
		const title = fatherBox.querySelector('.product-title').textContent;

		cart.forEach(item => {
			if(item.title.trim() === title) {
				sumInput.value < 1 ? (sumInput.value = 1) : sumInput.value;
				item.cant = sumInput.value;

				totalItemsInCart()
				TotalCartPrice()
			}
		})
	}

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA SIMULAR UN PAGO REALIZADO SATISFACTORIAMENTE, EL CUAL TAMBIÉN
	// VACÍA EL CARRITO PARA SIMULAR AÚN MÁS DICHA ACCIÓN.
	function clearCartOnBuy() {
		cart = [];
	}

	$('.confirm-button').click(() => {
		$('.cart-screen-container').hide();
		clearCartOnBuy();
		renderCart();
	})

	// -----------------------------------------------------------------------------

	// FUNCIÓN PARA ALMACENAR Y GUARDAR LOS ITEMS DENTRO DEL CARRITO EN UN LOCALSTORAGE.
	function addLocalStorage() {
		localStorage.setItem('cart', JSON.stringify(cart))
	}

	window.onload = function() {
		const storage = JSON.parse(localStorage.getItem('cart'));
		if(storage) {
			cart = storage;
			renderCart();
		}
	}
})