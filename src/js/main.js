import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41980985-8125375fe1d9f9e65ca18808e';

const refs = {
  form: document.querySelector('.form'),
  ulContainer: document.querySelector('.list_gallery'),
  loader: document.querySelector('.loader'),
};

refs.loader.style.display = 'none';

refs.form.addEventListener('submit', onButtonClick);

function onButtonClick(evt) {
  evt.preventDefault();

  refs.ulContainer.innerHTML = '';
  refs.loader.style.display = 'block';

  const form = evt.currentTarget;
  const input = form.elements.text.value;

  serchPictureGallery(input)
    .then(data => {
      refs.loader.style.display = 'none';
      const pictures = data.hits;
      let markup = '';

      for (const elem of pictures) {
        markup += markupGallery(elem);
      }

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            '"Sorry, there are no images matching your search query. Please try again!"',
          position: 'topRight',
          backgroundColor: '#EF4040',
          color: '#FAFAFB',
        });
      }

      refs.ulContainer.innerHTML = markup;

      const lightbox = new SimpleLightbox('.list_gallery a', {
        caption: true,
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
      });
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
      refs.loader.style.display = 'none';
    })
    .finally(() => {
      form.reset();
    });
}

function serchPictureGallery(picture) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: picture,
    image_type: 'photo',
    image_type: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${urlParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });
}

function markupGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
        <a
          class="gallery-link"
          href="${largeImageURL}"
        >
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="coments">
          <p class="comments-title">
            Likes<span class="comments-text">${likes}</span>
          </p>
          <p class="comments-title">
            Views<span class="comments-text">${views}</span>
          </p>
          <p class="comments-title">
            Comments<span class="comments-text">${comments}</span>
          </p>
          <p class="comments-title">
            Downloads<span class="comments-text">${downloads}</span>
          </p>
        </div>
      </li>`;
}
