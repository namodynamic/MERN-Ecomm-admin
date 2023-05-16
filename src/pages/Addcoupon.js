import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { object, string, date, number } from "yup";
import { toast } from "react-toastify";
import moment from "moment";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";

let userSchema = object({
  name: string().required("Coupon name is required"),
  expiry: date().required("Expiry Date is required"),
  discount: number().required("Discount Percentage is required"),
});

const Addcoupon = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    updatedCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
  } = newCoupon;

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Created Successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");
      navigate("/admin/coupon-list");
    }
    if (isError && couponName && couponDiscount && couponExpiry) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: couponExpiry ? moment(couponExpiry).format("YYYY-MM-DD") : "",
      discount: couponDiscount || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
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
        {getCouponId !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onCh={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            val={formik.values.name}
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            id="expiry"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>

          <button
            className="btn btn-success border-o rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? "Update" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
