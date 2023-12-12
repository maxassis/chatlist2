<template>
  <div class="container-chatlist">
    <section class="search-box">
      <span class="search-box__search search-message-modal-open">
        <Icon icon="lupa" />
        <span>Pesquisar mensagem</span>
      </span>
      <span
        v-if="inputsHidden.addChat"
        class="search-box__add startchat-modal-open"
      >
        <Icon icon="add-user" />
      </span>
    </section>

    <section ref="el" v-if="hasFilter">
      <div class="form">
        <input
          class="form__name input"
          :class="{ 'input--blue': fields.name }"
          type="text"
          placeholder="Nome"
          v-if="inputsHidden.nameInput"
          v-model.trim="fields.name"
          @input="debouncedFn"
        />
        <select
          class="input form__phone"
          :class="{ 'input--blue': fields.phone }"
          v-model="fields.phone"
          v-if="inputsHidden.phoneInput"
          @change="fetchCard()"
        >
          <option value>Aparelho:</option>
          <option v-for="device in devices" :key="device.id" :value="device.id">
            {{ device.description }}
          </option>
        </select>
        <input
          v-model.trim="fields.whatsNumber"
          v-if="inputsHidden.telNumberInput"
          type="texte"
          class="input"
          :class="{ 'input--blue': fields.whatsNumber }"
          placeholder="Número Whatsapp"
          @input="fetchCard()"
        />

        <div class="form__tags-wrapper" v-if="inputsHidden.tagInput">
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

        <div class="form__departments-wrapper" v-if="inputsHidden.userInput">
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

        <div class="form__funnel-wrapper" v-if="inputsHidden.funnelInput">
          <Funnel @sendFunnels="incomingFunnels" ref="FunnelComponent" />
        </div>

        <div class="form__status-wrapper">
          <select
            v-if="inputsHidden.chatStatus"
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
            v-if="inputsHidden.orderByInput"
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
          <div
            v-if="inputsHidden.unreadInput"
            class="select__single-item select__tooltips unread"
          >
            <Icon icon="mail" />
            <input
              type="checkbox"
              v-model="fields.newMessages"
              @change="fetchCard()"
            />
          </div>
          <div
            v-if="inputsHidden.archivedInput"
            class="select__single-item select__tooltips archived"
          >
            <Icon icon="archive" />
            <input
              type="checkbox"
              v-model="fields.archiveSearch"
              @change="fetchCard()"
            />
          </div>
          <div
            v-if="inputsHidden.broadcastInput"
            class="select__single-item select__tooltips broadcast"
          >
            <Icon icon="transmission" />
            <input
              type="checkbox"
              v-model="fields.broadcastSearch"
              @change="fetchCard()"
            />
          </div>
          <div
            v-if="inputsHidden.favoritedInput"
            class="select__single-item select__tooltips favorited"
          >
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
      <div
        class="list__hidden-list"
        @click="scrollList = !scrollList"
        v-if="hasFilter"
      >
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
            stroke=""
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
            {{ fullCards?.length ? fullCards?.length : 0 }}
          </span>
          Resultados</span
        >
      </div>

      <div
        :class="[
          'list__forward-wrapper',
          { 'list__forward-wrapper--hidden': !showForward },
        ]"
      >
        <div class="list__forward">
          <button class="list__forward-btn-green" id="btn_fwd_messages">
            Encaminhar mensagem
          </button>
          <button
            class="list__forward-btn-red"
            @click="close"
            id="btn_cancel_fwd_messages"
          >
            Cancelar
          </button>
          <div class="list__forward-counter-wrapper">
            <label>
              <input type="checkbox" v-model="checkAllForward" />
              Selecionar todos
            </label>
            <span
              >Selecionados: ({{ forwardState.getters.getSize }}) <span></span
            ></span>
          </div>
        </div>
      </div>

      <div
        class="loading-container"
        v-show="loading"
      >
        <div class="radial"></div>
      </div>

      <section
        v-show="!loading"
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
        <CardNotFound v-show="fullCards?.length == 0" />

        <Card
          v-for="card in fullCards"
          :card="card"
          :key="card.id"
          :checkAllForward="checkAllForward"
          :openForward="showForward"
          ref="CardComponent"
        />

        <div
          class="list__noMoreMessages"
          v-if="hiddenObserver == false && fullCards && fullCards.length >= 15"
        >
          <span>Não há mais chats para listar</span>
        </div>

        <LoadingDots
          v-if="loadingDots && fullCards && fullCards.length >= 10"
        />

        <div
          ref="observer"
          class="list__intersection-observer"
          v-show="hiddenObserver"
        ></div>
      </section> 
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Tags from "./components/tags-component.vue";
import Department from "./components/department-component.vue";
import Funnel from "./components/funnel-component.vue";
import Card from "./components/card-component.vue";
import Icon from "./components/icon-component.vue";
import LoadingDots from "./components/loadingDots-component.vue";
import CardNotFound from "./components/card-notFound.vue";
import {
  useResizeObserver,
  useDebounceFn,
  useIntersectionObserver,
} from "@vueuse/core";
import {
  fields,
  scrollList,
  incomingTags,
  incomingDepartments,
  incomingFunnels,
  inputsHidden,
  hasFilter,
  hiddenObserver,
  morePages,
  loadingDots,
  showForward,
  checkAllForward,
  close,
  loading
} from "./functions/app-functions";
import { fetchCard, fullCards, fetchDevices } from "./functions/requests";
import { schemaSingleCard } from "./types";
import forwardState from "./state/forward";
import { updateCard } from "./functions/websocket-filters";
import { cardSelected } from "./state/cardSelected";

