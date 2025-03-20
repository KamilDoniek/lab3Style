import { TodoBoostrapTheme, TodoComponent,TodoBulmaTheme,TodoFoundationTheme,TodoMaterializeTheme,TodoTailwindcssTheme } from "./components/todo";

const appEl = document.getElementById('app');

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

const todo = new TodoComponent({
    theme: TodoTailwindcssTheme
});

todo.mount(todoWrapper)
