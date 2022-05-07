'use strict';

import './styles/main.scss';

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper(".mySwiper", {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      clickable: true,
    },
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form');
  let formButton = document.querySelector('.form__button');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    
    let formData = new FormData(form);
    
    if (error === 0) {
      formButton.classList.add('disabled');
      formButton.setAttribute('disabled', 'disabled');
      formButton.textContent = 'Отправляем...';
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        formButton.classList.remove('disabled');
        formButton.removeAttribute('disabled');
        formButton.textContent = 'Отправить';
        form.reset();
      } else {
        alert('Ошибка отправки');
        formButton.textContent = 'Отправить';
      }
    } else {
      alert('Заполните правильно поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];

      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        } 
      } else if (input.getAttribute('type') === 'tel') {
        if (telTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    // input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    // input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function telTest(input) {
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
  }
});