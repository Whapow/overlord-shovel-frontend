<template lang='pug'>
  div
    nav.navbar.navbar-expand.navbar-dark.bg-dark.justify-content-between.mb-3
      router-link.navbar-brand(to="/") Overlord Shovel
      
      ul.navbar-nav
        li.nav-item.active
          router-link.nav-link(to="/login") Sign in
    .container      
      nuxt
</template>

<style lang="scss" scoped>

  // .navbar {
  //   position: absolute;
  //   top: 0px;
  //   left: 0px;
  //   width: 100%;
  //   background-color: grey;
  //   height: 4rem;
  // }
  // .container {
  //   position: absolute;
  //   top: 5rem
  // }
  // .right {
  //   position: absolute;
  //   top: 0rem;
  //   right: 0px;
  //   padding: 1rem
  // }
  // .title {
  //   padding-left: 1rem
  // }
</style>