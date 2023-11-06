<template>
  <div class="container-chatlist">
    <section class="search-box">
      <button class="search-box__search search-message-modal-open">
        <Icon icon="lupa" />
        <span>Pesquisar mensagem</span>
      </button>
      <button class="search-box__add startchat-modal-open">
        <Icon icon="add-user" />
      </button>
    </section>

    <section ref="el">
      <div class="form">
        <input
          class="form__name input"
          :class="{ 'input--blue': fields.name }"
          type="text"
          placeholder="Nome"
          v-model="fields.name"
          @input="debouncedFn"
        />
        <select
          class="input form__phone"
          :class="{ 'input--blue': fields.phone }"
          v-model="fields.phone"
          @change="fetchCard()"
        >
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
          @input="fetchCard()"
        />

        <div class="form__tags-wrapper">
          <Tags @sendTags="incomingTags" ref="TagComponent" />
          <select
            class="input"
            :class="{ 'input--blue': fields.allTags }"
            v-model="fields.allTags"
            @change="fetchCard()"
          >
            <option value>Qualquer</option>
            <option value="and">Todas</option>
            <option value="ne">Não Tem</option>
          </select>
        </div>

        <div class="form__departments-wrapper">
          <Department
            @sendDepartments="incomingDepartments"
            ref="DptComponent"
          />
          <select
            class="input"
            :class="{ 'input--blue': fields.allDpt }"
            v-model="fields.allDpt"
            @change="fetchCard()"
          >
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
            @change="fetchCard()"
          >
            <option value>Status:</option>
            <option value="ABERTO">ABERTO</option>
            <option value="EM ATENDIMENTO">EM ATENDIMENTO</option>
            <option value="AGUARDANDO">AGUARDANDO</option>
            <option value="RESOLVIDO">RESOLVIDO</option>
            <option value="FECHADO">FECHADO</option>
            <option value="INDEFINIDO">INDEFINIDO</option>
          </select>

          <select
            class="input"
            :class="{ 'input--blue': fields.date }"
            v-model="fields.date"
            @change="fetchCard()"
          >
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
          <div class="select__single-item select__tooltips unread">
            <Icon icon="mail" />
            <input
              type="checkbox"
              v-model="fields.newMessages"
              @change="fetchCard()"
            />
          </div>
          <div class="select__single-item select__tooltips archived">
            <Icon icon="archive" />
            <input
              type="checkbox"
              v-model="fields.archiveSearch"
              @change="fetchCard()"
            />
          </div>
          <div class="select__single-item select__tooltips broadcast">
            <Icon icon="transmission" />
            <input
              type="checkbox"
              v-model="fields.broadcastSearch"
              @change="fetchCard()"
            />
          </div>
          <div class="select__single-item select__tooltips favorited">
            <Icon icon="star" />
            <input
              type="checkbox"
              v-model="fields.favoritedSearch"
              @change="fetchCard()"
            />
          </div>
          <div class="select__single-item select__tooltips scheduled">
            <Icon icon="schedule" />
            <input
              type="checkbox"
              v-model="fields.scheduledSearch"
              @change="fetchCard()"
            />
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
      </div>
    </section>

    <section
      class="list__wrapper"
      :style="
        scrollList ? { transform: `translateY(${'-' + size + 'px'})` } : ''
      "
    >
      <div class="list__hidden-list" @click="scrollList = !scrollList">
        <span>{{ scrollList ? "Mostrar Filtros" : "Esconder Filtros" }}</span>
        <svg
          :class="{ list__svgRotate: scrollList }"
          xmlns="http://www.w3.org/2000/svg"
          width="13px"
          viewBox="0 0 256 256"
        >
          <path fill="none" d="M0 0h256v256H0z" />
          <path
            fill="none"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
            d="m48 160 80-80 80 80"
          />
        </svg>
      </div>

      <div class="list__count">
        <span class="list__quant-of-chats"
          >Exibindo
          <span class="list__counter">
            {{ fullCards?.chats.length ? fullCards?.chats.length : 0 }}
          </span>
          Resultados</span
        >
      </div>
      <section
        class="list__wrapper-cards"
        :style="[
          scrollList
            ? {
                height: `calc(100dvh - 147px)`,
              }
            : {
                height: `calc(100dvh - 147px - ${size + 'px'})`,
              },
        ]"
      >
        <Card
          v-for="card in fullCards?.chats"
          :card="card"
          :online="online"
          :key="card.id"
          :token="token"
        />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tags from "./components/tags-component.vue";
