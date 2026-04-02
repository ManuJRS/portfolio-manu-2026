import qs from 'qs'

/**
 * Populate del dynamic zone `sections` de web-develop.
 * `populate=*` no incluye medios anidados en relaciones (p. ej. blogs_articles → ImgPreview).
 */
export function buildWebDevelopQuery(): string {
  return qs.stringify(
    {
      locale: '',
      populate: {
        Seo: true,
        sections: {
          on: {
            'components.web-develop-hero': { populate: ['MediaHero'] },
            'components.web-develop-video': { populate: '*' },
            'components.web-develop-timeline': { populate: '*' },
            'components.web-develop-resources': {
              populate: {
                blogs_articles: {
                  populate: ['ImgPreview'],
                },
              },
            },
            'components.portfolio-preview': { populate: '*' },
            'components.card-solution': {
              populate: {
                Cards: {
                  populate: ['image'],
                },
              },
            },
            'components.cards-section': {
              populate: '*',
            },
            'components.how-i-do': {
              populate: '*',
            },
            'components.comment-secction': true,
            'components.cards-title': {
              populate: '*',
            },
            'components.logos': {
              populate: '*',
            },
            'components.form-web': true,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  )
}
