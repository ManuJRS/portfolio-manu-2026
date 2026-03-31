import qs from 'qs'
import type { AppLocale } from '@/features/home/types/locale'

export function buildHomeQuery(locale: AppLocale = 'es'): string {
  return qs.stringify(
    {
      locale,
      populate: {
        Seo: true,
        sections: {
          on: {
            'components.hero-minimalf': true,
            'components.profile-highlight': {
              // Solo claves que existan en el schema de Strapi para este componente.
              // Si añades un campo media para vídeo, usa aquí su nombre API exacto (p. ej. `video: true`).
              populate: {
                image: true,
                socialLinks: true,
              },
            },
            'components.stack-grid': {
              populate: ['item'],
            },
            'components.project-hero-dark': {
              populate: ['featuredImage'],
            },
            'components.media-content-split': true,
            'components.project-text-media': true,
            'components.project-technical-breakdown': true,
            'components.selected-works': {
              populate: {
                selectedWorks: {
                  populate: {
                    imgPreview: true,
                  },
                },
              },
            },
            'components.calification': {
              populate: {
                Coment: {
                  populate: {
                    Tag: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true }
  )
}