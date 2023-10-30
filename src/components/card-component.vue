<template>
  <section class="card__wrapper">
    <div class="card__single-card">
      <div class="card__checkbox">
        <input type="checkbox" />
      </div>
      <a class="card__infos">
        <img
          class="card__user-img"
          src="../../assets/noimg.webp"
          alt="user image"
        />

        <div class="card__user-info-wrapper">
          <div class="card__name-wrapper">
            <span class="card__user-name">max hehehehheheheheheheh</span>
          </div>

          <div class="card__user-msg">
            <span
              >Esse é um
              testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</span
            >
          </div>
        </div>

        <div class="card__attendance-wrapper">
          <div class="card__attendance">
            <div class="card__attendance-day">
              <span class="card__attendance-status">ABERTO</span>
            </div>
            <span class="card__attendance__number"> 1 </span>
          </div>

          <div class="card__attendance-hour-wrapper">
            <span class="card__attendance-hour">ha 9 meses</span>

            <!-- <div class="card__attendance-online-wrapper"> -->
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
            <!-- </div> -->
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { fetchChatsMock } from "../functions/requests";

const cards = fetchChatsMock();
</script>

<style lang="scss" scoped>
.card {
  &__wrapper {
    block-size: 100%;
  }

  &__single-card {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: 1fr;
    // border: 1px solid red;
    block-size: 68px;
  }

  &__checkbox {
    display: grid;
    place-items: center;
  }

  &__infos {
    border: 1px solid red;
    display: grid;
    grid-template-columns: 45px 1fr auto;
    grid-template-rows: 1fr;
    align-items: center;
    padding: 0 11.2px;
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

    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 600;
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
}
</style>
