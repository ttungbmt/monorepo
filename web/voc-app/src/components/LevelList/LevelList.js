import React, {cloneElement, createContext, Fragment, isValidElement, memo} from 'react'
import {castArray, isArray, isUndefined, range} from 'lodash-es'

export const HeadingContext = createContext({name: '',});

function LevelList(props) {
    const children = castArray(props.children)

    const renderChild = (child, serial, key) => isValidElement(child) ?  cloneElement(child, Object.assign({ level: 1, serial: [{value: key+1, level: 1}] }, !isUndefined(key) ? {key} : {})) : child

    let config = []


    if(props.config) {
        config = props.config
    } else {
        if(props.multiple) {
            config = [{level: 1, numberFormat: 5}]
        } else {
            config = [
                {
                    level: 1,
                    numberFormat: 2,
                    style: {
                        title: {textTransform: 'uppercase'},
                        content: {paddingLeft: '10px'},
                    },
                },
                {
                    level: 2,
                    numberFormat: 1,
                    keepRootLevel: false,
                    style: {
                        title: {paddingLeft: '10px'},
                        content: {paddingLeft: '10px'},
                    }
                },
                {
                    level: 3,
                    numberFormat: 1,
                    keepRootLevel: false,
                    style: {
                        title: {paddingLeft: '20px'},
                        content: {paddingLeft: '20px'},
                    }
                },
                {
                    level: 4,
                    inherit: false,
                    numberFormat: 5,
                    style: {
                        title: {paddingLeft: '20px'},
                    }
                }
            ]
        }
    }


        // config={[{level: 1, numberFormat: 5}]}

    return (
        <HeadingContext.Provider value={{name: props.name, config}}>
            {isArray(children) ? children.map((c, k) => renderChild(c, k+1, k)) : renderChild(children, 1)}
        </HeadingContext.Provider>
    )
}

export default memo(LevelList)