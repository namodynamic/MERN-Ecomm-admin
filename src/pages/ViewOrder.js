import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../features/auth/authSlice";
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
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  const orderstate = useSelector((state) => state?.auth?.singleOrder?.orders);

  const data1 = [];
  for (let i = 0; i < orderstate?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderstate.orderItems[i]?.product.title,
      brand: orderstate.orderItems[i]?.product.brand,
      quantity: orderstate.orderItems[i]?.quantity,
      amount: orderstate.orderItems[i]?.price,
      color: orderstate.orderItems[i]?.color?.title,
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
