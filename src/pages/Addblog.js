import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../features/blogs/blogSlice";
import { getBcategories } from "../features/bcategory/bcategorySlice";

let userSchema = object({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
  category: string().required("Category is required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBcategories());
  }, [dispatch]);

  const imgState = useSelector((state) => state.upload.images);
  const bCategoryState = useSelector((state) => state.bcategory.bcategories);
  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/blog-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <select
            name="category"
            className="form-control py-3 mt-3"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            id="category"
          >
            <option value="">Select Blog Category</option>
            {bCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap mt-3 gap-3">
            {imgState.map((i, j) => {
              return (
                <div key={j} className="position-relative">
                  <button
                    type="buttun"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute bg-danger end-0 top-0"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-o rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
