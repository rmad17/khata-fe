<template>
  <div class="header" :class="{[`bg-${type}`]: type}">
    <link href="https://fonts.googleapis.com/css?family=Lato|Source+Sans+Pro&display=swap" rel="stylesheet">
    <div class="container-fluid">
      <div class="header-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'base-header',
  props: {
    type: {
      type: String,
      default: 'primary',
      description: 'Header background type'
    }
  }
}
</script>
<style>
</style>
