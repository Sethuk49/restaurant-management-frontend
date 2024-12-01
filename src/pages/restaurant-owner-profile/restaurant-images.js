import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/submit-button";
import { useEffect, useState } from "react";
import { commonService } from "../../services/api.service";

const RestaurantImages = () => {

    const navigate = useNavigate();

    const handleOnclick = () => {
        navigate("/restaurant/upload")
    }

    const [images, setImages] = useState([]);
    useEffect(() => {
        commonService.getServices('/owner-profile')
            .then((result) => {
                setImages(result?.data?.data?.image_urls);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <div className="bg-white h-full m-5 p-10 border-r-2 rounded-lg">
            <div className='flex justify-between border-b-2'>
                <h1 className="text-2xl font-bold mb-4"> Restaurant Images</h1>
                <div className="w-40">
                    <button className="px-3 py-1 float-right text-white bg-blue-500 rounded-sm" onClick={handleOnclick}>
                        Upload
                    </button>
                </div>
            </div>
            <div className="overflow-auto h-4/5">
                <div class="m-10 columns-3">
                    {images?.map((i) => (
                        <img class="w-full aspect-auto" src={`${process.env.REACT_APP_END_URL}/${i}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RestaurantImages;