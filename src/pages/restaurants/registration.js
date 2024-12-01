import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { commonService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import SubmitButton from "../../components/submit-button";
import CheckboxInput from "../../components/CheckBox";
import HomeLayout from "../../components/Home-Layout";
import { useFlashMessage } from "../../components/FlashMessageContext";

const validationSchema = Yup.object().shape({
    restaurant_name: Yup.string()
        .required("Restaurant Name is required")
        .min(2, "Restaurant Name must be at least 2 characters"),
    location: Yup.string()
        .required("Location is required")
        .min(2, "Location must be at least 2 characters"),
    days_of_operation: Yup.string()
        .required("Days of Operation is required"),
    is24Hours: Yup.boolean()
        .required("Is24Hours is required"),
    // opening_time: Yup.string().when("is24Hours", (is24Hours, schema) => {
    //     return !is24Hours  
    //         ? schema.required("Opening Time is required.")
    //         : schema.notRequired();
    // }),
    // closing_time: Yup.string().when("is24Hours", (is24Hours, schema) => {
    //     return !is24Hours 
    //         ? schema.required("Closing Time is required.")
    //         : schema.notRequired();
    // }),
    party_size: Yup.number()
        .required("Party Size is required")
        .min(1),
    name: Yup.string()
        .required("Name is required")
        .min(1),
    email: Yup.string()
        .required("Email is required").email().default('Email must be valid')
        .min(1),
    password: Yup.string()
        .required("Password is required")
        .min(1),
    mobile_number: Yup.string()
        .required("Mobile Number is required")
        .min(10, "Mobile Number must be at least 10 digits"),
    live_music: Yup.boolean()
        .required("Live Music is required"),
    outdoor_seating: Yup.boolean()
        .required("Outdoor Seating is required"),
    pet_friendly: Yup.boolean()
        .required("Pet Friendly is required"),
    vegan_options: Yup.boolean()
        .required("Vegan Options is required"),
    wifi: Yup.boolean()
        .required("Wifi is required"),
});


const RestaurantRegistration = () => {

    const { addMessage } = useFlashMessage();

    const [initialValues, setInitialValues] = useState({
        restaurant_name: "",
        location: "",
        days_of_operation: "",
        is24Hours: false,
        opening_time: "",
        closing_time: "",
        party_size: "",
        name: "",
        mobile_number: "",
        email: "",
        password: "",
        live_music: false,
        outdoor_seating: false,
        pet_friendly: false,
        vegan_options: false,
        wifi: false
    });

    const navigate = useNavigate()

    const handleSubmit = (values) => {
        let payload = values;
        const days_of_operation = values?.days_of_operation;
        const d = values?.days_of_operation?.split(",");
        const da = d?.map((d)=>{
            return d?.replace(/\s+/g, '')
        })
        delete payload.days_of_operation;
        if (values?.is24Hours) {
            delete payload.opening_time;
            delete payload.closing_time
        }

        commonService.postService(`restaurant/profile`, {
            ...payload,
            days_of_operation: da
        }).then((result) => {
            addMessage(result?.data?.message, 'success');
            navigate('/login')
        }).catch(error => {
            addMessage(error?.response?.data?.message, 'error');
            setInitialValues({
                ...values,
                days_of_operation: days_of_operation
            })
        })
    }

    return (
        <HomeLayout noSearch={true} >
            <div className="bg-white h-full p-10 border-r-2 rounded-lg">
                <div className='flex border-b-2'>
                    <h1 className="text-2xl font-bold mb-4">Create Restaurant Profile</h1>
                </div>

                <div className="p-10 overflow-auto h-[100%]">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize={true}
                    >
                        {({ values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <Form>
                                <div className="inline-block">
                                    <Input
                                        heading="Owner Name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        value={values?.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.name ? errors.name : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <Input
                                        heading="Email"
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        value={values?.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.email ? errors.email : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <Input
                                        heading="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={values?.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.password ? errors.password : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <Input
                                        heading="Mobile Number"
                                        name="mobile_number"
                                        type="text"
                                        placeholder="Mobile Number"
                                        value={values?.mobile_number}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.mobile_number ? errors.mobile_number : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <Input
                                        heading="Restaurant Name"
                                        name="restaurant_name"
                                        type="text"
                                        placeholder="Restaurant Name"
                                        value={values?.restaurant_name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={touched?.restaurant_name ? errors.restaurant_name : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <Input
                                        heading="Location"
                                        name="location"
                                        type="text"
                                        placeholder="Location"
                                        value={values?.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.location ? errors.location : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <Input
                                        heading="Days of Operation"
                                        name="days_of_operation"
                                        type="text"
                                        placeholder="Days of Operation"
                                        value={values?.days_of_operation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.days_of_operation ? errors.days_of_operation : ""}
                                    />
                                </div>


                                <div className="inline-block">
                                    <CheckboxInput
                                        heading="Is24Hours"
                                        name="is24Hours"
                                        type="checkbox"
                                        checked={values?.is24Hours || false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.is24Hours ? errors.is24Hours : ""}
                                    />
                                </div>
                                {!values.is24Hours &&
                                    <div className="inline-block">
                                        <Input
                                            heading="Opening Time"
                                            name="opening_time"
                                            type="text"
                                            placeholder="Opening Time"
                                            value={values?.opening_time}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched?.opening_time ? errors.opening_time : ""}
                                        />
                                    </div>
                                }

                                {!values.is24Hours &&
                                    <div className="inline-block">
                                        <Input
                                            heading="Closing Time"
                                            name="closing_time"
                                            type="text"
                                            placeholder="Closing Time"
                                            value={values?.closing_time}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched?.closing_time ? errors.closing_time : ""}
                                        />
                                    </div>
                                }

                                <div className="inline-block">
                                    <Input
                                        heading="Party Size"
                                        name="party_size"
                                        type="number"
                                        placeholder="Party Size"
                                        value={values?.party_size}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.party_size ? errors.party_size : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <CheckboxInput
                                        heading="Live Mustic"
                                        name="live_music"
                                        type="checkbox"
                                        checked={values?.live_music || false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.live_music ? errors.live_music : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <CheckboxInput
                                        heading="Outdoor Seating"
                                        name="outdoor_seating"
                                        type="checkbox"
                                        checked={values?.outdoor_seating || false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.outdoor_seating ? errors.outdoor_seating : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <CheckboxInput
                                        heading="pet_friendly Mustic"
                                        name="pet_friendly"
                                        type="checkbox"
                                        checked={values?.pet_friendly || false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.pet_friendly ? errors.pet_friendly : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <CheckboxInput
                                        heading="vegan_options"
                                        name="vegan_options"
                                        type="checkbox"
                                        checked={values?.vegan_options || false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.vegan_options ? errors.vegan_options : ""}
                                    />
                                </div>

                                <div className="inline-block">
                                    <CheckboxInput
                                        heading="Wifi"
                                        name="wifi"
                                        type="checkbox"
                                        checked={values?.wifi || false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched?.wifi ? errors.wifi : ""}
                                    />
                                </div>

                                <div className="flex">
                                    <SubmitButton text="Submit" />

                                    <div className="mt-8 ml-5 w-40">
                                        <button className="px-3 py-1 bg-gray-400 text-white rounded-sm" onClick={() => navigate(-1)}>
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </HomeLayout>
    )
}

export default RestaurantRegistration;