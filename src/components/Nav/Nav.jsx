import logo from "../../images/title-logo.png";
import { Link } from "react-router-dom";

function Nav({ onSignOut, page }) {
  return (
    <nav className={page !== "home" ? "nav nav_auth" : "nav"}>
      {" "}
      <img
        className="nav__logo"
        src={logo}
        alt="Logo Escrito 'Around The U.S'"
      />
      {page === "login" && (
        <Link to="/signup" className="auth_login">
          Registrar
        </Link>
      )}
      {page === "register" && (
        <Link to="/signin" className="auth_login">
          Fazer Login
        </Link>
      )}
      {page === "home" && (
        <Link className="auth_login" onClick={onSignOut}>
          Sair
        </Link>
      )}
    </nav>
  );
}

export default Nav;
