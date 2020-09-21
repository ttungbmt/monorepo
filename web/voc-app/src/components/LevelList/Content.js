import React, {memo, useContext} from 'react'
import {HeadingContext} from "./LevelList";
import {find, get, cloneDeep} from 'lodash-es'

function Content({level, children}) {
    const {config} = useContext(HeadingContext)
    let style = cloneDeep(get(find(config, {level}), 'style.content', {}))

    console.log(level, style)

    return <div style={style}>{children}</div>
}

export default memo(Content)