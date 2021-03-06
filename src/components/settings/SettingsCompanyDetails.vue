<template>
  <div class="card">
    <div class="card-body">
      <label
        class="form-label w-100"
      >
        <strong>Logotip</strong>
        <br>
        Ovdje možete promijeniti logotip koje će biti prikazan na stranici
      </label>
      <img
        v-if="imageLocation"
        :src="imageLocation"
        alt="logo"
        style="max-width: 200px; max-height: 200px;"
      >
      <input
        id="id-file"
        class="override-input-file"
        type="file"
        name="id-file"
        accept="image/svg, image/png, image/jpeg"
        @change="upload"
      >
      <label
        for="id-file"
        class="btn btn-primary"
      >
        {{ inputFileText }}
      </label>
      <span v-if="imageUploadSent && imageUploadStatus">Logo uspješno promjenjen!</span>
      <span v-if="imageUploadSent && !imageUploadStatus">Došlo je do greške, molimo probajte kasnije!</span>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <button
        :class="{
          btn: true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="save()"
      >
        Spremi
      </button>
    </div>
  </div>
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
        v-model="formData.name"
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
        for="id-about-text"
        class="form-label w-100"
      >
        <strong>O nama</strong>
      </label>
      <textarea
        id="id-about-text"
        v-model="formData.about"
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
        v-model="formData.streetName"
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
        v-model="formData.city"
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
        v-model="formData.phoneNumber"
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
        v-model="formData.contactEmail"
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
        <strong>Promjenite domenu</strong>
        <br>
        nakon promjene bit ćete prebačeni na novu stranicu gdje će te se trebati ponovo logirati
      </label>
      <input
        id="id-subdomain"
        v-model="formData.bookingPageSlug"
        class="form-control"
        type="text"
        placeholder="placeholder text"
      >
      <div>
        .frizerrose.info
      </div>
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
        v-model="formData.webstieLink"
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
        v-model="formData.facebookLink"
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
        v-model="formData.instagramLink"
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
        v-model="formData.termsLink"
        type="text"
        class="form-control"
        placeholder="https://www.ime-firem.hr/pravila-koristenja"
      >
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent, reactive, ref, computed,
} from 'vue';
import { useStore } from '@/store';
import ActionTypes from '@/store/action-types';
// import MutationTypes from '@/store/mutation-types';

export default defineComponent({
  setup() {
    const store = useStore();

    const inputFileText = ref('Choose a file...');
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const formData = reactive(JSON.parse(JSON.stringify(selectedCompany.value)));
    const requestSent = ref(false);
    const status = ref(false);
    const imageUploadSent = ref(false);
    const imageUploadStatus = ref(false);
    const imageLocation = ref(formData?.image?.link);

    // TODO: logo
    async function save() {
      try {
        const hasBookingPageSlugChanged = formData.bookingPageSlug !== selectedCompany.value?.bookingPageSlug;
        await store.dispatch(ActionTypes.UPDATE_COMPANY, formData);

        if (process.env.NODE_ENV !== 'production' && hasBookingPageSlugChanged) {
          window.location.href = `https://${formData.bookingPageSlug}.admin.frizerrose.info`;
        }

        requestSent.value = true;
        status.value = true;
      } catch {
        requestSent.value = true;
        status.value = false;
      }
    }

    async function upload(event: { target: EventTarget & { files: FileList } }) {
      try {
        const imageData = new FormData();
        const image = event.target.files[0];

        inputFileText.value = image.name;
        imageData.append('image', image);
        imageData.append('company', formData.id.toString());

        const newImageLocation = await store.dispatch(ActionTypes.UPLOAD_COMPANY_IMAGE, imageData);
        imageLocation.value = newImageLocation;
        imageUploadSent.value = true;
        imageUploadStatus.value = true;
      } catch {
        imageUploadSent.value = true;
        imageUploadStatus.value = false;
      }
    }

    return {
      save,
      formData,
      status,
      requestSent,
      inputFileText,
      upload,
      imageUploadSent,
      imageUploadStatus,
      imageLocation,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
