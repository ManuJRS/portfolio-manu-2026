import type {
  StrapiFormWebBlockDto,
  StrapiFormWebSelectOptionEntry,
} from '../types/strapi-web-develop.dto'
import type { FormWebProps } from '../types/form-web.model'

function normalizeSelectOptionEntry(entry: StrapiFormWebSelectOptionEntry | null | undefined): string {
  if (entry == null) return ''
  if (typeof entry === 'string') return entry.trim()
  const label = entry.label ?? entry.Label
  if (typeof label === 'string' && label.trim()) return label.trim()
  const value = entry.value ?? entry.Value
  if (typeof value === 'string' && value.trim()) return value.trim()
  return ''
}

const FALLBACK_OPTIONS = ['Página desde cero', 'Migración o rediseño', 'Mantenimiento y evolución']

function buildSelectOptions(
  block: StrapiFormWebBlockDto,
  explicitDefault: string,
): { options: string[]; selectDefault: string } {
  const raw = block.selectOptions ?? block.SelectOptions ?? []
  const fromCms = raw.map(normalizeSelectOptionEntry).filter(Boolean)

  let options: string[]
  if (fromCms.length > 0) {
    options = [...fromCms]
  } else if (explicitDefault) {
    options = [
      explicitDefault,
      ...FALLBACK_OPTIONS.filter((o) => o !== explicitDefault),
    ]
  } else {
    options = [...FALLBACK_OPTIONS]
  }

  const defaultFromField = explicitDefault || options[0] || ''
  const selectDefault = options.includes(defaultFromField)
    ? defaultFromField
    : (options[0] ?? '')

  return { options, selectDefault }
}

const DEFAULT_TITLE = 'Calculador de Presupuesto Web'
const DEFAULT_DESCRIPTION =
  'Cuéntanos un poco sobre tu visión y te enviaremos una estimación técnica inicial en menos de 24 horas.'

export function mapFormWebFromStrapi(block: StrapiFormWebBlockDto): FormWebProps {
  const selectField = block.select?.trim() || block.Select?.trim() || ''
  const { options, selectDefault } = buildSelectOptions(block, selectField)

  return {
    title: block.title?.trim() || block.Title?.trim() || DEFAULT_TITLE,
    description:
      block.description?.trim() || block.Description?.trim() || DEFAULT_DESCRIPTION,
    inputName: block.inputName?.trim() || block.InputName?.trim() || 'Nombre completo',
    inputEmail: block.inputEmail?.trim() || block.InputEmail?.trim() || 'Email',
    inputStage:
      block.inputStage?.trim() ||
      block.InputStage?.trim() ||
      'En qué etapa está el proyecto',
    inputMessage:
      block.inputMessage?.trim() || block.InputMessage?.trim() || 'Cuéntanos sobre tu idea',
    btnText: block.btnText?.trim() || block.BtnText?.trim() || 'Enviar',
    selectOptions: options,
    selectDefault,
  }
}
