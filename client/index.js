new Vue({
    el: "#app",
    data: {
        title: "Ola",
        tekst: ''
    },
    methods: {
        changeTitle: function(event){
            this.title = event.target.value
        }
    },
})