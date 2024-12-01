const CheckboxInput = (props) => {
    return (
        <div className="m-2 flex">
            <div className="py-1.5 text-right w-40">{props.heading} : &nbsp;&nbsp; </div>
            <div className="m-2">
                <input
                    type="checkbox"
                    name={props.name}
                    checked={props?.checked}
                    onClick={props.onChange}
                    onBlur={props.onBlur}
                />
                {props.error && <small className="font-bold text-red-500">{props.error}</small>}
            </div>
        </div>
    )
}

export default CheckboxInput;