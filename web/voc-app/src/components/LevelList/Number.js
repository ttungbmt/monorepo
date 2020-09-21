import React, {memo, useContext} from 'react'
import {find, get, isFunction, takeRight, drop} from 'lodash-es'

import numberStyles from "./numberStyles"
import {HeadingContext} from "./LevelList"

function Number({serial}){
    const {config} = useContext(HeadingContext)

    let level = takeRight(serial, 1)[0].level,
        {numberFormat, inherit, keepRootLevel} = find(config, {level})

    if(isFunction(numberFormat)){
        return numberFormat({serial, level: serial.length, numberStyles})
    } else {
        let items = serial

        if(keepRootLevel === false) items = drop(items, 1)
        if(inherit === false) items = takeRight(items, 1)

        return items.map(({value, level}, k) => {
            let format = find(config, {level}).numberFormat,
                formatValue = get(numberStyles, format)

            return get(formatValue, value-1)
        }).join('.')
    }

}

export default memo(Number)