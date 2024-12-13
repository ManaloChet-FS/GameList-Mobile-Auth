export {}

declare global {
  interface Game {
    _id: string,
    title: string,
    releaseDate: string,
    genre: string,
    createdAt: string,
    updatedAt: string
  }
}