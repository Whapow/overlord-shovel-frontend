<template lang='pug'>
  div
    nav.navbar.navbar-expand-lg.navbar-dark.bg-dark
      router-link.navbar-brand(to="/") Overlord Shovel
      button.navbar-toggler(type='button', data-toggle='collapse', data-target='#nav', aria-controls='navbarNavAltMarkup', aria-expanded='false', aria-label='Toggle navigation')
        span.navbar-toggler-icon
      
      #nav.collapse.navbar-collapse
        ul.navbar-nav.ml-auto
          li.nav-item.active
            router-link.nav-link(to="/login") Login
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