export type WebDevelopResourceItem = {
  id: string
  title: string
  summary: string
  href: string
}

export type WebDevelopResourcesProps = {
  title: string
  description: string
  buttonText: string
  buttonUrl: string
  items: WebDevelopResourceItem[]
}
