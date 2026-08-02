import React, { useState } from "react";
import { CourseData } from "../../context/CoursesContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Upload, ArrowLeft } from "lucide-react";

const AdminAddCourse = () => {
  const { fetchCourses } = CourseData();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const categories = [
    "Web Development",
    "App Development",
    "Data Science",
    "UI/UX Design",
    "Machine Learning",
    "DevOps & Cloud",
    "Marketing",
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please upload a thumbnail image");

    setBtnLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("createdBy", createdBy);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("file", image);

    console.log("[API Call] POST /api/course/new for course:", title);
    try {
      const { data } = await axios.post(`${server}/api/course/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      console.log("[API Response] POST /api/course/new success:", data.message);
      toast.success(data.message);
      setBtnLoading(false);
      fetchCourses();
      navigate("/admin/courses");
    } catch (error) {
      console.error("[API Error] POST /api/course/new failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add course");
      setBtnLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Add New Course
          </h1>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs max-w-3xl">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Master Full Stack Web Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7C8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7C8A00]"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Instructor Name</label>
              <input
                type="text"
                placeholder="e.g. Kurshid Alam"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
                className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7C8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Duration (Weeks)</label>
              <input
                type="number"
                placeholder="8"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7C8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Price (INR ₹)</label>
              <input
                type="number"
                placeholder="1999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7C8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Thumbnail Upload</label>
              <input
                type="file"
                accept="image/*"
                onChange={imageHandler}
                required
                className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-2 rounded-xl border border-slate-200 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#7C8A00] file:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Course Description</label>
            <textarea
              rows={4}
              placeholder="Provide a clear description of course requirements and outline..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#7C8A00]"
            />
          </div>

          <button
            disabled={btnLoading}
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs shadow-sm flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>{btnLoading ? "Publishing Course..." : "Publish Course"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCourse;
