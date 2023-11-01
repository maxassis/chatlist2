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

export interface BodyType {
  page_num: number
  filter_order_by: string
  filter_tag: string[]
  filter_tag_rule: string
  filter_user_rule: string
  filter_user: {
    users: string[]
    groups: string[]
    noDelegated: boolean
  }
  filter_phone: string
  filter_funnel_step: string[]
  filter_status: string
  filter_search_number: string
  filter_search_name: string
  filter_new_messages: string
  filter_archived: string
  filter_broadcast: string
  filter_favorited: string
  filter_scheduled: string
}



