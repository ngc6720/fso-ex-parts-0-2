import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () =>
  axios.get(baseUrl).then((res) => [
    ...res.data,
    { id: "897054", name: "Absent from Db (testing)", number: "5423105" }, // testing
  ]);

const create = (person: Person) =>
  axios.post(baseUrl, person).then((res) => res.data);

const remove = (id: string) =>
  axios.delete(`${baseUrl}/${id}`).then((res) => res.data);

const update = (id: string, updatedPerson: Person) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson).then((res) => res.data);

export default { getAll, create, remove, update };
