class PhotoPost {
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

let photoPosts = (function () {
  let photoPosts = [];

  function getPhotoPosts(skip, top, filterConfig) {
    if (skip < photoPosts.length) {
      let res = photoPosts;
      if (filterConfig.hashtags && filterConfig.author) {
        res = res.filter(post => {
          if (post.author === filterConfig.author) {
            for (let i = 0; i < post.hashtags.length; ++i) {
              for (let j = 0; j < filterConfig.hashtags.length; ++j) {
                if (filterConfig.hashtags[j] === post.hashtags[i]) {
                  return true;
                }
              }
            }
          }
          return false;
        })
      } else {
        if (filterConfig.author) {
          res = res.filter(post => post.author === filterConfig.author);
        }
        if (filterConfig.hashtags) {
          res = res.filter(post => {
            for (let i = 0; i < post.hashtags.length; ++i) {
              for (let j = 0; j < filterConfig.hashtags.length; ++j) {
                if (filterConfig.hashtags[j] === post.hashtags[i]) {
                  return true;
                }
              }
            }
            return false;
          })
        }
      }

      return res.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + top);
    }
  }

  function validatePhotoPost(post) {
    return !!(typeof post.id == "string" &&
      typeof post.createdAt == "object" &&
      typeof post.author == "string" &&
      typeof post.photoLink == "string" &&
      typeof post.hashtags == "object" &&
      typeof post.likes == "object" &&
      post.id &&
      post.createdAt &&
      post.author &&
      post.photoLink);
  }

  function getPhotoPost(id) {
    if (id > 0 && id <= photoPosts.length) {
      return photoPosts[id - 1];
    }
  }

  function addPhotoPost(post) {
    let isValid = validatePhotoPost(post);
    if(isValid) {
      photoPosts.push(post);
    }
    return isValid;
  }

  function editPhotoPost(id, post) {
    if (id > "0" && id <= photoPosts.length) {
      let curPost = getPhotoPost(id);
      let tempPost = new PhotoPost(curPost.id, post.description, curPost.createdAt, curPost.author, post.photoLink, curPost.hashtags, curPost.likes);
      let isValid = validatePhotoPost(tempPost);
      if (isValid) {
        photoPosts[id - 1] = tempPost;
      }
      return isValid;
    }
    return false;
  }

  function removePhotoPost(id) {
    if (id > 0 && id <= photoPosts.length) {
      photoPosts.splice(id - 1, 1);
      return true;
    }
    return false;
  }

  return{
    getPhotoPosts,
    getPhotoPost,
    addPhotoPost,
    editPhotoPost,
    removePhotoPost,
  }
})();


photoPosts.addPhotoPost(new PhotoPost("1", "1", new Date(2009,6,10), "Алиса", "qweq.png",["#cool", "#r"], ["Алиса"]));
photoPosts.addPhotoPost(new PhotoPost("2", "qwer", new Date(2007,6,10), "Олег", "qwer.png",["#cool", "#wow"], ["Олег", "Алиса"]));
photoPosts.addPhotoPost(new PhotoPost("3", "1", new Date(2001,6,10), "Алиса", "qweq.png",["#cool", "#s"], ["Алиса"]));
photoPosts.addPhotoPost(new PhotoPost("4", "1", new Date(2008,5,10), "Богдан", "qweq.png",["#q", "#r"], ["Алиса"]));
console.log(photoPosts.getPhotoPost("1"));
console.log(photoPosts.getPhotoPost("4"));
console.log(photoPosts.getPhotoPosts(1,3,{
  hashtags: ["#cool"],
}));
console.log(photoPosts.getPhotoPosts(0,2,{
  hashtags: ["#r"],
}));
console.log(photoPosts.getPhotoPost("1"));
console.log(photoPosts.editPhotoPost("1",{
  photoLink: "qwefdgfemwke.wdqw",
}));
console.log(photoPosts.getPhotoPost("1"));
console.log(photoPosts.removePhotoPost("1"));
console.log(photoPosts.getPhotoPost("1"));

