<template>
  <div>
    <!-- Loader -->
    <b-container 
      fluid
      v-if="loading">
      <b-row 
        style="padding:20%">
        <b-col xl="12">
          <loader></loader>
        </b-col>
      </b-row>
    </b-container>

    <b-container
      fluid
      v-else
      class="home-wrapper">
      <!-- Menu -->
      <b-row class="nav-wrapper justify-content-center">
        <navbar></navbar>
      </b-row> 
      
      <!-- Carrosel -->
      <b-row>
        <b-carousel
          id="carousel-no-animation"
          style="text-shadow: 0px 0px 2px #000"
          no-animation
          indicators
          img-width="1920"
          img-height="280"
        >
          <b-carousel-slide
            caption="Michael Jackson"
            :img-src="require('../assets/slider1.png')"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Drake"
            :img-src="require('../assets/slider2.png')"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Billie Eilish"
            :img-src="require('../assets/slider3.png')"
          ></b-carousel-slide>
        </b-carousel>
      </b-row>

      <!-- Body -->
      <b-row class="body-wrapper text-left justify-content-start">
        <b-col md="12" xl="10">
          <b-row class="body-top-wrapper">
            <!-- Title -->
            <b-col md="12" xl="4" class="mt-2">
              <h5>{{ albums.title.label }}</h5>
            </b-col>

            <!-- Sort Button -->
            <b-col md="12" xl="4" class="mt-2">
              <b-button-group size="md">
                <b-button
                  v-for="(btn, idx) in buttons"
                  :key="idx"
                  :class="{ 'active' : btn.state }"
                  @click="checkBtn(btn)"
                  variant="primary"
                >
                  {{ btn.caption }}
                </b-button>
              </b-button-group>
            </b-col>

            <!-- Search -->
            <b-col md="12" xl="4" class="mt-2">
              <b-nav-form>
                <b-input
                  size="md"
                  class="mr-md-2"
                  placeholder="Search..."
                  v-model="search">
                </b-input>
              </b-nav-form>
            </b-col>
          </b-row>

          <!-- Card Album -->
          <b-row class="album-wrapper">
            <b-col
              md="6"
              xl="4"
              class="mt-3 mb-3"
              v-for="(album, key) in searchByParam"
              :key="key">
              <b-card
                no-body
                class="overflow-hidden pointer"
                style="max-width: 540px;"
                v-b-modal.modalAlbumSelect
                @click="albumSelect = album">
                <b-row no-gutters>
                  <b-col md="12" xl="4">
                    <b-card-img
                      :src="album.imImg[2].label"
                      alt="Image"
                      class="img-170 rounded-0">
                    </b-card-img>
                  </b-col>
                  <b-col md="12" xl="8">
                    <b-card-body
                      :title="album.title.label">
                      <b-card-text>
                        <strong>Category: </strong>
                        {{ album.category.attributes.label}}
                      </b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>

          <!-- Alert Not Found -->
          <b-alert 
            show
            variant="dark"
            v-if="!searchByParam.length">
            Sorry, not found album. :(
          </b-alert>
        </b-col>

        <!-- Categories -->
        <b-col md="12" xl="2">
          <categories
            :categories="categories"
            :fakeText="fakeText">
          </categories>
        </b-col>
      </b-row>

      <!-- Footer -->
      <footer-component></footer-component>

      <!-- Modal -->
      <div v-if="albumSelect"> 
        <b-modal id="modalAlbumSelect" :title="albumSelect.title.label" hide-footer>
          <b-row>
            <b-col xl="4">
              <img 
                :src="albumSelect.imImg[2].label"
                :alt="albumSelect.title.label"
                class="primary">
            </b-col>

            <b-col xl="8">
              <h5>{{ albumSelect.title.label }}</h5>
              <h6>{{ albumSelect.imRelease.attributes.label }} </h6>
              <p> Favorite
                <b-icon-heart
                  v-if="!fav"
                  @click="setFav(true)">
                </b-icon-heart>
                <b-icon-heart-fill 
                  v-else
                  @click="setFav(false)">
                </b-icon-heart-fill>
              </p>
              <p>
                <strong>
                  {{ albumSelect.imPrice.label }}
                </strong>
              </p>

              <p style="font-size:12px">
                {{ albumSelect.rights.label }}
              </p>

              <div class="action-content">
                <a 
                  class="btn-primary btn"
                  :href="albumSelect.link.attributes.href">
                    Preview  
                </a>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <div class="mt-3">
                <h5>Description</h5>
                <p>{{ fakeText }}</p>
              </div>
            </b-col>
          </b-row>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AlbumService from '@/services/album-service'

import Navbar from '@/components/Menu'
import Loader from '@/components/Loader'
import Categories from '@/components/Categories'
import FooterComponent from '@/components/Footer'

export default {
  name: 'Home',

  components: {
    Navbar,
    FooterComponent,
    Loader,
    Categories
  },

  data () {
    return {
      loading: true,
      fav: false,
      search: null,
      categories: [],
      buttons: [
        { key: 'new', caption: 'New Music', state: true },
        { key: 'old', caption: 'Old Music', state: false }
      ],
      albumSelect: null,
      fakeText: 'Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur mollit voluptate est in duis laboris ad sit ipsum anim Lorem.'
    }
  },

  computed: {
    ...mapGetters({
      albums: 'albums'
    }),

    searchByParam() {
      if(this.albums.entry && this.search) {
        let items = []
        this.albums.entry.filter(item => {
          const _self = this
          let contains = item.title.label.toLowerCase().includes(_self.search.toLowerCase())
          if(contains) items.push(item)
        })  
        return items
      } else {
        return this.albums.entry
      }
    },
  },

  created() {
    this.albumService = new AlbumService()
    this.getAlbums()
  },

  methods: {
    ...mapActions({
      setAlbum: 'setAlbum'
    }),

    getAlbums() {
      const param = '100/json'
      this.albumService.getAlbums(param).then((response) => {
        let data = JSON.stringify(response.data.feed)
        data = data.replace(/im:image/g, 'imImg')
        data = data.replace(/im:releaseDate/g, 'imRelease')
        data = data.replace(/im:price/g, 'imPrice')
        
        this.setAlbum(JSON.parse(data))
        this.loading = false
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.sortByNew()
        this.mapCategorys(this.albums)
      })
    },

    mapCategorys(items) {
      items.entry.map((item) => {
        this.categories.push(item.category.attributes.label)
      })

      const setUnic = new Set(this.categories)
      this.categories = [...setUnic]
    },

    checkBtn(btn) {
      this.buttons.map((item) => {
        item.state = (item.caption === 'btn.caption') ? true : false
      })

      if(btn.key == 'old') this.sortByOld()
      else this.sortByNew()
    },

    sortByOld() {
      this.albums.entry = this.albums.entry.sort((a, b) => new Date(a.imRelease.label) - new Date(b.imRelease.label))
    },

    sortByNew() {
      this.albums.entry = this.albums.entry.sort((a, b) => new Date(b.imRelease.label) - new Date(a.imRelease.label))
    },

    setFav(param) {
      this.fav = param
    }
  }
}
</script>

<style  lang="scss">
.home-wrapper {

  .nav-wrapper {
    height: 45px;
    background: #343a40;
  }

  .body-wrapper {
    padding: 30px 15px;

    .body-top-wrapper {
      margin: 15px 0;
      h5 {
        text-align: left;
      }
    }

    .card {
      text-align: left;

      &.pointer {
        cursor: pointer;
      }

      .card-body {
        padding: 1rem;

        .img-170 {
          max-width: 170px;
        }

        .card-title {
          font-size: 12px;
          font-weight: bold;
        }

        .card-text {
          font-size: 10px;
          margin: 0;
        }

        .card-link {
          font-size: 14px;
        }
      }

      .card-header {
        background-color: rgb(50,50,50);
        color: #ffffff;
      }

      .list-group {
        .list-group-item {
          font-size:12px;
          padding: 5px;
          cursor: pointer;

          &:hover {
            background-color: rgb(50,50,50);
            color: #ffffff;
          }
        }
      }
    }
  }
}

#modalAlbumSelect {
  img {
    &.primary {
      border-radius: 5px;
      width: 100%;
    }
  }

  .btn-primary {
    background-color: #ffffff;
    border: 1px solid rgb(50,50,50);
    color:rgb(50,50,50);

    &.active, &:hover, &:focus {
      background-color:rgb(50,50,50);
      border: 1px solid rgb(50,50,50);
      color:#ffffff;
    }
  }
}
@media(max-width:575px) {
  .carousel-caption {
    display: none;
  }
}
</style>
