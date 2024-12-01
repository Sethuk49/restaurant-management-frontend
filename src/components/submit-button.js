const SubmitButton = (props) => {
    return (
        <div className="mt-8 ml-16 w-40">
            <button className="px-3 py-1 float-right text-white bg-blue-500 rounded-sm" onClick={props?.onClick}>
                {props?.text}
            </button>
        </div>
    )
}

export default SubmitButton;