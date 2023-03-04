import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useProfession } from "../../hooks/useProfession"
import { useQuality } from "../../hooks/useQuality"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"

const RegisterForm = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    })
    const { signUp } = useAuth()
    const [errors, setErrors] = useState({})
    const { professions } = useProfession()
    const professionsList = professions.map(p => ({
        label: p.name,
        value: p._id
    }))
    const { qualities } = useQuality()
    const qualitiesList = qualities.map(q => ({
        label: q.name,
        value: q._id
    }))

    useEffect(() => {
        validate()
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна к заполнению"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен к заполнению"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно к заполнению"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 8
            }
        },
        professions: {
            isRequired: {
                message: "Пожалуйста, выберите свою профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Чтобы использовать сервис, подтвердите лицензионное соглашение"
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
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const newData = {
            ...data,
            qualities: data.qualities.map(q => q.value)
        }
        try {
            await signUp(newData)
            navigate("/")
        } catch (error) {
            setErrors(error)
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
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    type="password"
                    label="Пароль"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <SelectField
                    label="Профессия"
                    name="profession"
                    value={data.profession}
                    onChange={handleChange}
                    error={errors.profession}
                    options={professionsList}
                    defaultOption="Выберите профессию"
                />
                <RadioField
                    label="Выберите пол"
                    name="sex"
                    value={data.sex}
                    onChange={handleChange}
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                />
                <MultiSelectField
                    options={qualitiesList}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите качества"
                />
                <CheckBoxField
                    name="licence"
                    value={data.licence}
                    onChange={handleChange}
                    error={errors.licence}
                >
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-100 mx-auto"
                >
                    Submit
                </button>
            </form>
        </>
    )
}

export default RegisterForm