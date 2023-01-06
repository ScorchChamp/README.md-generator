
const input = document.getElementById('input-field');
const output = document.getElementById('output-field');
const converter = new showdown.Converter();

const parseRepoButton = document.getElementById('repo-button');
const parseRepoText = document.getElementById('repo-text');

input.addEventListener('input', updateMarkown);
output.addEventListener('input', updateHTML);
parseRepoButton.addEventListener('click', parseRepo);

function updateMarkown() {
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 10 + 'px';
    output.innerHTML = converter.makeHtml(input.value);
}

function updateHTML() {
    console.log(converter.makeMd(output.innerHTML))
    input.value = converter.makeMd(output.innerHTML);
}

async function getRepoData(username, repoName) {
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
    return await fetch(apiUrl);
}

async function parseRepo(event) {
    event.preventDefault();
  
    const repoUrl = parseRepoText.value;
    const [, , username, repoName] = repoUrl.split('/');
  
    try {
      const data = await getRepoData(username, repoName);
      console.log(data);
  
      input.value = `
  # ${data.name}
  ${data.description}
  
  ## Installation
  
  TODO: Add installation instructions
  
  ## Usage
  
  TODO: Add usage instructions
  
  ## Contributing
  
  TODO: Add contributing guidelines
  
  ## License
  
  This project is licensed under the ${data.license.name} license.
  `;
    } catch (error) {
      console.error(error);
    }
  }
  

updateMarkown();