//-----GLOBAL VARIABLES ---------//

// Selection of overview class where profile info will appear
const overview = document.querySelector(".overview");
// Git Hub username
const username = "AvrilMary";
// Selection of unordered list to display repos
const displayRepos = document.querySelector(".repo-list");
// Variable to select the repo class where repo info will appear
const allRepoInfo = document.querySelector(".repos");
// Variable to select individual repo info
const individualRepo = document.querySelector(".repo-data");
// Variable to go back to Repo Gallery
const viewGallery = document.querySelector(".view-repos");
// Variable to filter input
const filterInput = document.querySelector(".filter-repos");



// Async function to fetch information from Github profile
const getProfile = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
};

getProfile();

const displayUserInfo = function (data) {
    filterInput.classList.remove("hide");
    let newSection = document.createElement("section");
    newSection.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>${data.name}</strong></p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
    overview.append(newSection);
    getRepos();
};

const getRepos = async function () {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    console.log(repos);
    displayRepoInfo(repos);
};


//Function to display repo information
const displayRepoInfo = function (repos) {
    for (let repo of repos) {
    let listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML =  `<h3>${repo.name}</h3>`;
    displayRepos.append(listItem);
    }
};


// QUESTION FOR ANN. CAN IT IDENTIFY H3 ////

   const repoList = displayRepos.addEventListener("click", function (e) {
       if (e.target.matches("h3")) {
           const repoName = e.target.innerText;
           specificRepoInfo(repoName);
       }
   } );

   // Async function to get specific repo information
   const specificRepoInfo = async function (repoName) {
    const res = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
        for (let key in languageData) {
            languages.push(key);
        }
        console.log(languages);
    displaySpecificRepoInfo(repoInfo, languages);
   };

   // Function to display specific repo information
   const  displaySpecificRepoInfo = function (repoInfo, languages) {
       individualRepo.innerHTML = "";
       let newDiv = document.createElement("div");
        newDiv.innerHTML = `<h3>${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
       individualRepo.append(newDiv);
       individualRepo.classList.remove("hide");
       allRepoInfo.classList.add("hide"); 
       viewGallery.classList.remove("hide");
   }; 


   viewGallery.addEventListener("click", function () {
    allRepoInfo.classList.remove("hide");
    individualRepo.classList.add("hide");
    viewGallery.classList.add("hide");
   })


   filterInput.addEventListener("input", function (e) {
       let input = filterInput.value;
       console.log(input);
       const repos = document.querySelectorAll(".repo");
       const lowercaseInput = input.toLowerCase();
       
       for (let repo of repos) {
           let lowercaseRepo = repo.innerText.toLowerCase();
           if (lowercaseRepo.includes(lowercaseInput)) {
               repo.classList.remove("hide");
            } else {
                repo.classList.add("hide");
       }
    }
   });