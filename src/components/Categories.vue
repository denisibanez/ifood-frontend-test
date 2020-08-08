<template>
  <b-card-group deck>
    <b-card header="Categories">
      <b-list-group>
        <b-list-group-item v-for="(item, key) in categories" :key="key">
          {{ item }}
        </b-list-group-item>
      </b-list-group>

      <p class="card-text mt-2">
        {{ fakeText }}
      </p>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: 'categories',

  props: {
    fakeText: {
      default: 'Simple text'
    },
    categories: {
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>