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
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Adresa
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
            </div>
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Kontakt podatci
              </h1>
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
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Web stranica
              </h1>
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
            </div>
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Društvene mreže
              </h1>
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
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <h1 class="h3 mb-3">
                Pravila korištenja
              </h1>
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
            </div>
          </div>

          <hr>

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
                    Odaberite u koliko sati želite početi primati naručene klijente
                  </label>
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
                    Odaberite u koliko sati želite prestati primati naručene klijente
                  </label>
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
                        Odaberite u koliko sati želite početi primati naručene klijente
                      </label>
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
                        Odaberite u koliko sati želite prestati primati naručene klijente
                      </label>
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
                      </label>
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
                    <div class="col-6">
                      <label
                        class="form-label w-100"
                        for="id-working-hour-to"
                      >
                        <strong>Do</strong>
                      </label>
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

          <hr>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Lozinka
              </h1>
              <div class="card">
                <div class="card-body">
                  <label
                    for="id-change-password-old"
                    class="form-label w-100"
                  >
                    <strong>Stara lozinka</strong>
                    <br>
                    Upišite trenutnu lozinku
                  </label>
                  <input
                    id="id-change-password-old"
                    class="form-control"
                    type="password"
                  >
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <label
                    for="id-change-password-new-1"
                    class="form-label w-100"
                  >
                    <strong>Nova lozinka</strong>
                    <br>
                    Upišite novu lozinku
                  </label>
                  <input
                    id="id-change-password-new-1"
                    class="form-control"
                    type="password"
                  >
                  <label
                    for="id-change-password-new-2"
                    class="form-label w-100"
                  >
                    <!-- <strong>Nova lozinka</strong> -->
                    <br>
                    Ponovno upišite novu lozinku
                  </label>
                  <input
                    id="id-change-password-new-2"
                    class="form-control"
                    type="password"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Ostalo
              </h1>
              <div class="card">
                <div class="card-body">
                  <label class="form-check m-0">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      checked
                    >
                    <span class="form-check-label">Korisnici mogu birati radnika</span>
                  </label>
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
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6">
              <h1 class="h3 mb-3">
                Boje i tema
              </h1>
              <div class="card">
                <div class="card-body">
                  <fieldset class="mb-3">
                    <label class="form-label w-100">
                      <strong>Odabir pozadinskog osvjetljenja</strong>
                      <br>
                      Odaberite pozadinsko osjetljenje
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-color-mode"
                        type="radio"
                        class="form-check-input"
                        checked
                      >
                      <span class="form-check-label">Light mode (zadano)</span>
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-color-mode"
                        type="radio"
                        class="form-check-input"
                      >
                      <span class="form-check-label">Dark mode</span>
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-color-mode"
                        type="radio"
                        class="form-check-input"
                        disabled
                      >
                      <span class="form-check-label">High contrast</span>
                    </label>
                  </fieldset>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <fieldset class="mb-3">
                    <label class="form-label w-100">
                      <strong>Odabir boje elemenata</strong>
                      <br>
                      Odaberite akcentnu boju za neke od elemenata na stanici
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-main-color"
                        type="radio"
                        class="form-check-input"
                        checked
                      >
                      <span class="form-check-label">Crno-bijelo (zadano)</span>
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-main-color"
                        type="radio"
                        class="form-check-input"
                      >
                      <span class="form-check-label">Orchid</span>
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-main-color"
                        type="radio"
                        class="form-check-input"
                      >
                      <span class="form-check-label">Coral</span>
                    </label>
                    <label class="form-check">
                      <input
                        name="radio-main-color"
                        type="radio"
                        class="form-check-input"
                      >
                      <span class="form-check-label">Goldenrod</span>
                    </label>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Dashboard>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Dashboard from '@/components/layout/Dashboard.vue';

export default defineComponent({
  components: {
    Dashboard,
  },

  setup() {
    const inputFileText = ref('Choose a file...');

    function setInputFileText(event: any) {
      inputFileText.value = event.target.files[0].name;
    }

    return {
      inputFileText,
      setInputFileText,
    };
  },
});
</script>
