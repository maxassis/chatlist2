<template>
  <div class="container">

      <section class="search-box">
        <button class="search-box__search">
          <img src="../assets/lupa.svg" />
          <span>Pesquisar mensagem</span>
        </button>
        <button class="search-box__add">
          <img src="../assets/user-plus.svg" />
        </button>
      </section>

      <section class="form">
        <input class="form__name input" type="text" placeholder="nome" v-model="name" />
        <select class="input form__phone" v-model="phone">
          <option value="1">Aparelho</option>
          <option>teste1</option>
          <option>teste2</option>
        </select>
        <input v-model="whatsNumber" type="texte" class="input" placeholder="Número Whatsapp" />

        <div>
          <Tags />
        </div>

      </section>
  </div>
 
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tags from './components/tags-component.vue'

const name = ref("")
const phone = ref("")
const whatsNumber = ref("")

</script>

<style lang="scss" scoped>

.container {
  inline-size: 100%;
  block-size: 100dvh;
  background-color: pink;
}

.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  block-size: 40px;
  background-color: #ededed;
  padding-inline: 10px;

  &__search {
    max-inline-size: 167px;
    block-size: 29px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
    gap: 3px;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #e2e6ea;
    }

    >img {
      inline-size: 21px;
    }

    >span {
      font-size: 12px
    }
  } 

  &__add {
    padding: 5px 10px;
    border-radius: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      background-color: #e2e6ea;
      padding-inline: 15px;
    }
  }
}

.form {
  display: grid;
  gap: 4px;
  block-size: 294.6px;
  padding: 12px;
  background-color: #f6f6f6;

  
}





.input {
  border: 1.6px solid #dfe1e5;
  border-radius: 7px;
  inline-size: 100%;
  block-size: 28.8px;
  font-size: 12px;
  padding-inline-start: 15px;
  background-color: #fff;
}



</style>
