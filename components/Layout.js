import Navbar from "./navbar";
//import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
