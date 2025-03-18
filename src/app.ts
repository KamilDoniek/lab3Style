import { TodoBoostrapTheme, TodoComponent,TodoBulmaTheme,TodoFoundationTheme } from "./components/todo";

const appEl = document.getElementById('app');

const todoWrapper = document.createElement('div');
todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

const todo = new TodoComponent({
    theme: TodoFoundationTheme
});

todo.mount(todoWrapper)
