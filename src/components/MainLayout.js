import React, { useState } from "react";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiFillDashboard,
} from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineColorLens, MdNotifications } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { FaClipboardList, FaBlogger, FaBlog } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { TbCategory2 } from "react-icons/tb";
import { RiCoupon5Line } from "react-icons/ri";
import { ImBlog } from "react-icons/im";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /*onContextMenu={(e)=> e.preventDefault()}*/>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white text-center mb-0 fs-5 py-3">
            <span className="sm-logo">MS</span>
            <span className="lg-logo">ADMIN.</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiFillDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="" />,
                  label: "Add Product",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <TbCategory2 className="" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <TbCategory2 className="" />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <MdOutlineColorLens className="" />,
                  label: "Color",
                },
                {
                  key: "color-list",
                  icon: <MdOutlineColorLens className="" />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-5" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCoupon5Line className="fs-5" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCoupon5Line className="" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBlogger className="fs-5" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <FaBlog className="" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBlogger className="" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <FaBlog className="" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBlogger className="" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-5" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <AiOutlineLogout className="fs-5" />,
              label: "Sign Out",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="justify-content-between d-flex ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <MdNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img height={32} width={32} src="images/myimage.jpg" alt="" />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Nnamdi</h5>
                <p className="mb-0">nnamdi4u09@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Inbox
                  </Link>
                </li>
                <hr />
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Sign Out
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
