import React, { useContext } from "react";
import Sidebar from "../../Components/Sidebar";
import Products from '../../Components/Products';
import { Context } from "../../App";
import AddTodo from "../../Components/addTodo";
const ProductPage = () => {
  const { isSideBarOpen } = useContext(Context);

  return (
    <>
      <section>
        <div>
          <AddTodo />
        </div>
      </section>
    </>
  );
};

export default ProductPage;