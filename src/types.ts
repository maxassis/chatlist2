export type fieldsTypes = {
  name: string,
  phone: string,
  allTags: string,
  allDpt: string,
  whatsNumber: string,
  tags: Array<string>, 
  departments: checkedDptItems,  
  status: string,
  date: string,
  newMessages: boolean,
  archiveSearch: boolean,
  broadcastSearch: boolean ,
  favoritedSearch: boolean,
  scheduledSearch: boolean
}

export type checkedDptItems = {
    groups: Array<string>,
    users: Array<string>,
    noDelegated: boolean,
}

