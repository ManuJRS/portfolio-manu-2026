export type WebDevelopResourceItem = {
  id: string
  title: string
  summary: string
  href: string
  /** URL de vista previa (`ImgPreview` en Strapi) */
  imageSrc?: string
}

export type WebDevelopResourcesProps = {
  title: string
  description: string
  /** Primera imagen de blog con `ImgPreview` (cabecera de la sección) */
  headerPreviewSrc?: string
  headerPreviewAlt?: string
  buttonText: string
  buttonUrl: string
  items: WebDevelopResourceItem[]
}
