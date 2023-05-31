import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getDatabase,
  ref,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL:
    'https://playground-eaa33-default-rtdb.europe-west1.firebasedatabase.app/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const newsStoriesInDB = ref(database, 'newsStories')

const storiesEl = document.getElementById('stories')

onValue(newsStoriesInDB, function (snapshot) {
  let newsStoriesArray = Object.entries(snapshot.val())

  storiesEl.innerHTML = ''

  for (let i = 0; i < newsStoriesArray.length; i++) {
    let currentStory = newsStoriesArray[i]

    appendStoryToStoriesEl(currentStory)
  }
})

function appendStoryToStoriesEl(story) {
  let [storyID, storyTitle] = story

  let newEl = document.createElement('div')

  newEl.classList.add('story')

  newEl.textContent = storyTitle

  newEl.addEventListener('dblclick', function () {})

  storiesEl.append(newEl)
}
