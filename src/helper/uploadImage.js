import storage from 'utils/firebase'

const firebaseUpload = (file) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve('')
    }
    const uploadTask = storage.ref(`images/${file.name}`).put(file)
    uploadTask.on(
      'state_changed',
      () => {},
      () => {},
      () => {
        // Gets link back
        storage
          .ref('images')
          .child(file.name)
          .getDownloadURL()
          .then((url) => resolve(url))
      }
    )
  })
}

export default firebaseUpload
