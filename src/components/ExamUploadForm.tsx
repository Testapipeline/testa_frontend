import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { DashboardLayout } from "./DashboardLayout";

type ExamUploadFormProps = {
  onSubmit: (data: FormData) => Promise<void>;
};

export const ExamUploadForm: React.FC<ExamUploadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    department: "",
    course: "",
    level: "",
    unitName: "",
    description: "",
    file: null as File | null,
    price: 20,
  });
  const [priceError, setPriceError] = useState("");
  const [fileError, setFileError] = useState("");

  const departments = [
    "Agriculture and Aquaculture",
    "Applied Sciences",
    "Building and Civil Engineering",
    "Business and Management",
    "Computing and IT",
    "Education",
    "Engineering",
    "Health Sciences",
    "Humanities and Social Sciences",
    "Law",
    "Natural Sciences",
  ];

  const courses = ["Course 1", "Course 2", "Course 3"];
  const levels = ["Level 1", "Level 2", "Level 3"];
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
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (typeof value === "object") {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value.toString());
        }
      }
    });
    try {
      await onSubmit(data);
      // Reset form or show success message
    } catch (error) {
      // Handle error
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

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20 mb-5">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upload Examination</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  <option key={dept} value={dept}>
                    {dept}
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
                  <option key={course} value={course}>
                    {course}
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
            <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Examination
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};