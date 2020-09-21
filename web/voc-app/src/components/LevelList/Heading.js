import React, {cloneElement, isValidElement, useContext, useRef, memo} from "react";
import {HeadingContext} from "./LevelList"
import {includes, clone, isArray, isUndefined, get} from "lodash-es"

function Heading({children, ...props}) {
    const ref = useRef
    const context = useContext(HeadingContext)

    let nextIndex = 0

    if (!ref.current) {

    }

    const renderChild = (element, key) => {
        if (isValidElement(element) && get(element, 'type.type.name')) {
            let serial = clone(props.serial),
                level = clone(props.level),
                childProps = {level, serial}

            if (!isUndefined(key)) childProps.key = key

            if (includes(['Heading'], element.type.type.name) && level >= 1) {
                nextIndex++
                childProps.level = level + 1
                childProps.serial.push({value: nextIndex, level: childProps.level})
            }

            return cloneElement(element, childProps)
        }

        return element
    }

    return (
        <div>
            {isArray(children) ? children.map((element, key) => renderChild(element, key)) : renderChild(children)}
        </div>
    )
}

export default memo(Heading)