<template>
  <div class="card flex-fill">
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
        Calendar
      </h5>
    </div>
    <div class="card-body d-flex">
      <div class="align-self-center w-100">
        <div class="chart">
          <div id="datetimepicker-dashboard" />
        </div>
      </div>
    </div>
  </div>
</template>
