(async () => {
    const github = require('@actions/github');
    const token = "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"
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const octokit = github.getOctokit(token);

    // list all artifacts
    const {artifacts} = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
        owner: repoOwner,
        repo: repoName
    })

    console.log(artifacts)

    for (let i = 0; i < artifacts.total_count; i++) {
        await octokit.request('DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}', {
            owner: repoOwner,
            repo: repoName,
            artifact_id: artifacts.artifacts[i].id
        })
    }
})();