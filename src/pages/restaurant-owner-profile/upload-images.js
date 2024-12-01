// src/components/UploadForm.js

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Input from '../../components/Input'; // Assuming you have a custom Input component
import SubmitButton from '../../components/submit-button'; // Assuming you have a custom SubmitButton component
import { useNavigate } from 'react-router-dom';
import FileInput from '../../components/FileInput';

const ImageUploadSchema = Yup.object().shape({
    images: Yup.array()
        .required("You must upload at least one image")
        .min(1, "You must upload at least one image")
        .test(
            "fileSize",
            "Each file must be less than 5MB",
            (value) => {
                if (!value) return false; // required
                return value.every(file => file.size <= 5 * 1024 * 1024);
            }
        )
        .test(
            "fileFormat",
            "Unsupported file format. Please upload JPEG, JPG, PNG, or GIF images.",
            (value) => {
                if (!value) return false; // required
                return value.every(file =>
                    ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(file.type)
                );
            }
        )
});

const UploadForm = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const navigate = useNavigate();

    // Handle file input change
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Get the selected files
        setSelectedFiles(files);

        // Preview images
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        selectedFiles.forEach(file => {
            formData.append("images", file); // Append each file to the form data
        });

        try {
            const response = await axios.post("/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data); // Handle success response

            navigate('/restaurant/images')
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    return (
        <div className="bg-white h-full p-10 border-r-2 rounded-lg">
            <div className='flex border-b-2'>
                <h1 className="text-2xl font-bold mb-4">Upload Restaurant Images</h1>
            </div>

            <div className='m-10 h-fit'>
                <form onSubmit={handleSubmit}>
                    {/* <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                     */}


                    <div className="m-2 flex">
                        <div className="py-1.5 text-right w-40">Upload Images : &nbsp;&nbsp; </div>
                        <div className="w-96">
                            <input
                                class="block w-full p-1.5 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>


                    <div className="flex">
                        <SubmitButton text="Upload Images" />

                        <div className="mt-8 ml-5 w-40">
                            <button className="px-3 py-1 bg-gray-400 text-white rounded-sm" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="m-10">
                {previewImages.map((image, index) => (
                    <div className='inline-block'>
                        <img
                            key={index}
                            src={image}
                            alt={`Preview ${index}`}
                            style={{ width: '250px', height:'150px', marginRight: '10px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadForm;
