import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import { object, string, number, array } from "yup";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice";

let userSchema = object({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
  price: number().required("Price is required"),
  brand: string().required("Brand is required"),
  category: string().required("Category is required"),
  color: array().required("Colors are required"),
  quantity: number().required("Quantity is required"),
});
const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandstate = useSelector((state) => state.brand.brands);
  const categorystate = useSelector((state) => state.pcategory.pcategories);
  const colorstate = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);

  const colors = [];
  colorstate.forEach((i) => {
    colors.push({
      _id: i._id,
      color: i.title,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color;
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
    },
  });
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div className="mb-3">
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onCh={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <div className="">
              <p className="sub-title mt-3 mb-0">Product Description:</p>
              <ReactQuill
                theme="snow"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
              <div className="error">
                {formik.touched.description && formik.errors.description}
              </div>
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandstate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id="category"
          >
            <option value="">Select Category</option>
            {categorystate.map((i, j) => {
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
          <Multiselect
            placeholder="Select Color"
            name="color"
            dataKey="id"
            textField="color"
            data={colors}
            onChange={(e) => setColor(e)}
          />

          <CustomInput
            name="quantity"
            onCh={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            val={formik.values.quantity}
            type="number"
            label="Enter Product Quantity"
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
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
          <div className="showimages d-flex flex-wrap gap-3">
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
