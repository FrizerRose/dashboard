<template>
  <div class="card">
    <div class="card-body">
      <label
        for="id-name"
        class="form-label w-100"
      >
        <strong>Ime firme</strong>
        <br>
        Ovdje možete promijeniti ime koje će pisati na stranici
      </label>
      <input
        type="text"
        class="form-control"
        placeholder="Ime firme"
        for="id-name"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label w-100"
      >
        <strong>Logotip</strong>
        <br>
        Ovdje možete promijeniti logotip koje će biti prikazan na stranici
      </label>
      <input
        id="id-file"
        class="override-input-file"
        type="file"
        name="id-file"
        accept="image/svg, image/png, image/jpeg"
        @change="setInputFileText"
      >
      <label
        for="id-file"
        class="btn btn-primary"
      >
        {{ inputFileText }}
      </label>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        for="id-about-text"
        class="form-label w-100"
      >
        <strong>O nama</strong>
      </label>
      <textarea
        id="id-about-text"
        class="form-control"
        placeholder="Ovdje možete upisati kratki tekst koje će biti prikazan na stranici"
        rows="3"
      />
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        for="id-street-address"
        class="form-label w-100"
      >
        <strong>Ulica</strong>
        <br>
        Ovdje možete promijeniti ulicu i kućni broj koji će biti prikazani na stranici u sklopu adrese
      </label>
      <input
        id="id-street-address"
        class="form-control"
        type="text"
        placeholder="Ulica borova 55, 10000 Zargeb"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        for="id-city"
        class="form-label w-100"
      >
        <strong>Grad</strong>
        <br>
        Ovdje možete promijeniti grad koja će biti prikazana na stranici u sklopu adrese
      </label>
      <input
        id="id-city"
        class="form-control"
        type="text"
        placeholder="Zagreb"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        for="id-phone"
        class="form-label w-100"
      >
        <strong>Telefon</strong>
        <br>
        Ovdje možete promijeniti broj telefona koji će biti prikazana na stranici
      </label>
      <input
        id="id-phone"
        class="form-control"
        type="tel"
        placeholder="+385 (91) 000-11-22"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label"
        for="id-email"
      >
        <strong>E-mail adresa</strong>
        <br>
        Ovdje možete promijeniti e-mail adresu koji će biti prikazana na stranici
      </label>
      <input
        id="id-email"
        type="email"
        class="form-control"
        placeholder="adresa@firma.hr"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        for="id-subdomain"
        class="form-label w-100"
      >
        <strong>Mjenjanje subdomene - nakon sto API call prodje,</strong>
        <br>
        ispisemo im da ce uskoro bit redirektani i redirektamo - input field
      </label>
      <input
        id="id-subdomain"
        class="form-control"
        type="text"
        placeholder="placeholder text"
      >
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <label
        class="form-label"
        for="id-website-url"
      >
        <strong>Web stranica URL</strong>
        <br>
        Ako imate, ovdje zalijepite URL od vaše web stranice
      </label>
      <input
        id="id-website-url"
        type="text"
        class="form-control"
        placeholder="https://www.ime-firme.hr"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label"
        for="id-facebook-page-url"
      >
        <strong>Facebook URL</strong>
        <br>
        Ako imate, ovdje zalijepite URL od vaše Facebook stranice
      </label>
      <input
        id="id-facebook-page-url"
        type="text"
        class="form-control"
        placeholder="https://www.facebook.com/ime-firme"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label"
        for="id-instagram-page-url"
      >
        <strong>Instagram URL</strong>
        <br>
        Ako imate, ovdje zalijepite URL od vašeg Instagram profila vaše firme
      </label>
      <input
        id="id-instagram-page-url"
        type="text"
        class="form-control"
        placeholder="https://www.instagram.com/ime-firme"
      >
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label"
        for="id-terms-and-conditions-page-url"
      >
        <strong>Pravila korištenja URL</strong>
        <br>
        Ovdje zalijepite URL od stranice na kojoj pišu pravila korištenja. Ovo polje je obavezno
      </label>
      <input
        id="id-terms-and-conditions-page-url"
        type="text"
        class="form-control"
        placeholder="https://www.ime-firem.hr/pravila-koristenja"
        required
      >
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  setup() {
    const store = useStore();

    const inputFileText = ref('Choose a file...');

    function setInputFileText(event: { target: { files: { name: string }[] } }) {
      inputFileText.value = event.target.files[0].name;
    }

    return {
      inputFileText,
      setInputFileText,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
