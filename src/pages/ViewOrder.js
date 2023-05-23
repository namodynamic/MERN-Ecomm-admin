import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUser } from "../features/auth/authSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderstate = useSelector(
    (state) => state.auth.orderbyuser[0].products || []
  );

  const data1 = [];
  for (let i = 0; i < orderstate.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate[i].product && orderstate[i].product.title,
      brand: orderstate[i].product && orderstate[i].product.brand,
      count: orderstate[i].count,
      amount: orderstate[i].product && orderstate[i].product.price,
      color: orderstate[i].product && orderstate[i].product.color,
      date: orderstate[i].product && orderstate[i].product.createdAt,

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

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
