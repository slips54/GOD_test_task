<template>
  <div class="free-pass_page div_100">
    <free-pass>
      <template #free-pass-bg>
        <div class="free-pass-container_bg div_100"></div>
      </template>
      <template #free-pass-content>
        <h2>FREE PASS</h2>
        <p>Play Season VII: Wolves of Ragnarok for FREE, no purchase required!</p>
        <hr>
        <p>Includes access to 50+ Tiers of Free rewards</p>
        <hr>
        <p>Unlock a new weapon skin, a player title, siege weapons, and lots more</p>
        <img src="/icons/freepass.svg" alt="">
      </template>
    </free-pass>
  </div>
</template>

<script>

import FreePass from '@/components/FreePass.vue';

export default {
  components: {
    FreePass
  }
}

</script>
