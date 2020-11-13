const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing Joke to Voice RSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: '41860a03955c40f6810632c318284c1f',
        src: joke,
        hl: 'en-us',
        v: 'Amy',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.type === 'twopart'){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        // disable button
        toggleButton();
    } catch (error) {
        // Catch Errors
        console.log('Something went wrong', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);