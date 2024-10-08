
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
     .then(res => res.json())
     .then(data => displayCategory(data.categories))
     .catch(err => console.log(err))
}

const loadVideos = (id = 'videos') => {
    console.log(id)
    const URL = `https://openapi.programming-hero.com/api/phero-tube/${id}`
    console.log(URL);
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data.status);
        if(data.videos){
            displayVideos(data.videos)
        }else if(!data.status){
            noContent()
        }
        else{
            displayVideos(data.category)
        }
        
    })
    .catch(err => console.log(err))
}

const noContent = () => {
    document.getElementById('no-content').classList.remove('hidden');
    document.getElementById('videos').classList.add('hidden')
}

const displayCategory = (categories) => {
    const buttonContainer = document.getElementById('button-container');

    categories.map(category => {
        const categoryId = `category/${category.category_id}`;
        const button = document.createElement('button');
        button.classList = 'btn';
        button.textContent = category.category;

        // Define the toggle function
        function toggle() {
            const allButtons = document.getElementsByClassName('btn-style');

            // Remove 'btn-style' class from all buttons
            for (const btn of allButtons) {
                btn.classList.remove('btn-style');
            }

            // Add 'btn-style' class to the clicked button
            button.classList.add('btn-style');
            document.getElementById('videos').classList.remove('hidden')
            document.getElementById('no-content').classList.add('hidden');

            console.log(allButtons);  // For debugging, will show which buttons have the 'btn-style'
        }

        // Add event listener to load videos when button is clicked
        button.addEventListener('click', () => {
            loadVideos(categoryId);
        });

        // Add event listener to toggle button style when clicked
        button.addEventListener('click', () => {
            toggle();
        });

        buttonContainer.append(button);
    });
};


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = ''
    videos.forEach(video => {
        const duration = video.others.posted_date;
        function showPostedTime(durationInSeconds = 0) {
            const day = Math.floor(durationInSeconds / 86400); // 86400 seconds in a day
            const hour = Math.floor((durationInSeconds % 86400) / 3600); // 3600 seconds in an hour
            const minute = Math.floor((durationInSeconds % 3600) / 60); // 60 seconds in a minute
            const second = durationInSeconds % 60;
            let times =  `${day} day(s) ${hour} hour(s) ${minute} minute(s) ${second} second(s) ago`;
            if(durationInSeconds == ''){
                return ''
            }
            if(day == 0){
                return `${hour} hour(s) ${minute} minute(s) ${second} second(s) ago`
            }
            return times
        }
        const time = showPostedTime(duration)
    
        const author = video.authors[0].profile_name
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact">
            <div id="thumnail">
                <figure class="h-[250px] relative" id="thumbnail-container">
                <img class="w-full h-full object-cover" src= ${video.thumbnail} alt="">
                <span id="time" class="absolute right-4 bottom-2 text-white">${time}</span>
                </figure>
            </div>
            <div class="flex gap-4">
              <div>
                    <img class="w-[50px] rounded-full" src= ${video.authors[0].profile_picture}  alt="">
                </div>
                <div>
                    <h2 class="font-bold text-xl text-black">${video.title}</h2>
                    <div class="flex gap-2">
                        <p>${author}</p>
                        ${video.authors[0].verified == true ? `<img class="w-5" src="./assets/icons8-verified-48.png" alt=""></img>` : ''}
                    </div>
                    <p>${video.others.views} views</p>

                </div>
            </div>
          </div>
          `
        videoContainer.append(div)
    });
}


// search functionality is here 


document.getElementById('Search').addEventListener('keyup', () => {
    document.getElementById('videos').classList.remove('hidden')
    document.getElementById('no-content').classList.add('hidden');
    const search = document.getElementById('Search').value;
    const searchValue = 'videos?title=' + search
    loadVideos(searchValue)
})




loadCategory()
loadVideos()










