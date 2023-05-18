import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import {
  createBcategory,
  getBcategory,
  resetState,
  updateABcategory,
} from "../features/bcategory/bcategorySlice";

let userSchema = object({
  title: string().required("Blog category name is required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogcatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBcategory,
    updatedBcategory,
    bcategoryName,
  } = newBlogCategory;
  useEffect(() => {
    if (getBlogcatId !== undefined) {
      dispatch(getBcategory(getBlogcatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogcatId]);
  useEffect(() => {
    if (isSuccess && createdBcategory) {
      toast.success("Blog Category Added Successfully!");
    }
    if (isSuccess && updatedBcategory) {
      toast.success("Blog Category Updated Successfully!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bcategoryName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogcatId !== undefined) {
        const data = { id: getBlogcatId, bcategoryData: values };
        dispatch(updateABcategory(data));
      } else {
        dispatch(createBcategory(values));
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
        {getBlogcatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogcategory"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-o rounded-3 my-5"
            type="submit"
          >
            {getBlogcatId !== undefined ? "Update" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
