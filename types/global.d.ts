export {}

declare global {
  interface Game {
    _id?: string,
    title: string,
    releaseDate: string,
    genre: string,
    createdAt?: string,
    updatedAt?: string
  }
  type RootStackParamList = {
    Directory: undefined;
    GamePage: { id: string };
    Login: undefined;
    SignUp: undefined;
  };
}