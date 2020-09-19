<template>
    <ValidationObserver slim>
        <FormulateForm v-on="$listeners" :name="name" v-bind="$attrs" ref="form" :schema="computedSchema">
            <FormulateErrors />
            <slot />

            <FormulateSchema
                v-if="builder.actions"
                :schema="builder.actions.schema"
            />
        </FormulateForm>
    </ValidationObserver>
</template>

<script>
    import {isEmpty} from 'lodash-es'

    export default {
        inheritAttrs: false,
        name: 'MForm',
        provide () {
            return {
                getFormConfig: this.getFormConfig
            }
        },
        props: {
            name: {
                type: [String, Boolean],
                default: false
            },
            initialValues: {
                type: Object,
            },
            builder: {
                type: Object,
                default: {
                    method: 'POST',
                    schema: false,
                }
            },
        },
        computed: {
            computedSchema(){
                if(this.builder.schema) return this.builder.schema.filter(v => !isEmpty(v)).map(({component = 'm-field', ...v}) => ({component, ...v}))

                return this.builder.schema
            }
        },
        created(){
            this.$store.commit('form/registerForm', {key: this.name, initialValues: this.initialValues})
        },
        mounted(){

        },
        methods: {
            getFormConfig(){
                return {
                    index: this.$store.getters['form/getFormIndex'](this.name),
                    name: this.name
                }
            }
        }
    }
</script>