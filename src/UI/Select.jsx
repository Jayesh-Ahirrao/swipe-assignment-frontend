import Form from 'react-bootstrap/Form';

const SelectBasicExample = (props) => {

    return (
        <Form.Select aria-label={props.name} value={props.value} onChange={props.onItemizedItemEdit} required name={props.name} >
            <option value="" disabled  selected>{props.name}</option>
            {props.options.map((record) => (
                <option value={record} key={record}>{record}</option>
            ))}
        </Form.Select>
    );
}

export default SelectBasicExample;