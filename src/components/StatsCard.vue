<template>
  <card class="card-stats" :show-footer-line="true">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0" v-if="title">{{title}}</h5>
          <span class="mb-0 text-color-gray" style="font-size:18px" v-if="rupee">₹ </span>
          <span class="h2 font-weight-bold mb-0">{{subTitle}}</span>
        </slot>
      </div>

      <div class="col-auto" v-if="$slots.icon || icon">
        <slot name="icon">
          <div class="icon icon-shape text-white rounded-circle shadow"
               :class="[`bg-${type}`, iconClasses]">
            <slot><font-awesome-icon :icon="['fas', `${icon}`]" color="white" class="mx-2"/></slot>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">

      </slot>
    </p>
  </card>
</template>
<script>
import Card from './Card.vue'

// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCreditCard, faCoins, faReceipt, faWallet } from '@fortawesome/free-solid-svg-icons'
library.add(faCreditCard, faCoins, faReceipt, faWallet)

export default {
  name: 'stats-card',
  components: {
    Card
  },
  props: ['type', 'icon', 'title', 'subTitle', 'rupee', 'iconClasses']
}
</script>
<style></style>
