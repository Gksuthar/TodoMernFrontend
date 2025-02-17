import React, { useState, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../SearchBox";
import { Context } from "../../App";
import axios from "axios";

const Products = () => {
  const context = useContext(Context);
  const { isSideBarOpen, AppUrl } = context;
  const url = AppUrl;
  // const context = useContext(Context)

  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortByDeadline, setSortByDeadline] = useState("asc");

  const token = localStorage.getItem("accessToken");

  // Function to auto-expire tasks
  const autoExpireTasks = async () => {
    try {
      const response = await axios.get(`${url}/api/task/auto-expire`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Auto-expire response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error auto-expiring tasks:", error.message);
      throw error;
    }
  };

  // Fetch tasks and auto-expire them on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      // Auto-expire tasks first
      await autoExpireTasks();

      // Fetch updated tasks
      try {
        const response = await axios.get(`${url}/api/task/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTodos(response.data.TaskModals);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchData();
  }, [token, url]);

  // Filter and sort todos
  useEffect(() => {
    const filterTodos = () => {
      let filtered = todos.filter((todo) => {
        const matchesSearch =
          todo.title.toLowerCase().includes(context.searchContent.toLowerCase()) ||
          todo.description.toLowerCase().includes(context.searchContent.toLowerCase());
        const matchesStatus =
          statusFilter === "ALL" || todo.status === statusFilter;
        return matchesSearch && matchesStatus;
      });

      // Sort todos by deadline
      filtered.sort((a, b) => {
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);
        return sortByDeadline === "asc" ? dateA - dateB : dateB - dateA;
      });

      setFilteredTodos(filtered);
    };

    filterTodos();
  }, [context.searchContent, statusFilter, todos, sortByDeadline]);

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/task/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      context.openAlertBox("success", "Task Deleted successfully");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  // Update todo status
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `${url}/api/task/updateTaskStatus/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error.message);
    }
  };

  // Toggle sorting order
  const handleSortByDeadline = () => {
    setSortByDeadline((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <div
        className={`transition-all ${
          !isSideBarOpen ? "w-[100%]" : "w-[82%] ml-[18%]"
        } px-4`}
      >

<section
          className={`card w-auto p-5 mt-4 bg-white shadow-md rounded-md flex items-center`}
        >
          <div className={`col1`}>
            <h1 className="font-[500] mb-3 text-xl">Todos</h1>
            <Link to={`/AddTodo`}>
              <Button className="btn-blue !capitalize flex gap-1 !p-2">
                <FaPlus />
                Add Todo
              </Button>
            </Link>
          </div>
        </section>

        <div className="container flex gap-5">
          <div className="todoItem rounded-sm border border-[rgba(0,0,0,0.1)] w-[100%] bg-white shadow-md mt-4 p-4">
          <div className="w-full flex flex-col md:flex-row justify-between gap-4">
  {/* Left Side */}
  <div className="leftSide">
    <h2 className="text-xl font-bold mb-2">Todos</h2>
    <p className="mb-4">There are {filteredTodos.length} Todos</p>
  </div>

  {/* Right Side */}
  <div className="rightSide flex flex-col md:flex-row items-center gap-4">
    {/* Search Box */}
    <div className="w-full md:w-auto">
      <SearchBox placeholder="Search Todos..." />
    </div>

    {/* Status Filter Dropdown */}
    <select
      className="p-2 border border-gray-300 rounded w-full md:w-auto"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="ALL">All</option>
      <option value="ACTIVE">Active</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="COMPLETE">Complete</option>
      <option value="EXPIRED" >Expired</option>
      </select>

    {/* Sort Button */}
    <Button
      className="!capitalize w-full md:w-auto"
      onClick={handleSortByDeadline}
    >
      Sort by Deadline ({sortByDeadline === "asc" ? "Asc" : "Desc"})
    </Button>
  </div>
</div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                   
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Deadline
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((todo,indx) => (
                    <tr
                      key={indx}
                      className="odd:bg-white odd:dark:bg-gray-100 even:bg-gray-50 border-b dark:border-gray-700 border-gray-200"
                    >
                     
                      <td className="px-6 py-4">{todo.title}</td>
                      <td className="px-6 py-4">{todo.description}</td>
                      <td className="px-6 py-4">
                        <select
                          className="p-1 border border-gray-300 rounded"
                          value={todo.status}
                          onChange={(e) =>
                            handleStatusChange(todo._id, e.target.value)
                          }
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETE">Complete</option>
                          {/* <option className="hidden" value="EXPIRED">Expired</option> */}
                          <option className="hidden" value="EXPIRED">Expired</option>
 

                        </select>
                      </td>
                      <td className="px-6 py-4">{todo.deadline}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 items-center">
                          <Button
                            className="!w-[35px] !rounded-full hover:!bg-white !h-[35px] !min-w-[35px] !bg-[#f1f1f1]"
                            component={Link}
                            to={`/edit-todo/${todo._id}`}
                          >
                            <FaRegEdit className="text-[rgba(0,0,0,0.7)] text-[42px]" />
                          </Button>
                          <Button
                            className="!w-[35px] !rounded-full hover:!bg-white !h-[35px] !min-w-[35px] !bg-[#f1f1f1]"
                            onClick={() => handleDelete(todo._id)}
                          >
                            <MdDelete className="text-[rgba(0,0,0,0.7)] text-[42px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end mt-4 mb-4">
            </div>
          </div>
        </div>      </div>
    </>
  );
};

export default Products;