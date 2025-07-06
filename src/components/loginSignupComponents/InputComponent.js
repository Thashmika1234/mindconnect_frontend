const InputComponent = ({placeholder, icon,inputtype, onChange}) => {
    return(
        <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
                <img src={icon} alt="User Icon" className="w-8 h-8" />
                <input
                    type={inputtype}
                    className="flex-grow bg-transparent focus:outline-none text-gray-700"
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    //value={value}
                />
        </div>
    );
}

export default InputComponent;

