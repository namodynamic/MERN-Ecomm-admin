import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { resetState } from "../features/color/colorSlice";
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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },

  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquirystate = useSelector((state) => state.enquiry.enquiries);
  const data1 = [];
  if (enquirystate) {
    for (let i = 0; i < enquirystate.length; i++) {
      data1.push({
        key: i + 1,
        name: enquirystate[i].name,
        email: enquirystate[i].email,
        mobile: enquirystate[i].mobile,
        status: (
          <>
            <select
              name=""
              defaultValue={enquirystate[i].status || "Submitted"}
              className="form-control form-select"
              id=""
              onChange={(e) =>
                setEnquiryStatus(e.target.value, enquirystate[i]._id)
              }
            >
              <option value="submitted">Submitted</option>
              <option value="contacted">Contacted</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </>
        ),
        action: (
          <>
            <Link
              className="ms-3 fs-3 text-secondary"
              to={`/admin/enquiries/${enquirystate[i]._id}`}
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(enquirystate[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    }
  }
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enquiryData: e };
    dispatch(updateEnquiry(data));
  };
  const delEnquiry = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          delEnquiry(enquiryId);
        }}
        title="Are you sure you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquiries;
