const gitHub = new GitHub();
const inputButton = document.getElementById('searchUser');

const profile = document.getElementById('profile');
const repos = document.getElementById('repos');

inputButton.addEventListener('keyup', (e) => {
    const userText = e.target.value;
    gitHub.getUser(userText).then((data) => {
        if (data.profile.message === 'Not Found') {
            showAlert();
        } else {
            showProfile(data.profile);
            showRepos(data.repos);
        }
    });
});

function showProfile(profileData) {
    console.log(profileData);
    clearAlert();
    profile.innerHTML = `
    <div class='profileBody'>
        <div class='profileImg'>
        <img src="${profileData.avatar_url}" alt="User Avatar"></img>
        <button class="viewProfileBtn">
        <a href=${profileData.html_url} target="_blank">View Profile</a>
        </button>
        </div>
        <div class='profileInfo'>
        <div class="badges">
        <div class="badge primary">Followers: ${profileData.followers} </div>
        <div  class="badge secondary">Following: ${profileData.following} </div>
        <div  class="badge success">Public Repos: ${profileData.public_repos} </div>
        <div  class="badge info">Public Gists: ${profileData.public_gists} </div>
        </div>
        <ul class="list">
        <li>Name: ${profileData.name}</li>
        <li>Company: ${profileData.company ? profileData.company : 'NA'}</li>
        <li>Location: ${profileData.location ? profileData.location : 'NA'}</li>
        <li>Member Since: ${profileData.created_at}</li>
        </ul>
        </div>
    </div>
    <h3>Latest Repos</h3>
    `;
}

function showAlert() {
    clearProfile();
    profile.innerHTML = `
    <div class='profileBody alert'>
       <span> Profile Not Found </span>
    </div>
    `;
}
function clearAlert() {
    profile.innerHTML = '';
}
function clearProfile() {
    profile.innerHTML = '';
}
function showRepos(reposData) {
    console.log(reposData);
    let output = '';
    reposData.forEach((element) => {
        output += `<div class='repoBody'>
        <span class="repoName"> <a href ='${element.html_url}'> ${element.name} </a>  </span>
        <div class="badges">
        <div class="badge primary">Stars: ${element.stargazers_count} </div>
        <div  class="badge secondary">Open Issues: ${element.open_issues_count} </div>
        <div  class="badge success">Forks: ${element.forks_count} </div>
        <div  class="badge info">Watchers: ${element.watchers_count} </div>
        </div>
    </div>`;
    });
    repos.innerHTML = output;
}
