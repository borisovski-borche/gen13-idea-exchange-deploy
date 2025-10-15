import { Post } from './post-model';

export const postsMock: Post[] = [
  {
    _id: '68d6b4b229e241a0f4e7c1ff',
    title: 'I am made by first user',
    body: 'Lorem ispum dolor',
    likes: [],
    dislikes: [],
    author: {
      _id: '68d2dae8c0b70536fe19042f',
      username: 'firstuser',
    },
    comments: [],
    createdAt: '2025-09-26T15:43:46.263Z',
    updatedAt: '2025-09-26T15:43:46.263Z',
    __v: 0,
  },
  {
    _id: '68d6b47a29e241a0f4e7c1f8',
    title: 'Another amazing post',
    body: 'Lorem ispum dolor',
    likes: ['68d2dae8c0b70536fe19042f', '68d6badaeb937dceec0edbb4'],
    dislikes: [],
    author: {
      _id: '68d2dafbc0b70536fe190432',
      username: 'seconduser',
    },
    comments: [],
    createdAt: '2025-09-26T15:42:50.939Z',
    updatedAt: '2025-09-26T16:10:14.752Z',
    __v: 26,
  },
  {
    _id: '68d6b46a29e241a0f4e7c1f2',
    title: 'The Best Post',
    body: 'Lorem ispum dolor',
    likes: [],
    dislikes: [],
    author: {
      _id: '68d2dafbc0b70536fe190432',
      username: 'seconduser',
    },
    comments: [],
    createdAt: '2025-09-26T15:42:34.691Z',
    updatedAt: '2025-09-26T15:42:34.691Z',
    __v: 0,
  },
  {
    _id: '68d588011f335f1c67a90043',
    title: 'First post again',
    body: 'Lorem ispum dolor',
    likes: [],
    dislikes: [],
    author: {
      _id: '68d2dafbc0b70536fe190432',
      username: 'seconduser',
    },
    comments: ['68d5881d1f335f1c67a9004b', '68d588431f335f1c67a90054'],
    createdAt: '2025-09-25T18:20:49.958Z',
    updatedAt: '2025-09-25T18:21:55.597Z',
    __v: 2,
  },
];
