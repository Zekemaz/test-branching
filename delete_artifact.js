(async () => {

    const token = process.argv[2]
    console.log(token)
    const github = require('@actions/github');
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const octokit = github.getOctokit(token);


    // list all artifacts
    const {data} = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
        owner: repoOwner,
        repo: repoName,
    })

    for (let i = 0; i < data.total_count; i++) {
        res = await octokit.request('DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}', {
            owner: repoOwner,
            repo: repoName,
            artifact_id: data.artifacts[i].id
        })
    }
})();