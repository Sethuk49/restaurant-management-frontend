import React, { useState } from 'react';
import Modal from '../../components/ModelBox'; // Assuming this is the correct import path
import GiveStarRating from '../../components/GiveStarRating';
import Joi from 'joi';

const AddReply = ({ onClose, submitForm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        reply: '',
    });
    const [errors, setErrors] = useState({});

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setFormData({ reply: '' }); // Update this to 'rating'
        setErrors({});
    };

    const schema = Joi.object({
        reply: Joi.string().min(1).required().messages({
            'string.base': 'Must be a string',
            'string.empty': 'Required',
            'any.required': 'Required',
        })
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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="mb-4">
                    <textarea
                        id="reply"
                        name="reply"
                        value={formData.reply}
                        onChange={handleChange}
                        className={`w-full border rounded-md p-2 ${errors.reply ? 'border-red-500' : ''}`}
                        rows="4"
                        required
                    />
                    {errors.reply && <small className="text-red-500">{errors.reply}</small>}
                </div>
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

export default AddReply;
