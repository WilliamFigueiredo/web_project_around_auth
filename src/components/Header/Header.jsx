export default function Header(props) {
  return (
    <header className="header">
      <img
        className="header__image"
        onClick={props.onClickAvatarImage}
        src={props.avatarImage}
        alt="AAA"
      />

      <div className="header__texts">
        <div className="header__container">
          <h1 className="header__username">{props.username}</h1>
          <button
            className="header__buttonedit"
            onClick={props.onClickButtonEdit}
          ></button>
        </div>

        <p className="header__about">{props.about}</p>
      </div>

      <button
        className="header__buttonpopup"
        onClick={props.onClickButtonAdd}
      ></button>
    </header>
  );
}
