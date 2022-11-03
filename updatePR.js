(async () => {

    const pullRequestNumber = process.argv[2]
    const token = process.argv[3]
    const github = require('@actions/github');
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const octokit = github.getOctokit(token);

    console.log(github)
    console.log(github.context)
    console.log(octokit)

    const {data} = await octokit.rest.pulls.get({
        owner: repoOwner,
        repo: repoName,
        pull_number: pullRequestNumber,
    });

    octokit.rest.pulls.update({
        owner: repoOwner,
        repo: repoName,
        body: data.body + "\n\n verify PR's status",
        pull_number: pullRequestNumber,
    });
})();