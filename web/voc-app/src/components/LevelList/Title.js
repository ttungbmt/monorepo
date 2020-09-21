import React, {memo, useContext} from 'react'
import cx from 'clsx'
import Number from "./Number"
import {HeadingContext} from "./LevelList";
import {find, get, cloneDeep} from 'lodash-es'


function Title({serial, level, text}) {
    const {config} = useContext(HeadingContext)

    let style = cloneDeep(get(find(config, {level}), 'style.title', {}))


    let className = [`text-blue-500`]

    if(level === 1) {
        className.push('font-bold text-lg')
    } else if(level === 2){
        className.push(`font-medium`)
    } else {
        className.push(`font-semibold`)
    }

    if(level === 4) {
        style.color = '#f6ad55'
    }

    return <div className={cx(className)} style={style}><Number serial={serial} />. <span>{text}</span> ({level})</div>
}

export default memo(Title)