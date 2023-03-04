import PropTypes from "prop-types"
import Select from "react-select"

const MultiSelectField = ({ label, name, onChange, defaultValue, options }) => {
    const optionsArray = !Array.isArray(options) && typeof (options) === "object"
        ? Object.keys(options).map(option => ({
            label: options[option].name,
            value: options[option]._id
        }))
        : options.map(option => ({
            label: option.name,
            value: option._id
        }))

    function handleChange(value) {
        onChange({ name, value })
    }

    return (
        <div className="mb-4">
            <label>{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                defaultValue={defaultValue}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    label: PropTypes.string, 
    name: PropTypes.string, 
    onChange: PropTypes.func, 
    defaultValue: PropTypes.array,
    options: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}

export default MultiSelectField