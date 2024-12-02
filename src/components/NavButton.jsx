import { Link } from "react-router-dom";

export default function NavButton({ text }) {
  return (
    <Link to="/manage">
      <button className="back-btn">{text}</button>
    </Link>
  );
}
