const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/blog');
const Blog = require('../models/blog');

const api = supertest(app);
const helper = require('./list_helpers');

test('dummy returns one', () => {
  const blogs = [];
  const result = helper.dummy(blogs);
  expect(result).toBe(1);
});
describe('favorite blog', () => {
  test('most liked blog is', () => {
    const result = helper.favoriteBlog(helper.initialBlogs);
    const b = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };
    expect(result).toContainEqual(b);
  });
});
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = helper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('backend tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  // test('fails with statuscode 404 if blog does not exist', async () => {
  //   const validNonexistingId = await helper.nonExistingId();
  //   console.log(helper.nonExistingId);
  //   await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  // });
});

// describe('identifier is named id,', () => {
//   test('succeeds', async () => {
//     const blogsAtStart = await helper.blogsInDb();

//     const blogId = blogsAtStart[0].id;
//     expect(blogId.toBeDefined());
//   });
// });

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'GET and POST are the most important methods of HTTP protocol',
      author: 'A3',
      url: 'http://www.google.com',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const title = blogsAtEnd.map((b) => b.title);
    expect(title).toContain(
      'GET and POST are the most important methods of HTTP protocol'
    );
  });
  test('update likes', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    console.log(blogToUpdate.id);
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(blogToUpdate.likes === 7);
  });
});
describe('if data is invalid', () => {
  test('fails with statuscode 400', async () => {
    const newBlog = {
      title: 'GET and POST are the most important methods of HTTP protocol',
      // author: 'A3',
      url: 'http://www.google.com',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const newBlog2 = {
      title: 'GET and POST are the most important methods of HTTP protocol',
      author: 'A3',
      // url: 'http://www.google.com',
    };
    await api.post('/api/blogs').send(newBlog2).expect(400);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({ username: 'root', password: 'sekret' });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await (await api.post('/api/users'))
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
