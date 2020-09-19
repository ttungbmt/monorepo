export default {
    methods: {
        hideModal(name){
            this.$refs[name].hide()
        },
        showModal(name){
            this.$refs[name].show()
        },
    }
}