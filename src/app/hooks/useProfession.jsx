import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { toast } from "react-toastify"
import professionService from "../services/profession.service"

const ProfessionContext = React.createContext()

export const useProfession = () => useContext(ProfessionContext)

const ProfessionProvider = ({ children }) => {
    const [professions, setProfession] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfessionsList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    function getProfession(id) {
        return professions.find(p => p._id === id)
    }

    async function getProfessionsList() {
        try {
            const { content } = await professionService.get()
            setProfession(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
            {children}
        </ProfessionContext.Provider>
    )
}

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}