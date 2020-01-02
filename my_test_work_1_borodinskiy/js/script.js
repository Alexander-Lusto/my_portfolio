var login = document.querySelector('.modal');
var login_btn = document.querySelector('.navbar__login-btn');
var close_modal = document.querySelector('.modal__btn-close');

login_btn.addEventListener('click', function(evt){
  evt.preventDefault();
  login.classList.add('modal-show');
});

close_modal.addEventListener('click', function(evt){
  evt.preventDefault();
  login.classList.remove('modal-show');
  login.classList.add('modal-close');
});

document.addEventListener('keydown', function(evt){
  if(evt.keyCode === 27){
    login.classList.remove('modal-show');
    login.classList.add('modal-close');
  }
});


var map = document.querySelector('.map');
var map_btn = document.querySelector('.contact-info__button');
var map_footer = document.querySelector('.footer__location-link');
var close_map = document.querySelector('.map__btn-close');

map_btn.addEventListener('click', function(evt){
  evt.preventDefault();
  map.classList.add('modal-show');
});

map_footer.addEventListener('click', function(evt){
  evt.preventDefault();
  map.classList.add('modal-show');
});

close_map.addEventListener('click', function(evt){
  evt.preventDefault();
  map.classList.remove('modal-show');
  map.classList.add('modal-close');
});

document.addEventListener('keydown', function(evt){
  if(evt.keyCode === 27){
    map.classList.remove('modal-show');
    map.classList.add('modal-close');
  }
});
