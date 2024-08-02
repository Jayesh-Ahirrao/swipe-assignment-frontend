import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


// TODO: Update all buttons comps where this comp can be used;
const GoToButton = ({ url, text, type = "primary" }) => {
    return (
        <Link to={url}>
                <Button className="fw-bold mt-1 mx-2 cursor-pointer">
                    {text}
                </Button>
        </Link>
    )
}

export default GoToButton;