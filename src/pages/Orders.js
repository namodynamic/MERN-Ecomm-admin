import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
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
  const orderstate = useSelector((state) => state.auth.orders.orders);

  const data1 = [];
  if (orderstate) {
    for (let i = 0; i < orderstate?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderstate[i]?.user?.firstname,
        product: (
          <Link to={`/admin/order/${orderstate[i]?._id}`}>View Orders</Link>
        ),
        amount: orderstate[i]?.totalPrice,
        date: new Date(orderstate[i]?.createdAt).toLocaleString(),
        action: (
          <>
            <select
              name=""
              defaultValue={orderstate[i]?.orderStatus}
              onChange={(e) =>
                updateOrderStatus(orderstate[i]?._id, e.target.value)
              }
              className="form-control form-select"
              id=""
            >
              <option value="" disabled>
                Ordered
              </option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </>
        ),
      });
    }
  }
  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }));
  };
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
