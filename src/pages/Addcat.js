import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import {
  createPcategory,
  getAProductCategory,
  resetState,
  updateProductCategory,
} from "../features/pcategory/pcategorySlice";

let userSchema = object({
  title: string().required("Category name is required"),
});
const Addcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getpCategoryId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdPcategory,
    categoryName,
    updatedPcategory,
  } = newCategory;
  useEffect(() => {
    if (getpCategoryId !== undefined) {
      dispatch(getAProductCategory(getpCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getpCategoryId]);
  useEffect(() => {
    if (isSuccess && createdPcategory) {
      toast.success("Category Added Successfully!");
    }
    if (updatedPcategory && isSuccess) {
      toast.success("Product Category Updated Successfully!");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getpCategoryId !== undefined) {
        const data = { id: getpCategoryId, pcategoryData: values };
        dispatch(updateProductCategory(data));
      } else {
        dispatch(createPcategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getpCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-o rounded-3 my-5"
            type="submit"
          >
            {getpCategoryId !== undefined ? "Update" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
