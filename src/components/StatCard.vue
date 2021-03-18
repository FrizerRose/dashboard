<template>
  <div class="card flex-fill">
    <div class="card-body py-4">
      <div class="d-flex align-items-start">
        <div class="flex-grow-1">
          <h3 class="mb-2">
            {{ figure }} <span v-if="isRevenue">kn</span>
          </h3>

          <p
            class="mb-2"
          >
            {{ title }}
          </p>

          <div
            v-if="percentage"
            class="mb-0"
          >
            <span
              :class="{'badge': true, 'badge-soft-danger': percentage < 100,'badge-soft-success': percentage > 0, 'me-2' : true}"
            > <i class="mdi mdi-arrow-bottom-right" /> {{ percentage }}% </span>
            <span class="text-muted">Od prošlog tjedna</span>
          </div>
        </div>
        <div class="d-inline-block ms-3">
          <div class="stat">
            <i
              v-if="isRevenue"
              class="align-middle text-danger ronikMoneyIkona"
              data-feather="shopping-bag"
            />
            <i
              v-else
              class="align-middle text-danger ronikNarudzbeIkona"
              data-feather="shopping-bag"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    figure: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: false,
      default: 0,
    },
    isRevenue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
