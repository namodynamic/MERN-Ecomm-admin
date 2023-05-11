import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Link from "antd/es/typography/Link";
import { getBcategories } from "../features/bcategory/bcategorySlice";
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Blogcatlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBcategories());
  }, [dispatch]);
  const blogcategoryState = useSelector((state) => state.bcategory.bcategories);
  const data1 = [];
  if (blogcategoryState) {
    for (let i = 0; i < blogcategoryState.length; i++) {
      data1.push({
        key: i + 1,
        name: blogcategoryState[i].title,

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
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Blogcatlist;