import Department from "./components/department-component.vue";
import Funnel from "./components/funnel-component.vue";
import Card from "./components/card-component.vue";
import Icon from "./components/icon-component.vue";
import { useResizeObserver, useDebounceFn } from "@vueuse/core";
import {
  fields,
  scrollList,
  incomingTags,
  incomingDepartments,
  incomingFunnels,
} from "./functions/app-functions";
import { fetchCard } from "./functions/requests";
import {
  schemaWebsockets,
  fullCards,
  fetchOnline,
  fetchDevices,
  fetchToken,
} from "./functions/requests";

// EVENT LISTENER
window.addEventListener("webSocketEvent", (e) => {
  // eslint-disable-next-line
  // @ts-ignore
  const data = e.detail;
  const parsedData = schemaWebsockets.safeParse(data);

  if (parsedData.success) {
    console.log(parsedData.data);
  } else {
    console.log(parsedData.error);
  }
});

// REQUEST
const devices = fetchDevices();
const online = fetchOnline();
const token = fetchToken();
fetchCard();


// REFS
const TagComponent = ref<InstanceType<typeof Tags> | null>(null);
const DptComponent = ref<InstanceType<typeof Department> | null>(null);
const FunnelComponent = ref<InstanceType<typeof Funnel> | null>(null);
const el = ref(null);
const size = ref("");


// FUNCTIONS
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
  TagComponent.value?.clearInput();
  DptComponent.value?.clearDptInput();
  FunnelComponent.value?.clearFunnelInput();

  fetchCard();
}

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  size.value = `${height}`;
});

const debouncedFn = useDebounceFn(() => {
  fetchCard();
}, 600);
</script>

<style lang="scss" scoped>
.container-chatlist {
  inline-size: 100%;
  max-block-size: calc(100dvh - 45px);
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
    block-size: 29px;

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
    background-color: #ccdbfd;
    border-color: #abc4ff;
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
    box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  }

  &__mail-icon {
    inline-size: 18px;
  }

  &__tooltips {
    position: relative;
  }

  &__tooltips::after {
    background-color: #333;
    border-radius: 4px;
    color: #f1f1f1;
    font-size: 12.8px;
    display: none;
    padding: 3px 6px;
    position: absolute;
    text-align: center;
    z-index: 999;
  }

  &__tooltips::before {
    background-color: #333;
    content: " ";
    display: none;
    position: absolute;
    inline-size: 15px;
    block-size: 15px;
    z-index: 999;
  }

  &__tooltips:hover::after {
    display: block;
  }

  &__tooltips:hover::before {
    display: block;
  }

  &__tooltips.unread::after {
    content: "Mostrar chats não lidos";
    inline-size: 100px;
  }

  &__tooltips.archived::after {
    content: "Mostrar chats arquivados";
    inline-size: 170px;
  }

  &__tooltips.broadcast::after {
    content: "Mostrar apenas broadcasts (Listas de transmissão)";
    inline-size: 170px;
  }

  &__tooltips.scheduled::after {
    content: "Mostrar chats agendados";
    inline-size: 100px;
  }

  &__tooltips.favorited::after {
    content: "Mostrar chats favoritados";
    inline-size: 100px;
  }

  &__tooltips.clear::after {
    content: "Limpar filtros";
    inline-size: 100px;
  }

  &__tooltips.archived::after,
  &__tooltips.broadcast::after,
  &__tooltips.favorited::after,
  &__tooltips.clear::after {
    inset-block-start: 0;
    inset-inline-start: 50%;
    transform: translate(-50%, calc(-100% - 10px));
  }

  &__tooltips.scheduled::after {
    inset-block-start: 0;
    inset-inline-start: 29%;
    transform: translate(-50%, calc(-100% - 10px));
  }

  &__tooltips.unread::after {
    inset-block-start: 0;
    inset-inline-start: 72%;
    transform: translate(-50%, calc(-100% - 10px));
  }

  &__tooltips.unread::before,
  &__tooltips.archived::before,
  &__tooltips.broadcast::before,
  &__tooltips.favorited::before,
  &__tooltips.clear::before,
  &__tooltips.scheduled::before {
    inset-block-start: 0;
    inset-inline-start: 50%;
    transform: translate(-50%, calc(-100% - 5px)) rotate(45deg);
  }
}

