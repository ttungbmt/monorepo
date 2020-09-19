import {omit, get} from 'lodash-es'

export default {
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    computed: {
        type () {
            return this.context.type
        },
        attributes () {
            return omit(this.context.attributes, ['items']) || {}
        },
        hasValue () {
            return this.context.hasValue
        },
        items(){
            return get(this.context, 'attributes.items', [])
        },
        model: {
            get(){
                return this.context.model
            },
            set(val){
                this.context.model = val
            }
        }
    }
}