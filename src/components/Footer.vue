<template>
  <b-row class="footer-wrapper mt-5">
    <b-col xl="12">
      <b-row class="d-flex justify-content-xl-start">
        <b-col xl="12">
          <p>Copyright © 2020 <a href="https://www.linkedin.com/in/denis-ibanez/">Denis Ibanez</a>. Todos os direitos reservados.</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'footer-component',
}
</script>

<style lang="scss">
  .footer-wrapper{
    background-color: rgb(50,50,50);
    padding: 15px;

    p {
      color:#f5f5f7;
      opacity: .56;
      text-align: left;
      font-size: 12px;
      margin: 0;
    }

    a {
      color:#ffffff;
    }
  }
</style>