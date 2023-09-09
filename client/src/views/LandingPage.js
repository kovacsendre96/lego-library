import { Grid } from "@mui/material";
import logo from "../public/assets/logo.png"
import figure from "../public/assets/figure.png"
import figure_with_enlarger from "../public/assets/figure_with_enlarger.png"
import figure_with_checkered_flag from "../public/assets/figure_with_checkered_flag.png"
import StyledButton from "../components/StyledButton";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
    const navigate = useNavigate();


    return (
        <>
            <Grid className="relative h-auto p-5 bg-gradient-to-r from-black to-[#2D3436] flex" container direction={'column'} justifyContent={'space-around'} alignItems={'center'} >
                <div className="relative h-[200px] md:h-[450px]">
                    <div className="absolute top-0 left-1/2 h-full w-full transform -translate-x-1/2 -translate-y-4%">
                        <img
                            src={logo}
                            alt="Blurred Background"
                            className="h-[210px] md:h-[460px] object-cover z-0 filter blur-lg"
                            style={{ mixBlendMode: "multiply" }}
                        />
                    </div>
                    <img
                        className="h-full relative z-10"
                        src={logo}
                        alt="logo"
                    />
                </div>

                <h2 className="px-2 mx-auto mt-[100px] text-white text-center w-full md:w-1/2 lg:w-1/3 text-2xl">Üdvözöllek a Lego Library-ben, a Lego készletek szervezésének és
                    kezelésének eszközében.
                </h2>


            </Grid>
            <Grid className="min-h-[450px] bg-gradient-to-r from-[#FBC620] via-[#FADD8D] to-[#FBC620] flex items-center justify-center">
                <div className="container p-3 flex flex-col md:flex-row justify-center items-center">
                    <img
                        src={figure}
                        alt="Blurred Background"
                        className="h-[200px] mb-2 md:h-[300px] md:w-[250px] object-cover"
                    />
                    <div className="flex flex-col mx-auto text-center w-full p-5 md:w-1/2 text-lg md:text-2xl">
                        <h2 className="font-bold mb-"
                        >
                            Lego gyűjteményeid egy helyen
                        </h2>
                        <span>A Lego Library lehetőséget ad arra, hogy rendszerezd a készleteidet.</span>
                        <span >Itt könnyedén hozzáadhatod készleteidet név
                            szerint, listát készíthetsz gyűjteményeidről, részletes információkat
                            kérhetsz minden egyes készletről.
                        </span>
                    </div>
                </div>
            </Grid>
            <Grid className="min-h-[450px] bg-white flex items-center justify-center">
                <div className="container flex flex-col-reverse md:flex-row p-5 justify-center items-center">
                    <div className="flex flex-col mx-auto p-5 text-center w-full md:w-1/2 text-lg md:text-2xl">
                        <h2 className="font-bold mb-"
                        >
                            Elveszett darabok rögzítése.
                        </h2>
                        <span>
                            A Lego Library megoldást kínál arra, hogy egyszerűen vedd fel az elveszett
                            Lego darabokat. Ezáltal hatékonyabban tudod pótolni őket és könnyebben át
                            láthatod a hiányt.
                        </span>
                    </div>
                    <img
                        src={figure_with_enlarger}
                        alt="Blurred Background"
                        className="h-[200px] mb-2 md:h-[350px] w-[250px] object-cover"
                    />
                </div>
            </Grid>
            <Grid className="min-h-[450px] bg-gradient-to-r from-[#FBC620] via-[#FADD8D] to-[#FBC620] flex items-center justify-center">
                <div className="container flex flex-col md:flex-row p-5 justify-center items-center">
                    <img
                        src={figure_with_checkered_flag}
                        alt="Blurred Background"
                        className="h-[200px] mb-2 md:h-[350px] w-[250px] object-cover"
                    />
                    <div className="flex items-center flex-col mx-auto text-center w-full p-5 md:w-1/2 text-lg md:text-2xl">
                        <h2 className="font-bold mb-"
                        >
                            Kezdjük el!
                        </h2>
                        <span>
                            Akár tapasztalt Lego építő vagy, akár csak most kezded, a
                            Lego Library tökéletes eszköz arra, hogy nyomon követhesd a
                            gyűjteményedet és rendezett maradj.
                        </span>
                        <div className="text-center mt-5">
                            <StyledButton onClick={() => navigate("/lego-sets")} children={"Tovább"} />
                        </div>
                    </div>
                </div>

            </Grid>
        </>
    )
}

export default LandingPage;