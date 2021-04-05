<template>
  <div>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row text-muted align-items-center">
          <div class="col-md-9">
            <div class="text-start">
              <div class="list-inline d-flex align-items-center me-4">
                <div class="list-inline-item">
                  <div class="round-button-wrap">
                    <router-link
                      to="/pomoc"
                      class="round-button has-shadow"
                    >
                      <span class="o-background-wrap o-ratio">
                        <span class="o-background is-white" />
                        <span class="o-background is-secondary anim-hover" />
                        <span class="o-front">
                          <span class="round-button__label">?</span>
                        </span>
                      </span>
                    </router-link>
                  </div>
                </div>
                <ul class="list-group">
                  <li class="list-inline-item me-4">
                    <a
                      class="text-muted"
                      href="/privatnost"
                    >Izjava o privatnosti</a>
                  </li>
                  <li class="list-inline-item me-4">
                    <a
                      class="text-muted"
                      href="/uvjeti"
                    >Uvjeti korištenja</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3 mt-4">
            <div class="text-end">
              <p class="mb-0">
                &copy; 2021 - <a
                  href="/"
                  class="text-muted"
                >Dolazim.hr</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.round-button-wrap {
  position: relative;
  z-index: 1;
  margin-right: 0.5rem;
}
.round-button {
  display: block;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 9999px;
  width: 3rem;
  overflow: hidden;
  color: black;
  font-size: 1.5rem;
  transition: color 0.2s cubic-bezier(0.4, 0, 0, 1);

  &:hover {
    color: white;
  }

  &.has-shadow {
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.1);
  }
}

.o-background-wrap {
  position: relative;
  z-index: 0;
}
.o-background {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: -1;

  &.is-white {
    background-color: white;
  }
  &.is-secondary {
    background-color: #495057;
    border-radius: 9999px;
    transition: color 0.2s cubic-bezier(0.4, 0, 0, 1);
  }
  &.anim-hover {
    transform: scale(0);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0, 1);
    .round-button:hover & {
      transform: scale(1);
    }
  }
}

.o-front {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.o-ratio {
  position: relative;
  display: block;
  overflow: hidden;

  &:before {
    display: block;
    padding-bottom: 100%; /* [1] */
    width: 100%;
    content: '';
  }
}

.o-ratio_content,
.o-ratio > img,
.o-ratio > iframe,
.o-ratio > embed,
.o-ratio > object {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  // height: 100%;
}
</style>