.list {
  &__wrapper {
    block-size: 100%;
    z-index: 1;
    transition: all 0.5s linear;
  }

  &__wrapper-cards {
    overflow: scroll;
    background-color: #fff;
  }

  &__hidden-list {
    display: grid;
    align-items: center;
    place-content: center;
    grid-auto-flow: column;
    block-size: 27px;
    border-block-end: 1.6px solid #dfe1e5;
    border-block-start: 1.6px solid #dfe1e5;
    gap: 5px;
    font-size: 12px;
    cursor: pointer;
    background-color: #fff;

    > span {
      font-size: 11px;
    }

    > svg {
      transition: 0.8s ease;
    }
  }

  &__svgRotate {
    transform: rotate(180deg);
  }

  &__count {
    display: flex;
    align-items: center;
    block-size: 35px;
    font-size: 11px;
    background-color: #fff;
    font-size: 13px;
  }

  &__quant-of-chats {
    padding-inline-start: 16px;
    font-style: italic;
    padding-inline-start: 12px;
  }

  &__counter {
    color: #229954;
    font-weight: bold;
  }
}

.tooltip {
  &__tooltips {
    position: relative;
  }

  &__tooltips::after {
    background-color: #333;
    border-radius: 4px;
    color: #f1f1f1;
    font-size: 12.8px;
    display: none;
    padding: 3px 6px;
    position: absolute;
    text-align: center;
    z-index: 999;
  }

  &__tooltips::before {
    background-color: #333;
    content: " ";
    display: none;
    position: absolute;
    inline-size: 15px;
    block-size: 15px;
    z-index: 999;
  }

  &__tooltips:hover::after {
    display: block;
  }

  &__tooltips:hover::before {
    display: block;
  }

  &__tooltips.unread::after {
    content: "Mostrar chats não lidos";
    inline-size: 100px;
  }

  &__tooltips.archived::after {
    content: "Mostrar chats arquivados";
    inline-size: 170px;
  }

  &__tooltips.broadcast::after {
    content: "Mostrar apenas broadcasts (Listas de transmissão)";
    inline-size: 170px;
  }

  &__tooltips.scheduled::after {
    content: "Mostrar chats agendados";
    inline-size: 100px;
  }

  &__tooltips.favorited::after {
    content: "Mostrar chats favoritados";
    inline-size: 100px;
  }

  &__tooltips.clear::after {
    content: "Limpar filtros";
    inline-size: 100px;
  }

  &__tooltips.archived::after,
  &__tooltips.broadcast::after,
  &__tooltips.favorited::after,
  &__tooltips.clear::after {
    inset-block-start: 0;
    inset-inline-start: 50%;
    transform: translate(-50%, calc(-100% - 10px));
  }

  &__tooltips.scheduled::after {
    inset-block-start: 0;
    inset-inline-start: 29%;
    transform: translate(-50%, calc(-100% - 10px));
  }

  &__tooltips.unread::after {
    inset-block-start: 0;
    inset-inline-start: 72%;
    transform: translate(-50%, calc(-100% - 10px));
  }

  &__tooltips.unread::before,
  &__tooltips.archived::before,
  &__tooltips.broadcast::before,
  &__tooltips.favorited::before,
  &__tooltips.clear::before,
  &__tooltips.scheduled::before {
    inset-block-start: 0;
    inset-inline-start: 50%;
    transform: translate(-50%, calc(-100% - 5px)) rotate(45deg);
  }
}
</style>
