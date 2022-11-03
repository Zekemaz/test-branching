(async () => {

    prId = process.argv[1]
    const github = require('@actions/github');

    const token = "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"
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

    console.log(github)
    console.log(github.context)
    const octokit = github.getOctokit(token);


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