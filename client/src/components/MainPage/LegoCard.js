import React from "react";

const LegoCard = ({ legoData }) => {
  const { set_img_url, name, set_num, year } = legoData;
  return (
    <div className="relative bg-center bg-cover rounded-2xl w-[300px] sm:w-[450px] h-[250px] shadow-lg hover:scale-105 duration-150 hover:shadow-2xl" style={{ backgroundImage: `url(${set_img_url})` }}>
      <div className="absolute bg-[rgba(0,0,0,.7)] text-white flex flex-col  w-full justify-start items-center rounded-b-2xl bottom-0 font-bold tracking-widest">
        <h3 className="py-1">{name}</h3>
        <h3 className="py-1">#{set_num}</h3>
        <h3 className="py-1">{year}</h3>
      </div>
    </div>

  );
};

export default LegoCard;
