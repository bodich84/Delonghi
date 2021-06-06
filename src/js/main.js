// open menu

$('.app-panel__burger, .app-panel__catalog').on('click', function () {
  $('.modal').addClass('modal--open')
  $('body').css('overflow', 'hidden')
})

// close menu
$('.modal__close').on('click', function () {
  $('.modal').removeClass('modal--open')
  $('body').css('overflow', 'inherit')
})

// open sub category
$('.category-menu .menu__link').on('click', function () {
  $(this)
    .parent()
    .children('.menu__sub-menu')
    .slideToggle()
})

// product switch act
$('.product__act').on('click', function () {
  $(this).toggleClass('product__act--active')
})


// wheel
const selectCell = () => {
  let cell = 7
  let number = Math.floor(Math.random() * (cell) + 1)
  let deg = 360 / cell * number
  let run = 1080 + deg
  $('.wheel').css('transform', `rotateZ(${run}deg)`)
  $('.wheel-inner').off()
  return number
}

$('.wheel-inner').on('click', selectCell)
