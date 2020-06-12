// InputForm.jsx
import React, { useState } from 'react';
import firebase, { storage } from './firebase';

// 必要な情報だけ取ってきて入れる{分割代入}
const InputForm = ({ getTodosFromFirestore }) => {
  const [todo, setTodo] = useState('');
  const [limit, setLimit] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleImage = event => {
    const image = event.target.files[0];
  };

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (collectionName, postData) => {
    const addedData = await firebase.firestore().collection(collectionName).add(postData);
    return addedData;
  }
  const onSubmit = event => {
    event.preventDefault();
    // アップロード処理
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      complete
    );
  }
  

  // submitボタンクリック時の処理　(todo === '' || limit === ''){ return false };はtodoかlimitが空だとreturn false（バリデーションエラー）
  const submitData = async () => {
    if (todo === '' || limit === '') { return false };
    const postData = {
      todo: todo,
      limit: new Date(limit),
      isDone: false,
    }
    const addedData = await postDataToFirestore('todos', postData);
    setTodo('');
    setLimit('');
    getTodosFromFirestore();
  }
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(fireBaseUrl => {
        setImageUrl(fireBaseUrl);
      });
  }
  
  return (
    <form action="">
      <ul>
        <li>
          <label htmlFor="todo">やること：</label>
          <input
            type="text"
            id="todo"
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="limit">締め切り：</label>
          <input
            type="datetime-local"
            id="limit"
            value={limit}
            onChange={e => setLimit(e.target.value)}
          />
        </li>
        <li>
        <form onSubmit = {onSubmit}>
          <input
            type="file"
            onChange={handleImage}
          />
          <button>アップロード</button>
        </form>
        </li>
        <li>
          <button
            type="button"
            onClick={submitData}
          >submit</button>
        </li>
      </ul>
    </form>
  )
}

export default InputForm;