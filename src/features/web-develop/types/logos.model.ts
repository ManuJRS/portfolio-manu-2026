/** Logo de cliente normalizado (origen: `logo[]` en Strapi). */
export type LogosEntry = {
  id: string
  src: string
  alt: string
}

export type LogosProps = {
  title: string
  logos: LogosEntry[]
}
