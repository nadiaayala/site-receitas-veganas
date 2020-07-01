import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.items = [];
    }

    addItem(amount, unit, name) {
        const item = {id: uniqid(), amount, unit, name}
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index = this.items.findIndex(el => el.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }
}