// EVENT LISTENER
window.addEventListener("webSocketEvent", (e) => {
  // eslint-disable-next-line
  // @ts-ignore
  const data = e.detail;

  updateCard(data);
  const parsedData = schemaSingleCard.safeParse(data);
  !parsedData.success && console.log(parsedData.error);
});

window.addEventListener("chatlistEvents", (e) => {
  // eslint-disable-next-line
  // @ts-ignore
  const dt = e.detail;

  if (dt.target === "openForward") {
    //console.log(dt.target, dt.data);
    showForward.value = true;
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById(`msgs-forward-${dt.data}`).checked = true;
  }

  if (dt.target === "closeForward") {
    showForward.value = false;
    checkAllForward.value = false;
  }

  if (dt.target === "deselectChat") {
    deselectChat();
  }

  if (dt.target === "unresolved") {
    filterByUnresolved(dt.status, dt.obj);
  }
});

// GLOBAL STATE
const { selectID } = cardSelected();

// REQUEST
const devices = fetchDevices();

// REFS
const TagComponent = ref<InstanceType<typeof Tags> | null>(null);
const DptComponent = ref<InstanceType<typeof Department> | null>(null);
const FunnelComponent = ref<InstanceType<typeof Funnel> | null>(null);
const el = ref(null);
const size = ref("");
const observer = ref(null);
const targetIsVisible = ref(false);

// MOUNTED
onMounted(() => {
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get("status") as string; 
    const delegated = urlParams.get("delegated") as string;
    const undelegated = urlParams.get("undelegated") as string;
    const type = urlParams.get("type") as string;

    if (urlParams.has("status")) {
    const interval = setInterval(() => {
      if (DptComponent.value) {
        searchUrlUser(status, delegated, type, undelegated)
        clearInterval(interval)
      }
    }, 50)
    }
      else {
      fetchCard();
    }

    let hash = window.location.hash;
    if (hash) {
      // eslint-disable-next-line
      // @ts-ignore
      window.open_chat(hash.substring(1));
      selectID(hash.substring(1))
    }
});

// FUNCTIONS
function clearForm(fetch = true) {
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

  fetch && fetchCard();
  loading.value = true
}

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  size.value = `${height}`;
});

const debouncedFn = useDebounceFn(() => {
  fetchCard();
}, 600);

useIntersectionObserver(observer, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting;
  if (targetIsVisible.value) {
    morePages();
  }
});

function deselectChat() {
  selectID("");
  window.history.replaceState(null, "", "/chats");
}

function filterByUnresolved(
  status: string,
  obj: { users: string[]; groups: string[]; noDelegated: boolean }
) {
  clearForm(false);
  // loading = true;
  fields.departments = obj;
  fields.status = status;
  DptComponent.value?.changeInputs(obj);
}

function searchUrlUser(status: string, delegated: string, type: string, undelegated: string) {
    loading.value = true  
    fields.status = status    
    const obj: {users: string[]; groups: string[]; noDelegated: boolean} = {users: [], groups: [], noDelegated: false}
    undelegated = undelegated ?? false

    if (undelegated) obj.noDelegated = true
    else if(type === "U" ) obj.users.push(delegated)
    else if (type === "G") obj.groups.push(delegated)

    fields.departments = obj
    DptComponent.value?.changeInputs(obj)
  }
</script>

<style lang="scss" scoped>
  @import "./styles/app.scss";
</style>
