import { SelectBoxDto } from '@/types/dtos/SelectBoxDto'

export const transformSelctBoxData = (data: SelectBoxDto[]) => {
  return data.map(item => ({
    value: item.value,
    text: item.code ? `(${item.code}) ${item.text}` : `${item.text}`
  }))
}
