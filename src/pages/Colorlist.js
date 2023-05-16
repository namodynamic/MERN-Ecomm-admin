import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteColor,
  getColors,
  resetState,
} from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
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
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);
  const colorstate = useSelector((state) => state.color.colors);
  const data1 = [];
  if (colorstate) {
    for (let i = 0; i < colorstate.length; i++) {
      data1.push({
        key: i + 1,
        name: colorstate[i].title,
        action: (
          <>
            <Link
              className="fs-3 text-warning"
              to={`/admin/color/${colorstate[i]._id}`}
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(colorstate[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }
  const delColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Colorlist;
