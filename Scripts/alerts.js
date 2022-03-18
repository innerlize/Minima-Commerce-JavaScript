// FUNCIÓN PARA MOSTRAR UNA ALERTA QUE AVISE QUE EL PRODUCTO FUE AÑADIDO AL CARRITO SATISFACTORIAMENTE.
function productAddedAlert() {
  Swal.fire({
    title: '¡Listo!',
    text: '¡El producto fue añadido al carrito!',
    icon: 'success',
    confirmButtonText: '¡Genial!',
    background: '#222222',
    color: '#F2F2F2',
    customClass: {
      htmlContainer: 'alertContainer'
    },
    confirmButtonColor: '#C2C2C2C2'
  })
}


// FUNCIÓN PARA MOSTRAR UNA ALERTA QUE AVISE QUE EL PAGO DE LA COMPRA FUE REALIZADO SATISFACTORIAMENTE.
function productPurchasedAlert() {
  Swal.fire({
    title: '¡Muchas gracias por su compra!',
    text: '¡Su pago se ha realizado satisfactoriamente! ¡Gracias por confiar en nosotros!',
    icon: 'success',
    confirmButtonText: '¡Genial!',
    background: '#222222',
    color: '#F2F2F2',
    customClass: {
      htmlContainer: 'alertContainer'
    },
    confirmButtonColor: '#C2C2C2C2'
  })
}