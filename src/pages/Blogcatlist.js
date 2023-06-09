import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteBcategory,
  getBcategories,
  resetState,
} from "../features/bcategory/bcategorySlice";
import CustomModal from "../components/CustomModal";
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
  const [open, setOpen] = useState(false);
  const [blogCatId, setBlogcatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogcatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
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
            <Link
              className="fs-3 text-warning"
              to={`/admin/blog-category/${blogcategoryState[i]._id}`}
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(blogcategoryState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }
  const delBlogCat = async(e) => {
    await dispatch(deleteBcategory(e));
    setOpen(false);
    setTimeout(async() => {
     await dispatch(getBcategories());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delBlogCat(blogCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};

export default Blogcatlist;
