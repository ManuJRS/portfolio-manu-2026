import type { StrapiSeoDto } from '@/features/home/types/strapi-home-portfolio.dto'
import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'

export type StrapiWebDevelopResponse = {
  data: StrapiWebDevelopDocument | null
}

export type StrapiWebDevelopDocument = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  title?: string
  slug?: string
  sections?: StrapiWebDevelopDynamicZoneBlock[]
  /** Componente SEO en Strapi; a veces viene envuelto en `{ data }` */
  Seo?: StrapiSeoDto | { data: StrapiSeoDto | null } | null
  seo?: StrapiSeoDto | { data: StrapiSeoDto | null } | null
}

export type StrapiWebDevelopHeroBlockDto = {
  __component: 'components.web-develop-hero'
  id: number
  Title?: string | null
  text?: string | null
  Tag?: string | null
  TextBtn?: string | null
  UrlBtn?: string | null
  MediaHero?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
  mediaHero?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
}

export type StrapiWebDevelopVideoFeatureItemDto = {
  id: number
  Title?: string | null
  icons?: string | null
  description?: string | null
}

export type StrapiWebDevelopVideoBlockDto = {
  __component: 'components.web-develop-video'
  id: number
  Title?: string | null
  description?: string | null
  media?: StrapiMediaDto | null
  features?: StrapiWebDevelopVideoFeatureItemDto[] | null
}

export type StrapiWebDevelopTimelineItemDto = {
  id: number
  icons?: string | null
  Title?: string | null
  description?: string | null
}

export type StrapiWebDevelopTimelineBlockDto = {
  __component: 'components.web-develop-timeline'
  id: number
  Title?: string | null
  description?: string | null
  items?: StrapiWebDevelopTimelineItemDto[] | null
}

export type StrapiWebDevelopBlogEntryDto = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  title?: string | null
  Title?: string | null
  slug?: string | null
  Slug?: string | null
  descriptionProyect?: string | null
  DescriptionProyect?: string | null
  ImgPreview?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
  imgPreview?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
  img_preview?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
}

export type StrapiWebDevelopResourcesBlockDto = {
  __component: 'components.web-develop-resources'
  id: number
  Title?: string | null
  description?: string | null
  /** URL del CTA principal (cabecera) */
  btnUrl?: string | null
  /** Texto del CTA principal */
  btnText?: string | null
  /** Relación con artículos de blog (nombre en API Strapi); a veces viene como `{ data: [...] }` */
  blogs_articles?:
    | StrapiWebDevelopBlogEntryDto[]
    | { data: StrapiWebDevelopBlogEntryDto[] | StrapiWebDevelopBlogEntryDto | null }
    | null
  /** Nombre legacy / alternativo */
  blogs?: StrapiWebDevelopBlogEntryDto[] | null
}

export type StrapiPortfolioPreviewBlockDto = {
  __component: 'components.portfolio-preview'
  id: number
  Title?: string | null
  Description?: string | null
  FirstTag?: string | null
  FirstTitle?: string | null
  FirstDescription?: string | null
  FirstTextUrl?: string | null
  FirstTextBtn?: string | null
  FirstImg?: StrapiMediaDto | null
  SecondTitle?: string | null
  SecondTag?: string | null
  SecondDescription?: string | null
  SecondTextUrl?: string | null
  SecondTextBtn?: string | null
  SecondImg?: StrapiMediaDto | null
}

/** Ítem repetible dentro de `components.card-solution` (`Cards` en API). */
export type StrapiCardSolutionItemDto = {
  id: number
  icon?: string | null
  title?: string | null
  Title?: string | null
  description?: string | null
  itemOne?: string | null
  itemTwo?: string | null
  itemThree?: string | null
  image?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
}

export type StrapiCardSolutionBlockDto = {
  __component: 'components.card-solution'
  id: number
  tag?: string | null
  Tag?: string | null
  title?: string | null
  Title?: string | null
  ctaText?: string | null
  CtaText?: string | null
  ctaTitle?: string | null
  CtaTitle?: string | null
  ctaLink?: string | null
  CtaLink?: string | null
  Cards?: StrapiCardSolutionItemDto[] | null
  cards?: StrapiCardSolutionItemDto[] | null
}

/** Ítem repetible dentro de `components.cards-section` (`Cards` en API). */
export type StrapiCardsSectionItemDto = {
  id: number
  icon?: string | null
  title?: string | null
  Title?: string | null
  description?: string | null
  iconOne?: string | null
  iconTwo?: string | null
  iconThree?: string | null
  IconOne?: string | null
  IconTwo?: string | null
  IconThree?: string | null
}

