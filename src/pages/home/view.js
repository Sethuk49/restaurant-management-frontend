import { useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../../components/Home-Layout";
import ImageShower from "../../components/ImageShower";
import { useEffect, useState, startTransition } from "react";
import { commonService } from "../../services/api.service";
import { useFlashMessage } from "../../components/FlashMessageContext";
import StarRating from "../../components/StarRatting";
import Modal from "../../components/ModelBox";
import AddOrder from "../orders/add-order";
import AddReview from "../reviews/add-review";
import Loader from "../../components/Loader";

const RestaurantView = () => {
    const [data, setData] = useState();
    const { id } = useParams();
    const { addMessage } = useFlashMessage();
    const [images, setImages] = useState([]);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenReview, setIsReview] = useState(false);
    const [restaurantId, setRestaurantId] = useState("");
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBooking = (id) => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            addMessage("Please Login", 'success');
            navigate('/login');
            setIsLoading(false); // Reset loading state
            return;
        }
        startTransition(() => {
            setRestaurantId(id);
            setIsOpenModel(true);
            setIsLoading(false);
        });
    };

    const handleReviews = (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            addMessage("Please Login", 'success');
            navigate('/login');
            return;
        }
        startTransition(() => {
            setRestaurantId(id);
            setIsReview(true);
        });
    };

    const submitForm = (values) => {
        setIsLoading(true);
        commonService.postService('/order', {
            from_date: values?.from_date,
            to_date: values?.to_date,
            no_of_people: values?.no_of_people,
            restaurant: restaurantId
        }).then((result) => {
            setIsLoading(false);
            addMessage(result?.data?.message, 'success');
            setIsReview(false);
            navigate('/home');
        }).catch((error) => {
            setIsLoading(false);
            addMessage(error?.response?.data?.message, 'error');
            setIsReview(false);
            // navigate('/home');
        });
    };

    const submitReviewForm = (values) => {
        commonService.postService('/review', {
            review: values?.review,
            rating: values?.rating.toString(),
            restaurant: restaurantId
        }).then((result) => {
            addMessage(result?.data?.message, 'success');
            setIsReviewAdded(prev => !prev);
            setIsReview(false);
        }).catch((error) => {
            addMessage(error?.response?.data?.message, 'error');
            setIsReview(false);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        startTransition(() => {
            commonService.getServices(`restaurant/${id}`).then((result) => {
                setData(result?.data?.data);
                setImages(result?.data?.data?.image_urls || []);
                setIsLoading(false);
            }).catch(error => {
                addMessage(error?.response?.data?.message, 'error');
                setIsLoading(false);
            });
        });
    }, [id, isReviewAdded]); // Ensure id is included to fetch new data on navigation

    return (
        <>
            {isLoading && <Loader />}
            {isOpenModel && (
                <Modal isOpen={isOpenModel} onClose={() => setIsOpenModel(false)} title={"Book Order"}>
                    <AddOrder onClose={() => setIsOpenModel(false)} submitForm={submitForm} />
                </Modal>
            )}

            {isOpenReview && (
                <Modal isOpen={isOpenReview} onClose={() => setIsReview(false)} title={"Add Review"}>
                    <AddReview onClose={() => setIsReview(false)} submitForm={submitReviewForm} />
                </Modal>
            )}
            
            {!isLoading && (
                <HomeLayout noSearch={true}>
                    <div className="bg-white p-2">
                        <div className="flex">
                            {images.length > 0 && (
                                <div className='flex flex-col w-1/2'>
                                    <ImageShower images={images} />
                                </div>
                            )}
                            <div className='w-1/2'>
                                <div className="ml-3 p-5">
                                    <button className="px-3 py-1 flex items-end rounded-md float-right text-white bg-blue-500"
                                        onClick={() => handleReviews(data?._id)}
                                    >
                                        Add Review
                                    </button>
                                    <p className="mt-2"><b>Restaurant Name: </b>{data?.restaurant_name}</p>
                                    <p className="mt-2"><b>Location: </b>{data?.location}</p>
                                    <p className="flex mt-2"><b>Party Size: </b>{data?.party_size}</p>
                                    <p className="flex mt-2"><b>Days of Operation: </b>{data?.days_of_operation?.join(', ')}</p>
                                    <p className="flex mt-2"><b>Is 24 Hours: </b>{data?.is24Hours ? "Yes" : "No"}</p>
                                    {data && !data.is24Hours && <p><b>Opening Time: </b>{data?.opening_time}</p>}
                                    {data && !data.is24Hours && <p><b>Closing Time: </b>{data?.closing_time}</p>}
                                    <p><b>Live Music: </b>{data?.live_music ? "Yes" : "No"}</p>
                                    <p><b>Outdoor Seating: </b>{data?.outdoor_seating ? "Yes" : "No"}</p>
                                    <p><b>Pet Friendly: </b>{data?.pet_friendly ? "Yes" : "No"}</p>
                                    <p><b>Vegan Options: </b>{data?.vegan_options ? "Yes" : "No"}</p>
                                    <p><b>WiFi Availability: </b>{data?.wifi ? "Yes" : "No"}</p>

                                    {data?.reviews?.length > 0 && (
                                        <div>
                                            <b><h3>Reviews and Ratings:</h3></b>
                                            <div className="overflow-auto h-80 bg-gray-300 rounded-md p-1">
                                                {data?.reviews.map((r) => (
                                                    <div key={r?._id} className="bg-white m-2 p-2 rounded-sm flex justify-between">
                                                        <div>
                                                            <p><b>User Review:</b><br />{r?.review}</p>
                                                            <p className="flex mt-2"><b>Rating:</b><StarRating rating={r?.rating || 5} /></p>
                                                            {r?.reply && <div className="float-right"><b>Reply:</b> {r?.reply}</div>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="h-24 flex items-center justify-center">
                                        <button className="px-3 py-1 rounded-md float-right text-white bg-blue-500"
                                            onClick={() => handleBooking(data?._id)}
                                        >
                                            Book Now
                                        </button>
                                        <button className="px-3 py-1 ml-3 rounded-md float-right text-white bg-gray-500"
                                            onClick={() => navigate(-1)}
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </HomeLayout>
            )}
        </>
    );
};

export default RestaurantView;
