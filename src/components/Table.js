import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = (props) => {

    const changePage = (page) => {
        props.handlePage(page);
    };

    const handleRowsPerPageChange = (event) => {
        props.handlePerPage(Number(event.target.value));
        props.handlePage(1);
    };


    const handleViewAction = (id) => {
        props.handleView(id);
    }

    const handleEditAction = (id) => {
        props.handleEdit(id);
    }

    const handleReviewAction = (id) => {
        props.handleReviewAction(id);
    }

    const indexOfLastRow = props.page * props.rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - props.rowsPerPage;
    const currentRows = props?.data.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(props?.total / props.rowsPerPage);
    const navigate = useNavigate();

    const renderPagination = () => {
        const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                onClick={() => changePage(index + 1)}
                className={`px-3 py-1 ${props.page === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
            >
                {index + 1}
            </button>
        ));

        return (
            <div className="flex items-center space-x-2">
                {/* "Previous" button */}
                <button
                    onClick={() => changePage(props.page - 1)}
                    disabled={props.page === 1}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>

                {/* {paginationButtons} */}
                <button
                    onClick={() => changePage(props.page + 1)}
                    disabled={props.page === totalPages}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white h-full p-10 border-r-2 rounded-lg">
            <div className='flex border-b-2 w-full justify-between'>
                <h1 className="text-2xl font-bold mb-4">{props?.heading}</h1>
                {props?.isCreate && <div className=''>
                    <button className="px-3 py-2 text-white bg-blue-500 rounded-sm" onClick={props.handleCreate}>
                        {props.createText}
                    </button>
                </div>
                }

                {props?.isBack && <div className=''>
                    <button className="px-3 py-2 text-white bg-blue-300 rounded-sm" onClick={() => { navigate(-1) }}>
                        Back
                    </button>
                </div>
                }

            </div>

            <div className="max-h-[80%] mx-auto mt-5 py-4 overflow-y-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="static">
                        <tr>
                            <th className="py-2 px-4 border bg-slate-500">#</th>
                            {
                                props?.columns?.map((c) => (
                                    <th className="py-1 px-4 border bg-slate-500">{c?.header}</th>
                                ))
                            }
                            {(props?.isView || props?.isEdit) && <th className="py-2 px-4 border bg-slate-500">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props?.data.map((item, index) => (

                            <tr key={item._id} className="text-gray-700">
                                <td className="py-1 px-4 border text-center">{indexOfFirstRow + index + 1}</td>
                                {props?.columns?.map((c) => (
                                    <td key={item._id} className="py-1 px-4 border text-center">{item[c?.accessor]}</td>
                                ))}
                                {(props?.isView || props?.isEdit) &&
                                    (
                                        <td className="flex py-1 px-4 border justify-center">
                                            <div className='flex'>
                                                {props?.isView &&
                                                    <svg className="m-2 size-6 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { handleViewAction(item?._id) }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                    </svg>}
                                                {props?.isEdit &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-2" onClick={() => handleEditAction(item?._id)}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                }
                                                {props?.isReView &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-2" onClick={() => handleReviewAction(item?._id)}>
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                    </svg>
                                                }
                                            </div>
                                        </td>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center m-4">
                <div>
                    Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, props?.total)} of {props?.total} results
                </div>

                <div>
                    <div className="flex items-center">
                        <label htmlFor="rows-per-page" className="mr-2">Rows per page:</label>
                        <select
                            id="rows-per-page"
                            value={props.rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-center">
                        {renderPagination()}
                    </div>
                </div>
            </div>

        </div>

    );
};


export default Table;
