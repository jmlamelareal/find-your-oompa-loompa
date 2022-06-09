export type OompaLoompaInfo = {
  first_name: string
  last_name: string
  favorite: {
    color: string
    food: string
    random_string: string
    song: string
  }
  gender: string // Puede tener typo
  image: string
  profession: string
  email: string
  age: number
  country: string
  height: number
  id: number
}

export type OompaLoompasDetailed = OompaLoompaInfo & {
  description: string
  quota: string
}
