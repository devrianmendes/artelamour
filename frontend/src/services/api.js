import axios from 'axios';
import { parseCookies } from 'nookies';

export const apiClient = () => {
  let cookies = parseCookies()
  const api = axios.create({
    baseURL: 'http://localhost:7070',
    headers: {
      Authorization: `Bearer ${cookies[`@artelamour.token`]}`
    }
  })
} 