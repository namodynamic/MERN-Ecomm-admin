import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Link from "antd/es/typography/Link";
import { getCoupons } from "../features/coupon/couponSlice";
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  if (couponState) {
    for (let i = 0; i < couponState.length; i++) {
      data1.push({
        key: i + 1,
        name: couponState[i].name,
        discount: couponState[i].discount,
        expiry: new Date(couponState[i].expiry).toLocaleString(),
        action: (
          <>
            <Link className="fs-3 text-warning" to="/">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  }
  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Couponlist;
