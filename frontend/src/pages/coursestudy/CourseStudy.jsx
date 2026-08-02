import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../main";
import { userData } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Play,
  CheckCircle,
  PlusCircle,
  Trash2,
  Video,
  ChevronLeft,
  ChevronRight,
  Upload,
  BookOpen,
} from "lucide-react";

const CourseStudy = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = userData();
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Admin Add Lecture State
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  async function fetchLectures() {
    console.log(`[API Call] GET /api/lectures/${params.id}`);
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(`[API Response] GET /api/lectures/${params.id} returned ${data.lectures?.length} lectures`);
      setLectures(data.lectures);
      if (data.lectures && data.lectures.length > 0) {
        setLecture(data.lectures[0]);
        setCurrentIndex(0);
      }
      setLoading(false);
    } catch (error) {
      console.error(`[API Error] GET /api/lectures/${params.id} failed:`, error.response?.data);
      toast.error(error.response?.data?.message || "Failed to load lectures");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLectures();
  }, [params.id]);

  const selectLecture = (item, index) => {
    setLecture(item);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < lectures.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setLecture(lectures[nextIdx]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setLecture(lectures[prevIdx]);
    }
  };

  const videoHandler = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const addLectureHandler = async (e) => {
    e.preventDefault();
    if (!video) return toast.error("Please upload a video file");

    setBtnLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);

    console.log(`[API Call] POST /api/course/${params.id} (Add Lecture: ${title})`);
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(`[API Response] POST /api/course/${params.id} success:`, data.message);
      toast.success(data.message);
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setVideo(null);
      setShowAddForm(false);
      fetchLectures();
    } catch (error) {
      console.error(`[API Error] POST /api/course/${params.id} failed:`, error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add lecture");
      setBtnLoading(false);
    }
  };

  const deleteLectureHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      console.log(`[API Call] DELETE /api/lecture/${id}`);
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log(`[API Response] DELETE /api/lecture/${id} success:`, data.message);
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        console.error(`[API Error] DELETE /api/lecture/${id} failed:`, error.response?.data);
        toast.error(error.response?.data?.message || "Failed to delete lecture");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-8 h-8 border-4 border-[#7C8A00] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
          <div>
            <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
              Course Player • Lecture {currentIndex + 1} of {lectures.length}
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              {lecture ? lecture.title : "Course Playlist"}
            </h1>
          </div>

          {user && user.role === "admin" && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showAddForm ? "Close Form" : "Add Lecture"}</span>
            </button>
          )}
        </div>

        {/* ADMIN ADD LECTURE FORM */}
        {showAddForm && user?.role === "admin" && (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#7C8A00]" />
              Upload Lecture Video
            </h2>

            <form onSubmit={addLectureHandler} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Lecture Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Video File (.mp4)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={videoHandler}
                  required
                  className="w-full bg-slate-50 text-xs px-4 py-2 rounded-xl border border-slate-200 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#7C8A00] file:text-white"
                />
              </div>

              <button
                disabled={btnLoading}
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs shadow-xs"
              >
                {btnLoading ? "Uploading Video..." : "Upload Lecture"}
              </button>
            </form>
          </div>
        )}

        {/* MAIN VIDEO PLAYER & LECTURES SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Video Stream Container */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-black rounded-3xl overflow-hidden shadow-md aspect-video relative flex items-center justify-center">
              {lecture && lecture.video ? (
                <video
                  src={`${server}/${lecture.video}`}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-white text-center p-6">
                  <Video className="w-10 h-10 text-[#7C8A00] mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-semibold">No lectures uploaded for this course yet.</p>
                </div>
              )}
            </div>

            {/* Next / Previous Player Navigation Controls */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrevious}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lecture</span>
              </button>

              <span className="text-xs font-semibold text-slate-500">
                {currentIndex + 1} / {lectures.length}
              </span>

              <button
                disabled={currentIndex === lectures.length - 1}
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs disabled:opacity-40 transition-colors shadow-xs"
              >
                <span>Next Lecture</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Selected Lecture Details */}
            {lecture && (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-2">
                <h2 className="text-xl font-bold text-slate-900">{lecture.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{lecture.description}</p>
              </div>
            )}
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs h-fit space-y-4">
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Video className="w-4 h-4 text-[#7C8A00]" />
              Course Curriculum ({lectures.length})
            </h3>

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {lectures && lectures.length > 0 ? (
                lectures.map((item, idx) => (
                  <div
                    key={item._id}
                    onClick={() => selectLecture(item, idx)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between gap-3 ${
                      lecture?._id === item._id
                        ? "bg-[#7C8A00]/10 border-[#7C8A00] text-[#7C8A00] font-semibold"
                        : "bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white text-[10px] flex items-center justify-center font-bold text-[#7C8A00]">
                        {idx + 1}
                      </span>
                      <span className="text-xs line-clamp-1">{item.title}</span>
                    </div>

                    {user && user.role === "admin" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteLectureHandler(item._id);
                        }}
                        className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Lecture"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No lectures available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStudy;
