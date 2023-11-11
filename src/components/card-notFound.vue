<template>
  <main class="noCard__container">
    <div class="noCard__smile">
      <Vue3Lottie :animationData="smile" />
    </div>

    <span class="noCard__text" style="margin-block-end: 8px;">Nenhum chat foi encontrado.</span>
    <span class="noCard__text">Dica: Verifique se o chat encontra-se arquivado clicando em "Arquivados".</span>
  </main>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import smile from "../../assets/smile3.json";
</script>

<style lang="scss" scoped>

.cg-chatlist {

.noCard {
  &__container {
    inline-size: 90%;
    margin-inline: auto;
    margin-block-start: 50px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    padding: 10px;
    border-radius: 7px;
  }

  &__smile {
    inline-size: 40px;
    margin-inline: auto;
    margin-block-end: 10px;
  }

  &__text {
    font-size: 12px;
    display: block;
    text-align: center;
    // font-weight: 500;  
  }

}

}


</style>
