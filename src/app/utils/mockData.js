import { useEffect, useState } from "react"
import professions from "../mockData/professions.json"
import qualities from "../mockData/qualities.json"
import users from "../mockData/users.json"
import httpService from "../services/http.service"

const useMockData = () => {
    const statusConsts = {
        idle: "Not started",
        pending: "In process",
        successed: "Ready",
        error: "Error occured"
    }
    const summaryCount = professions.length + qualities.length + users.length

    const [error, setError] = useState(null)
    const [status, setStatus] = useState(statusConsts.idle)
    const [progress, setProgress] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        updateProgress()
    }, [count])

    function incrementCount() {
        setCount(prevState => prevState + 1)
    }

    function updateProgress() {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending)
        }
        const newProgress = Math.floor((count / summaryCount) * 100)
        if (progress < newProgress) {
            setProgress(() => newProgress)
        }
        if (progress === 100) {
            setStatus(statusConsts.successed)
        }
    }

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof)
                incrementCount()
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual)
                incrementCount()
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user)
                incrementCount()
            }
        } catch (error) {
            setError(error)
            setStatus(statusConsts.error)
        }
    }

    return { error, initialize, progress, status }
}

export default useMockData