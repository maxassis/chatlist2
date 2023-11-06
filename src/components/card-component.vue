<template>
  <div
    class="card__single-card"
    :class="{
      'card--darken': singleCard.id == cardID,
      'card--toggleHover': singleCard.id != cardID,
    }"
    @click="
      cardID = singleCard.id;
      selectCard(singleCard.id);
    "
  >
    <div class="card__checkbox">
      <input type="checkbox" />
    </div>
    <div class="card__infos">
      <img
        v-if="singleCard.picture"
        :src="singleCard.picture"
        alt="user image"
        loading="lazy"
        class="card__user-img"
      />
      <img
        v-else
        src="../../assets/noimg.webp"
        alt="user image"
        class="card__user-img"
      />

      <div class="card__user-info-wrapper">
        <div class="card__name-wrapper">
          <span class="card__user-name">{{ singleCard.name }}</span>
        </div>

        <div class="card__user-msg" aria-label="teste" data-balloon-pos="up">
          <span
            v-if="singleCard.last_message.text == 'VIDEO'"
            class="card__user-msg"
            ><i class="fa fa-video"></i>️ Vídeo</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'IMAGE'"
            class="card__user-msg"
            ><i class="fa fa-image"></i>️ Foto</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'PTT'"
            class="card__user-msg"
            ><i class="fa fa-microphone"></i>️ Mensagem de Voz</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'AUDIO'"
            class="card__user-msg"
            ><i class="fa fa-volume-up"></i>️ Áudio</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'DOCUMENT'"
            class="card__user-msg"
            ><i class="fa fa-file"></i>️ Documento</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'VCARD'"
            class="card__user-msg"
            ><i class="fa fa-id-card"></i>️ Contato</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'MULTI_VCARD'"
            class="card__user-msg"
            ><i class="fa fa-id-card"></i>️ Contato</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'LOCATION'"
            class="card__user-msg"
            ><i class="fa fa-map-marker-alt"></i>️ Localização</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'CALL_LOG'"
            class="card__user-msg"
            ><i class="fa fa-phone-slash"></i>️ Ligação Perdida</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'STICKER'"
            class="card__user-msg"
            ><i class="fa fa-sticky-note"></i> Figurinha</span
          >
          <span
            v-else-if="singleCard.last_message.text == 'CIPHERTEXT'"
            class="card__user-msg"
            ><i class="fa fa-clock"></i> Aguardando Mensagem...</span
          >
          <span
            v-else
            class="card__user-msg"
            :title="(singleCard.last_message.text!)"
          >
            {{ singleCard.last_message.text }}</span
          >
        </div>
      </div>

      <div class="card__attendance-wrapper">
        <div class="card__attendance">
          <div class="card__attendance-day">
            <span
              class="card__attendance-status"
              :class="{
                'card__status-red': singleCard.status === 'ABERTO',
                'card__status-green': singleCard.status === 'RESOLVIDO',
                'card__status-yellow': singleCard.status === 'AGUARDANDO',
                'card__status-light-blue': singleCard.status === 'FECHADO',
              }"
              v-if="singleCard.status"
              >{{
                singleCard.status == "EM ATENDIMENTO"
                  ? "EM ATENDI"
                  : singleCard.status
              }}</span
            >
          </div>
          <span
            class="card__attendance__number"
            v-if="singleCard.new_messages != 0"
          >
            {{ singleCard.new_messages }}
          </span>
        </div>

        <div class="card__attendance-hour-wrapper">
          <span class="card__attendance-hour" v-if="card.last_message.date">{{
            hours == false
              ? `há ${dateCalc(card.last_message.date, tokenInfo!.timezone)}`
              : `${dateCalc(card.last_message.date, tokenInfo!.timezone)}`
          }}</span>
          <svg
            v-if="singleCard.users_delegated_ids.length > 0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="card__icon1"
            :class="[userOnline ? 'card__online-green' : 'card__online-red']"
          >
            <path
              fill="#dc2e56"
              d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z"
            />
          </svg>

          <svg
            v-if="singleCard.groups_delegated_ids.length > 0"
            class="card__icon2"
            :class="[groupOnline ? 'card__online-green' : 'card__online-red']"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#dc2e56"
              d="M12.3 12.22A4.92 4.92 0 0 0 14 8.5a5 5 0 0 0-10 0 4.92 4.92 0 0 0 1.7 3.72A8 8 0 0 0 1 19.5a1 1 0 0 0 2 0 6 6 0 0 1 12 0 1 1 0 0 0 2 0 8 8 0 0 0-4.7-7.28ZM9 11.5a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm9.74.32A5 5 0 0 0 15 3.5a1 1 0 0 0 0 2 3 3 0 0 1 3 3 3 3 0 0 1-1.5 2.59 1 1 0 0 0-.5.84 1 1 0 0 0 .45.86l.39.26.13.07a7 7 0 0 1 4 6.38 1 1 0 0 0 2 0 9 9 0 0 0-4.23-7.68Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { singleCardType } from "../types";
import type { OnlineType } from "../functions/requests";
import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import format from "date-fns/format";
import intervalToDuration from "date-fns/intervalToDuration";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import type { tokenType } from "../functions/requests";

// PROPS
// eslint-disable-next-line
const props = defineProps<{
  card: singleCardType;
  online: OnlineType | undefined;
  token: tokenType | undefined;
}>();

//LOCAL STATE
const cardID = ref("");
const userOnline = ref(false);
const groupOnline = ref(false);
const singleCard = ref(props.card);
const checkOnline = ref(props.online);
const hours = ref(false);
const tokenInfo = ref(props.token);

//onMounted
onMounted(() => {
  const checkData = Object.entries(checkOnline).length;

  if (checkData !== 0) {
    checkStatus(checkOnline?.value);
  }
});

