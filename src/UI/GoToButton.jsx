import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";


const GoToButton = ({ url }) => {
    return (
        <Link to={url}>
            <div className="d-flex align-items-center">
                <BiArrowBack size={18} />
                <div className="fw-bold mt-1 mx-2 cursor-pointer">
                    <h5>Go Back</h5>
                </div>
            </div>
        </Link>
    )
}

export default GoToButton;