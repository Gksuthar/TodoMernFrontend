import React from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const context = useContext(Context);
  const url = context.AppUrl
  const navigate = useNavigate();
  const utcTime = "2025-02-16T14:55:00.000Z";
const istTime = new Date(utcTime).toLocaleString("en-IN", { 
  timeZone: "Asia/Kolkata", 
  hour12: false 
});
console.log(istTime); // Output: 16/02/2025, 20:25:00

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = localStorage.getItem('accessToken')
  const addTodoTask = async (data) => {
    try {
      const response = await axios.post(
        `${url}/api/task/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Important!
            'Content-Type': 'application/json',
          },
          withCredentials: true, // If using cookies
        }
      );
      
      if (response.status === 201) {
        context.openAlertBox("success", "Task added successfully");
        // navigate('/');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server error:', error.response.data);
        context.openAlertBox("error", error.response.data.message || "An error occurred on the server");
      } else if (error.request) {
        console.error('Network error:', error.request);
        context.openAlertBox("error", "Network error: Please check your internet connection");
      } else {
        console.error('Error:', error.message);
        context.openAlertBox("error", error.message || "An unexpected error occurred");
      }
    }
  };

  return (
    <section className={`transition-all ${!context.isSideBarOpen ? 'w-[100%]' : 'w-[82%] ml-[18%]'} flex items-center justify-center h-screen bg-gray-100`}>
      <Toaster />
      <div className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add New TODO</h2>
        <form onSubmit={handleSubmit(addTodoTask)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <input
  type="datetime-local"
  {...register("deadline", { required: "Deadline is required" })}
  onChange={(e) => {
    const utcDate = new Date(e.target.value);
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    console.log("Deadline in IST:", istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
  }}
  className={`mt-1 block w-full px-3 py-2 border ${errors.deadline ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
/>


          <button
            type="submit"
            className="mt-4 mb-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add TODO
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddTodo;