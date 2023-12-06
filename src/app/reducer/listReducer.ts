import { Item } from "../types/Item"

type AddNewText = {
    type: 'add';
    payload: {
        text: string;
    }
}

type EditTextAction = {
    type: 'editText';
    payload: {
        id: number;
        newText: string;
    }
}

type ToogleDoneAction = {
    type: 'ToogleDone';
    payload: {
        id: number;
    }
}

type removeAction = {
    type: 'remove';
    payload: {
        id: number;
    }
}


type ListAction = AddNewText | EditTextAction | ToogleDoneAction | removeAction;


export const ListReducer = (list: Item[], action: ListAction) => {
    switch (action.type) {
        case 'add':
            return [...list, {
                id: list.length,
                text: action.payload.text,
                done: false
            }]

        case 'editText':
            return list.map(t => {
                if (t.id === action.payload.id) {
                    t.text = action.payload.newText
                };
                return t
            });

        case 'ToogleDone':
            return list.map(t => {
                if(t.id === action.payload.id) t.done = !t.done;
                return t
              })

        case 'remove':
              return list.filter(t => t.id !== action.payload.id);
              
        default:
            return list
    }

}