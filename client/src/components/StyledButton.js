const StyledButton = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="bg-[#FBC620] text-black px-6 py-4 rounded font-semibold tracking-wide font-[fredoka]">
            {children}
        </button>
    );
}

export default StyledButton;