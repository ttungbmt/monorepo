import { useState } from 'react'
import useDidMount from './useDidMount'

export default function useWillMount(f){
    const [willMount, setWillMount] = useState(true);
    useDidMount(() => setWillMount(false));
    typeof f === "function" && willMount && f()
}