<template>
  <div>
    <h4>input za mail + button</h4>
    <div class="o-layout -gutter || u-text-center">
      <div class="o-layout_item || o-wysiwyg">
        <a @click.prevent="goToLogin()">Login</a>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    function goToLogin() {
      router.push('/login');
    }

    return {
      goToLogin,
    };
  },
});
</script>

<style scoped lang='scss'>

</style>
