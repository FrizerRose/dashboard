<template>
  <div class="card flex-fill w-100">
    <div class="card-header">
      <div class="card-actions float-right">
        <div class="dropdown show">
          <a
            href="#"
            data-toggle="dropdown"
            data-display="static"
          >
            <i
              class="align-middle"
              data-feather="more-horizontal"
            />
          </a>

          <div class="dropdown-menu dropdown-menu-right">
            <a
              class="dropdown-item"
              href="#"
            >Action</a>
            <a
              class="dropdown-item"
              href="#"
            >Another action</a>
            <a
              class="dropdown-item"
              href="#"
            >Something else here</a>
          </div>
        </div>
      </div>
      <h5 class="card-title mb-0">
        Sales / Revenue
      </h5>
    </div>
    <div class="card-body d-flex w-100">
      <div class="align-self-center chart chart-lg">
        <canvas id="chartjs-dashboard-bar" />
      </div>
    </div>
  </div>
</template>
