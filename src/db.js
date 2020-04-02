import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

const db = SQLite.openDatabase({ name: 'rnPosts' },
  () => { },
  error => {
    console.log("ERROR: " + error);
  });


export class PostDB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        )
      })
    })
  }

  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM posts',
          [],
          (_, result) => resolve(result.rows.raw()),
          (_, error) => reject(error)
        )
      })
    })
  }

  static createPost({ title, date, booked, img }) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO posts (title, date, booked, img) VALUES (?, ?, ?, ?)`,
          [title, date, 0, img],
          (_, result) => resolve(result.insertId),
          (_, error) => reject(error)
        )
      })
    })
  }

  static updateBookedStatus(post) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE posts SET booked = ? WHERE id = ?',
          [post.booked ? 0 : 1, post.id],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }

  static removePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM posts WHERE id = ?',
          [id],
          resolve,
          (_, error) => reject(error)
        )
      })
    })
  }
}
