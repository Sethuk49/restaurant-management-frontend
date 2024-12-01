import { useEffect, useState } from "react";
import Table from "../../components/Table";
import { commonService } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import Modal from "../../components/ModelBox";
import AddReply from "./add-reply";
import { useFlashMessage } from "../../components/FlashMessageContext";

const RestaturantReviews = () => {

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenReview, setIsReview] = useState(false);
    const [id, setId] = useState('');
    const [isReviewed, setIsReviewed] = useState(false);

    const navigate = useNavigate();

    const columns = [
        { header: 'User Name', accessor: 'user' },
        { header: 'Review', accessor: 'review' },
        { header: 'Reply', accessor: 'reply' },
        { header: 'Rating', accessor: 'rating' },
    ];

    const [data, setData] = useState([])
    const [total, setTotal] = useState(0);

    const { addMessage } = useFlashMessage();

    const handlePage = (page) => {
        setPage(+page)
    }

    const handlePerPage = (perPage) => {
        setPerPage(perPage)
    }

    const handleEdit = (id) => {
        setId(id)
        setIsReview(true)
    }

    const handleReply = (data) => {
        setIsLoading(true)
        console.log(id, data)
        commonService.postService(`/review/add-reply/${id}`, {
            reply: data?.reply
        }).then((result) => {
            setIsReview(false)
            setIsLoading(false)
            addMessage(result?.data?.message, 'success');
            setIsReviewed(!isReviewed)
        }).catch(error => {
            addMessage(error?.response?.data?.message, 'error');
            console.log(error)
        })
    }

    useEffect(() => {
        setIsLoading(true)
        //getting restaurants
        commonService.getServices(
            'review',
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
                    _id: d?._id,
                    user: d?.user?.name,
                    review: d?.review,
                    rating: d?.rating,
                    reply: d?.reply ? d?.reply : '-',
                })
            })
            setData(data)
            setTotal(result?.data?.pagination?.total)
            setIsLoading(false)
        }).catch(err => console.log(err));

    }, [page, perPage, isReviewed]);

    const handlePagination = (page, perPage) => {
        setPage(page);
        setPerPage(perPage);
    }


    return (
        <>
            {isOpenReview && (
                <Modal isOpen={isOpenReview} onClose={() => setIsReview(false)} title={"Add Reply"}>
                    <AddReply submitForm={handleReply} />
                </Modal>
            )}
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
                    handlePerPage={handlePerPage}
                    handlePage={handlePage}
                    isEdit={true}
                    handleEdit={handleEdit}
                />
            }
        </>
    )
}

export default RestaturantReviews;