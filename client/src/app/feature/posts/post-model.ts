export interface Post {
  _id: string;
  title: string;
  body: string;
  likes: string[];
  dislikes: string[];
  author: {
    _id: string;
    username: string;
  };
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostDetails {
  _id: string;
  title: string;
  body: string;
  likes: string[];
  dislikes: string[];
  author: {
    _id: string;
    username: string;
  };
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Comment {
  _id: string;
  body: string;
  author: {
    _id: string;
    username: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateEditPostReq {
  title: string;
  body: string;
}

export interface CreateCommentReq {
  postId: string;
  body: string;
}

export interface LikeDislikeOutput {
  type: 'like' | 'dislike';
  postId: string;
}

export interface PostActionOutput {
  action: 'edit' | 'delete';
  post: Post;
}
