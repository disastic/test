
class Post {
    constructor(id, description, createdAt, author, photoLink, hashtags, likes) {
      this.id = id;
      this.description = description;
      this.createdAt = createdAt;
      this.author = author;
      this.photoLink = photoLink;
      this.hashtags = hashtags;
      this.likes = likes;
    }
  }

class PhotoPosts{
  constructor(photoPosts = []) {
    this._photoPosts = photoPosts;
  }

  getPhotoPosts(skip, top, filterConfig) {
    if (!(skip >= 0 && skip < this._photoPosts.length)) {
      return [];
    }
    let res = this._photoPosts;
    if (filterConfig !== undefined) {
      if (filterConfig.author) {
        res = res.filter(post => post.author === filterConfig.author);
      }
      if (filterConfig.hashtags) {
        res = this._filterByHashTags(res, filterConfig.hashtags);
      }
    }
    return res.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + top);
  }

  _filterByHashTags(arr, hashtags) {
    return arr.filter(post => {
      for (let i = 0; i < post.hashtags.length; ++i) {
        if (hashtags.some((item) => item === post.hashtags[i])) {
          return true;
        }
      }
      return false;
    });
  }

  static validatePhotoPost(post) {
    return !!(typeof post.id === 'string' &&
      typeof post.createdAt === 'object' &&
      typeof post.author === 'string' &&
      typeof post.photoLink === 'string' &&
      typeof post.hashtags === 'object' &&
      typeof post.likes === 'object' &&
      post.id &&
      post.createdAt &&
      post.author &&
      post.photoLink);
  }

  getPhotoPost(id) {
    return this._photoPosts.find((item) => {
      return item.id === id;
    });
  }

  addPhotoPost(post) {
    const isValid = PhotoPosts.validatePhotoPost(post);
    if(isValid) {
      this._photoPosts.push(post);
    }
    return isValid;
  }

  editPhotoPost(id, post) {
    if (!(id > '0' && id <= this._photoPosts.length)) return false;
    const curPost = this.getPhotoPost(id);
    let tempPost = new Post(curPost.id, post.description, curPost.createdAt, curPost.author, post.photoLink, curPost.hashtags, curPost.likes);
    let isValid = PhotoPosts.validatePhotoPost(tempPost);
    if (isValid) {
      this._photoPosts[id - 1] = tempPost;
    }
    return isValid;
}

  removePhotoPost(id) {
    if (id > 0 && id <= this._photoPosts.length) {
      this._photoPosts.splice(id - 1, 1);
      return true;
    }
    return false;
  }

  addAll(arr){
    return arr.reduce((done,curr) => {
      return this.addPhotoPost(curr) ? [] : done.concat(curr);
    },[]);
  }
}

let q = new PhotoPosts();
q.addPhotoPost(new Post('1', '1', new Date(2009,6,10), 'Алиса', 'qweq.png',['#cool', '#r'], ['Алиса']));
q.addPhotoPost(new Post('2', 'qwer', new Date(2007,6,10), 'Олег', 'qwer.png',['#cool', '#wow'], ['Олег', 'Алиса']));
q.addPhotoPost(new Post('3', '1', new Date(2001,6,10), 'Алиса', 'qweq.png',['#cool', '#s'], ['Алиса']));
q.addPhotoPost(new Post('4', '1', new Date(2008,5,10), 'Богдан', 'qweq.png',['#q', '#r'], ['Алиса']));
console.log(q.getPhotoPost('1'));
console.log(q.getPhotoPost('4'));
console.log(q.getPhotoPosts(0,100));
console.log(q.getPhotoPosts(1,3,{
  hashtags: ['#cool'],
}));
console.log(q.getPhotoPosts(0,2,{
  hashtags: ['#r'],
}));
console.log(q.getPhotoPost('1'));
console.log(q.editPhotoPost('1',{
  photoLink: 'qwefdgfemwke.wdqw',
}));
console.log(q.getPhotoPost('1'));
console.log(q.removePhotoPost('1'));
console.log(q.getPhotoPost('2'));

let arr = [];
arr.push(new Post('1', '1', new Date(2009,6,10), 'Алиса', 'qweq.png',['#cool', '#r'], ['Алиса']));
arr.push(new Post('1', '1', new Date(2009,6,10), 'Алиса', 'qweq.png',['#cool', '#r'], ['Алиса']));
arr.push(new Post('1', '1', new Date(2009,6,10), 'Алиса', 'qweq.png',['#cool', '#r'], ['Алиса']));
arr.push(new Post('1', '1', new Date(2009,6,10), 5, 'qweq.png',['#cool', '#r'], ['Алиса']));
console.log(q.addAll(arr));
console.log(q.getPhotoPosts(0,100));

