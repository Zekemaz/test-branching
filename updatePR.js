(async () => {

    const pullRequestNumber = process.argv[2]
    const token = process.argv[3]
    const github = require('@actions/github');
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const octokit = github.getOctokit(token);

    const {data} = await octokit.rest.pulls.get({
        owner: repoOwner,
        repo: repoName,
        pull_number: pullRequestNumber,
    });
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var datetime = date+' '+time;

    let body = ""
    if (data.body !== null) {
        body = data.body
    }
    octokit.rest.pulls.update({
        owner: repoOwner,
        repo: repoName,
        body: body + "\n The feature has been successfully merged on develop on the " + datetime,
        pull_number: pullRequestNumber,
    });
})();