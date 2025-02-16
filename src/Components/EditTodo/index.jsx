import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Context } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

const EditTodo = () => {
  const context = useContext(Context);
  const url = context.AppUrl;
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('accessToken');

  // Fetch the todo data when the component mounts
  useEffect(() => {
    const getTodo = async () => {
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const response = await axios.get(`${url}/api/task?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTodo(response.data.task); 
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
        toast.error("Failed to fetch todo data");
      }
    };

    getTodo();
  }, [id, token, url]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Pre-fill the form with the fetched todo data
  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline ? new Date(todo.deadline).toISOString().slice(0, 16) : "",
      });
    }
  }, [todo, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${url}/api/task/update/${id}`,
        {
          title: data.title,
          description: data.description,
          deadline: data.deadline,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Todo updated successfully");
        navigate("/todos"); // Redirect to the todos list page
      }
    } catch (error) {
      console.error("Error updating todo:", error.message);
      toast.error("Failed to update todo");
    }
  };

  return (
    <section className={`transition-all ${!context.isSideBarOpen ? 'w-[100%]' : 'w-[82%] ml-[18%]'} flex items-center justify-center h-screen bg-gray-100`}>
      <Toaster />
      <div className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit TODO</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="datetime-local"
              {...register("deadline", { required: "Deadline is required" })}
              className={`mt-1 block w-full px-3 py-2 border ${errors.deadline ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
          </div>

          <button
            type="submit"
            
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update TODO
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditTodo;