Vue.component('date-item', {
    data () {
        return {
            today: new Date().toLocaleString('en', {weekday: 'long', month: 'short', day: 'numeric'}),
        }
    },
    template: '<div>{{ today }}</div>'
});

Vue.component('filter-item', {
    props: ['filter', 'active'],
    data () {
        return {

        }
    },
    methods: {
        filter_done() {
            this.$emit('filter_done');
        }
    },
    template: `
        <li class="nav-item" @click="filter_done()">
            <a :class="[{active: active}]" class="nav-link" href="#">
                {{ filter.label }}
            </a>
        </li>
    `
});

Vue.component('task-item', {
    props: ['data'],
    data () {
        return {
            isDone: false,
            icon: 'fa fa-circle-thin co'
        }
    },
    methods: {
        toggleDone() {
            this.isDone = !this.isDone;
            this.icon = this.isDone ? 'fa fa-check-circle co' : 'fa fa-circle-thin co';
        },
        task_done() {
            this.$emit('task_done');
        }
    },
    template: `
              <li class="item">
                    <i :class="[icon]" @click="toggleDone()"></i>
                    <p :class="[{done: isDone}]" class="text"> {{ data.text }} </p>
                    <i class="fa fa-trash-o de" @click="task_done()">️</i>
              </li>`
});

var vue = new Vue({
    el: "#app",
    data: {
        currentFilterIndex: 0,
        new_task: {
            text: '',
        },
        tasks: [
            { text: 'Meat' },
            { text: 'Cheese' },
            { text: 'Apple' }
        ],
        filters: [
            {
                label: 'All',
                id: 0
            },
            {
                label: 'Active',
                id: 1
            },
            {
                label: 'Closed',
                id: 2
            },
        ]
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
        delete_task(index){
            this.tasks.splice(index,1);
        },
        set_filter(index) {
            this.currentFilterIndex = index;
        }
    }
});

// new Vue({
//     el: '#app',
//     data: {
//         newTodo: '',
//         todos: [],
//     },
//     methods: {
//         addTodo() {
//             this.todos.push({ text: this.newTodo, completed: false });
//             this.newTodo = '';
//         },
//     },
//     mounted() {
//         console.log('App mounted!');
//         if (localStorage.getItem('todos')) this.todos = JSON.parse(localStorage.getItem('todos'));
//     },
//     watch: {
//         todos: {
//             handler() {
//                 console.log('Todos changed!');
//                 localStorage.setItem('todos', JSON.stringify(this.todos));
//             },
//             deep: true,
//         },
//     },
// });
