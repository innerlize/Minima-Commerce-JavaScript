// FUNCIÓN PARA FILTRAR PRODUCTOS POR CATEGORÍA MEDIANTE EL USO DE LOS LINKS EN EL NAVEGADOR DE PRODUCTOS.
$(window).on('load', () => {

	const filters = $('.filter');
	const filterAll = $('.filterAll')
	const products = $('.product');

	filters.click(function() {

		const productCategory = $(this).attr('category');

		products.hide(300);

		$(`.product[category=${productCategory}]`).show(300);

	})

	filterAll.click(function() {

		products.show(300);

		products.css('transform', 'scale(1)');

	})

})