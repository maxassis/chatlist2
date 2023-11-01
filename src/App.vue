<template>
  <div class="container-chatlist">
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
        :class="{ 'input--blue': fields.name }"
        type="text"
        placeholder="nome"
        v-model="fields.name"
      />
      <select class="input form__phone" :class="{ 'input--blue': fields.phone }" v-model="fields.phone">
        <option value>Aparelho:</option>
        <option v-for="device in devices" :key="device.id" :value="device.id">
          {{ device.description }}
        </option>
      </select>
      <input
        v-model="fields.whatsNumber"
        type="texte"
        class="input"
        :class="{ 'input--blue': fields.whatsNumber }"
        placeholder="Número Whatsapp"
      />

      <div class="form__tags-wrapper">
        <Tags @sendTags="incomingTags" ref="TagComponent" />
        <select class="input" :class="{ 'input--blue': fields.allTags }" v-model="fields.allTags">
          <option value>Qualquer</option>
          <option value="and">Todas</option>
          <option value="ne">Não Tem</option>
        </select>
      </div>

      <div class="form__departments-wrapper">
        <Department @sendDepartments="incomingDepartments" ref="DptComponent" />
        <select class="input" :class="{ 'input--blue': fields.allDpt }" v-model="fields.allDpt">
          <option value>Qualquer</option>
          <option value="and">Todas</option>
          <option value="ne">Não Tem</option>
        </select>
      </div>

      <div class="form__funnel-wrapper">
        <Funnel @sendFunnels="incomingFunnels" ref="FunnelComponent" />
      </div>

      <div class="form__status-wrapper">
        <select
          class="input"
          :class="{ 'input--blue': fields.status }"
          style="padding-inline-start: 11px"
          v-model="fields.status"
        >
          <option value>Status:</option>
          <option value="ABERTO">ABERTO</option>
          <option value="EM ATENDIMENTO">EM ATENDIMENTO</option>
          <option value="AGUARDANDO">AGUARDANDO</option>
          <option value="RESOLVIDO">RESOLVIDO</option>
          <option value="FECHADO">FECHADO</option>
          <option value="INDEFINIDO">INDEFINIDO</option>
        </select>

        <select class="input" :class="{ 'input--blue': fields.date }" v-model="fields.date">
          <option value>Ordenar Por</option>
          <option value="-updated">
            Data Atualização (↓ Mais Novo) - Padrão
          </option>
          <option value="updated">Data Atualização (↑ Mais Antiga)</option>
          <option value="-created">Data Criação (↓ Mais Novo)</option>
          <option value="created">Data Criação (↑ Mais Antigos)</option>
          <option value="-new_messages">Qtde Msgs Não Lidas (↓)</option>
          <option value="new_messages">Qtde Msgs Não Lidas (↑)</option>
          <option value="-date_last_message">
            Data Última Msg (↓) - Mais Novas
          </option>
          <option value="date_last_message">
            Data Última Msg (↑) - Mais Antigos
          </option>
        </select>
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

      <span
        class="form__clear"
        @click="clearForm()"
        v-show="
          fields.name != '' ||
          fields.phone != '' ||
          fields.whatsNumber != '' ||
          fields.allTags != '' ||
          fields.allDpt != '' ||
          fields.status != '' ||
          fields.date != '' ||
          fields.tags.length > 0 ||
          fields.funnels.length > 0 ||
          fields.departments.users.length > 0 ||
          fields.departments.groups.length > 0 ||
          fields.departments.noDelegated != false ||
          fields.archiveSearch != false ||
          fields.broadcastSearch != false ||
          fields.favoritedSearch != false ||
          fields.newMessages != false ||
          fields.scheduledSearch != false
        "
        >Limpar filtros</span
      >
    </section>

    <section class="list__wrapper">
      <div class="list__hidden-list">
        <span>Esconder filtros</span>
      </div>

      <div class="list__count">
        <span>Exibindo 52 resultados: </span>
      </div>
      <Card />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import Tags from "./components/tags-component.vue";
import Department from "./components/department-component.vue";
import Funnel from "./components/funnel-component.vue";
import Card from "./components/card-component.vue";
import type { checkedDptItems, fieldsTypes } from "./types";
import { fetchDevices } from "./functions/requests";

//  REFS
const TagComponent = ref<InstanceType<typeof Tags> | null>(null)
const DptComponent = ref<InstanceType<typeof Department> | null>(null) 
const FunnelComponent = ref<InstanceType<typeof Funnel> | null>(null)

// LOCAL STATE 
const fields = reactive<fieldsTypes>({
  name: "",
  phone: "",
  allTags: "",
  allDpt: "",
  whatsNumber: "",
  tags: [],
  departments: { users: [], groups: [], noDelegated: false },
  funnels: [],
  status: "",
  date: "",
  newMessages: false,
  archiveSearch: false,
  broadcastSearch: false,
  favoritedSearch: false,
  scheduledSearch: false,
});
const devices = fetchDevices();

// FUNCTIONS
const incomingTags = (tags: Array<string>) => (fields.tags = tags);
const incomingDepartments = (departments: checkedDptItems) =>
  (fields.departments = departments);
const incomingFunnels = (funnels: Array<string>) => (fields.funnels = funnels);

function clearForm() {
    (fields.name = ""),
    (fields.phone = ""),
    (fields.allTags = ""),
    (fields.allDpt = ""),
    (fields.whatsNumber = ""),
    (fields.tags = []),
    (fields.departments = { users: [], groups: [], noDelegated: false }),
    (fields.funnels = []),
    (fields.status = ""),
    (fields.date = ""),
    (fields.newMessages = false),
    (fields.archiveSearch = false),
    (fields.broadcastSearch = false),
    (fields.favoritedSearch = false),
    (fields.scheduledSearch = false);
    TagComponent.value?.clearInput()
    DptComponent.value?.clearDptInput()
    FunnelComponent.value?.clearFunnelInput()
}
</script>

<style lang="scss" scoped>
.container-chatlist {
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
      inline-size: 20px;
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
  padding: 12px;
  background-color: #f6f6f6;

  &__tags-wrapper {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 70% 30%;
  }

  &__departments-wrapper {
    @extend .form__tags-wrapper;
  }

  &__status-wrapper {
    @extend .form__tags-wrapper;
    grid-template-columns: 50% 50%;
  }

  &__clear {
    inline-size: fit-content;
    text-decoration: underline;
    font-weight: 400;
    font-size: 13px;
    line-height: 14px;
    color: #6e6b6d;
    cursor: pointer;
    margin: 11px 0 2px 0;
    transition: 0.2s ease;

    &:hover {
      color: darken(#bab8b9, 60%);
    }
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

  &--blue {
    background-color: #ccdbfd ;
    border-color: #abc4ff ;
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
