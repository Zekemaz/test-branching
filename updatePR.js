(async () => {

    prId = process.argv[1]
    const github = require('@actions/github');
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

    console.log(github)
    console.log(github.context)
    const octokit = github.getOctokit(process.argv[2]);


    const {data} = await octokit.rest.pulls.get({
        owner: repoOwner,
        repo: repoName,
        pull_number: prId,
    });

    octokit.rest.pulls.update({
        owner: repoOwner,
        repo: repoName,
        body: data.body + "\n\n verify PR's status",
        pull_number: prId,
    });
})();