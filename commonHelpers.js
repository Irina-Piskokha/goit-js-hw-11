import{i as c,S as m}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u="https://pixabay.com/api/",p="41980985-8125375fe1d9f9e65ca18808e",l={form:document.querySelector(".form"),ulContainer:document.querySelector(".list_gallery"),loader:document.querySelector(".loader")};l.loader.style.display="none";l.form.addEventListener("submit",f);function f(n){n.preventDefault(),l.ulContainer.innerHTML="",l.loader.style.display="block";const o=n.currentTarget,r=o.elements.text.value;d(r).then(s=>{l.loader.style.display="none";const e=s.hits;let t="";for(const i of e)t+=y(i);s.hits.length===0&&c.error({message:'"Sorry, there are no images matching your search query. Please try again!"',position:"topRight",backgroundColor:"#EF4040",color:"#FAFAFB"}),l.ulContainer.innerHTML=t,new m(".list_gallery a",{caption:!0,captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()}).catch(s=>{console.log(s),l.loader.style.display="none"}).finally(()=>{o.reset()})}function d(n){const o=new URLSearchParams({key:p,q:n,image_type:"photo",image_type:"horizontal",safesearch:!0});return fetch(`${u}?${o}`).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function y({webformatURL:n,largeImageURL:o,tags:r,likes:s,views:e,comments:t,downloads:a}){return`<li class="gallery-item">
        <a
          class="gallery-link"
          href="${o}"
        >
          <img
            class="gallery-image"
            src="${n}"
            alt="${r}"
          />
        </a>
        <div class="coments">
          <p class="comments-title">
            Likes<span class="comments-text">${s}</span>
          </p>
          <p class="comments-title">
            Views<span class="comments-text">${e}</span>
          </p>
          <p class="comments-title">
            Comments<span class="comments-text">${t}</span>
          </p>
          <p class="comments-title">
            Downloads<span class="comments-text">${a}</span>
          </p>
        </div>
      </li>`}
//# sourceMappingURL=commonHelpers.js.map
