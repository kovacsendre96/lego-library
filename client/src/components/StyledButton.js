import { MenuItem } from "@mui/material";

const StyledButton = ({ children, onClick, className, icon }) => {
    return (
        <MenuItem className="!p-0 !w-auto">
            <button onClick={onClick} className={`bg-[#FBC620] text-black px-6 py-4 rounded font-semibold tracking-wide font-[fredoka] flex ${className}`}>
                {icon &&
                    <div className="mr-2">
                        {icon}
                    </div>
                }
                {children}
            </button>
        </MenuItem >
    );
}

export default StyledButton;