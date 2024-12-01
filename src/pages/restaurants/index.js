import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { commonService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Restaurants = () => {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const columns = [
        { header: 'Restaurant Name', accessor: 'restaurant_name' },
        { header: 'Party Size', accessor: 'party_size' },
        { header: 'Location', accessor: 'location' },
    ];

    const [data, setData] = useState([])
    const [total, setTotal] = useState(0);

    const handleView = (id) => {
        navigate(`/restaurant/view/${id}`);
    }

    const handlePage = (page) => {
        setPage(+page)
    }

    const handlePerPage = (perPage) => {
        setPerPage(perPage)
    }


    const handleReviewAction = (id) => {
        navigate(`/restaurant/review/${id}`);
    }

    useEffect(() => {
        setIsLoading(true)
        //getting restaurants
        commonService.postServiceParams(
            '/restaurant/search',
            {
                // filter: {
                //     search: "Malnad Restaurant",
                //     search_by: "restaurant_name"
                // }
            },
            {
                page: page,
                per_page: perPage
            }
        ).then((result) => {
            setData(result?.data?.data)
            setTotal(result?.data?.pagination?.total)
            setIsLoading(false)
        }).catch(err => console.log(err));

    }, [page, perPage]);

    const handlePagination = (page, perPage) => {
        setPage(page);
        setPerPage(perPage);
    }


    return (
        <>
            {isLoading && <Loader />}
            {!isLoading &&
                <Table
                    heading="Restaurant Listing"
                    columns={columns}
                    data={data}
                    total={total}
                    page={page}
                    rowsPerPage={perPage}
                    handlePagination={handlePagination}
                    isView={true}
                    handleView={handleView}
                    handlePerPage={handlePerPage}
                    handlePage={handlePage}
                    isReView={true}
                    handleReviewAction={handleReviewAction}
                />
            }
        </>
    )
}

export default Restaurants;