import { ref } from "vue";
import { z } from "zod";
import { createZodFetcher } from "zod-fetch";

const fetcher = createZodFetcher();
const environment = "dev"; // dev | prod

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
    environment === "dev"
      ? "https://run.mocky.io/v3/6b4cb26a-02fb-4792-8d53-f42492e7ca75"
      : "";

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
    environment === "dev"
      ? "https://run.mocky.io/v3/e2053a35-39e2-4b02-b9c3-7908267d3612"
      : "";

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
    environment === "dev"
      ? "https://run.mocky.io/v3/8586f883-b690-4365-8989-b6ee66dea738"
      : "";

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
    environment === "dev"
      ? "https://run.mocky.io/v3/9ec958b0-004f-4cea-a2b3-c8ba266d5064"
      : "";

  fetcher(schemaDevices, url)
    .then((response) => (dt.value = response))
    .catch((error) => console.log(error));

  return dt;
}

// REQUISIÇÂO CHATS MOCK
export const schemaChats = z.array(
  z.object({
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
)

export type Chats = z.infer<typeof schemaChats>;
export function fetchChatsMock() {
  const dt = ref<Chats | undefined>(undefined);
  const url = "http://localhost:3000/chats"

  fetcher(schemaChats, url)
    .then((response) => {
      dt.value = response
      console.log(response)
    })
    .catch((error) => console.log(error));

  return dt;
}

fetchChatsMock()

// TESTE REQUEST

// export const schemaTeste = z.object({
//   id: z.number().min(1),
//   title: z.string().min(1),
//   body: z.string().min(1),
//   userId: z.number().min(1),
// });

// export type Teste = z.infer<typeof schemaTeste>;

// export function fetchTeste() {
//   const dt = ref<Teste>();

//   fetcher(schemaTeste, "https://jsonplaceholder.typicode.com/posts", {
//     method: "POST",
//     body: JSON.stringify({
//       title: "foo",
//       body: "bar",
//       userId: 1,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((response) => {
//       dt.value = response;
//       console.log(response);
//     })
//     .catch((error) => console.log(error));

//   return dt;
// }

// fetchTeste()
