declare namespace Manga {
  interface Instance {
    id: string
    name: string
    path: string
    invalid: boolean
  }

  type Reader = 'scroll' | 'turn'
}