<template>
  <main class="content">
    <div class="container-fluid p-0">
      <router-view />
    </div>

    <div class="container-fluid">
      <h1 class="h3 mb-3">
        Basic Inputs
      </h1>

      <div class="row">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Input
              </h5>
            </div>
            <div class="card-body">
              <input
                type="text"
                class="form-control"
                placeholder="Input"
              >
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Textarea
              </h5>
            </div>
            <div class="card-body">
              <textarea
                class="form-control"
                rows="2"
                placeholder="Textarea"
              />
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Checkboxes
              </h5>
            </div>
            <div class="card-body">
              <div>
                <label class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  >
                  <span class="form-check-label">
                    Option one is this and that&mdash;be sure to include why it's great
                  </span>
                </label>
                <label class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    disabled
                  >
                  <span class="form-check-label">
                    Option two is disabled
                  </span>
                </label>
              </div>
              <div>
                <label class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="option1"
                  >
                  <span class="form-check-label">
                    1
                  </span>
                </label>
                <label class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="option2"
                  >
                  <span class="form-check-label">
                    2
                  </span>
                </label>
                <label class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value="option3"
                    disabled
                  >
                  <span class="form-check-label">
                    3
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Sizes
              </h5>
            </div>
            <div class="card-body">
              <input
                class="form-control form-control-lg mb-3"
                type="text"
                placeholder="Large input"
              >
              <input
                class="form-control mb-3"
                type="text"
                placeholder="Medium input"
              >
              <input
                class="form-control form-control-sm"
                type="text"
                placeholder="Small input"
              >
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Radios
              </h5>
            </div>
            <div class="card-body">
              <div>
                <label class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="option1"
                    name="radios-example"
                    checked
                  >
                  <span class="form-check-label">
                    Option one is this and that&mdash;be sure to include why it's great
                  </span>
                </label>
                <label class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="option2"
                    name="radios-example"
                  >
                  <span class="form-check-label">
                    Option two can be something else and selecting it will deselect option one
                  </span>
                </label>
                <label class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    value="option3"
                    name="radios-example"
                    disabled
                  >
                  <span class="form-check-label">
                    Option three is disabled
                  </span>
                </label>
              </div>
              <div>
                <label class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inline-radios-example"
                    value="option1"
                  >
                  <span class="form-check-label">
                    1
                  </span>
                </label>
                <label class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inline-radios-example"
                    value="option2"
                  >
                  <span class="form-check-label">
                    2
                  </span>
                </label>
                <label class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inline-radios-example"
                    value="option3"
                    disabled
                  >
                  <span class="form-check-label">
                    3
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Switches
              </h5>
            </div>
            <div class="card-body">
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckDefault"
                  class="form-check-input"
                  type="checkbox"
                >
                <label
                  class="form-check-label"
                  for="flexSwitchCheckDefault"
                >Default switch checkbox input</label>
              </div>
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckChecked"
                  class="form-check-input"
                  type="checkbox"
                  checked
                >
                <label
                  class="form-check-label"
                  for="flexSwitchCheckChecked"
                >Checked switch checkbox input</label>
              </div>
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckDisabled"
                  class="form-check-input"
                  type="checkbox"
                  disabled
                >
                <label
                  class="form-check-label"
                  for="flexSwitchCheckDisabled"
                >Disabled switch checkbox input</label>
              </div>
              <div class="form-check form-switch">
                <input
                  id="flexSwitchCheckCheckedDisabled"
                  class="form-check-input"
                  type="checkbox"
                  checked
                  disabled
                >
                <label
                  class="form-check-label"
                  for="flexSwitchCheckCheckedDisabled"
                >Disabled checked switch checkbox input</label>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Selects
              </h5>
            </div>
            <div class="card-body">
              <select class="form-control mb-3">
                <option selected>
                  Open this select menu
                </option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>

              <select
                multiple
                class="form-control"
              >
                <option>Open this select menu</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </select>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Disabled
              </h5>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Disabled input</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Disabled input"
                  disabled
                >
              </div>
              <div class="mb-3">
                <label class="form-label">Disabled select menu</label>
                <select
                  class="form-select"
                  disabled
                >
                  <option>Disabled select</option>
                </select>
              </div>
              <label class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  disabled
                >
                <span class="form-check-label">
                  Can't check this
                </span>
              </label>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">
                Read only
              </h5>
            </div>
            <div class="card-body">
              <input
                class="form-control"
                type="text"
                placeholder="Readonly input"
                readonly
              >
            </div>
          </div>
        </div>
      </div>

      <div class="temp-fixed">
        <p>template postavke</p>
      </div>
      <ul>
        <li>
          <section>
            <div class="c-form_item">
              <label
                class="c-form_label"
                for="id-lead-time"
              >Naručivanje najkasnije
                <span class="o-tooltip">Odaberite koliko se sati unaprijed može naručiti</span>
              </label>
              <div class="c-form_select">
                <select
                  id="id-lead-time"
                  class="c-form_select_input"
                  name="id-lead-time"
                >
                  <option value="1">
                    1 sat ranije
                  </option>
                  <option value="2">
                    2 sata ranije
                  </option>
                  <option value="3">
                    3 sata ranije
                  </option>
                  <option value="4">
                    4 sata ranije
                  </option>
                  <option value="5">
                    5 sati ranije
                  </option>
                  <option value="6">
                    6 sati ranije
                  </option>
                  <option value="7">
                    7 sati ranije
                  </option>
                  <option value="8">
                    8 sati ranije
                  </option>
                </select>
              </div>
            </div>
          </section>
        </li>
        <li>
          <section>
            <div class="c-form_item">
              <label
                class="c-form_label"
                for="id-scheduling-window"
              >Naručivanje u budućnost
                <span class="o-tooltip">Odaberite koliko se dana u budućnost može naručivati</span>
              </label>
              <div class="c-form_select">
                <select
                  id="id-scheduling-window"
                  class="c-form_select_input"
                  name="id-scheduling-window"
                >
                  <option value="30">
                    30 dana
                  </option>
                  <option value="60">
                    60 dana
                  </option>
                  <option value="90">
                    90 dana
                  </option>
                  <option value="120">
                    120 dana
                  </option>
                </select>
              </div>
            </div>
          </section>
        </li>
        <li>
          <section>
            <div class="c-form_item">
              <label
                class="c-form_label"
                for="id-cancel-time"
              >Naručivanje najkasnije
                <span class="o-tooltip">Odaberite koliko se sati unaprijed može naručiti</span>
              </label>
              <div class="c-form_select">
                <select
                  id="id-cancel-time"
                  class="c-form_select_input"
                  name="id-cancel-time"
                >
                  <option value="2">
                    2 sata prije roka
                  </option>
                  <option value="1">
                    1 sat prije roka
                  </option>
                  <option value="2">
                    2 sata prije roka
                  </option>
                  <option value="3">
                    3 sata prije roka
                  </option>
                  <option value="4">
                    4 sata prije roka
                  </option>
                  <option value="5">
                    5 sati prije roka
                  </option>
                  <option value="6">
                    6 sati prije roka
                  </option>
                  <option value="7">
                    7 sati prije roka
                  </option>
                  <option value="8">
                    8 sati prije roka
                  </option>
                </select>
              </div>
            </div>
          </section>
        </li>
      </ul>
      <ul>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-name"
            >Name</label>
            <input type="file">
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-logo"
            >Logo</label>
            <input type="file">
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-about-text"
            >About</label>
            <textarea
              id="id-about-text"
              class="c-form_textarea"
            />
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-street-address"
            >Street address</label>
            <input
              id="id-street-address"
              class="c-form_input"
              type="text"
              placeholder="Ulica 21"
            >
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-city"
            >City</label>
            <input
              id="id-city"
              class="c-form_input"
              type="text"
              placeholder="Zagreb"
            >
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-phone"
            >Phone number</label>
            <input
              id="id-phone"
              class="c-form_input"
              type="tel"
              placeholder="+385 (91) 000-11-22"
            >
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-working-hour-from"
            >Početak radnog vremena
            </label>
            <div class="c-form_select">
              <select
                id="id-working-hours-from"
                class="c-form_select_input"
                name="id-working-hours-from"
              >
                <option value="0">
                  0
                </option>
                <option value="1">
                  1
                </option>
                <option value="2">
                  2
                </option>
                <option value="3">
                  3
                </option>
                <option value="4">
                  4
                </option>
                <option value="5">
                  5
                </option>
                <option value="6">
                  6
                </option>
                <option value="7">
                  7
                </option>
                <option value="8">
                  8
                </option>
                <option value="9">
                  9
                </option>
                <option value="10">
                  10
                </option>
                <option value="11">
                  11
                </option>
                <option value="12">
                  12
                </option>
                <option value="13">
                  13
                </option>
                <option value="14">
                  14
                </option>
                <option value="15">
                  15
                </option>
                <option value="16">
                  16
                </option>
                <option value="17">
                  17
                </option>
                <option value="18">
                  18
                </option>
                <option value="19">
                  19
                </option>
                <option value="20">
                  20
                </option>
                <option value="21">
                  21
                </option>
                <option value="22">
                  22
                </option>
                <option value="23">
                  23
                </option>
              </select>
            </div>
          </div>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-working-hour-to"
            >Kraj radnog vremena
            </label>
            <div class="c-form_select">
              <select
                id="id-working-hours-to"
                class="c-form_select_input"
                name="id-working-hours-to"
              >
                <option value="0">
                  0
                </option>
                <option value="1">
                  1
                </option>
                <option value="2">
                  2
                </option>
                <option value="3">
                  3
                </option>
                <option value="4">
                  4
                </option>
                <option value="5">
                  5
                </option>
                <option value="6">
                  6
                </option>
                <option value="7">
                  7
                </option>
                <option value="8">
                  8
                </option>
                <option value="9">
                  9
                </option>
                <option value="10">
                  10
                </option>
                <option value="11">
                  11
                </option>
                <option value="12">
                  12
                </option>
                <option value="13">
                  13
                </option>
                <option value="14">
                  14
                </option>
                <option value="15">
                  15
                </option>
                <option value="16">
                  16
                </option>
                <option value="17">
                  17
                </option>
                <option value="18">
                  18
                </option>
                <option value="19">
                  19
                </option>
                <option value="20">
                  20
                </option>
                <option value="21">
                  21
                </option>
                <option value="22">
                  22
                </option>
                <option value="23">
                  23
                </option>
                <option value="24">
                  24
                </option>
              </select>
            </div>
          </div>
        </li>
      </ul>

      <div class="c-form_item">
        <label
          class="c-form_label"
          for="id-contact-email"
        >Contact e-mail</label>
        <input
          id="id-contact-email"
          class="c-form_input"
          type="text"
        >
      </div>

      <ul>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-facebook-page-url"
            >Facebook URL
              <span class="o-tooltip">Ako imate, ovdje zalijepite URL od vaše Facebook stranice</span>
            </label>
            <input
              id="id-facebook-page-url"
              class="c-form_input"
              type="text"
              placeholder="https://www.facebook.com/example"
            >
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-instagram-page-url"
            >Instagram URL
              <span class="o-tooltip">Ako imate, ovdje zalijepite URL od vaše Instagram stranice</span>
            </label>
            <input
              id="id-instagram-page-url"
              class="c-form_input"
              type="text"
              placeholder="https://www.instagram.com/example"
            >
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-twitter-page-url"
            >Twitter URL
              <span class="o-tooltip">Ako imate, ovdje zalijepite URL od vaše Twitter stranice</span>
            </label>
            <input
              id="id-twitter-page-url"
              class="c-form_input"
              type="text"
              placeholder="https://www.twitter.com/example"
            >
          </div>
        </li>
      </ul>

      <ul>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-website-page-url"
            >Web stranica URL
              <span class="o-tooltip">Ako imate, ovdje zalijepite URL od vaše web stranice</span>
            </label>
            <input
              id="id-website-page-url"
              class="c-form_input"
              type="text"
              placeholder="https://www.example.com"
            >
          </div>
        </li>
        <li>
          <div class="c-form_item">
            <label
              class="c-form_label"
              for="id-terms-and-conditions-page-url"
            >Pravila korištenja URL
              <span class="o-tooltip">Ovdje zalijepite URL od stranice na kojoj pišu pravila korištenja. Ovo polje je obavezno.</span>
            </label>
            <input
              id="id-terms-and-conditions-page-url"
              class="c-form_input"
              type="text"
              placeholder="https://www.example.com"
              required
            >
          </div>
        </li>
      </ul>

      <ul>
        <li>Da li end-user ima opciju biranja radnika? - checkbox true false</li>
        <li>Mjenjanje subdomene - nakon sto API call prodje, ispisemo im da ce uskoro bit redirektani i redirektamo - input field</li>
        <li>Color variant - radio buttons</li>
        <li>change password</li>
      </ul>

      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
  },

  setup() {
    return {
    };
  },
  data() {
    return {
      // setmoretree: {
      //   nodes: [
      //     {
      //       name: 'Račun',
      //       slug: '/postavke/racun',
      //       nodes: [
      //         { name: 'Prilagodi', slug: '/postavke/racun/prilagodi' },
      //         { name: 'Firma', slug: '/postavke/postavke-weba/pregled-postavki' },
      //         { name: 'Prethodne naplate', slug: '/postavke/racun/prethodne-naplate' },
      //         { name: 'Kratki izvještaj', slug: '/postavke/racun/kratki-izvjestaj' },
      //       ],
      //     },
      //     {
      //       name: 'Radnici',
      //       slug: '/postavke/radnici',
      //       nodes: [
      //         { name: 'Pregled svih radnika', slug: '/postavke/radnici/pregled' },
      //         { name: 'Tomislav', slug: '/postavke/radnici/tomislav' },
      //         { name: 'Juraj', slug: '/postavke/radnici/juraj' },
      //       ],
      //     },
      //     {
      //       name: 'Usluge',
      //       slug: '/postavke/usluge',
      //       nodes: [
      //         { name: 'Pregled svih usluga', slug: '/postavke/usluge/pregled' },
      //         { name: 'Šišanje', slug: '/postavke/usluge/sisanje' },
      //         { name: 'Frizura', slug: '/postavke/usluge/frizura' },
      //       ],
      //     },
      //     {
      //       name: 'Naplate',
      //       slug: '/postavke/naplate',
      //       nodes: [
      //         { name: 'Konfiguriraj', slug: '/postavke/naplate/konfiguriraj' },
      //         { name: 'Postavke Weba', slug: '/postavke/naplate/postavke-weba' },
      //         { name: 'Prethodne naplate', slug: '/postavke/naplate/prethodne-naplate' },
      //       ],
      //     },
      //     {
      //       name: 'Izvještavanja prema',
      //       slug: '/postavke/izvjestavnja-prema',
      //       nodes: [
      //         { name: 'Klijentu', slug: '/postavke/izvjestavnja-prema/klijentu' },
      //         { name: 'Osoblju', slug: '/postavke/izvjestavnja-prema/osoblju' },
      //       ],
      //     },
      //     { name: 'Uredi mail', slug: '/postavke/uredi-mail' },
      //     {
      //       name: 'Postavke Weba',
      //       slug: '/postavke/postavke-weba',
      //       nodes: [
      //         { name: 'Pregled postavki', slug: '/postavke/postavke-weba/pregled-postavki' },
      //         { name: 'Podatci o firmi', slug: '/postavke/postavke-weba/podatci-o-firmi' },
      //         { name: 'Radno vrijeme', slug: '/postavke/postavke-weba/radno-vrijeme' },
      //         { name: 'Postavke rezervacija', slug: '/postavke/postavke-weba/postavke-rezervacija' },
      //         { name: 'Uredi sadržaj na webu', slug: '/postavke/postavke-weba/uredi-sadrzaj-na-webu' },
      //         { name: 'Recenzije', slug: '/postavke/postavke-weba/recenzije' },
      //       ],
      //     },
      //   ],
      // },
    };
  },
});
</script>
