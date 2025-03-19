import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { DashboardLayout } from "./DashboardLayout";
import { useDepartments } from "../contexts/DepartmentContext";
import { useCourses } from "../contexts/CourseContext";
import { useExam } from "../contexts/ExamContext";
import { useAuth } from "../contexts/AuthContext";

export const ExamUploadForm: React.FC = () => {
  const { departments, isLoading: isLoadingDepartments, error: errorDepartments } = useDepartments();
  const { courses, isLoading: isLoadingCourses, error: errorCourses } = useCourses();
  const { uploadExam, isLoading: isUploading, error: uploadError } = useExam();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    course: "",
    level: "",
    unitName: "",
    description: "",
    file: null as File | null,
    price: 20,
    topics: [] as string[],
  });
  const [priceError, setPriceError] = useState("");
  const [fileError, setFileError] = useState("");
  const [topicInput, setTopicInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [nameError, setNameError] = useState("");

  const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];
  const units = ["Basic Unit", "Core Unit", "Common Unit"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, file });
      setFileError("");
    } else {
      setFileError("Only PDF files are allowed.");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, file });
      setFileError("");
    } else {
      setFileError("Only PDF files are allowed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setFileError("Please upload a PDF file.");
      return;
    }
    if (formData.price < 20) {
      setPriceError("Minimum price should be 20 Ksh.");
      return;
    }
    const data = new FormData();
    data.append("authorId", user?.id || "");
    data.append("author", user?.name || "");
    data.append("name", formData.name);
    data.append("department", formData.department);
    data.append("course", formData.course);
    data.append("level", formData.level);
    data.append("unitName", formData.unitName);
    data.append("description", formData.description);
    data.append("price", formData.price.toString());
    data.append("topics", JSON.stringify(formData.topics));
    if (formData.file) {
      data.append("file", formData.file);
    }
    try {
      await uploadExam(data);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(e.target.value);
    if (price < 20) {
      setPriceError("Minimum price should be 20 Ksh.");
    } else {
      setPriceError("");
    }
    setFormData({ ...formData, price });
  };

  const handleAddTopic = () => {
    if (topicInput.trim() && !formData.topics.includes(topicInput.trim())) {
      setFormData({ ...formData, topics: [...formData.topics, topicInput.trim()] });
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (topic: string) => {
    setFormData({ ...formData, topics: formData.topics.filter(t => t !== topic) });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length === 100) {
      setNameError("Maximum 100 characters allowed.");
    } else {
      setNameError("");
      setFormData({ ...formData, name });
    }
  };

  if (isLoadingDepartments || isLoadingCourses) {
    return <div>Loading...</div>;
  }

  if (errorDepartments) {
    return <div>Error: {errorDepartments}</div>;
  }

  if (errorCourses) {
    return <div>Error: {errorCourses}</div>;
  }

  return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20 mb-5">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upload Examination</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                  type="text"
                  required
                  className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                  value={formData.name}
                  onChange={handleNameChange}
                  maxLength={100}
              />
              {nameError && <p className="mt-2 text-sm text-red-600">{nameError}</p>}
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                  required
                  className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                    <option key={dept._id} value={dept.name}>
                      {dept.name}
                    </option>
                ))}
              </select>
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <select
                  required
                  className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                    <option key={course._id} value={course.name}>
                      {course.name}
                    </option>
                ))}
              </select>
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select
                  required
                  className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="">Select Level</option>
                {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                ))}
              </select>
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Unit Name</label>
              <select
                  required
                  className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                  value={formData.unitName}
                  onChange={(e) => setFormData({ ...formData, unitName: e.target.value })}
              >
                <option value="">Select Unit</option>
                {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                ))}
              </select>
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                  required
                  className="mt-1 block w-full h-24 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Price (Ksh)</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type="number"
                    min="20"
                    required
                    className="block w-full h-12 pr-12 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                    value={formData.price}
                    onChange={handlePriceChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Ksh</span>
                </div>
              </div>
              {priceError && <p className="mt-2 text-sm text-red-600">{priceError}</p>}
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
              <div
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-white"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
              >
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                </div>
              </div>
              {formData.file && (
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-700">{formData.file.name}</span>
                    <button
                        type="button"
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        onClick={() => setFormData({ ...formData, file: null })}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
              )}
              {fileError && <p className="mt-2 text-sm text-red-600">{fileError}</p>}
            </div>
            <div className="w-3/4 mx-auto">
              <label className="block text-sm font-medium text-gray-700">Topics Covered</label>
              <div className="flex items-center space-x-2">
                <input
                    type="text"
                    className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 pl-3"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTopic())}
                />
                <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handleAddTopic}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap space-x-2">
                {formData.topics.map((topic, index) => (
                    <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {topic}
                      <button
                          type="button"
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          onClick={() => handleRemoveTopic(topic)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                ))}
              </div>
            </div>
            <div className="w-3/4 mx-auto">
              <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Examination"}
              </button>
            </div>
          </form>
          {showPopup && (
              <div className="fixed bottom-16 right-4 bg-green-500 text-white px-4 py-4 rounded shadow-lg z-50">
                Successfully Uploaded! It's Under the Admin Approval Process.
              </div>
          )}
          {uploadError && <p className="mt-2 text-sm text-red-600">{uploadError}</p>}
        </div>
      </DashboardLayout>
  );
};