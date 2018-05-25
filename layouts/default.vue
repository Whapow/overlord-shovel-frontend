<template lang='pug'>
  div
    .navbar
      span
        router-link(to="/")
          h2.title() Overlord Shovel
        .right
          router-link(to="/login") Login
    .container      
      nuxt
</template>

<style lang="css" scoped>
  .navbar {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    background-color: grey;
    height: 4rem;
  }
  .container {
    position: absolute;
    top: 5rem
  }
  .right {
    position: absolute;
    top: 0rem;
    right: 0px;
    padding: 1rem
  }
  .title {
    padding-left: 1rem
  }
</style>