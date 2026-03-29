/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_URL?: string
  readonly VITE_STRAPI_WEB_DEVELOP_ENDPOINT?: string
  readonly VITE_STRAPI_WEB_DEVELOP_ENDPOINT_BLOG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
