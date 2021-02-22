<template>
  <div class="card flex-fill">
    <div class="card-header">
      <div class="card-actions float-end">
        <div class="dropdown show">
          <a
            href="#"
            data-bs-toggle="dropdown"
            data-display="static"
          >
            <i
              class="align-middle"
              data-feather="more-horizontal"
            />
          </a>

          <div class="dropdown-menu dropdown-menu-end">
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
        Latest Projects
      </h5>
    </div>
    <table
      id="datatables-dashboard-projects"
      class="table table-striped my-0"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th class="d-none d-xl-table-cell">
            Start Date
          </th>
          <th class="d-none d-xl-table-cell">
            End Date
          </th>
          <th>Status</th>
          <th class="d-none d-md-table-cell">
            Assignee
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Project Apollo</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-success">Done</span></td>
          <td class="d-none d-md-table-cell">
            Carl Jenkins
          </td>
        </tr>
        <tr>
          <td>Project Fireball</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-danger">Cancelled</span></td>
          <td class="d-none d-md-table-cell">
            Bertha Martin
          </td>
        </tr>
        <tr>
          <td>Project Hades</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-success">Done</span></td>
          <td class="d-none d-md-table-cell">
            Stacie Hall
          </td>
        </tr>
        <tr>
          <td>Project Nitro</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-warning">In progress</span></td>
          <td class="d-none d-md-table-cell">
            Carl Jenkins
          </td>
        </tr>
        <tr>
          <td>Project Phoenix</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-success">Done</span></td>
          <td class="d-none d-md-table-cell">
            Bertha Martin
          </td>
        </tr>
        <tr>
          <td>Project X</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-success">Done</span></td>
          <td class="d-none d-md-table-cell">
            Stacie Hall
          </td>
        </tr>
        <tr>
          <td>Project Romeo</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-success">Done</span></td>
          <td class="d-none d-md-table-cell">
            Ashley Briggs
          </td>
        </tr>
        <tr>
          <td>Project Wombat</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-warning">In progress</span></td>
          <td class="d-none d-md-table-cell">
            Bertha Martin
          </td>
        </tr>
        <tr>
          <td>Project Zircon</td>
          <td class="d-none d-xl-table-cell">
            01/01/2018
          </td>
          <td class="d-none d-xl-table-cell">
            31/06/2018
          </td>
          <td><span class="badge bg-danger">Cancelled</span></td>
          <td class="d-none d-md-table-cell">
            Stacie Hall
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
