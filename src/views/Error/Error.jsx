import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import sarmicroLogo from "../../assets/images/sarmicroLogo.png";
import styles from "../../components/Buttons/styleButton.module.css";
import style from "./error.module.css";
/* import { useNavigate } from "react-router-dom"; */
const Error = () => {
  /*   const navigate = useNavigate();

  const backFunction = () => {
    navigate("/inicio");
  }; */
  return (
    <div className={style.errorContainer}>
      <div className={style.blurIn}>
        <img alt="logo" src={sarmicroLogo} className={style.logo} />
      </div>
      <div className={style.wobbleHorizontal}>
        <span className={style.errorCode}>ERROR 4💣4 </span>
      </div>
      <div className={style.trackingForwardBottom}>
        <span className={style.message}>
          LO SENTIMOS, ESTA PAGINA NO FUE ENCONTRADA 🤒
        </span>
      </div>

      <a href="/inicio">
        <div className={style.blurIn}>
          <Typography
            style={{
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#000000",
              color: "white",
              borderRadius: "8px",
              border: "2px solid white",
              padding: "15px 20px",
              fontSize: "1em",
              fontFamily: "Roboto, sans-serif",
              marginTop: "2.5em",
              display: { xs: "none", md: "flex", marginLeft: "auto" },
            }}
            className={styles.botonLogout}
            /* onClick={backFunction} */
          >
            VOLVER A INICIO
            <HomeIcon style={{ marginLeft: 10, fontSize: "large" }} />
          </Typography>
        </div>
      </a>
    </div>
  );
};

export default Error;
