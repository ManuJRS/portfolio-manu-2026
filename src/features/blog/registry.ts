import type { Component } from 'vue'
import BlogArticleCodeBlock from './components/BlogArticleCodeBlock.vue'
import BlogArticleContent from './components/BlogArticleContent.vue'
import BlogArticleContentList from './components/BlogArticleContentList.vue'
import BlogArticleIntro from './components/BlogArticleIntro.vue'

export const blogArticleBlockRegistry: Record<string, Component> = {
  'components.blog-hero': BlogArticleIntro,
  'components.blog-content': BlogArticleContent,
  'components.content-list': BlogArticleContentList,
  'shared.code-block': BlogArticleCodeBlock,
}

export function resolveBlogArticleBlock(component: string): Component | undefined {
  return blogArticleBlockRegistry[component]
}
