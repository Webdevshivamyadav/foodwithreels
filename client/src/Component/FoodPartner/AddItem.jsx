import React, { useState } from 'react';

import { ToastContainer,toast } from 'react-toastify';
import api from '../../api/api';
const AddItem = ({ onClose , Modal}) => {

    const [loading, setLoading] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);


    const [newFood, setNewFood] = useState({
        name: "",
        price: "",
        description: "",
        video: null,
        videoPreview: null,
    });

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === "file") {
            const file = files[0];
            if (file) {
                const previewUrl = URL.createObjectURL(file);
                setNewFood((prev) => ({
                    ...prev,
                    [name]: file,
                    videoPreview: previewUrl,
                }));
            }
        } else {
            setNewFood((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        SaveFoodItem(newFood);
    };

    const SaveFoodItem = async (foodData) => {
        setLoading(true);
        setUploadPercent(0);
        try {
            const formData = new FormData();
            formData.append("name", foodData.name);
            formData.append("price", foodData.price);
            formData.append("description", foodData.description);
            formData.append("video", foodData.video);

            const response = await api.post(
                "/foodItem/",
                formData,
                {
                    withCredentials: true,
                    timeout: 0, // disable timeout for large videos
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadPercent(percent);
                        }
                    },
                }
            );
            toast.success(" ✅ Uploaded Successfully")
            console.log("✅ Uploaded Successfully:", response.data);
        } catch (err) {
            toast.error("❌ Upload failed")
            console.error("❌ Upload failed:", err);
        } finally {
            setLoading(false);
            setUploadPercent(0);
        }
    };


    return (
        <Modal onClose={onClose}>

            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
                    <div className="text-white text-lg font-semibold">Uploading... {uploadPercent}%</div>
                </div>
            )}

            <form onSubmit={handleSubmit} className={loading ? 'pointer-events-none opacity-60' : ''}>
                <h2 className="text-xl font-bold mb-4">Add New Food</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Food Name"
                    value={newFood.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg mb-3"
                />


                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newFood.price}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg mb-3"
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Title / Description"
                    value={newFood.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-lg mb-3"
                />

                {/* File Upload */}
                <label className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 block mb-4">
                    <input
                        type="file"
                        name="video"
                        accept="video/*"
                        className="hidden"
                        onChange={handleChange}
                    />
                    {newFood.video ? (
                        <span className="text-sm text-gray-600">📂 {newFood.video.name}</span>
                    ) : (
                        <span className="text-green-500">Click or Drag & Drop to Upload Video</span>
                    )}
                    {newFood.videoPreview && (
                        <video
                            src={newFood.videoPreview}
                            className="w-full max-h-40 mt-2 rounded shadow"
                            controls
                        />
                    )}
                </label>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Add Food
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default AddItem