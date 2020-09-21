import { useEffect } from 'react'

export default function useDidMount(f){
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => typeof f === "function" && f(), [])
}