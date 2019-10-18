Vue.component('date-item', {
    data () {
        return {
            today: new Date().toLocaleString('en', {weekday: 'long', month: 'short', day: 'numeric'}),
        }
    },
    template: '<div>{{ today }}</div>',
});

Vue.component('task-item',{
    props: ['data'],
    data () {
        return {
            isDone: false,
            text: true,
            icon: 'fa fa-circle-thin co',
            trash: 'fa fa-trash-o de'
        }
    },
    methods: {
        toggleDone() {
            this.isDone = !this.isDone;
            this.icon = this.isDone ? 'fa fa-check-circle co' : 'fa fa-circle-thin co';
        },
        task_done(){
            this.$emit('task_done')
        }
    },
    template: `
              <li class="item">
                    <i :class="[icon]" @click="toggleDone()"></i>
                    <p :class="[{done: isDone, text}]"> {{ data.text }}</p>
                    <i class="[trash]" @click="task_done()">️</i>
              </li>`
});

var vue = new Vue({
    el: "#app",
    data: {
        new_task: {
            text: '',
        },
        tasks: [
            { text: 'Meat' },
            { text: 'Cheese' },
            { text: 'Apple' }
        ],
    },
    methods: {
        add_task(){
            if(this.new_task.text != '') {
                this.tasks.push({
                    text: this.new_task.text,
                });
                this.new_task.text = '';
            }
        },
        delete_task(id){
            this.tasks.splice(id,1);
        }
    }
});
