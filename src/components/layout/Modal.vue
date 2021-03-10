<template>
  <div
    id="exampleModalFullscreen"
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="exampleModalFullscreenLabel"
    style="display: block; padding-right: 17px;"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-xl modal-fullscreen-xl-down">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header" />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped lang='scss'>
  .add-new-row-wrap {
    position: relative;
  }
  .add-new-row {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1;
    width: 100%;
  }
  // .modal {
  //   transform: translateX(100%);
  //   transition: transform 0.5s cubic-bezier(0.4, 0, 0, 1);
  // }
  // .modal-open .modal {
  //   transform: none;
  // }
</style>
