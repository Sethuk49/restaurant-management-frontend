import { useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import SubmitButton from "../../components/submit-button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { commonService } from "../../services/api.service";


const validationSchema = Yup.object().shape({
    item_name: Yup.string()
        .required("Item Name is required")
        .min(2, "Item Name must be at least 2 characters"),
    price: Yup.number()
        .required("Price is required")
        .min(0),
});


const MenuItemCreate = () => {
    const handleSubmit = (values) => {
        commonService.postService("/restaurant/add-menu-items", {
            name: values?.item_name,
            price: values?.price
        }).then((result) => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const initialValues = {
        item_name: "",
        price: ""
    };

    return (
        <div className="bg-white h-full p-10 border-r-2 rounded-lg">
            <div className='flex border-b-2'>
                <h1 className="text-2xl font-bold mb-4">Create Menu Item</h1>
            </div>

            <div className="p-10">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
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
                            <Input
                                heading="Item Name"
                                name="item_name"
                                type="text"
                                placeholder="Item Name"
                                value={values?.item_name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={touched?.item_name ? errors.item_name : ""}
                            />

                            <Input
                                heading="Price"
                                name="price"
                                type="text"
                                placeholder="Price"
                                value={values?.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched?.price ? errors.price : ""}
                            />

                            <div className="flex">
                                <SubmitButton text="Submit" />

                                <div className="mt-8 ml-5 w-40">
                                    <button className="px-3 py-1 bg-gray-400 text-white rounded-sm" onClick={handleBack}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default MenuItemCreate;