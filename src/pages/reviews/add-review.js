import React, { useState } from 'react';
import Modal from '../../components/ModelBox'; // Assuming this is the correct import path
import GiveStarRating from '../../components/GiveStarRating';
import Joi from 'joi';

const AddReview = ({ onClose, submitForm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        review: '',
        rating: '', // Change this to 'rating' for consistency
    });
    const [errors, setErrors] = useState({});

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setFormData({ review: '', rating: '' }); // Update this to 'rating'
        setErrors({});
    };

    const schema = Joi.object({
        review: Joi.string().min(1).required().messages({
            'string.base': 'Must be a string',
            'string.empty': 'Required',
            'any.required': 'Required',
        }),
        rating: Joi.number().integer().min(1).required().default('Ratting is required!')
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const { error } = schema.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details.forEach(({ path, message }) => {
                newErrors[path[0]] = message;
            });
            setErrors(newErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            submitForm(formData);
            handleClose(); // Close modal after submission
        }
    };

    const handleRatingChange = (rating) => {
        setFormData({ ...formData, rating }); // Update the state with the selected rating
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="review">Review:</label>
                    <textarea
                        id="review"
                        name="review"
                        value={formData.review}
                        onChange={handleChange}
                        className={`w-full border rounded-md p-2 ${errors.review ? 'border-red-500' : ''}`}
                        rows="4"
                        required
                    />
                    {errors.review && <small className="text-red-500">{errors.review}</small>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Rating:</label>
                    <GiveStarRating rating={formData.rating} onRatingChange={handleRatingChange} />
                    {errors.rating && <small className="text-red-500">{errors.rating}</small>} {/* Change to 'errors.rating' */}
                </div>
                <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default AddReview;
