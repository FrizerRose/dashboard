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
        Weekly sales
      </h5>
    </div>
    <div class="card-body d-flex">
      <div class="align-self-center w-100">
        <div class="py-3">
          <div class="chart chart-xs">
            <canvas id="chartjs-dashboard-pie" />
          </div>
        </div>

        <table class="table mb-0">
          <thead>
            <tr>
              <th>Source</th>
              <th class="text-right">
                Revenue
              </th>
              <th class="text-right">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><i class="fas fa-square-full text-primary" /> Direct</td>
              <td class="text-right">
                $ 2602
              </td>
              <td class="text-right text-success">
                +43%
              </td>
            </tr>
            <tr>
              <td><i class="fas fa-square-full text-warning" /> Affiliate</td>
              <td class="text-right">
                $ 1253
              </td>
              <td class="text-right text-success">
                +13%
              </td>
            </tr>
            <tr>
              <td><i class="fas fa-square-full text-danger" /> E-mail</td>
              <td class="text-right">
                $ 541
              </td>
              <td class="text-right text-success">
                +24%
              </td>
            </tr>
            <tr>
              <td><i class="fas fa-square-full text-dark" /> Other</td>
              <td class="text-right">
                $ 1465
              </td>
              <td class="text-right text-success">
                +11%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
