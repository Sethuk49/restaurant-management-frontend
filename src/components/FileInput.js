const FileInput = (props) => {
    return (
        <div className="m-2 flex">
            <div className="py-1.5 text-right w-40">{props.heading} : &nbsp;&nbsp; </div>
            <div className="w-96">
                <input
                    type="file"
                    class="block w-full p-1.5 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    accept={props.accept}
                    multiple
                />
                {props.error && <small className="font-bold text-red-500">{props.error}</small>}
            </div>
        </div>
    )
}

export default FileInput;