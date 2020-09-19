<template>
    <ValidationProvider v-slot="{ errors }" :name="$attrs.label" :vid="vid" ref="provider" tag="div" slim>
        <FormulateInput
                :name="name"
                v-model="innerValue"
                :error-behavior="errorBehavior"
                :validation="rules"
                :validation-rules="customRules"
                :validation-messages="messages"
                @validation="onValidation"
                @error-visibility="onShownValidation"
                v-bind="computedAttrs"
        />
    </ValidationProvider>
</template>

<script>
    import {isUndefined, isString, debounce} from 'lodash-es'
    import uniqid from 'uniqid'

    export default {
        inheritAttrs: false,
        name: 'MField',
        inject: {
            getFormConfig: { default: () => () => ({}) },
        },
        props: {
            name: String,
            model: String,
            rules: [String, Array, Object],
            customRules: Object,
            messages: [Object],
            value: {
                type: [String, Number, Boolean, Object, Array],
                default: undefined
            }
        },
        data(){
            return {
                innerValue: this.value,
                shownError: false,
            }
        },
        computed: {
            vid(){
                return this.model ? this.model : this.name
            },
            computedAttrs(){
                let attrs = Object.assign({}, this.$attrs)
                if(attrs.type === 'm-radio'){
                    if(isUndefined(attrs.inline)) attrs.elementClass = ['flex gap-4 pt-2']
                    if(isString(attrs.items)) attrs.items = this.$store.getters['form/getCat'](attrs.items).map(v => ({id: uniqid(),...v}))
                }

                return attrs
            },
            errorBehavior(){
                return 'blur'
            },
            modelValue: {
                get(){
                    if(this.model) {
                        const {index} = this.getFormConfig()
                        return this.$store.getters['form/getFormValue']({index, field: this.model})
                    }

                    return this.innerValue
                }
            },
        },
        watch: {
            innerValue(newVal){
                this.$emit('input', newVal)

                if(this.model) this.debouncedModel()
            },
            modelValue(newVal){
                if(newVal !== this.innerValue) this.innerValue = newVal
            }
        },
        created(){
            if(this.model){
                const {index} = this.getFormConfig()
                this.$store.commit('form/registerField', {index, field: this.model})
            }
        },
        methods: {
            onValidation(err){
                this.$refs.provider.setErrors(Object.assign([], err.errors))
            },
            onShownValidation(val){
                this.shownError = val
            },
            debouncedModel: debounce(function(){
                const {index} = this.getFormConfig()
                this.$store.commit('form/updateFormValue', {index, field: this.model, value: this.innerValue})
            }, 300)
        }
    }
</script>