declare module '@ioc:Adonis/Core/Route' {
  export type PropsUrl = { 
    url: string; 
    controller: string; 
  }

  export type PropsFavoriteUrl = { 
    url: string; 
    controller: string; 
    params?: string | string[] | undefined,
    method?: string | undefined
  }
}