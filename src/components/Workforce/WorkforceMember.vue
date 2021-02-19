<template>
  <div>
    <div class="title">
      Staff (2)
    </div>
    <ul>
      <li>
        <a href="#">
          <figure
            v-if="imageProvided"
            class="o-image-wrap || o-ratio"
          >
            <img
              class="o-image"
              src="https://source.unsplash.com/random"
              alt="img text"
            >
          </figure>
          <span
            v-else
            class="o-icon -size-double"
          >
            <svg viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.48 16.316a5.055 5.055 0 013.575-1.48h7.89A5.055 5.055 0 0121 19.89v1.973h-2.22V19.89a2.836 2.836
              0 00-2.835-2.835h-7.89a2.835 2.835 0 00-2.836 2.835v1.973H3V19.89c0-1.34.533-2.626 1.48-3.574zM12 5.22a2.836
              2.836 0 100 5.67 2.836 2.836 0 000-5.67zM6.945 8.054a5.055 5.055 0 1110.11 0 5.055 5.055 0 01-10.11 0z"
              />
            </svg>
          </span>
          <span class="">Danko Bananko</span>
        </a>
        <button class="c-button -primary">
          <span
            class="o-icon -size-double"
          >
            <svg viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5 6.2a1 1 0 000 2h.6v10.2A2.6 2.6 0 008.2 21h8a2.6 2.6 0 002.6-2.6V8.2h.6a1 1 0 100-2h-3v-.6A2.6 2.6
                0 0013.8 3h-3.2A2.6 2.6 0 008 5.6v.6H5zM10.6 5a.6.6 0 00-.6.6v.6h4.4v-.6a.6.6 0 00-.6-.6h-3.2zm-3 3.2v10.2a.6.6
                0 00.6.6h8a.6.6 0 00.6-.6V8.2H7.6z"
              />
            </svg>
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
