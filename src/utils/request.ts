import axios from "axios";

// const BASE_URL = "http://dsdt.people.cn";
const BASE_URL = location.origin;
const service = axios.create({
  baseURL: BASE_URL,
});

const { request } = service;

export default request;
