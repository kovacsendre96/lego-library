import { IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; import { useEffect, useState } from "react";
import RebrickableService from "../services/rebrickableService";
import { renderSpinner } from "../Helpers/functions";
import notFound from "../public/assets/error-not-found-404-lego.jpg";
const NewSetPage = () => {


    const [searchResult, setSearchResult] = useState([]);
    const [inputValue, setInputValue] = useState("castle");
    const [isLoading, setIsLoading] = useState(false);

    const rebrickableService = new RebrickableService();

    async function handleSearch(targetValue) {
        const searchResults = await rebrickableService.getSets(targetValue);

        const resultArray = searchResults.results.map((result) => {
            console.log(result);
            return {
                name: result.name,
                id: result.set_num,
                set_img_url: result.set_img_url,
                year: result.year
            };
        });
        setSearchResult(resultArray);
        setIsLoading(false);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (inputValue !== "") {
                setIsLoading(true);
                handleSearch(inputValue)
            } else {
                setSearchResult([]);
            }
        }, 500);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [inputValue]);


    return (

        <div className="w-full min-h-screen h-auto flex items-center flex-col">
            <div className="w-full h-[120px] bg-yellow-gradient flex items-center justify-center">
                <div class="relative  w-[70%] max-w-xl">
                    <input onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Kezdj el gépelni..." class="w-full rounded-2xl py-3 h-[70px] px-4 pr-10" />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 22l-6-6" />
                            <circle cx="11" cy="11" r="8" />
                        </svg>
                    </div>
                </div>
            </div>


            {isLoading ? renderSpinner() : null}
            {searchResult.map((result, index) => (
                <div key={result.id} className="shadow-lg hover:scale-105 duration-150 hover:shadow-2xl w-[70%] max-w-xl rounded-2xl mt-5 p-3 cursor-pointer bg-white items-center flex flex-col sm:flex-row">
                    <img className={`h-[120px] w-[100px] ${result?.set_img_url ? 'object-cover' : 'object-contain'}`} src={result?.set_img_url ?? notFound} alt={result.name} />
                    <div className="flex flex-col ml-5 mt-5 sm:mt-0">
                        <h3>{result?.name}</h3>
                        <h3>#{result?.id}</h3>
                        <h3>{result?.year}</h3>
                    </div>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        className="sm:!ml-auto [&>svg]:!text-[40px] !text-custom-yellow"
                    >
                        <Tooltip title="Hozzáadás">
                            <CheckCircleIcon />
                        </Tooltip>
                    </IconButton>
                </div>
            ))}
        </div>

    );
}

export default NewSetPage