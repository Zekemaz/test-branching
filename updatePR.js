const github = require('@actions/github');

const token = process.env.GITHUB_TOKEN

const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

const prNum = github.context.payload.pull_request.number;

const octokit = github.getOctokit(token);


const { data } = await octokit.rest.pulls.get({
    owner: repoOwner,
    repo: repoName,
    pull_number: prNum,
});

console.log(data)

octokit.pulls.update({
    owner: repoOwner,
    repo: repoName,
    body: "walou", // get current body + new body
    pull_number: prNum,
});
