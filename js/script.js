//-----GLOBAL VARIABLES ---------//

// Selection of overview class where profile info will appear
const overview = document.querySelector(".overview");
// Git Hub username
const username = "AvrilMary";

// Async function to fetch information from Github profile
const getProfile = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
};

getProfile();

const displayUserInfo = function (data) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
    overview.append(newDiv);
};
    