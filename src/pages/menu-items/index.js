import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { commonService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";


const MenuItems = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const columns = [
        { header: 'Item Name', accessor: 'name' },
        { header: 'Price', accessor: 'price' }
    ];

    const [data, setData] = useState([])
    const [total, setTotal] = useState(0);


    const handleEdit = (id) => {
        navigate(`/restaurant/menu-item/edit/${id}`)
    }

    const handleCreate = () => {
        navigate('/restaurant/menu-item/create')
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
        commonService.postServiceParams(
            '/menu-items/search',
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
                    heading="Menu Item List"
                    columns={columns}
                    data={data}
                    total={total}
                    page={page}
                    rowsPerPage={3}
                    handlePagination={handlePagination}
                    isView={false}
                    isEdit={true}
                    handleEdit={handleEdit}
                    isCreate={true}
                    createText="Create Menu Item"
                    handleCreate={handleCreate}
                    handlePerPage={handlePerPage}
                    handlePage={handlePage}
                />
            }
        </>
    )
}

export default MenuItems;