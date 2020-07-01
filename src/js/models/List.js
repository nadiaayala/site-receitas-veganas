export default class List {
    constructor(){
        this.items = [];
    }

    addItem(amount, unit, name) {
        const item = {amount, unit, name}
        this.items.push(item);
        return item;
    }
}