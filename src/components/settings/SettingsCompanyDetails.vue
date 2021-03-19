<template>
  <div>
    <div class="firma-interaktivno mb-4">
      <button
        :class="{
          btn: true,
          'btn-lg': true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="save()"
      >
        Spremi
      </button>
    </div>

    <div class="firma-logo-ime">
      <label
        class="form-label w-100 mb-4"
      >
        <strong>Logotip</strong>
        <br>
        Ovdje možete promijeniti logotip koji će biti prikazan na stranici
      </label>

      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="row d-flex align-items-center">
            <div class="col-6 col-md-12">
              <div class="override-upload-image-wrap">
                <div class="override-upload-image">
                  <div class="override-upload-image-square">
                    <img
                      v-if="image?.link"
                      :src="image.link"
                      alt="logo"
                    >
                    <span
                      v-if="!image?.link"
                      class="override-upload-image-layer override-upload-image-missing"
                    >
                      <span class="override-upload-image-layer override-upload-image-missing-placeholder">
                        <span class="fa fa-image" />
                        <!-- <i class="align-middle" data-feather="user"></i> -->
                      </span>
                    </span>
                  </div>
                  <span class="override-upload-image-layer override-upload-image-input-wrap">
                    <input
                      id="id-file-over-img"
                      class="override-input-file"
                      type="file"
                      name="id-file-over-img"
                      accept="image/svg, image/png, image/jpeg"
                      @change="upload"
                    >
                    <label
                      for="id-file-over-img"
                      class="override-upload-image-layer override-upload-image-input-wrap-label"
                    >
                      <span class="override-upload-image-layer override-upload-image-input-wrap-label-icon">
                        <span class="fa fa-camera" />
                      </span>
                    </label>
                  </span>
                </div>
                <button
                  v-if="image?.link"
                  class="override-upload-image-remove override-upload-image-square"
                  @click="removeImage()"
                >
                  <span class="override-upload-image-layer override-upload-image-remove-center">
                    <span class="fa fa-trash" />
                  </span>
                </button>
              </div>
            </div>
            <div class="col-6 col-md-12 mt-4">
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
                class="btn btn-lg btn-primary"
              >
                {{ inputFileText }}
              </label>
              <div
                v-if="imageUploadSent && imageUploadStatus"
                class="mt-2"
              >
                Logo uspješno promjenjen!
              </div>
              <div
                v-if="(imageUploadSent && !imageUploadStatus) || imageRemoveHasError"
                class="mt-2"
              >
                Došlo je do greške, molimo probajte kasnije!
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="mb-4">
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
              class="form-control form-control-lg"
              placeholder="Ime firme"
              for="id-name"
            >
          </div>
          <div class="mb-4">
            <label
              for="id-about-text"
              class="form-label w-100"
            >
              <strong>O nama</strong>
            </label>
            <textarea
              id="id-about-text"
              v-model="formData.about"
              class="form-control form-control-lg"
              placeholder="Ovdje možete upisati kratki tekst koje će biti prikazan na stranici"
              rows="3"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="firma-adresa">
      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6 mb-4 d-flex flex-column justify-content-between">
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
                class="form-control form-control-lg"
                type="text"
                placeholder="Ulica borova 55, 10000 Zargeb"
              >
            </div>
            <div class="col-md-6 mb-4 d-flex flex-column justify-content-between">
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
                class="form-control form-control-lg"
                type="text"
                placeholder="Zagreb"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-6 mb-4 d-flex flex-column justify-content-between">
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
                class="form-control form-control-lg"
                type="tel"
                placeholder="+385 (91) 000-11-22"
              >
            </div>
            <div class="col-md-6 mb-4 d-flex flex-column justify-content-between">
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
                class="form-control form-control-lg"
                placeholder="adresa@firma.hr"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="firma-na-webu">
      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9 mb-4">
          <label
            for="id-subdomain"
            class="form-label w-100"
          >
            <strong>Promjenite domenu</strong>
            <br>
            nakon promjene bit ćete prebačeni na novu stranicu gdje će te se trebati ponovo logirati
          </label>
          <div class="d-flex align-items-baseline">
            <input
              id="id-subdomain"
              v-model="formData.bookingPageSlug"
              class="form-control form-control-lg"
              type="text"
              placeholder="placeholder text"
            >
            <span class="ms-2">.frizerrose.info</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9 mb-4">
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
            class="form-control form-control-lg"
            placeholder="https://www.ime-firme.hr"
          >
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9 mb-4">
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
            class="form-control form-control-lg"
            placeholder="https://www.facebook.com/ime-firme"
          >
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9 mb-4">
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
            class="form-control form-control-lg"
            placeholder="https://www.instagram.com/ime-firme"
          >
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9 mb-4">
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
            class="form-control form-control-lg"
            placeholder="https://www.ime-firme.hr/pravila-koristenja"
          >
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 mb-4" />
        <div class="col-md-9 mb-4">
          <label class="form-check m-0">
            <input
              v-model="formData.preferences.showRules"
              type="checkbox"
              class="form-check-input"
            >
            <span class="form-check-label">Prikaži pravila na stranici.</span>
          </label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4" />
      <div class="col-md-9 mb-4">
        <label
          class="form-label"
          for="id-rules"
        >
          <strong>Pravila ponašanja</strong>
          <br>
          Ovdje možete upisati kratki tekst s pravilima ponašanja koji će biti prikazan na stranici
        </label>
        <textarea
          id="id-rules"
          v-model="formData.preferences.rules"
          class="form-control form-control-lg"
          rows="12"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4" />
      <div class="col-md-9 mb-4">
        <label class="form-check m-0">
          <input
            v-model="formData.preferences.showCoronaRules"
            type="checkbox"
            class="form-check-input"
          >
          <span class="form-check-label">Prikaži COVID-19 upozorenje na stranici.</span>
        </label>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4" />
      <div class="col-md-9 mb-4">
        <label
          class="form-label"
          for="id-rules-corona"
        >
          <strong>COVID-19 upozorenje</strong>
          <br>
          Ovdje možete podsjetiti klijente na preporuke za korištenje maski za lice
        </label>
        <textarea
          id="id-rules-corona"
          v-model="formData.preferences.coronaRules"
          class="form-control form-control-lg"
          rows="4"
        />
      </div>
    </div>

    <div class="firma-interaktivno">
      <button
        :class="{
          btn: true,
          'btn-lg': true,
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

    const inputFileText = ref('Odaberi logo...');
    const selectedCompany = computed(() => store.state.shared.selectedCompany);
    const formData = reactive(JSON.parse(JSON.stringify(selectedCompany.value)));
    const requestSent = ref(false);
    const status = ref(false);
    const imageUploadSent = ref(false);
    const imageUploadStatus = ref(false);
    const imageRemoveHasError = ref(false);
    const image = ref(formData?.image);

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
        const imageToUpload = event.target.files[0];

        inputFileText.value = imageToUpload.name;
        imageData.append('image', imageToUpload);
        imageData.append('company', formData.id.toString());

        const newImage = await store.dispatch(ActionTypes.UPLOAD_IMAGE, imageData);
        image.value = newImage;
        imageUploadSent.value = true;
        imageUploadStatus.value = true;
      } catch {
        imageUploadSent.value = true;
        imageUploadStatus.value = false;
      }
    }

    async function removeImage() {
      imageRemoveHasError.value = false;
      try {
        await store.dispatch(ActionTypes.DELETE_IMAGE, image.value.id);
        image.value = null;
      } catch {
        imageRemoveHasError.value = true;
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
      image,
      removeImage,
      imageRemoveHasError,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
