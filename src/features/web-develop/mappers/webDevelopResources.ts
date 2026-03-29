import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import type {
  StrapiWebDevelopBlogEntryDto,
  StrapiWebDevelopResourcesBlockDto,
} from '../types/strapi-web-develop.dto'
import type { WebDevelopResourcesProps } from '../types/web-develop-resources.model'

function blogArticleHref(slug: string | null | undefined): string {
  const s = slug?.trim()
  if (!s) return '#'
  return `/desarrollo-web/blog/${encodeURIComponent(s)}`
}

function blogTitle(blog: StrapiWebDevelopBlogEntryDto): string {
  return blog.title?.trim() || blog.Title?.trim() || ''
}

function blogDescriptionProyect(blog: StrapiWebDevelopBlogEntryDto): string {
  return blog.DescriptionProyect?.trim() || blog.descriptionProyect?.trim() || ''
}

function resolveStrapiMediaUrl(url: string): string {
  const u = url.trim()
  if (!u || u.startsWith('http')) return u
  const base = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`
}

function imageSrcFromMedia(media: StrapiMediaDto | null | undefined): string {
  if (!media) return ''
  const raw =
    media.formats?.large?.url ??
    media.formats?.medium?.url ??
    media.formats?.small?.url ??
    media.url ??
    ''
  return resolveStrapiMediaUrl(raw)
}

function unwrapEntries<T>(raw: T[] | { data: T | T[] | null } | null | undefined): T[] {
  if (raw == null) return []
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'object' && 'data' in raw) {
    const d = (raw as { data: T | T[] | null }).data
    if (d == null) return []
    return Array.isArray(d) ? d : [d]
  }
  return []
}

function unwrapMedia(
  raw: StrapiMediaDto | { data: StrapiMediaDto | null } | null | undefined,
): StrapiMediaDto | null {
  if (raw == null) return null
  if (typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: StrapiMediaDto | null }).data ?? null
  }
  return raw as StrapiMediaDto
}

function blogPreviewSrc(blog: StrapiWebDevelopBlogEntryDto): string | undefined {
  const raw =
    blog.ImgPreview ?? blog.imgPreview ?? blog.img_preview ?? null
  const media = unwrapMedia(raw)
  const src = imageSrcFromMedia(media)
  return src || undefined
}

function blogsFromBlock(block: StrapiWebDevelopResourcesBlockDto): StrapiWebDevelopBlogEntryDto[] {
  const fromArticles = unwrapEntries<StrapiWebDevelopBlogEntryDto>(block.blogs_articles as never)
  if (fromArticles.length) return fromArticles
  return unwrapEntries<StrapiWebDevelopBlogEntryDto>(block.blogs as never)
}

export function mapWebDevelopResourcesFromStrapi(
  block: StrapiWebDevelopResourcesBlockDto,
): WebDevelopResourcesProps {
  const blogs = blogsFromBlock(block)

  const items = blogs.map((blog) => {
    const imageSrc = blogPreviewSrc(blog)
    return {
      id: String(blog.id),
      title: blogTitle(blog),
      summary: blogDescriptionProyect(blog),
      href: blogArticleHref(blog.slug ?? blog.Slug),
      ...(imageSrc && { imageSrc }),
    }
  })

  const first = blogs[0]
  const blockTitle = block.Title?.trim() || ''
  const blockDescription = block.description?.trim() || ''

  let headerPreviewSrc: string | undefined
  let headerPreviewAlt: string | undefined
  for (const blog of blogs) {
    const src = blogPreviewSrc(blog)
    if (src) {
      headerPreviewSrc = src
      headerPreviewAlt = blogTitle(blog) || undefined
      break
    }
  }

  return {
    title: blockTitle || (first ? blogTitle(first) : ''),
    description: blockDescription || (first ? blogDescriptionProyect(first) : ''),
    ...(headerPreviewSrc && { headerPreviewSrc, headerPreviewAlt }),
    buttonText: block.btnText?.trim() || '',
    buttonUrl: block.btnUrl?.trim() || '#',
    items,
  }
}
