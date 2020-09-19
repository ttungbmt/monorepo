<template>
    <b-form-radio-group
            v-model="model"
            :options="items"
            :stacked="!inline"
            value-field="value"
            text-field="label"
            v-bind="attributes"
    ></b-form-radio-group>
</template>

<script>
    import {isUndefined} from 'lodash-es'
    import InputMixin from '../../mixins/InputMixin'

    export default {
        name: 'BRadio',
        mixins: [InputMixin],
        computed: {
            inline(){
                return isUndefined(this.attributes.inline) ? true : this.attributes.inline
            },
        },
        data () {
            return {
                selected: null
            }
        },
    }
</script>
<style>
    input[type="radio"].custom-control-input {position: absolute;}
</style>