export type StrapiCardsSectionBlockDto = {
  __component: 'components.cards-section'
  id: number
  tag?: string | null
  Tag?: string | null
  title?: string | null
  Title?: string | null
  Cards?: StrapiCardsSectionItemDto[] | null
  cards?: StrapiCardsSectionItemDto[] | null
}

/** Ítem repetible dentro de `components.how-i-do` (`Cards` en API). */
export type StrapiHowIDoCardDto = {
  id: number
  number?: string | null
  title?: string | null
  Title?: string | null
  description?: string | null
}

export type StrapiHowIDoBlockDto = {
  __component: 'components.how-i-do'
  id: number
  tag?: string | null
  Tag?: string | null
  title?: string | null
  Title?: string | null
  Cards?: StrapiHowIDoCardDto[] | null
  cards?: StrapiHowIDoCardDto[] | null
  imageOne?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
  imageTwo?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
  ImageOne?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
  ImageTwo?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
}

/** Bloque consultivo (UID Strapi con typo `secction`). */
export type StrapiCommentSecctionBlockDto = {
  __component: 'components.comment-secction'
  id: number
  title?: string | null
  Title?: string | null
  description?: string | null
  Description?: string | null
  itemOne?: string | null
  itemTwo?: string | null
  itemThree?: string | null
  itemFour?: string | null
  ItemOne?: string | null
  ItemTwo?: string | null
  ItemThree?: string | null
  ItemFour?: string | null
}

/** Ítem repetible dentro de `components.cards-title` (`cards` / `Cards` en API). */
export type StrapiCardsTitleItemDto = {
  id: number
  title?: string | null
  Title?: string | null
  subtitle?: string | null
  Subtitle?: string | null
  description?: string | null
  Description?: string | null
}

export type StrapiCardsTitleBlockDto = {
  __component: 'components.cards-title'
  id: number
  tag?: string | null
  Tag?: string | null
  title?: string | null
  Title?: string | null
  cards?: StrapiCardsTitleItemDto[] | null
  Cards?: StrapiCardsTitleItemDto[] | null
}

/** Relación múltiple de medios (`logo` en API; a veces `Logos` / `logos`). */
export type StrapiLogosMediaField =
  | StrapiMediaDto[]
  | { data: StrapiMediaDto[] | StrapiMediaDto | null }
  | null
  | undefined

export type StrapiLogosBlockDto = {
  __component: 'components.logos'
  id: number
  title?: string | null
  Title?: string | null
  logo?: StrapiLogosMediaField
  Logo?: StrapiLogosMediaField
  logos?: StrapiLogosMediaField
  Logos?: StrapiLogosMediaField
}

/** Opción del select: string o objeto `{ label, value }` desde Strapi. */
export type StrapiFormWebSelectOptionEntry = string | { label?: string; value?: string; Label?: string; Value?: string }

export type StrapiFormWebBlockDto = {
  __component: 'components.form-web'
  id: number
  title?: string | null
  Title?: string | null
  description?: string | null
  Description?: string | null
  inputName?: string | null
  InputName?: string | null
  inputEmail?: string | null
  InputEmail?: string | null
  inputStage?: string | null
  InputStage?: string | null
  inputMessage?: string | null
  InputMessage?: string | null
  btnText?: string | null
  BtnText?: string | null
  /** Valor u opción por defecto del desplegable (texto mostrado). */
  select?: string | null
  Select?: string | null
  /** Lista de opciones; si falta, se deduce a partir de `select` + valores por defecto. */
  selectOptions?: StrapiFormWebSelectOptionEntry[] | null
  SelectOptions?: StrapiFormWebSelectOptionEntry[] | null
}

export type StrapiWebDevelopUnknownBlockDto = {
  __component: string
  id: number
}

export type StrapiWebDevelopDynamicZoneBlock =
  | StrapiWebDevelopHeroBlockDto
  | StrapiWebDevelopVideoBlockDto
  | StrapiWebDevelopTimelineBlockDto
  | StrapiWebDevelopResourcesBlockDto
  | StrapiPortfolioPreviewBlockDto
  | StrapiCardSolutionBlockDto
  | StrapiCardsSectionBlockDto
  | StrapiHowIDoBlockDto
  | StrapiCommentSecctionBlockDto
  | StrapiCardsTitleBlockDto
  | StrapiLogosBlockDto
  | StrapiFormWebBlockDto
  | StrapiWebDevelopUnknownBlockDto
