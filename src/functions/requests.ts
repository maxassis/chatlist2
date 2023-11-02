import { ref } from "vue";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";
import type { BodyType } from '../types'

const enviroment: "DEV" | "PROD" = "PROD"

const fetcher = createZodFetcher();

// REQUISIÇÃO DE TAGS
const schemaTags = z.array(
  z.object({
    id: z.string().min(1),
    text: z.string().min(1),
    color: z.string(),
    bg: z.string(),
  })
);

export type Tags = z.infer<typeof schemaTags>;

export function fetchTags() {
  const dt = ref<Tags>([]);
  const url =
  enviroment === "DEV"
      ? "https://run.mocky.io/v3/6b4cb26a-02fb-4792-8d53-f42492e7ca75"
      : `${window.location.origin}/chatlist/tags`;

  fetcher(schemaTags, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÃO DE DEPARTAMENTOS
export const schemaDpt = z.object({
  users: z.array(
    z.object({
      id: z.string().min(1),
      type: z.string().min(1),
      name: z.string().min(1),
      email: z.string().min(1),
    })
  ),
  groups: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
  ),
});

export type Dpt = z.infer<typeof schemaDpt>;
export function fetchDpt() {
  const dt = ref<Dpt | undefined>(undefined);
  const url =
  enviroment === "DEV"
      ? "https://run.mocky.io/v3/e2053a35-39e2-4b02-b9c3-7908267d3612"
      : `${window.location.origin}/chatlist/users_and_groups`;

  fetcher(schemaDpt, url)
    .then((response) => {
      dt.value = response;
    })
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÃO DE FUNIL
export const schemaFunnels = z.array(
  z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    steps: z.array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
      })
    ),
  })
);

export type Funis = z.infer<typeof schemaFunnels>;

export function fetchFunnels() {
  const dt = ref<Funis | []>([]);
  const url =
  enviroment === "DEV"
      ? "https://run.mocky.io/v3/8586f883-b690-4365-8989-b6ee66dea738"
      : `${window.location.origin}/chatlist/funnels`;

  fetcher(schemaFunnels, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO DE DEVICES
export const schemaDevices = z.array(
  z.object({
    id: z.string().min(1),
    description: z.string().min(1),
    owner_wa_id: z.string(),
  })
);

export type Devices = z.infer<typeof schemaDevices>;

export function fetchDevices() {
  const dt = ref<Devices>([]);
  const url =
  enviroment === "DEV"
      ? "https://run.mocky.io/v3/9ec958b0-004f-4cea-a2b3-c8ba266d5064"
      : `${window.location.origin}/chatlist/phones`;

  fetcher(schemaDevices, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO CHATS MOCK
export const schemaChats = z.object({
    total_chats: z.number(),
    total_returned: z.number(),
    page_num: z.number(),
    chats: z.array(
      z.object({
        id: z.string(),
        phone_id: z.string(),
        account_id: z.string(),
        wa_chat_id: z.string(),
        name: z.string(),
        kind: z.string(),
        picture: z.string().nullable(),
        status: z.string().nullable(),
        favorite: z.boolean(),
        archived: z.boolean(),
        scheduled: z.boolean(),
        new_messages: z.number(),
        updated: z.string(),
        created: z.string(),
        last_message: z.object({ text: z.string().nullable(), date: z.string().nullable() }),
        users_delegated_ids: z.array(z.string()),
        groups_delegated_ids: z.array(z.string()),
        funnel_steps_ids: z.array(z.string()),
        tags: z.array(
          z.object({ text: z.string(), color: z.string(), bg: z.string() })
        )
      })
    )
  })


export type Chats = z.infer<typeof schemaChats>;
export function fetchChatsMock() {
  const dt = ref<Chats | undefined>(undefined);
  const url = "https://run.mocky.io/v3/bba7389c-76d9-4ed0-9bcd-75bf537eac49"

  fetcher(schemaChats, url)
    .then((response) => {
      dt.value = response
      console.log(response)
    })
    .catch((error) => console.log(error));

  return dt;
}

export function fetchChatsMonolito(bodyDt: BodyType) {
  const dt = ref<Chats | undefined>(undefined);
  const url = `${window.location.origin}/chatlist/store`

    fetcher(schemaChats, url, {
    method: "POST",
    body: JSON.stringify(bodyDt),
    headers: {"Content-type": "application/json; charset=UTF-8"},
  })
    .then((response) => dt.value = response)
    .catch((error) => console.log(error));

  return dt;
}

export function fetchCard(bodyDt: BodyType) {
  return enviroment === "DEV" ? fetchChatsMock() : fetchChatsMonolito(bodyDt);
}


