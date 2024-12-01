import { useParams } from 'react-router-dom';
import { commonService } from '../../services/api.service';
import ViewPage from '../../components/ViewPage';
import { useEffect, useState, useTransition, Suspense } from 'react';
import Loader from "../../components/Loader";

const ViewRestaurant = () => {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);

        commonService.getServices(`restaurant/${id}`)
            .then((result) => {
                const fetchedData = {
                    "Restaurant Name": result?.data?.data?.restaurant_name || 'N/A',
                    "Location": result?.data?.data?.location || 'N/A',
                    "Days of Operation": result?.data?.data?.days_of_operation || 'N/A',
                    "Is 24 Hours Working": result?.data?.data?.is24Hours ? "True" : "False",
                    "Opening Time": result?.data?.data?.is24Hours ? "N/A" : result?.data?.data?.opening_time,
                    "Closing Time": result?.data?.data?.is24Hours ? "N/A" : result?.data?.data?.closing_time,
                    "Party Size": result?.data?.data?.party_size || 'N/A',
                    "Owner Name": result?.data?.data?.user?.name || 'N/A',
                    "Owner Email": result?.data?.data?.user?.email || 'N/A',
                    "Owner Mobile Number": result?.data?.data?.user?.mobile_number || 'N/A',
                };

                setData(fetchedData);

                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <>
            <Suspense fallback={<Loader />}>
                {isLoading && <Loader />}
                {!isLoading && data && (
                    <ViewPage
                        heading="Restaurant View"
                        data={data}
                    />
                )}
            </Suspense>
        </>
    );
};

export default ViewRestaurant;
