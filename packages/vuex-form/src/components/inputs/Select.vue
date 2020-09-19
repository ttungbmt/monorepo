<template>
    <v-select :options="foods" v-model="selected" label="text" :reduce="reduceHandler" placeholder="Choose..."></v-select>
</template>

<script>
    import FormulateInputMixin from '@braid/vue-formulate/src/FormulateInputMixin'
    import {isPlainObject} from 'lodash-es'
    import vSelect from 'vue-select'
    import 'vue-select/src/scss/vue-select.scss'

    export default {
        name: 'BSelect',
        mixins: [FormulateInputMixin],
        components: {
            vSelect
        },
        data () {
            return {
                selected: null,
                foods: ['Carrots', {text: 'ZZZ', value: 'ZZZ'}],
            }
        },
        methods: {
            reduceHandler(item){
                if(isPlainObject(item)) return item.value
                return item
            }
        }
    }
</script>
