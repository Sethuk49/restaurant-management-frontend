import { useNavigate } from 'react-router-dom';

const ViewPage = (props) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-white h-full p-10 border-r-2 rounded-lg">
            <div className='flex border-b-2'>
                <h1 className="text-2xl font-bold mb-4">{props?.heading}</h1>
            </div>
            <div className="max-h-[80%] mx-auto py-4 overflow-y-auto">
                <div className="columns-2">
                    {Object.keys(props?.data).map((key) => (
                        <div className="p-2">
                            <b>{key} : </b>{props?.data[key]}<br />
                        </div>
                    ))}
                </div>
            </div>
            <div className="float-right mt-5 mr-48">
                <button
                    onClick={handleBack}
                    className={`px-5 py-2 bg-gray-400 text-white rounded-md`}
                >
                    Back
                </button>
            </div>
        </div>
    )
}


export default ViewPage;