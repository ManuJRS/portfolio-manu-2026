export type LayoutCopyright = {
  year: string
  text: string
}

export type NavIconKey = 'house' | 'person'

export type LayoutNavItem = {
  name: string
  icon: NavIconKey
}

export type LayoutNav = {
  showLangs: boolean
  items: LayoutNavItem[]
}

export type LayoutFloatingItem = {
  text: string
  url: string
}

export type LayoutFloatingMenu = {
  showFloatingBtn: boolean
  showContactItem: boolean
  showShareItem: boolean
  items: LayoutFloatingItem[]
}

export type LayoutContent = {
  titleLeft: string
  messageRight: string
  copyright: LayoutCopyright
  nav: LayoutNav
  floating: LayoutFloatingMenu
}
