import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/pcategory/pcategorySlice";
import Link from "antd/es/typography/Link";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const categorystate = useSelector((state) => state.pcategory.pcategories);
  const data1 = [];
  for (let i = 0; i < categorystate.length; i++) {
    data1.push({
      key: i + 1,
      name: categorystate[i].title,
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
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorylist;
