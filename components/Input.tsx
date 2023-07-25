interface InputProps {
    placeholder?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
  }
  
  const Input: React.FC<InputProps> = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
    return (
      <div className="w-full">
        {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
        <input
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className="
            w-full
            p-4 
            text-lg 
            bg-white 
            border-2
            border-green-700 
            rounded-md
            outline-none
            text-black
            focus:border-[#2caa5b]
            focus:border-2
           
          "
        />
      </div>
     );
  }
   
  export default Input;