import { useHead } from '@vueuse/head'
import type { SeoMeta } from '../types/home-portfolio.model'

export function usePageSeo(seo: () => SeoMeta | undefined) {
  useHead(() => {
    const s = seo()
    if (!s) {
      return { title: undefined }
    }
    if (s.hideFromSearchEngines) {
      return {
        meta: [{ name: 'robots', content: 'noindex, nofollow' }],
      }
    }

    const meta: Array<Record<string, string>> = []
    if (s.metaDescription) {
      meta.push({ name: 'description', content: s.metaDescription })
    }
    if (s.metaRobots) {
      meta.push({ name: 'robots', content: s.metaRobots })
    }
    if (s.ogTitle) {
      meta.push({ property: 'og:title', content: s.ogTitle })
    }
    if (s.ogDescription) {
      meta.push({ property: 'og:description', content: s.ogDescription })
    }
    if (s.ogType) {
      meta.push({ property: 'og:type', content: s.ogType })
    }
    if (s.canonicalURL) {
      meta.push({ property: 'og:url', content: s.canonicalURL })
    }
    if (s.twitterCard) {
      meta.push({ name: 'twitter:card', content: s.twitterCard })
    }
    const twitterTitle = s.twitterTitle ?? s.ogTitle ?? s.metaTitle
    if (twitterTitle) {
      meta.push({ name: 'twitter:title', content: twitterTitle })
    }
    const twitterDesc = s.twitterDescription ?? s.ogDescription ?? s.metaDescription
    if (twitterDesc) {
      meta.push({ name: 'twitter:description', content: twitterDesc })
    }

    const link: Array<Record<string, string>> = []
    if (s.canonicalURL) {
      link.push({ rel: 'canonical', href: s.canonicalURL })
    }

    const script: Array<{ type: string; innerHTML: string }> = []
    if (s.structuredData && Object.keys(s.structuredData).length > 0) {
      script.push({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(s.structuredData),
      })
    }

    return {
      title: s.metaTitle,
      meta,
      link,
      ...(script.length > 0 && { script }),
    }
  })
}
