import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(false);

const db = SQLite.openDatabase({ name: 'rnPosts' });

export class PostDB {
  static init = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS posts ' +
          '(id INTEGER PRIMARY KEY NOT NULL, ' +
          'title TEXT NOT NULL, date TEXT, ' +
          'booked INT, img TEXT)',
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      })
    })
  }

  //FOR TESTING PURPOSES - Checking table's existence(1st query) and table's column info (2nd query)
  static checkTable = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          // "SELECT name FROM sqlite_master WHERE name='posts'",
          "PRAGMA table_info(posts)",
          [],
          (_, result) => {
            console.log(result.rows.raw());
            return resolve(result)
          },
          (_, error) => reject(error))
      })
    })
  }

  static getPosts = async () => {
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


  static createPost = (post) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO posts (title, date, booked, img) VALUES (?,?,?,?)`,
          [post.title, post.date, 0, post.img],
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
