<template>
  <b-navbar type="dark" variant="dark" toggleable="md">
    <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
    <b-navbar-brand class="d-none d-xl-block">
      <img src="https://www.apple.com/ac/globalnav/5/pt_BR/images/globalnav/apple/image_large.svg" alt="logo">
    </b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          :active="nav.active" 
          v-for="(nav, key) in navs"
          :key="key">
            {{ nav.value }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',

  data() {
    return {
      navs: [ 
        { active:false, value: 'Best Album' },
        { active:false, value: 'Library' },
        { active:false, value: 'For You' },
        { active:false, value: 'Radio' },
        { active:false, value: 'Browse' }
      ],
    }
  }

}
</script>

<style lang="scss" >
.nav-wrapper{ 
  .navbar {
    padding: 0;
    .navbar-brand{
      padding: 0;

      a {
        padding: 0;
      }
    }

    .navbar-toggler {
      border: 0;
    }

    .nav-link {
      color: #f5f5f7;
      font-size: 14px;
      padding: 0rem 3rem;

      &:hover {
        color: #f5f5f7;
      }

      &.active {
        color: #f5f5f7;
        opacity: .56;
      }
    }
  }
}

@media(max-width:575px) {
  .navbar {
    width: 100%;
      .navbar-collapse {
        background: #343a40;
        width: 100%;
        z-index: 9999;
      }

      .navbar-nav {
        padding-top: 15px;
        
        .nav-item {
          padding: 15px;
          border-top: 1px solid #cccccc;
        }
      }
  }
}
</style>