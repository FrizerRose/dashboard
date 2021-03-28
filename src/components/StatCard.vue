<template>
  <div class="card flex-fill">
    <div class="card-body py-3">
      <div class="d-flex align-items-start">
        <div class="flex-grow-1">
          <label class="responsive-form-label w-100">
            <span class="responsive-form-label__bolder">{{ title }}</span>
          </label>
          <h1 class="mb-2">
            {{ figure }} <span v-if="isRevenue">kn</span>
          </h1>

          <div
            v-if="percentage"
            class="mb-0"
          >
            <span
              :class="{'badge': true, 'badge-soft-danger': percentage < 100,'badge-soft-success': percentage > 0, 'me-2' : true}"
            > <i class="mdi mdi-arrow-bottom-right" /> {{ percentage }}% </span>

            <label
              v-if="percentage < 100"
              class="text-muted"
            >Od prošlog tjedna</label>
            <label
              v-else
              class="text-muted"
            >Rast od prošlog tjedna</label>
          </div>
        </div>
        <div class="d-inline-block ms-3">
          <div class="stat">
            <div class="stat-icon-wrap">
              <span
                v-if="isRevenue"
                class="stat-icon"
              >
                <i class="align-middle fas fa-fw fa-dollar-sign" />
              </span>
              <span
                v-else
                class="stat-icon"
              >
                <i class="align-middle fas fa-fw fa-calendar-plus" />
              </span>
            </div>
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

<style lang="scss" scoped>
.stat-icon-wrap {
  position: relative;
  height: 100%;
}
.stat-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  line-height: 1;
}
</style>
