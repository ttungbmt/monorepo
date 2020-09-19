<template>
    <b-form-input
        v-model="model"
        v-bind="attributes"
    ></b-form-input>
</template>

<script>
    import FormulateInputMixin from '@braid/vue-formulate/src/FormulateInputMixin'

    export default {
        name: 'BText',
        mixins: [FormulateInputMixin],
        computed: {
            model: {
                get(){
                    return this.context.model
                },
                set(val){
                    this.context.model = val
                }
            }
        },
        data () {
            return {

            }
        },
    }
</script>