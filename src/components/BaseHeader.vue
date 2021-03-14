<template>
  <!--<div class="header" :class="{[`bg-${type}`]: type}">-->
  <div id="nav-div" class="header bg-blue hover">
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
  name: 'base-header'
}
</script>
<style>
</style>
