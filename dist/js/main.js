// open menu

$('.app-panel__burger, .app-panel__catalog').on('click', function () {
  $('.menu').addClass('menu--open')
  $('body').css('overflow' , 'hidden')
})

// close menu
$('.menu__close, .menu__item--coffee').on('click', function () {
  $('.menu').removeClass('menu--open')
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


