
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
    input.value = converter.makeMd(output.innerHTML);
}

async function getRepoData(username, repoName) {
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;
    return await fetch(apiUrl);
}
async function getLanguages(username, repoName) {
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}/languages`;
    return await fetch(apiUrl);
}

async function parseRepo(event) {
    event.preventDefault();
    const repoUrl = parseRepoText.value;
    const [, , , username, repoName] = repoUrl.split('/');
    try {
        const data = await (await getRepoData(username, repoName)).json();
        const languages = await (await getLanguages(username, repoName)).json();
        input.value = `
<style>
    @import url("https://fonts.googleapis.com/css?family=Fira+Code");
    * {
        font-family: "Fira Code", monospace;
    }
    h1 {
        text-align: center;
        font-weight: 800;
    }
    h2 {
        font-weight: 800;
    }
    p {
        font-weight: 100;
    }
</style>
# ${data.name}

<p align="center">
  <p align="center">
    <br />
    <a href="https://github.com/${username}/${repoName}/releases/">Releases &#187;</a>
    <br />
    <br />
    <a href="https://github.com/${username}/${repoName}">View Demo</a> |
    <a href="https://github.com/${username}/${repoName}/wiki">Wiki</a> |
    <a href="https://github.com/${username}/${repoName}/issues">Report Bug</a> |
    <a href="https://github.com/${username}/${repoName}/issues">Request Feature</a>
  </p>
</p>


-------------
![GitHub All Releases](https://img.shields.io/github/downloads/${username}/${repoName}/total?style=for-the-badge)
![GitHub Repo Size](https://img.shields.io/github/repo-size/${username}/${repoName}?style=for-the-badge)
![GitHub Repo Stars](https://img.shields.io/github/stars/${username}/${repoName}?style=for-the-badge)

${data.topics.map(topic => topic)}

${data.description}

## Features

${data.has_pages ? `[Look at the showcase demo here!](https://${username}.github.io/${repoName})` : ''}

-
-
-


## Installation

\`\`\`cmd
npm install
\`\`\`

## Usage

TODO: Add usage instructions

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request


## Tech Stack

${Object.keys(languages).map(key => ` - ${key}`).join('\n')}

## Support

For support, open a pull request or open an issue [here](https://github.com/${username}/${repoName}/issues/new)

## License

This project is licensed under the <a href="${data.license.url}}">${data.license.name}</a> license.
        `;
        updateMarkown();
    } catch (error) {
        console.error(error);
    }
}


updateMarkown();