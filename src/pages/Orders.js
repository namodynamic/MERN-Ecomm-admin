import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderstate = useSelector((state) => state.auth.orders);

  const data1 = [];
  if (orderstate) {
    for (let i = 0; i < orderstate.length; i++) {
      data1.push({
        key: i + 1,
        name: orderstate[i].orderby.firstname,
        product: (
          <Link to={`/admin/order/${orderstate[i].orderby._id}`}>
            View Orders
          </Link>
        ),
        amount: orderstate[i].paymentIntent.amount,
        date: new Date(orderstate[i].createdAt).toLocaleString(),
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
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orders;
