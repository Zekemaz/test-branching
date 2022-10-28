(async () => {

    prId = process.argv[1]
    const github = require('@actions/github');

    const token = "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"
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');

    // const prNum = github.context.payload.pull_request.number;

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

// comment