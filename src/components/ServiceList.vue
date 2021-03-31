<template>
  <div class="row">
    <div class="col-xl-8">
      <div class="card">
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
            Popis svih usluga
          </h5>
        </div>
        <div class="card-body">
          <table
            id="datatables-clients"
            class="table table-striped"
            style="width:100%"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Company</th>
                <th>E-mail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
              <ServiceListItem />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ServiceListItem from './ServiceListItem.vue';

export default defineComponent({
  components: {
    ServiceListItem,
  },
});
</script>
