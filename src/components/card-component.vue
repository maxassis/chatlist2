<template>
  <div class="card__count">
    <span class="card__quant-of-chats"
      >Exibindo
      <span class="card__counter">
        {{ cards?.chats.length ? cards?.chats.length : 0 }}
      </span>
      Resultados</span
    >
  </div>
  <section class="card__wrapper" :style="[
          scroll
            ? {
                height: `calc(100dvh - 147px)`,
              }
            : {
                height: `calc(100dvh - 147px - ${size + 'px'})`,
              },
        ]" >
    <div
      class="card__single-card"
      :class="{
        'card--darken': card.id == cardID,
        'card--toggleHover': card.id != cardID,
      }"
      v-for="card in cards?.chats"
      :key="card.id"
      @click="cardID = card.id;"
    >
      <div class="card__checkbox">
        <input type="checkbox" />
      </div>
      <div class="card__infos">
        <img
          v-if="card.picture"
          :src="card.picture"
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
            <span class="card__user-name">{{ card.name }}</span>
          </div>

          <div class="card__user-msg" aria-label="teste" data-balloon-pos="up">
            <span
              v-if="card.last_message.text == 'VIDEO'"
              class="card__user-msg"
              ><i class="fa fa-video"></i>️ Vídeo</span
            >
            <span
              v-else-if="card.last_message.text == 'IMAGE'"
              class="card__user-msg"
              ><i class="fa fa-image"></i>️ Foto</span
            >
            <span
              v-else-if="card.last_message.text == 'PTT'"
              class="card__user-msg"
              ><i class="fa fa-microphone"></i>️ Mensagem de Voz</span
            >
            <span
              v-else-if="card.last_message.text == 'AUDIO'"
              class="card__user-msg"
              ><i class="fa fa-volume-up"></i>️ Áudio</span
            >
            <span
              v-else-if="card.last_message.text == 'DOCUMENT'"
              class="card__user-msg"
              ><i class="fa fa-file"></i>️ Documento</span
            >
            <span
              v-else-if="card.last_message.text == 'VCARD'"
              class="card__user-msg"
              ><i class="fa fa-id-card"></i>️ Contato</span
            >
            <span
              v-else-if="card.last_message.text == 'MULTI_VCARD'"
              class="card__user-msg"
              ><i class="fa fa-id-card"></i>️ Contato</span
            >
            <span
              v-else-if="card.last_message.text == 'LOCATION'"
              class="card__user-msg"
              ><i class="fa fa-map-marker-alt"></i>️ Localização</span
            >
            <span
              v-else-if="card.last_message.text == 'CALL_LOG'"
              class="card__user-msg"
              ><i class="fa fa-phone-slash"></i>️ Ligação Perdida</span
            >
            <span
              v-else-if="card.last_message.text == 'STICKER'"
              class="card__user-msg"
              ><i class="fa fa-sticky-note"></i> Figurinha</span
            >
            <span
              v-else-if="card.last_message.text == 'CIPHERTEXT'"
              class="card__user-msg"
              ><i class="fa fa-clock"></i> Aguardando Mensagem...</span
            >
            <span
              v-else
              class="card__user-msg"
              :title="(card.last_message.text!)"
            >
              {{ card.last_message.text }}</span
            >
          </div>
        </div>

        <div class="card__attendance-wrapper">
          <div class="card__attendance">
            <div class="card__attendance-day">
              <span
                class="card__attendance-status"
                :class="{
                  'card__status-red': card.status === 'ABERTO',
                  'card__status-green': card.status === 'RESOLVIDO',
                  'card__status-yellow': card.status === 'AGUARDANDO',
                  'card__status-light-blue': card.status === 'FECHADO',
                }"
                v-if="card.status"
                >{{
                  card.status == "EM ATENDIMENTO" ? "EM ATENDI" : card.status
                }}</span
              >
            </div>
            <span
              class="card__attendance__number"
              v-if="card.new_messages != 0"
            >
              {{ card.new_messages }}
            </span>
          </div>

          <div class="card__attendance-hour-wrapper">
            <span class="card__attendance-hour">ha 9 meses</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="card__icon1"
            >
              <path
                fill="#dc2e56"
                d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z"
              />
            </svg>

            <svg
              class="card__icon2"
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
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { fetchCard } from "../functions/requests";
import { BodyType } from "@/types";

// eslint-disable-next-line
const { bodyData, scroll } = defineProps<{ bodyData: BodyType, scroll: boolean, size: string }>();
const cards = fetchCard(bodyData);
const cardID = ref("");

// FUNCTIONS
// function openChat(id: string) {
//      // eslint-disable-next-line 
//      // @ts-ignore 
//       window.open_chat(id)

//       // if (window.stopFetch) {
//       //   window.stopFetch();
//       // }
//     }

// function selectCard(id: string) {
//       const msgsSelected = document.querySelector(".forward-check");
//       // eslint-disable-next-line 
//       // @ts-ignore 
//       const titlePage = document.getElementsByTagName("TITLE")[0].text
//       if (msgsSelected == null) {
//         window.history.pushState(titlePage, "/chats#" + id);
//         //selected.value = !selected.value;
//         openChat(id);
//       } else {
//         const checkbox = document.getElementById("fwd-checkbox-" + id) as HTMLInputElement;
//         checkbox.checked = !checkbox.checked;
//         // eslint-disable-next-line 
//         // @ts-ignore 
//         window.CountingChatsSelected();
//       }
//     }
</script>

<style lang="scss" scoped>
.card {
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

  &__wrapper {
    overflow: scroll;
    background-color: #fff;
  }

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
}
</style>
