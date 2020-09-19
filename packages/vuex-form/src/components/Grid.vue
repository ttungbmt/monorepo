<template>
    <div :class="innerClass">
        <slot />
    </div>
</template>
<script>

    export default {
        inheritAttrs: false,
        name: 'm-grid',
        props: {
            cols: {
                type: Number,
                default: 4
            },
            gap: {
                type: Number,
                default: 4
            },
            schema: Array,
        },
        computed: {
            innerClass(){
                let clx = ['grid']
                if(this.cols) clx.push(`grid-cols-${this.cols}`)
                if(this.gap) clx.push(`gap-${this.gap}`)

                return clx
            },
        }
    }
</script>
