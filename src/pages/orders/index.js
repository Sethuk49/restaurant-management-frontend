import { useNavigate } from "react-router-dom";
import HomeLayout from "../../components/Home-Layout";
import ImageCarousel from "../../components/ImageCarousle";
import { useEffect, useState } from "react";
import { commonService } from "../../services/api.service";
import Loader from "../../components/Loader";
import { useFlashMessage } from "../../components/FlashMessageContext";

const Orders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const getOrders = async () => {
        setIsLoading(true);
        commonService.getServices('my-order').then(((result) => {
            setData(result?.data?.data);
            setIsLoading(false)
        })).catch(error => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const { addMessage } = useFlashMessage();

    const handleCancelOrder = (id)=>{
        setIsLoading(true);
        // order/cancel
        commonService.postService(`order/cancel/${id}`).then((result)=>{
            setIsLoading(false);
            addMessage(result?.data?.message, 'success');
            navigate('/')
        }).catch(error=>{
            setIsLoading(false);
            addMessage(error?.response?.data?.message, 'error');
            console.log(error)
        })
        
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (
                <HomeLayout noSearch={true}>
                    <div className="bg-white h-full p-10 border-r-2 rounded-lg">
                        <div className='flex border-b-2'>
                            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
                        </div>
                        <div>
                            {data?.length === 0 && <div> no data found</div>}

                            {data.length > 0 &&
                                (data?.map((d) => (
                                    <div className="p-2 inline-block">
                                        <div className="bg-gray-200 h-44 w-96  p-5 rounded-md">
                                            <p className=""><b>Restaurant Name : {d?.restaurant?.restaurant_name} </b> </p>
                                            <p><b>no_of_people Name :  </b> {d?.no_of_people} </p>
                                            <p><b>from_date :  </b> {d?.from_date} </p>
                                            <p><b>to_date :  </b> {d?.to_date} </p>
                                            <br />
                                            <button className="px-3 py-1 rounded-md float-right text-white bg-red-500" onClick={()=>{handleCancelOrder(d?._id)}}>
                                                cancel order
                                            </button>
                                        </div>
                                    </div>
                                )))
                            }

                        </div>
                    </div>
                </HomeLayout >
            )}
        </>
    );
};

export default Orders;
