import axios from 'axios'

const url = '../../../db.json'
console.log(url)

export const getPersons = async () => {
  const res = await axios.get(url)
  return res.data
}

export const addPerson = async (person) => {
  const res = await axios.post(url, person)
  return res.data
}

export const deletePerson = async (id) => {
  const res = await axios.delete(`${url}/${id}`)
  return res.data
}

export const updatePerson = async (newPerson, id) => {
  const res = await axios.put(`${url}/${id}`, newPerson)
  return res.data
}
