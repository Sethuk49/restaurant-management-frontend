import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { commonService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const RestaturantOrders = () => {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const columns = [
        { header: 'Restaurant Name', accessor: 'restaurant_name' },
        { header: 'No of People', accessor: 'no_of_people' },
        { header: 'From', accessor: 'from_date' },
        { header: 'To', accessor: 'to_date' },
        { header: 'User Name', accessor: 'user' }
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
            'order',
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
            setIsLoading(false);
            let data = [];
            result?.data?.data?.map((d) => {
                data.push({
                    restaurant_name : d?.restaurant?.restaurant_name,
                    no_of_people: d?.no_of_people,
                    from_date: d?.from_date,
                    to_date: d?.to_date,
                    user: d?.user?.name
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
                    heading="Restaurant Orders"
                    columns={columns}
                    data={data}
                    total={total}
                    page={page}
                    rowsPerPage={perPage}
                    handlePagination={handlePagination}
                    // isView={true}
                    // handleView={handleView}
                    handlePerPage={handlePerPage}
                    handlePage={handlePage}
                />
            }
        </>
    )
}

export default RestaturantOrders;