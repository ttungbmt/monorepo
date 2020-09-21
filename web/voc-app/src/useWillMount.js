import {useRef, useEffect, useState} from 'react';

export function useWillMount(callback) {
    const ref = useRef

    if (!ref.current) {
        ref.current = {
            value: callback(),
        };
    }
    return ref.current.value;
}

export default useWillMount
