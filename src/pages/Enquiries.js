import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";
import { AiFillDelete } from "react-icons/ai";
import Link from "antd/es/typography/Link";
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
  const dispatch = useDispatch();
  useEffect(() => {
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
            <select name="" className="form-control form-select" id="">
              <option value="">Set Status</option>
            </select>
          </>
        ),
        action: (
          <>
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
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
