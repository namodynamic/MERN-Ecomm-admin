import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Link from "antd/es/typography/Link";
const columns = [
  {
    title: "S/N",
    dataIndex: "key",
  },
  {
    title: "Brand Name",
    dataIndex: "name",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const brandstate = useSelector((state) => state.brand.brands);
  const data1 = [];
  if (brandstate) {
    for (let i = 0; i < brandstate.length; i++) {
      data1.push({
        key: i + 1,
        name: brandstate[i].title,
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
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
