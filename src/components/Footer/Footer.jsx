import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import BusinessIcon from "@mui/icons-material/Business";
import ComputerIcon from "@mui/icons-material/Computer";
import PaletteIcon from "@mui/icons-material/Palette";
import CodeIcon from "@mui/icons-material/Code";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-gray-300 text-md py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex justify-center mb-4 md:mb-0">
          <a
            href="https://www.transargelia.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={sarmicroLogo}
              alt="sarmicroLogo"
              className="w-40 hover:cursor-pointer"
            />
          </a>
        </div>
        <div className="text-center md:text-left mb-4 md:mb-0">
          <div className="mb-2">
            <p className="font-bold text-lg">
              <BusinessIcon /> Calle 16C #8-45, Barrio Mariscal. Cartago, Valle
              del Cauca.
            </p>
          </div>
          <div className="mb-2">
            <p>
              <LocalPhoneIcon /> +57 314-686-8066
            </p>
            <p>
              <ComputerIcon /> Desarrollado por
            </p>
            <p>
              <CodeIcon /> Anderson Serna
            </p>
            <p>
              <PaletteIcon /> Angel Villa
            </p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="font-bold text-lg">
            &copy; {new Date().getFullYear()} Transportes Argelia y Cairo.
            <br /> Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