// FUNCTIONS
function openChat(id: string) {
  // eslint-disable-next-line
  // @ts-ignore
  window.open_chat(id);

  // if (window.stopFetch) {
  //   window.stopFetch();
  // }
}

function selectCard(id: string) {
  const msgsSelected = document.querySelector(".forward-check");
  // eslint-disable-next-line
  // @ts-ignore
  const titlePage = document.getElementsByTagName("TITLE")[0].text;
  if (msgsSelected == null) {
    window.history.pushState(titlePage, "/chats#" + id);
    //selected.value = !selected.value;
    openChat(id);
  } else {
    const checkbox = document.getElementById(
      "fwd-checkbox-" + id
    ) as HTMLInputElement;
    checkbox.checked = !checkbox.checked;
    // eslint-disable-next-line
    // @ts-ignore
    window.CountingChatsSelected();
  }
}

function checkStatus(online: OnlineType | undefined) {
  userOnline.value = false;

  if (singleCard?.value.users_delegated_ids.length > 0) {
    online?.users.forEach((item) => {
      if (
        item.is_online &&
        singleCard.value.users_delegated_ids.includes(item.id)
      ) {
        userOnline.value = true;
      }
    });
  }

  groupOnline.value = false;
  if (singleCard?.value.groups_delegated_ids.length > 0) {
    online?.groups.forEach((item) => {
      if (item.is_online) {
        if (singleCard.value.groups_delegated_ids.includes(item.id)) {
          groupOnline.value = true;
        }
      }
    });
  }
}

function dateCalc(dt: string, timezone: string) {
  // ESSE DATEFORMATTED É NECESSÁRIO PARA FUNCIONAR NO SAFARI
  const dateFormatted = dt.replace(/\s/, "T");

  const serverTimeZone = "Africa/Dakar";
  const userTimeZone = timezone;

  // HORÁRIOS NO FUSO DO SERVIDOR
  const date = new Date(dateFormatted);
  const dateInServerZone = zonedTimeToUtc(date, serverTimeZone);

  // HORÁRIOS NO FUSO DO USUÁRIO
  const hourNow = new Date();
  const dateInUserZone = utcToZonedTime(dateInServerZone, userTimeZone);
  const hournowInUserZone = utcToZonedTime(hourNow, userTimeZone);

  // CALCULA DISTANCIA DE TEMPO ENTRE A HORA ATUAL NO SERVIDOR E A HORA DA ATUALIZAÇÃO DO CARD
  const distanceInWords = formatDistance(dateInUserZone, hournowInUserZone, {
    includeSeconds: true,
    locale: ptBR,
  });

  // VERIFICA SE A MENSAGEM FOI ENVIADA HÁ MAIS DE 24HS
  const interval = intervalToDuration({
    start: dateInUserZone,
    end: hournowInUserZone,
  });

  if (interval.days && interval.days < 1) {
    hours.value = true;
    return format(dateInUserZone, "HH:mm");
  } else {
    hours.value = false;
    return distanceInWords;
  }
}
</script>

<style lang="scss" scoped>
.card {
  &__single-card {
    display: grid;
    grid-template-columns: 0px 1fr;
    grid-template-rows: 1fr;
    border-block-end: 1.12px solid #f2f2f2;
    block-size: 68px;
  }

  &__checkbox {
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  &__infos {
    display: grid;
    grid-template-columns: 45px 1fr auto;
    grid-template-rows: 1fr;
    align-items: center;
    padding: 0 11.2px;
    cursor: pointer;
  }

  &__user-img {
    border-radius: 50%;
    max-inline-size: 100%;
    display: block;
    align-self: center;
  }

  &__user-info-wrapper {
    margin-inline-start: 10px;
    margin-inline-end: 10px;
    display: grid;
    align-content: center;
    gap: 2px;
  }

  &__name-wrapper {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__user-name {
    white-space: nowrap;
    color: #000;
    text-overflow: ellipsis;
    font-size: 14px !important;
    font-weight: 600 !important;
  }

  &__user-msg {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span {
      font-size: 12px;
      color: #787878;
    }
  }

  &__attendance {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    gap: 6.4px;
  }

  &__attendance-status {
    white-space: nowrap;
    background-color: #4e73df;
    font-size: 10px;
    padding: 2px 6.4px;
    border-radius: 96px;
    color: #fff;
    font-weight: 700;
    line-height: 9px;
    opacity: 0.6;
  }

  &__attendance__number {
    white-space: nowrap;
    background-color: #e74a3b;
    font-weight: 700;
    font-size: 10px;
    padding: 2px 7px;
    border-radius: 96px;
    color: #fff;
  }

  &__attendance-hour-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    margin-block-start: 8px;
  }

  &__attendance-hour {
    font-size: 11px;
    text-align: end;
    color: #787878;
  }

  &__attendance-online-wrapper {
    display: flex;
    inline-size: fit-content;

    svg {
      inline-size: 13px;
      block-size: 13px;
    }
  }

  &__icon1 {
    inline-size: 13px;
    block-size: 13px;
  }

  &__icon2 {
    inline-size: 14px;
    block-size: 14px;
  }

  &__status-red {
    background-color: #e74a3b;
  }

  &__status-green {
    background-color: #1cc88a;
  }

  &__status-light-blue {
    background-color: #36b9cc;
  }

  &__status-yellow {
    background-color: #f6c23e;
    color: #333;
  }

  &--darken {
    background-color: darken(#f6f6f6, 5%);
  }

  &--toggleHover {
    &:hover {
      background-color: #faf9f9;
      opacity: 0.9;
    }
  }

  &__online-green {
    path {
      fill: #229954;
    }
  }

  &__online-red {
    path {
      fill: #dc2e56;
    }
  }
}
</style>
