console.log("Let's get this party started!");
const $gifArea = $("#gif-area")
async function get(searchTerm) {
  const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: {
      q: searchTerm,
      api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
  });
  let numResults = res.data.data.length;
  let randomIdx = Math.floor(Math.random() * numResults)

  
  const divImg = document.querySelector('#gif-area')
  const img = document.createElement('img')
  img.src = res.data.data[randomIdx].images.original.url
  divImg.append(img)

}

const form = document.querySelector('#submit')
const del = document.querySelector('#remove')

form.addEventListener("click", function(e){
  const input = document.querySelector('#search')
  e.preventDefault()
  get(input.value)
})
$("#remove").on("click", function(e) {
  e.preventDefault()
  $gifArea.empty();
});


