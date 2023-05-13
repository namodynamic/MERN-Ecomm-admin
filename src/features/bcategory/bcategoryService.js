import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";
const getBcategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);

  return response.data;
};
const createBcategory = async (blogcategory) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    blogcategory,
    config
  );

  return response.data;
};

const bcategoryService = {
  getBcategories,
  createBcategory,
};
export default bcategoryService;
