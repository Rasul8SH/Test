import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"

const LoginForm = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    })
    const [errors, setErrors] = useState({})
    const [enterError, setEnterError] = useState(null)
    const { signIn } = useAuth()

    useEffect(() => {
        validate()
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна к заполнению"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен к заполнению"
            }
        }
    }

    function validate() {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    function handleChange(target) {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
        setEnterError(null)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        try {
            await signIn(data)
            navigate("/")
        } catch (error) {
            setEnterError(error.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />    
                <CheckBoxField
                    name="stayOn"
                    value={data.stayOn}
                    onChange={handleChange} 
                >
                    Оставаться в системе
                </CheckBoxField>
                {enterError && <p className="text-danger">{enterError}</p>}
                <button
                    type="submit"
                    disabled={!isValid || enterError}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Отправить
                </button>
            </form>
        </>
    )
}

export default LoginForm