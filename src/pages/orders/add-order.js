import React, { useState } from 'react';
import Modal from '../../components/ModelBox';
import Loader from '../../components/Loader';
const Joi = require('joi')

const AddOrder = ({ onClose, submitForm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        no_of_people: '',
        from_date: '',
        to_date: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setFormData({ no_of_people: '', from_date: '', to_date: '' });
        setErrors({});
    };

    const schema = Joi.object({
        no_of_people: Joi.number().integer().min(1).required().messages({
            'number.base': 'Must be a number',
            'number.integer': 'Must be an integer',
            'number.min': 'Must be at least 1',
            'any.required': 'Required',
        }),
        from_date: Joi.date().required().messages({
            'date.base': 'Must be a valid date',
            'any.required': 'Required',
        }),
        to_date: Joi.date().greater(Joi.ref('from_date')).required().messages({
            'date.base': 'Must be a valid date',
            'date.greater': 'Must be after From Date',
            'any.required': 'Required',
        }),
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
        console.log(formData)
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
            submitForm(formData)
            // handleClose(); // Close modal after submission
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="no_of_people">Number of People:</label>
                            <input
                                id="no_of_people"
                                name="no_of_people"
                                type="number"
                                value={formData.no_of_people}
                                onChange={handleChange}
                                className={`w-full border rounded-md p-2 ${errors.no_of_people ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.no_of_people && <small className="text-red-500">{errors.no_of_people}</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="from_date">From Date:</label>
                            <input
                                id="from_date"
                                name="from_date"
                                type="datetime-local"
                                value={formData.from_date}
                                onChange={handleChange}
                                className={`w-full border rounded-md p-2 ${errors.from_date ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.from_date && <small className="text-red-500">{errors.from_date}</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="to_date">To Date:</label>
                            <input
                                id="to_date"
                                name="to_date"
                                type="datetime-local"
                                value={formData.to_date}
                                onChange={handleChange}
                                className={`w-full border rounded-md p-2 ${errors.to_date ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors.to_date && <small className="text-red-500">{errors.to_date}</small>}
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
            }
        </>
    );
};

export default AddOrder;
