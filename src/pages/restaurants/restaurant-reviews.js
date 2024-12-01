import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { commonService } from "../../services/api.service";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const RestaurantReviews = () => {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    let { id } = useParams();

    const navigate = useNavigate();

    const columns = [
        { header: 'Restaurant Name', accessor: 'restaurant_name' },
        { header: 'User Name', accessor: 'name' },
        { header: 'Review', accessor: 'review' },
        { header: 'Reply', accessor: 'reply' },
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


    useEffect(() => {
        setIsLoading(true)
        //getting restaurants
        commonService.getServices(
            `/review/${id}`,
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
            let data = [];
            result?.data?.data?.map((d) => {
                data.push({
                    restaurant_name: d?.restaurant?.restaurant_name,
                    review: d?.review,
                    reply: d?.reply,
                    name: d?.user?.name
                })
            })
            setData(data)
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
                    heading="Restaurant Reviews"
                    columns={columns}
                    data={data}
                    total={total}
                    page={page}
                    rowsPerPage={perPage}
                    handlePagination={handlePagination}
                    isBack={true}
                    handleView={handleView}
                    handlePerPage={handlePerPage}
                    handlePage={handlePage}
                />
            }
        </>
    )
}

export default RestaurantReviews;