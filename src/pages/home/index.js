import { useNavigate } from "react-router-dom";
import HomeLayout from "../../components/Home-Layout";
import ImageCarousel from "../../components/ImageCarousle";
import StarRating from "../../components/StarRatting";
import { useEffect, useState } from "react";
import { commonService } from "../../services/api.service";
import Loader from "../../components/Loader";

const images = [
    "https://assets.cntraveller.in/photos/65853d6b81a6e7c595da81f8/16:9/w_960,c_limit/beach%20.png",
    "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?cs=srgb&dl=pexels-chanwalrus-941861.jpg&fm=jpg",
    "https://media.istockphoto.com/id/1081422898/photo/pan-fried-duck.jpg?s=612x612&w=0&k=20&c=kzlrX7KJivvufQx9mLd-gMiMHR6lC2cgX009k9XO6VA="
];


const Home = () => {

    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [addtionalFilters, setAdditionalFilters] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch,setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/view-restaurant/${id}`);
    }

    const handleIsSearch = ()=>{
        setIsSearch(!isSearch)
    }

    const handleSearch = (s) => {
        setSearch(s)
    }

    const handleAddtionalFilter = (f) => {
        setAdditionalFilters(f.target.value)
    }

    const getRestorants = async () => {
        setIsLoading(true)
        let filter = {};
        if (!!search) {
            filter = {
                search: search,
                search_by: "menu_items.name,restaurant_name,location"
            }
        }
        if (!!addtionalFilters) {
            filter.addtional_filter = addtionalFilters
        }
        commonService.postServiceParams(
            'restaurant/search',
            {
                filter: filter
            },
            {
                page: 1,
                per_page: 100
            }
        ).then((result) => {
            setIsLoading(false)
            setData(result?.data?.data);
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })
    }

    useEffect(() => {
        getRestorants();
    }, [isSearch, addtionalFilters])

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                <HomeLayout search={search} handleSearch={handleSearch} handleAddtionalFilter={handleAddtionalFilter} handleIsSearch={handleIsSearch}>
                    <div className="overflow-y-auto">
                        <div className='p-5 columns-2 h-full space-y-1'>
                            {data?.map((d) => (
                                <div className="bg-white flex p-2 rounded-md">
                                    {d?.image_urls?.length > 0 &&
                                        <div className="w-[60%]">
                                            <ImageCarousel images={d?.image_urls} />
                                        </div>
                                    }
                                    <div className="ml-3">
                                        <p className="mt-2"><b>Restaurant Name : </b>{d?.restaurant_name}</p>
                                        <p className="mt-2"><b>Location : </b>{d?.location}</p>
                                        {/* <p className="flex mt-2"><b>Ratings : </b>  <StarRating rating={d?.rating ? d?.rating : 5} /></p> */}
                                        <p className="flex mt-2"><b>party size : </b> {d?.party_size}</p>
                                        <div className="h-24 flex items-center justify-center">
                                            <button className="px-3 py-1  rounded-md float-right text-white bg-blue-500"
                                                onClick={() => { handleClick(d?._id) }}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {data?.length === 0 &&
                                <div>
                                    No data Found
                                </div>
                            }
                        </div>
                    </div>
                </HomeLayout>
            }
        </>
    )
}

export default Home;