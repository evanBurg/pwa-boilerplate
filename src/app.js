const shareBtn = document.querySelector('#share');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'This is subject',
        text: 'This is the body',
        url: 'https://dev.localhost/',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  });
}

if (window.location.href.includes('sharing')) {
  const parsedURL = new URL(window.location);
  const title = parsedURL.searchParams.get('title');
  const text = parsedURL.searchParams.get('text');
  const url = parsedURL.searchParams.get('url');
  const resultParagraph = document.querySelector('#share-result');
  if (resultParagraph) {
    resultParagraph.innerHTML = `
      ${title || ''}<br/>
      ${text || ''}<br/>
      ${url || ''}<br/>
    `;
  }
}