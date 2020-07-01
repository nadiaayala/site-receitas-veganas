

export default class Likes {
    constructor(){
        this.likesArr = [];
    }

    addLike(id, title, img){
        
        const like = {
            id,
            title,
            img
        }
        this.likesArr.push(like);
        
        console.log(`Added this like: ${like.title} and now the likes are: ${this.likesArr}`);
        this.persistData();

        return like;
    }

    deleteLike(id){
        const index = this.likesArr.findIndex(el => el.id === id);
        this.likesArr.splice(index, 1);
        console.log(`Deleted this like: ${id} and now the likes are: ${this.likesArr}`);
        this.persistData();
    }

    isLiked(id){
        console.log(` The index for ${id} is: ${this.likesArr.findIndex(el => el.id === id)}`);
        return this.likesArr.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likesArr.length;
    }
    

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likesArr));
    }

    
}