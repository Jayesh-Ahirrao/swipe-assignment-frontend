import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';



// TODO: Update all buttons comps where this comp can be used;
const GoToButton = ({ url, text, type = "primary" }) => {
    return (
        <Link to={url}>
            <Button className="fw-bold mt-1 mx-2 cursor-pointer" type={type}>
                {text}
            </Button>
        </Link>
    )
}

GoToButton.prototype = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string
}



export default GoToButton;