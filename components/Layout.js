import Navbar from './navbar';
// import Footer from "./Footer"

function Layout({ children }) {
  return (
    <div className="content">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
