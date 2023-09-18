namespace API {
  export interface Card {
    id: number
    thumbnail: string
    keyword: string
    comment: string
    title: string
    regDate: string
  }
  export interface Detail {
    post: Post
    product: Product[]
    prev: Both
    next: Both
  }
  export interface Category {
    id: number | undefined
    categoryName: string
  }
  export interface User {}

  export interface Meta {
    title: string
    content: string[]
  }
}

interface Both {
  id: number
  title: string
}

interface Product {
  productName: string
  coupangLink: string
  imageLink: string
  point1: string
  point2: string
  point3: string
}

interface Post {
  id: string
  comment: string
  keyword: string
  title: string
  regDate: string
}
