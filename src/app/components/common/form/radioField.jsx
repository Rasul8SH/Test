import PropTypes from "prop-types"

const RadioField = ({ label, name, value, onChange, options }) => {
    function handleChange({ target }) {
        onChange({
            name: target.name,
            value: target.value
        })
    }

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options.map(option => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline"
                    >
                        <input 
                            className="form-check-input"
                            type="radio" 
                            id={option.name + "_" + option.value}
                            name={name}
                            value={option.value}
                            onChange={handleChange}
                            checked={option.value === value}
                        />
                        <label>

                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

RadioField.propTypes = {
    label: PropTypes.string, 
    name: PropTypes.string, 
    value: PropTypes.string, 
    onChange: PropTypes.func, 
    options: PropTypes.array
}

export default RadioField