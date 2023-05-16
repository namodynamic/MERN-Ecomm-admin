import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "react-toastify";
import {
  createColor,
  getColor,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

let userSchema = object({
  title: string().required("Color is required"),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");
    }
    if (updatedColor && isSuccess) {
      toast.success("Color Updated Successfully!");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
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
        {getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            name="title"
            onCh={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-o rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Update" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
