let section = $('#products-section');

// -----------------------------------------------------------------------------------

// Array con productos, dentro de un archivo JSON.

const ImagesURL = './Scripts/JSON/products.json';

// -----------------------------------------------------------------------------------

// Consumo de JSON, mediante AJAX.

$.get(ImagesURL, function (response, status) {
	if(status === 'success') {
		let products = response;
		for (const product of products) {
			$('#products-section').append(`
				<div class='product' category='${product.category}'>
					<h5 class='product-title'>${product.name}</h5>
					<img class='product-image' src="${product.image}">
					<p class='product-desc'>${product.description}</p>
					<p class='product-price'>$${product.price}</p>
					<button class='addToCartButton' onclick='productAddedAlert()'>AGREGAR AL CARRITO</button>
				</div>
			`)
		}
	}
})


// FUNCIÓN PARA MOSTRAR/OCULTAR LA VENTANA DEL CARRITO.
$('#cart, #cartIcon').click(() => {
	$('.cart-screen-container').toggle('fast')
})


// FUNCIÓN PARA MOSTRAR LA VENTANITA DE MÉTODOS DE PAGO Y 
// LA CONFIRMACIÓN PARA EL MISMO.
$('.pay-button').click(() => {
	$('.pay-button').css({
		'background-color': '#C7C7C7',
		'color': '#F2F2F2',
		'cursor': 'initial'
	})

	$('.cart-total-price').css({
		'height': '226px',
		'bottom': '-226px'
	})

	$('.pay-methods-container').show(100)
})