"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv"

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
async function searchShows(query) {
  let res = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
  let shows = res.data.map(function(val){
    let show = val.show
    return {
      id : show.id,
      name : show.name,
      summary : show.summary,
      image: show.image ? show.image.medium : MISSING_IMAGE_URL
    }
  })

  return shows
}
searchShows('friends')

// async function getShowsByTerm( /* term */) {
//   // ADD: Remove placeholder & make request to TVMaze search shows API.

//   return [
//     {
//       id: 1767,
//       name: "The Bletchley Circle",
//       summary:
//         `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
//            women with extraordinary skills that helped to end World War II.</p>
//          <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
//            normal lives, modestly setting aside the part they played in 
//            producing crucial intelligence, which helped the Allies to victory 
//            and shortened the war. When Susan discovers a hidden code behind an
//            unsolved murder she is met by skepticism from the police. She 
//            quickly realises she can only begin to crack the murders and bring
//            the culprit to justice with her former friends.</p>`,
//       image:
//           "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
//     }
//   ]
// }


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
      <div class="card" data-show-id="${show.id}">
        <img class="card-img-top" src="${show.image}">
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">${show.summary}</p>
          <button class="btn btn-primary get-episodes">Episodes</button>
        </div>
      </div>  
    </div>
   `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

// async function searchForShowAndDisplay() {
//   const term = $("#searchForm-term").val();
//   const shows = await getShowsByTerm(term);

//   $episodesArea.hide();
//   populateShows(shows);
// }

// $searchForm.on("submit", async function (evt) {
//   evt.preventDefault();
//   await searchForShowAndDisplay();
// });
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
})

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 
  let res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  let episodes = res.data.map(function(episode){
    return {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    }
  } );

  return episodes
}

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }


function populateEpisodes(episodes) {
  const $episodesList = $("#episodes-list");
  $episodesList.empty();
    
  for (let episode of episodes) {
    let $item = $(
      `<li>
         ${episode.name}
         (season ${episode.season}, episode ${episode.number})
       </li>
      `);

    $episodesList.append($item);
  }

  $("#episodes-area").show();
}

$("#shows-list").on("click", ".get-episodes", async function handleEpisodeClick(evt) {
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodesOfShow(showId);
  populateEpisodes(episodes);
});