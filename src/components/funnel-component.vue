<template>
  <div class="funnel-wrapper" ref="target">
    <section class="funnel" @click="open = !open">
      <span>Etapa do Funil:</span>
    </section>

    <section class="funnel__list" v-show="open">
      <div class="funnel__search-wrapper">
        <div class="funnel__icon">
          <img src="../../assets/lupa2.svg" />
        </div>
        <input
          type="text"
          class="funnel__search-input"
          placeholder="Pesquisar"
        />
      </div>

      <div class="funnel__options">
        <!-- <div class="funnel__not-found">
          <span>Nenhuma tag encontrada.</span>
        </div> -->

        <div class="funnel__set" v-for="item in data" :key="item.id">
          
          <div class="funnel__type">
            <span>{{ item.name }}</span>
          </div>

          <div
            class="funnel__single-item"
            v-for="funnel in item.steps"
            :key="funnel.id"
          >
            <label>
              <input type="checkbox" class="funnel__input " />
              {{ funnel.name }}
            </label>
          </div>

        </div>

      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { fetchFunnels } from "../functions/requests";

const data = fetchFunnels();
const target = ref(null);
const open = ref(false);

// fecha ao clicar fora
onClickOutside(target, () => (open.value = false));
</script>

<style lang="scss" scoped>
.funnel-wrapper {
  position: relative;
  block-size: 28.8px;
}

.funnel {
  display: flex;
  align-items: center;
  border: 1.6px solid #dfe1e5;
  border-radius: 7px;
  inline-size: 100%;
  block-size: 28.8px;
  font-size: 12px;
  padding-inline-start: 15px;
  background-color: #fff;
  cursor: pointer;

  &__list {
    position: absolute;
    max-inline-size: 250px;
    inline-size: 100%;
    block-size: 320px;
    background-color: #fff;
    inset-block-start: 36.8px;
    inset-inline-start: 9.6px;
    z-index: 1;
    border-radius: 9.6px;
    box-shadow: 0 40px 80px -19.2px rgba(0, 0, 0, 0.25);
    border: 0.8px solid #dee2e6;
    overflow: hidden;
  }

  &__search-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    block-size: 48px;
    background-color: #e5e5e5;
  }

  &__icon {
    background-color: #fff;
    display: flex;
    block-size: 33.6px;
    border-inline-end: 0;
    inline-size: 48px;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 96px;
    border-bottom-left-radius: 96px;

    > img {
      inline-size: 20px;
    }
  }

  &__search-input {
    inline-size: 65%;
    block-size: 33.6px;
    border-top-right-radius: 96px;
    border-bottom-right-radius: 96px;
    font-size: 13.6px;
    border-color: transparent;
    border-inline-start-width: 1.6px;
    border-inline-start-style: solid;
    border-inline-start-color: rgb(223, 225, 229);
    border-inline-start: none;
    outline: none;
  }

  &__single-item {
    display: flex;
    align-items: center;
    inline-size: 100%;
    block-size: 30px;
    border-block-end: 1.6px solid #f8f8ff;
    padding-inline-start: 15px;
    font-size: 12px;
  }

  &__type {
    display: flex;
    align-items: center;
    inline-size: 100%;
    block-size: 30px;
    padding-inline-start: 15px;

    span {
      font-weight: 800;
      font-style: italic;
      font-size: 14px;
    }
  }

  &__options {
    overflow: auto;
    block-size: 272px;
  }

  &__input {
    accent-color: #1ba779;
  }
}
</style>
