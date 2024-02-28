function isVerified(tweetElement) 
{
    const badge = tweetElement.querySelector(".user-verified-blue");
    return badge !== null;
}
  

function hideTweet(tweetElement) 
{
    const container = document.createElement("div");
    const button = document.createElement("button");
    const textSpan = document.createElement("span");
    
    button.addEventListener("click", () => 
    {
      tweetElement.innerHTML = tweetElement.dataset.originalContent;
    });
  
    tweetElement.dataset.originalContent = tweetElement.innerHTML;
  
    tweetElement.innerHTML = ``;
    
    textSpan.textContent = "Blue checkmark detected.";
    textSpan.style.color = "red";
    container.style.display = "flex"; 
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    button.textContent = "Show Tweet";
    button.style = "font-size: 12px; margin: 0 0 0 5px; padding: 0 5px; background-color: transparent; border: 1px solid; color: red; cursor: pointer;";
    container.appendChild(textSpan);
    container.appendChild(button);
    tweetElement.appendChild(container);
    assignIdToModifiedTweet(tweetElement);
}

function queryTweets() 
{
    const tweets = document.querySelectorAll(".tweet");
    for (const tweet of tweets) 
    {
        if (tweet.id && tweet.id.startsWith("modified-tweet")) 
        {
            continue;
        }
        if (isVerified(tweet)) 
        {
            hideTweet(tweet);
        }
    }
}

function assignIdToModifiedTweet(tweetElement) 
{
    tweetElement.id = "modified-tweet";
}
  
  
// We wait 500ms before applying any changes because twitter just shits the bed whenever it tries to do more than one change at the time.
// This prevents a bug where if you scroll too fast some hidden tweets will become completely uninteractable.
const observer = new MutationObserver(() => setTimeout(queryTweets, 500));
  
const tweetContainer = document.querySelector("section");
observer.observe(tweetContainer, { childList: true, subtree: true });
  