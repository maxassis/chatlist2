import { z } from "zod";

export type fieldsTypes = {
  name: string,
  phone: string,
  allTags: string,
  allDpt: string,
  whatsNumber: string,
  tags: Array<string>, 
  departments: checkedDptItems,  
  funnels: Array<string>,
  status: string,
  date: string,
  newMessages: boolean,
  archiveSearch: boolean,
  broadcastSearch: boolean ,
  favoritedSearch: boolean,
  scheduledSearch: boolean,
  page_num: number
}

export type checkedDptItems = {
    groups: Array<string>,
    users: Array<string>,
    noDelegated: boolean,
}

const schemaSingleCard = z.object({
  id: z.string().min(1),
  phone_id: z.string(),
  account_id: z.string().min(1),
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

export type singleCardType = z.infer<typeof schemaSingleCard>;

