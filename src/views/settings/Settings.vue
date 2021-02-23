<template>
  <Dashboard>
    <main class="content">
      <div class="container-fluid p-0">
        <router-view />

        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Narudžbe
              </h1>
              <div class="card">
                <div class="card-body">
                  <label
                    for="id-lead-time"
                    class="form-label w-100"
                  >
                    <strong>Naručivanje najkasnije</strong>
                    <br>
                    Odaberite koliko se sati unaprijed može naručiti
                  </label>
                  <select
                    id="id-lead-time"
                    class="form-control mb-3"
                    name="id-lead-time"
                  >
                    <option
                      value="1"
                      selected
                    >
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
              <div class="card">
                <div class="card-body">
                  <label
                    class="form-label w-100"
                    for="id-scheduling-window"
                  >
                    <strong>Naručivanje u budućnost</strong>
                    <br>
                    Odaberite koliko se dana u budućnost može naručivati</label>
                  <select
                    id="id-scheduling-window"
                    class="form-control mb-3"
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
              <div class="card">
                <div class="card-body">
                  <label
                    class="form-label w-100"
                    for="id-cancel-time"
                  >
                    <strong>Poništavanje narudžbe</strong>
                    <br>
                    Odaberite koliko kasno se narudžba može poništiti</label>
                  <select
                    id="id-cancel-time"
                    class="form-control mb-3"
                    name="id-cancel-time"
                  >
                    <option value="1">
                      1 sat prije roka
                    </option>
                    <option
                      value="2"
                      selected
                    >
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
            </div>
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Podatci o firmi
              </h1>
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
                    for="id-file"
                    class="form-label w-100"
                  >
                    <strong>Logotip</strong>
                    <br>
                    Ovdje možete promijeniti logotip koje će biti prikazan na stranici
                  </label>
                  <input
                    id="id-file"
                    type="file"
                    name="id-file"
                    accept="image/svg, image/png, image/jpeg"
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
                    class="form-control"
                    placeholder="Ovdje možete upisati kratki tekst koje će biti prikazan na stranici"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Kontakt podatci
              </h1>
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
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Radno vrijeme verzija 1
              </h1>
              <div class="card">
                <div class="card-body">
                  <label
                    class="form-label w-100"
                    for="id-working-hour-from"
                  >
                    <strong>Početak radnog vremena</strong>
                    <br>
                    Odaberite u koliko sati želite početi primati naručene klijente</label>
                  <select
                    id="id-working-hour-from"
                    class="form-control mb-3"
                    name="id-working-hour-from"
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
                    <option
                      value="8"
                      selected
                    >
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
              <div class="card">
                <div class="card-body">
                  <label
                    class="form-label w-100"
                    for="id-working-hour-to"
                  >
                    <strong>Kraj radnog vremena</strong>
                    <br>
                    Odaberite u koliko sati želite prestati primati naručene klijente</label>
                  <select
                    id="id-working-hour-to"
                    class="form-control mb-3"
                    name="id-working-hour-to"
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
                    <option
                      value="16"
                      selected
                    >
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
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Radno vrijeme verzija 2
              </h1>
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-lg-9">
                      <label
                        class="form-label w-100"
                        for="id-working-hour-from"
                      >
                        <strong>Početak radnog vremena</strong>
                        <br>
                        Odaberite u koliko sati želite početi primati naručene klijente</label>
                    </div>
                    <div class="col-12 col-lg-3">
                      <select
                        id="id-working-hour-from"
                        class="form-control mb-3"
                        name="id-working-hour-from"
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
                        <option
                          value="8"
                          selected
                        >
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
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-lg-9">
                      <label
                        class="form-label w-100"
                        for="id-working-hour-to"
                      >
                        <strong>Kraj radnog vremena</strong>
                        <br>
                        Odaberite u koliko sati želite prestati primati naručene klijente</label>
                    </div>
                    <div class="col-12 col-lg-3">
                      <select
                        id="id-working-hour-to"
                        class="form-control mb-3"
                        name="id-working-hour-to"
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
                        <option
                          value="16"
                          selected
                        >
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
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Radno vrijeme verzija 3
              </h1>
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <label
                        class="form-label w-100"
                        for="id-working-hour-from"
                      >
                        <strong>Od</strong>
                        <select
                          id="id-working-hour-from"
                          class="form-control mb-3"
                          name="id-working-hour-from"
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
                          <option
                            value="8"
                            selected
                          >
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
                      </label>
                    </div>
                    <div class="col-6">
                      <label
                        class="form-label w-100"
                        for="id-working-hour-to"
                      >
                        <strong>Do</strong>
                        <select
                          id="id-working-hour-to"
                          class="form-control mb-3"
                          name="id-working-hour-to"
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
                          <option
                            value="16"
                            selected
                          >
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
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <li>
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
                    <span class="o-tooltip">Ovdje zalijepite URL od
                      stranice na kojoj pišu pravila korištenja. Ovo
                      polje je obavezno.</span>
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
              <li>
                Mjenjanje subdomene - nakon sto API call prodje,
                ispisemo im da ce uskoro bit redirektani i redirektamo - input field
              </li>
              <li>Color variant - radio buttons</li>
              <li>change password</li>
            </ul>
          </li>
        </div>
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },

  setup() {
    return {
    };
  },
});
</script>
