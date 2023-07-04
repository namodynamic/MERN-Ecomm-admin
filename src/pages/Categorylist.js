import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
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
  const [open, setOpen] = useState(false);
  const [pCategoryId, setpCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
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
          <Link
            className="fs-3 text-warning"
            to={`/admin/category/${categorystate[i]._id}`}
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(categorystate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const delProductCategory = async(e) => {
    await dispatch(deleteProductCategory(e));
    setOpen(false);
    setTimeout(async() => {
      await dispatch(getCategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delProductCategory(pCategoryId);
        }}
        title="Are you sure you want to delete this product category?"
      />
    </div>
  );
};

export default Categorylist;
