import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';


const SelectBasicExample = (props) => {
    return (
        <Form.Select aria-label={props.name} value={props.value} onChange={props.onItemizedItemEdit} required name={props.name} >
            <option value="" disabled  >{props.name}</option>
            {props.options.map((record) => (
                <option value={record} key={record}>{record}</option>
            ))}
        </Form.Select>
    );
}


SelectBasicExample.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onItemizedItemEdit: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
}

SelectBasicExample.defaultProps = {
    value: '',
}

export default SelectBasicExample;