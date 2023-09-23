import { useEffect, useState } from "react";
import RebrickableService from "../services/rebrickableService";
import { renderSpinner } from "../Helpers/functions";
import notFound from "../public/assets/error-not-found-404-lego.jpg";
import { useNavigate } from 'react-router-dom';


const NewSetPage = () => {


    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const rebrickableService = new RebrickableService();

    async function handleSearch(targetValue) {
        const searchResults = await rebrickableService.getSets(targetValue);

        const resultArray = searchResults.results.map((result) => {
            return {
                name: result.name,
                id: result.set_num,
                set_img_url: result.set_img_url,
                year: result.year
            };
        });
        setSearchResult(resultArray);
        setIsLoading(false);
        const searchQuery = targetValue.replaceAll(" ", "&");
        navigate("?search=" + searchQuery);
    }


    useEffect(() => {
        setInputValue(window.location.search.slice(8).replaceAll("&", " "));

    }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (inputValue !== "") {
                setIsLoading(true);
                handleSearch(inputValue)
            } else {
                setSearchResult([]);
                navigate("/new-set");
            }
        }, 500);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [inputValue]);


    return (

        <div className="w-full min-h-screen h-auto flex items-center flex-col">
            <div className="w-full h-[120px] bg-yellow-gradient flex items-center justify-center sticky top-[116px]">
                <div className="relative  w-[70%] max-w-xl">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Név vagy azonosító Pl.: Castle" className="w-full rounded-2xl py-3 h-[70px] px-4 pr-10" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 22l-6-6" />
                            <circle cx="11" cy="11" r="8" />
                        </svg>
                    </div>
                </div>
            </div>


            {isLoading ? renderSpinner() : null}
            {searchResult.map((result, index) => (
                <div onClick={() => navigate(`/lego-sets/${result?.id}`)} key={result.id} className="shadow-lg  duration-150 hover:shadow-2xl w-[70%] max-w-xl rounded-2xl mt-5 p-3 cursor-pointer bg-white items-center flex flex-col sm:flex-row">
                    <img className={`h-[120px] w-[100px] ${result?.set_img_url ? 'object-cover' : 'object-contain'}`} src={result?.set_img_url ?? notFound} alt={result.name} />
                    <div className="flex flex-col ml-5 mt-5 sm:mt-0">
                        <h3>{result?.name}</h3>
                        <h3>#{result?.id}</h3>
                        <h3>{result?.year}</h3>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default NewSetPage