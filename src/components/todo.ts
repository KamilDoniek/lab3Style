export class TodoComponent {
  #listEl: HTMLElement | undefined;
  #inputEl: HTMLTextAreaElement | undefined;

  #theme: TodoThemeSchema | undefined

  constructor(options?: TodoOptions) {
    this.#theme = options?.theme
  }

  mount(targetEl: HTMLElement) {
    targetEl.classList.add(...classUnify(this.#theme?.root ?? 'todo'));

    this.#listEl = document.createElement('ul');
    this.#listEl.classList.add(...classUnify(this.#theme?.list ?? 'todo-list'));

    const footerEl = document.createElement('form');
    footerEl.classList.add(...classUnify(this.#theme?.footer ?? 'todo-footer'));

    this.#inputEl = document.createElement('textarea');
    this.#inputEl.classList.add(...classUnify(this.#theme?.footer_input ?? ''));

    const addButtonEl = document.createElement('button');
    addButtonEl.textContent = 'Dodaj'
    addButtonEl.classList.add(...classUnify(this.#theme?.footer_addButton ?? ''));
    addButtonEl.addEventListener('click', (evt) => {
      this.addItem()
      evt.preventDefault()
    })

    targetEl.appendChild(this.#listEl);
    targetEl.appendChild(footerEl);
    footerEl.appendChild(this.#inputEl);
    footerEl.appendChild(addButtonEl);
  }

  addItem(extText?: string) {
    if (!this.#inputEl || !this.#listEl) throw new Error('Component probaly not initialized!');

    const itemEl = document.createElement('li')
    itemEl.classList.add(...classUnify(this.#theme?.list_item ?? 'todo-item'));
    const  checkEl = document.createElement('input');
    checkEl.type = 'checkbox';
    const labelEl = document.createElement('label');

    // Materialize need span and label in checkbox
  if (this.#theme?.list_item_check?.includes("filled-in")) {
      labelEl.classList.add(...classUnify(this.#theme.labelMaterialize ?? ""));
      const spanEl = document.createElement('span'); 

      itemEl.appendChild(labelEl);
      labelEl.appendChild(checkEl);
      labelEl.appendChild(spanEl);
    } else {
      itemEl.appendChild(checkEl);
    }


    checkEl.addEventListener('change', () => {
      const itemDoneClass = this.#theme?.list_itemDone ?? 'todo-item-done'
      if (itemDoneClass) itemEl.classList.toggle(itemDoneClass);

      const itemDoneTextClass = this.#theme?.list_item_textDone || ''
      if (itemDoneTextClass) textEl.classList.toggle(itemDoneTextClass);
    });
    checkEl.classList.add(...classUnify(this.#theme?.list_item_check ?? ''))

    const textEl = document.createElement('div');
    textEl.textContent = extText ? extText : this.#inputEl?.value ?? null
    textEl.classList.add(...classUnify(this.#theme?.list_item_text ?? 'todo-item-text'));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.addEventListener("click", () => {
      this.#listEl!.removeChild(itemEl);
    });
    deleteButton.classList.add(...classUnify(this.#theme?.list_item_deleteButton ?? ''))

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.dataset.mode = "readonly";
    editButton.classList.add(...classUnify(this.#theme?.list_item_editButton ?? ''))

    let textEditEl: HTMLTextAreaElement;
    editButton.addEventListener("click", () => {
      if (editButton.dataset.mode === "readonly") {
        textEditEl = document.createElement("textarea")
        textEditEl.value = textEl.textContent ?? "";
        textEditEl.classList.add(...classUnify(this.#theme?.list_item_textEditInput ?? ''))
        checkEl.after(textEditEl);
        this.#theme?.list_item_check?.includes("filled-in") && labelEl.after(textEditEl);
        
        textEl.classList.add(...classUnify(this.#theme?.hidden ?? 'hidded'));
        deleteButton.disabled = true;
        editButton.dataset.mode = "editing";
        editButton.textContent = "Zapisz";
      } else {
        textEl.textContent = textEditEl.value;
        textEl.classList.remove(...classUnify(this.#theme?.hidden ?? 'hidded'));
        itemEl.removeChild(textEditEl);
        deleteButton.disabled = false;
        editButton.dataset.mode = "readonly";
        editButton.textContent = "Edytuj";
      }
    });

    itemEl.appendChild(textEl)
    itemEl.appendChild(deleteButton)
    itemEl.appendChild(editButton)

    this.#inputEl.value = ''
    this.#listEl.appendChild(itemEl);
  }
}

function classUnify(classList: string) {
  if (!classList) return []
  return classList.split(' ');
}

export const TodoBoostrapTheme: TodoThemeSchema = {
  root: 'd-flex flex-column',
  list: 'list-group flex-grow-1 p-2',
  list_item: 'list-group-item d-flex',
  list_itemDone: '',
  list_item_check: 'form-check-input me-3',
  list_item_text: 'flex-grow-1 me-3',
  list_item_textDone: 'text-decoration-line-through',
  list_item_textEditInput: 'form-control me-3',
  list_item_deleteButton: 'btn btn-danger',
  list_item_editButton: 'btn btn-warning ms-1',
  footer: 'd-flex p-2',
  footer_input: 'form-control me-2',
  footer_addButton: 'btn btn-primary',
  hidden: 'd-none'
}
export const TodoBulmaTheme: TodoThemeSchema = {
  root: 'is-flex is-flex-direction-column',
  list: 'list is-flex-grow-1 p-2',
  list_item: 'box is-flex is-align-items-center has-background-white has-text-black-bis mb-0',
  list_itemDone: '',
  list_item_check: 'checkbox mr-3',
  list_item_text: 'is-flex-grow-1 mr-3',
  list_item_textDone: 'has-line-through',
  list_item_textEditInput: 'control input mr-3 has-background-white has-text-black-bis',
  list_item_deleteButton: 'button is-danger has-text-white',
  list_item_editButton: 'button is-warning ml-2',
  footer: 'is-flex p-2',
  footer_input: 'control input has-background-white has-text-black-bis mr-2 border-white',
  footer_addButton: 'button is-link',
  hidden: 'is-hidden'
}
export const TodoFoundationTheme: TodoThemeSchema = {
  root: 'flex-container grid-y',
  list:  'flex-child-grow padding-1',
  list_item: 'tabs-content grid-x align-center align-middle has-background-white padding-1 is-radius',
  list_itemDone: '',
  list_item_check: 'cell small-1 input-group-field margin-right-1',
  list_item_text: 'cell small-5 margin-right-1',
  list_item_textDone: 'line-through',
  list_item_textEditInput: 'input-group-field margin-right-3',
  list_item_deleteButton: 'cell small-2 button alert margin-bottom-0',
  list_item_editButton: 'cell small-2 button warning margin-left-1 margin-bottom-0',
  footer: 'grid-x padding-1',
  footer_input: 'small-9 input-group-field margin-right-1',
  footer_addButton: 'button primary margin-bottom-0',
  hidden: 'hide'
}
export const TodoMaterializeTheme: TodoThemeSchema = {
  root: "container add-flex",
  list: "collection add-grow centermargin",  
  list_item: "collection-item row", 
  list_itemDone: "line-through",
  list_item_check: "col s1 filled-in", 
  labelMaterialize: "col s1", 
  list_item_text: "col s4",
  list_item_textDone: "line-through",
  list_item_textEditInput: "col s4",
  list_item_deleteButton: "col s3 btn red darken-2 mr", 
  list_item_editButton: "col s3 btn orange lighten-2",
  footer: "container add-flex-row",
  footer_input: "add-grow mr white inputFooter",
  footer_addButton: "btn blue darken-2",
  hidden: "hide",
};
export const TodoTailwindcssTheme: TodoThemeSchema = {
  root: "flex flex-col justify-center items-center p-4", 
  list: "w-full grow",
  list_item: "flex items-center bg-white p-3 rounded-lg shadow-md border border-gray-200",
  list_itemDone: "",
  list_item_check: "mr-2 h-5 w-5",
  list_item_text: "grow",
  list_item_textDone: "line-through",
  list_item_textEditInput: "grow p-2 rounded-lg",
  list_item_deleteButton: "ml-2 px-4 py-2 bg-red-500 text-white rounded-lg",
  list_item_editButton: "ml-2 px-4 py-2 bg-yellow-500 text-black rounded-lg",
  footer: "flex w-full",
  footer_input: "grow p-3 bg-white rounded-lg mr-2",
  footer_addButton: "px-5 py-3 bg-blue-500 text-white rounded-lg",
  hidden: "hidden",
};
interface TodoOptions {
  theme: TodoThemeSchema
}

interface TodoThemeSchema {
  root?: string,
  list?: string,
  list_item?: string,
  list_itemDone?: string,
  list_item_check?: string,
  list_item_text?: string,
  list_item_textDone?: string,
  list_item_textEditInput?: string,
  list_item_deleteButton?: string,
  list_item_editButton?: string,
  footer?: string,
  footer_input?: string,
  footer_addButton?: string,
  hidden?: string,
  labelMaterialize?:string
}