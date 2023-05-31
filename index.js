import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL:
    'https://stories-de7c7-default-rtdb.asia-southeast1.firebasedatabase.app/',
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const newsStoriesInDB = ref(database, 'stories')

const storiesEl = document.getElementById('stories')
const submitBtnEl = document.getElementById('submitBtn')
const storyInputEl = document.getElementById('storyInput')

submitBtnEl.addEventListener('click', e => {
  e.preventDefault()
  let story = storyInputEl.value

  if (story.length === 0) {
    return
  }

  push(newsStoriesInDB, story)

  storyInputEl.value = ''
})

onValue(newsStoriesInDB, function (snapshot) {
  if (snapshot.exists()) {
    let newsStoriesArray = Object.entries(snapshot.val())

    storiesEl.innerHTML = ''

    for (let i = 0; i < newsStoriesArray.length; i++) {
      let currentStory = newsStoriesArray[i]

      appendStoryToStoriesEl(currentStory)
    }
  } else {
    storiesEl.innerHTML = 'No item are found'
  }
})

function appendStoryToStoriesEl(story) {
  let [storyID, storyTitle] = story

  let newEl = document.createElement('div')

  newEl.classList.add('story')

  newEl.textContent = storyTitle

  newEl.addEventListener('dblclick', function () {
    let exactLocationOfStoryInDB = ref(database, `stories/${storyID}`)

    remove(exactLocationOfStoryInDB)
  })

  storiesEl.append(newEl)
}

function displayMessage() {
  let displayMessageEl = document.createElement('span')

  displayMessageEl.textContent = 'Item removed successfully.!'

  document.getElementById('alertMessage').append(displayMessageEl)
}
