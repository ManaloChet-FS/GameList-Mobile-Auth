import axios from "axios";

const API_BASE = "https://gamelist-api-auth-production.up.railway.app/api/v1";
const API_URL = "games"

const getAllPrivateGames = () => {
  return axios.get(`${API_BASE}/${API_URL}`)
}

const getPrivateGame = async (id: string) => {
  return axios.get(`${API_BASE}/${API_URL}/${id}`)
}

const createPrivateGame = async (game: Game) => {
  return axios.post(`${API_BASE}/${API_URL}`, game)
}

const updatePrivateGame = async (id: string, game: Game) => {
  return axios.put(`${API_BASE}/${API_URL}/${id}`, game)
}

const deletePrivateGame = async (id: string) => {
  return axios.delete(`${API_BASE}/${API_URL}/${id}`)
}

const gamesService = {
  getAllPrivateGames,
  getPrivateGame,
  createPrivateGame,
  updatePrivateGame,
  deletePrivateGame
}

export default gamesService;