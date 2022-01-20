document.querySelector('#share').addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: 'This is subject',
      text: 'This is the body',
      url: 'https://dev.localhost/',
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
})