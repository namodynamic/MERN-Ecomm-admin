import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  deleteCoupon,
  getCoupons,
  resetState,
} from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Coupon Name",
    dataIndex: "name",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, [dispatch]);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];

  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry: moment(couponState[i].expiry).format("YYYY-MM-DD"),
      action: (
        <>
          <Link
            className="fs-3 text-warning"
            to={`/admin/coupon/${couponState[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delCoupon = (e) => {
    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delCoupon(couponId);
        }}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Couponlist;
