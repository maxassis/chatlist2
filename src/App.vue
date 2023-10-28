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
      <input
        class="form__name input"
        type="text"
        placeholder="nome"
        v-model="fields.name"
      />
      <select class="input form__phone" v-model="fields.phone">
        <option value>Aparelho:</option>
        <option v-for="device in devices" :key="device.id" :value="device.id">
            {{ device.description }}
        </option>
      </select>
      <input
        v-model="fields.whatsNumber"
        type="texte"
        class="input"
        placeholder="Número Whatsapp"
      />

      <div class="form__tags-wrapper">
        <Tags @sendTags="incomingTags" />
        <select class="input" v-model="fields.allTags">
          <option>teste</option>
          <option>teste2</option>
        </select>
      </div>

      <div class="form__departments-wrapper">
        <Department @sendDepartments="incomingDepartments" />
        <select class="input" v-model="fields.allDpt">
          <option>teste</option>
          <option>teste2</option>
        </select>
      </div>

      <div class="form__funnel-wrapper">
        <Funnel />
      </div>

      <div class="select__wrapper">
        <div class="select__single-item">
          <img src="../assets/mail.svg" class="select__mail-icon" />
          <input type="checkbox" v-model="fields.newMessages" />
        </div>
        <div class="select__single-item">
          <img src="../assets/image.svg" class="select__mail-icon" />
          <input type="checkbox" v-model="fields.archiveSearch" />
        </div>
        <div class="select__single-item">
          <img src="../assets/transmission.svg" class="select__mail-icon" />
          <input type="checkbox" v-model="fields.broadcastSearch" />
        </div>
        <div class="select__single-item">
          <img src="../assets/star.svg" class="select__mail-icon" />
          <input type="checkbox" v-model="fields.favoritedSearch" />
        </div>
        <div class="select__single-item">
          <img src="../assets/clock.svg" class="select__mail-icon" />
          <input type="checkbox" v-model="fields.scheduledSearch" />
        </div>
      </div>
    </section>

    <section class="list__wrapper">
      <div class="list__hidden-list">
        <span>Esconder filtros</span>
      </div>

      <div class="list__count">
        <span>Exibindo 52 resultados: </span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Tags from "./components/tags-component.vue";
import Department from "./components/department-component.vue";
import Funnel from "./components/funnel-component.vue";
import type { checkedDptItems, fieldsTypes } from "./types";
import { fetchDevices } from './functions/requests'

// LOCAL STATE
const fields = reactive<fieldsTypes>({
  name: "",
  phone: "",
  allTags: "",
  allDpt: "",
  whatsNumber: "",
  tags: [],
  departments: { users: [], groups: [], noDelegated: false },
  newMessages: false,
  archiveSearch: false,
  broadcastSearch: false,
  favoritedSearch: false,
  scheduledSearch: false,
});
const devices = fetchDevices()


// FUNCTIONS 
function incomingTags(tags: Array<string>) {
  fields.tags = tags;
}
function incomingDepartments(departments: checkedDptItems) {
  fields.departments = departments;
}
</script>

<style lang="scss" scoped>
.container {
  inline-size: 100%;
  block-size: 100dvh;
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

    > img {
      inline-size: 21px;
    }

    > span {
      font-size: 12px;
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

  &__tags-wrapper {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 70% 30%;
  }

  &__departments-wrapper {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 70% 30%;
  }
}

.input {
  border: 1.6px solid #dfe1e5;
  border-radius: 7px;
  inline-size: 100%;
  block-size: 28.8px;
  font-size: 12px;
  padding-inline-start: 15px;
  background-color: #fff;
  &::placeholder {
    color: black;
    opacity: 1;
  }
}

.select {
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-start: 6.4px;
    gap: 1px;
  }

  &__single-item {
    max-inline-size: 55.2px;
    inline-size: 100%;
    block-size: 35.4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17.6px;
    gap: 5.5px;
    background-color: #fff;
    border-radius: 7px;
    border: 1.6px solid #dfe1e5;
    accent-color: #1ba779;
  }

  &__mail-icon {
    inline-size: 18px;
  }
}

.list {
  &__wrapper {
    block-size: 100%;
  }

  &__hidden-list {
    inline-size: 100%;
    block-size: 27px;
    border-block-end: 1.6px solid #dfe1e5;
    border-block-start: 1.6px solid #dfe1e5;
    font-size: 12px;
    font-weight: 600;
    background-color: #fff;
  }

  &__count {
    display: flex;
    align-items: center;
    block-size: 35px;
    padding-inline-start: 16px;
    font-size: 11px;
    background-color: #fff;
  }
}
</style>
