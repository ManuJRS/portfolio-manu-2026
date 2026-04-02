export type FormWebSubmitPayload = {
  fullName: string
  email: string
  /** Etiqueta de la opción elegida (coincide con una entrada de `selectOptions`). */
  stage: string
  message: string
}

export type FormWebProps = {
  title: string
  description: string
  inputName: string
  inputEmail: string
  /** Etiqueta del `<select>` (p. ej. «En qué etapa está el proyecto»). */
  inputStage: string
  inputMessage: string
  btnText: string
  /** Opciones visibles del desplegable (orden = orden en UI). */
  selectOptions: string[]
  /** Valor inicial seleccionado (debe existir en `selectOptions` o se usa la primera). */
  selectDefault: string
}
