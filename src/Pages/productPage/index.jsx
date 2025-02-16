import React, { useContext } from "react";
import Sidebar from "../../Components/Sidebar";
import Products from '../../Components/Products';
import { Context } from "../../App";

const ProductPage = () => {
  const { isSideBarOpen } = useContext(Context);

  return (
    <>
      <section>

          <Products />
      </section>
    </>
  );
};

export default ProductPage;