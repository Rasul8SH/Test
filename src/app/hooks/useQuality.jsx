import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { toast } from "react-toastify"
import qualityService from "../services/quality.service"

const QualityContext = React.createContext()
export const useQuality = () => useContext(QualityContext)

export const QualityProvider = ({ children }) => {
    const [qualities, setQuality] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        getQualitiesList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }
    }, [error])

    function getQuality(id) {
        return qualities.find(q => q._id === id)
    }

    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get()
            setQuality(content)
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
        <QualityContext.Provider value={{ qualities, getQuality, isLoading }}>
            {children}
        </QualityContext.Provider>
    )
}

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
}