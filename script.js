const email = 'kocherginartemiy@gmail.com';

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.email) {
  email = params.email;
}

fetch(`https://fwd.innopolis.app/api/hw2?email=${email}`)
  .then(response => response.json())
  .then(data => {
    const comicId = data.comic;
    return fetch(`https://getxkcd.vercel.app/api/comic?num=${comicId}`)
  })
  .then(response => response.json())
  .then(data => {
    const xkcdContainer = document.getElementById('xkcd-container');
    const xkcdImage = document.createElement('img');
    xkcdImage.src = data.img;
    xkcdImage.alt = data.alt;
    const xkcdTitle = document.createElement('h4');
    xkcdTitle.innerText = data.title;
    const xkcdDate = document.createElement('p');
    xkcdDate.innerText = new Date(data.year, data.month - 1, data.day).toLocaleDateString();
    xkcdContainer.appendChild(xkcdImage);
    xkcdContainer.appendChild(xkcdTitle);
    xkcdContainer.appendChild(xkcdDate);
  })
  .catch(error => console.error(error));
