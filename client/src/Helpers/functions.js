import legoSpinner from "../public/assets/Lego Spinner.gif";

export const renderSpinner = () => {
  return (
    <img
      src={legoSpinner}
      alt="lego spinner"
      className="lego-spinner"
      width="250"
    />
  );
};
