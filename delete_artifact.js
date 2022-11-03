(async () => {

    const token = process.argv[1]
    console.log(token)

    const github = require('@actions/github');
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const octokit = github.getOctokit(token);


    // list all artifacts
    const {artifacts} = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
        owner: repoOwner,
        repo: repoName
    })

    console.log(artifacts)
    console.log(artifacts.artifacts[1].id)

    for (let i = 0; i < artifacts.total_count; i++) {
        await octokit.request('DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}', {
            owner: repoOwner,
            repo: repoName,
            artifact_id: artifacts.artifacts[i].id
        })
    }
})();