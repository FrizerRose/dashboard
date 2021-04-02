<template>
  <div>
    <div class="firma-interaktivno mb-4 text-end">
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
          'btn-primary': !requestSent,
          'btn-success': requestSent && status,
          'btn-danger': requestSent && !status,
        }"
        @click="save()"
      >
        Spremi
      </button>
    </div>

    <div
      v-if="requestSent && !status"
      class="p-4 mt-4 alert alert-danger"
    >
      <div class="container override-desktop-limit">
        {{ errorMsg }}
      </div>
    </div>

    <div class="firma-info">
      <div class="mt-4 border-top border-bottom">
        <div class="my-4 h4">
          <div class="container override-desktop-limit">
            Podatci koje unesete u ova polja će biti prikazani na stranici Vašeg poslovnog subjekta <a
              href="{-- https://tresnja.dolazim.hr/ --}"
              rel="noopener noreferrer"
              target="_blank"
            >{-- https://tresnja.dolazim.hr/ --}</a> kako bi Vas klijenti mogli kontaktirati
          </div>
        </div>
      </div>
    </div>

    <div class="firma-logo">
      <div class="border-bottom">
        <div class="my-4">
          <div class="row">
            <div class="col-6 col-sm-6">
              <label class="responsive-form-label w-100 mb-5 mt-2">
                <span class="responsive-form-label__bolder">Logotip</span>
                <br>
                Podržavamo formate: JPG, PNG
              </label>
            </div>
            <div class="col-6 col-sm-6">
              <div class="text-center">
                <div class="override-upload-image-wrap">
                  <div class="override-upload-image">
                    <div class="override-upload-image-square">
                      <img
                        v-if="image?.link"
                        :src="image.link"
                        alt="logo"
                        class="fit-cover"
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
              <div class="text-center fallback-file-input-option">
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
                  class="btn responsive-btn btn-primary mt-4 mb-4"
                >
                  {{ inputFileText }}
                </label>
              </div>

              <div
                v-if="imageUploadSent && imageUploadStatus"
                class="p-3 alert alert-success"
              >
                Logo uspješno promijenjen!
              </div>

              <div
                v-if="(imageUploadSent && !imageUploadStatus) || imageRemoveHasError"
                class="p-3 alert alert-danger"
              >
                Došlo je do greške, molimo probajte kasnije!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="firma-ime">
      <div class="border-bottom">
        <div class="my-4">
          <div class="row">
            <div class="col-12 col-sm-6 mb-4 d-flex flex-column justify-content-between">
              <label
                for="id-name"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Ime poslovnog subjekta</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                class="form-control responsive-form-control"
                placeholder="Ime poslovnog subjekta"
                for="id-name"
              >
            </div>
            <div class="col-12 col-sm-6 mb-4 d-flex flex-column justify-content-between">
              <label
                for="id-about-text"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">O nama</span>
              </label>
              <textarea
                id="id-about-text"
                v-model="formData.about"
                class="form-control responsive-form-control"
                placeholder="Ovdje možete upisati kratki tekst koje će biti prikazan na stranici"
                rows="3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="firma-adresa">
      <div class="border-bottom">
        <div class="my-4">
          <div class="row">
            <div class="col-12 col-sm-6 mb-4 d-flex flex-column justify-content-between">
              <label
                for="id-street-address"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Ulica i kućni broj</span>
              </label>
              <input
                id="id-street-address"
                v-model="formData.streetName"
                class="form-control responsive-form-control"
                type="text"
                placeholder="npr. Ulica Vladimira Nazora 27"
              >
            </div>
            <div class="col-12 col-sm-6 mb-4 d-flex flex-column justify-content-between">
              <label
                for="id-city"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Grad</span>
              </label>
              <input
                id="id-city"
                v-model="formData.city"
                class="form-control responsive-form-control"
                type="text"
                placeholder="Grad"
              >
            </div>
          </div>
        </div>

        <div class="my-4">
          <div class="row">
            <div class="col-12 col-sm-6 mb-4 d-flex flex-column justify-content-between">
              <label
                for="id-phone"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Telefon</span>
              </label>
              <input
                id="id-phone"
                v-model="formData.phoneNumber"
                class="form-control responsive-form-control"
                type="tel"
                placeholder="npr. +385 (91) 234-56-78"
              >
            </div>
            <div class="col-12 col-sm-6 mb-4 d-flex flex-column justify-content-between">
              <label
                class="responsive-form-label"
                for="id-email"
              >
                <span class="responsive-form-label__bolder">E-mail adresa</span>
              </label>
              <input
                id="id-email"
                v-model="formData.contactEmail"
                type="email"
                class="form-control responsive-form-control"
                placeholder="adresa@poslovni-subjekt.hr"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="firma-web">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row flex-row-reverse">
            <div class="col-12 col-md-8 col-xl-6">
              <label
                for="id-subdomain"
                class="responsive-form-label w-100"
              >
                <span class="responsive-form-label__bolder">Poddomena</span> - obavezno polje
              </label>
              <div class="d-flex align-items-baseline">
                <input
                  id="id-subdomain"
                  v-model="formData.bookingPageSlug"
                  class="form-control responsive-form-control text-end"
                  type="text"
                  placeholder="Željeno ime"
                >
                <span class="ms-2">.frizerrose.info</span>
              </div>
            </div>
            <div class="col-12 col-md-4 col-xl-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                Nakon što promijenite poddomenu trebat ćete se ponovo ulogirati. Poddomena mora biti jedinstvena.
              </label>
            </div>
          </div>
        </div>

        <div class="mt-4 mb-5">
          <div class="mb-4">
            <div class="row flex-row-reverse">
              <div class="col-12 col-md-8 col-xl-6">
                <label
                  for="id-website-url"
                  class="responsive-form-label w-100"
                >
                  <span class="responsive-form-label__bolder">Web stranica URL</span>
                </label>
                <div class="d-flex align-items-baseline">
                  <input
                    id="id-website-url"
                    v-model="formData.preferences.websiteLink"
                    type="text"
                    class="form-control responsive-form-control"
                    placeholder="https://www.ime-poslovnog-subjekta.hr"
                  >
                </div>
              </div>
              <div class="col-12 col-md-4 col-xl-6">
                <label class="responsive-form-label w-100 mb-0 mt-2">
                  URL od web stranice vašeg poslovnog subjekta
                </label>
              </div>
            </div>
          </div>
          <div class="my-4">
            <div class="row flex-row-reverse">
              <div class="col-12 col-md-8 col-xl-6">
                <label
                  class="responsive-form-label"
                  for="id-facebook-page-url"
                >
                  <span class="responsive-form-label__bolder">Facebook URL</span>
                </label>
                <input
                  id="id-facebook-page-url"
                  v-model="formData.preferences.facebookLink"
                  type="text"
                  class="form-control responsive-form-control"
                  placeholder="https://www.facebook.com/ime-poslovnog-subjekta"
                >
              </div>
              <div class="col-12 col-md-4 col-xl-6">
                <label class="responsive-form-label w-100 mb-0 mt-2">
                  URL od vaše Facebook stranice vašeg poslovnog subjekta
                </label>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="row flex-row-reverse">
              <div class="col-12 col-md-8 col-xl-6">
                <label
                  class="responsive-form-label"
                  for="id-instagram-page-url"
                >
                  <span class="responsive-form-label__bolder">Instagram URL</span>
                </label>
                <input
                  id="id-instagram-page-url"
                  v-model="formData.preferences.instagramLink"
                  type="text"
                  class="form-control responsive-form-control"
                  placeholder="https://www.instagram.com/ime-poslovnog-subjekta"
                >
              </div>
              <div class="col-12 col-md-4 col-xl-6">
                <label class="responsive-form-label w-100 mb-0 mt-2">
                  URL od Instagram profila vašeg poslovnog subjekta
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-bottom">
        <div class="mt-4 mb-5">
          <div class="row flex-row-reverse">
            <div class="col-12 col-md-8 col-xl-6">
              <label>
                <span class="responsive-form-label__bolder">Pravila korištenja URL</span>
              </label>
              <input
                id="id-terms-and-conditions-page-url"
                v-model="formData.preferences.termsLink"
                type="text"
                class="form-control responsive-form-control"
                placeholder="https://www.ime-poslovnog-subjekta.hr/link-na-pravila-koristenja"
              >
            </div>
            <div class="col-12 col-md-4 col-xl-6">
              <label class="responsive-form-label w-100 mb-0 mt-2">
                <br>
                Ovdje zalijepite URL na pravila korištenja.
                Možete ih postaviti na vašoj web stranici, Google Docs ili u obliku Facebook objave
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="firma-conduct">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row align-items-end">
            <div class="col-12 col-md-4 col-xl-6 mb-3">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.showRules"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Prikaži pravila na stranici.</span>
              </label>
            </div>

            <div class="col-12 col-md-8 col-xl-6 mb-3">
              <label
                class="responsive-form-label m-0"
                for="id-rules"
              >
                <span class="responsive-form-label__bolder">Pravila ponašanja</span>
                <br>
                Ovdje možete upisati kratki tekst s pravilima ponašanja koji će biti prikazan na stranici
              </label>
            </div>
          </div>
          <textarea
            id="id-rules"
            v-model="formData.preferences.rules"
            class="form-control responsive-form-control"
            rows="12"
          />
        </div>
      </div>
    </div>

    <div class="firma-warnings">
      <div class="border-bottom">
        <div class="mt-4 mb-6">
          <div class="row align-items-end">
            <div class="col-12 col-md-4 col-xl-6 mb-3">
              <label class="form-check m-0">
                <input
                  v-model="formData.preferences.showCoronaRules"
                  type="checkbox"
                  class="form-check-input"
                >
                <span class="form-check-label">Prikaži COVID-19 upozorenje na stranici.</span>
              </label>
            </div>

            <div class="col-12 col-md-8 col-xl-6 mb-3">
              <label
                class="responsive-form-label mb-0"
                for="id-rules-corona"
              >
                <span class="responsive-form-label__bolder">COVID-19 upozorenje</span>
                <br>
                Ovdje možete podsjetiti klijente na preporuke za korištenje maski za lice
              </label>
            </div>
          </div>
          <textarea
            id="id-rules-corona"
            v-model="formData.preferences.coronaRules"
            class="form-control responsive-form-control"
            rows="4"
          />
        </div>
      </div>
    </div>

    <div class="firma-interaktivno mt-4 text-end">
      <button
        :class="{
          btn: true,
          'responsive-btn': true,
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
    const errorMsg = ref('Spremanje nije uspjelo. Ako ste sigurni da su unešeni podatci ispravni, javite se korisničkoj podršci.');
    const imageUploadSent = ref(false);
    const imageUploadStatus = ref(false);
    const imageRemoveHasError = ref(false);
    const image = ref(formData?.image);

    async function save() {
      if (formData.name && formData.contactEmail && formData.bookingPageSlug) {
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
          errorMsg.value = 'Spremanje nije uspjelo. Ako ste sigurni da su unešeni podatci ispravni, javite se korisničkoj podršci.';
        }
      } else {
        requestSent.value = true;
        status.value = false;
        errorMsg.value = 'Ime, e-mail i poddomena moraju biti upisani.';
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
      errorMsg,
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
