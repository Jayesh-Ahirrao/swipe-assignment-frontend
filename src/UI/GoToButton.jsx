import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";


const GoToButton = ({url}) => {
    return (
        <div className="d-flex align-items-center">
            <BiArrowBack size={18} />
            <div className="fw-bold mt-1 mx-2 cursor-pointer">
                <Link to={url}>
                    <h5>Go Back</h5>
                </Link>
            </div>
        </div>
    )
}

export default GoToButton;