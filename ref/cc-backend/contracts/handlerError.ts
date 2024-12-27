declare module '@ioc:Adonis/Core/Exception' {
  export type errorStatusDB = {
    errno: number,
    code: string,
    syscall: string,
    address: string,
    port: number | string
  }
}