<template>
  <div class="funnel-wrapper" ref="target">
    <section
      class="funnel"
      @click="open = !open"
      :class="[checkedFunnels.length > 0 ? 'funnel--blue' : null]"
    >
      <span v-if="itemNames.length == 0">Etapa do Funil:</span>
      <span v-else-if="itemNames.length <= 2">
        <span v-for="item in itemNames" :key="item" class="funnel__names">{{ item }}</span>
      </span>
      <span v-else>
        <span>{{ itemNames.length }} funis selecionados</span>
      </span>
    </section>

    <section class="funnel__list" v-show="open">
      <div class="funnel__search-wrapper">
        <div class="funnel__icon">
          <Icon icon="lupa2" />
        </div>
        <input
          type="text"
          class="funnel__search-input"
          placeholder="Pesquisar"
          v-model="funnelSearch"
        />
      </div>

      <div class="funnel__options">
        <div class="funnel__not-found" v-show="!itemsSelectFiltered.length">
          <span>Nenhuma tag encontrada.</span>
        </div>

        <div class="funnel__set" v-for="item in itemsSelectFiltered" :key="item.id">
          <div class="funnel__type">
            <span>{{ item.name }}</span>
          </div>

          <div
            class="funnel__single-item"
            v-for="funnel in item.steps"
            :key="funnel.id"
          >
            <label>
              <input
                type="checkbox"
                class="funnel__input"
                v-model="checkedFunnels"
                :value="funnel.id"
                @change="getNameItem(funnel.name, funnel.id); emit('sendFunnels', checkedFunnels);"
              />
              {{ funnel.name }}
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Icon from "./icon-component.vue";
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { fetchFunnels } from "../functions/requests";

// eslint-disable-next-line 
const emit = defineEmits(["sendFunnels"]);

// LOCAL STATE
const data = fetchFunnels();
const target = ref(null);
const open = ref(false);
const funnelSearch = ref("");
const checkedFunnels = ref<Array<string>>([]);
const itemNames = ref<Array<string>>([]);

// COMPUTED

const itemsSelectFiltered = computed(() => {
  let funnels = data.value;

  funnels = funnels.filter((item) => {
    const pluck = <T extends Record<string, unknown>>(
      objs: T[],
      property: keyof T
    ): T[keyof T][] => objs.map((obj) => obj[property]);

    const result = pluck(item.steps, "name");

    let tt = false;
    result.forEach((item: string) => {
      if (item.toLowerCase().indexOf(funnelSearch.value.toLowerCase()) > -1) {
        tt = true;
      }
    });

    return tt;
  });

  return funnels;
});

// FUNCTIONS
function getNameItem(nome: string, id: string) {
  if (checkedFunnels.value.includes(id)) {
    itemNames.value.push(nome);
  } else {
    itemNames.value.splice(itemNames.value.indexOf(nome), 1);
  }
}

const clearFunnelInput = () => {
  checkedFunnels.value = []
  itemNames.value = [] 
};
// eslint-disable-next-line
defineExpose({ clearFunnelInput });


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
  white-space: nowrap;
  overflow: hidden;

  &--blue {
    background-color: #ccdbfd;
    border-color: #abc4ff;
  }

  &__names {
    &:not(:first-child) {
      margin-inline-start: 8px
    }
  }

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

  &__not-found {
    text-align: center;
    font-size: 12px;
    margin-block-start: 15px;
  }

  &__input {
    accent-color: #1ba779;
  }
}
</style>
