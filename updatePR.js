(async () => {

    const pullRequestNumber = process.argv[2]
    console.log(pullRequestNumber)
    const token = process.argv[3]
    console.log(token)
    console.log(process.argv)
    const github = require('@actions/github');
    const [repoOwner, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    const octokit = github.getOctokit(token);

    console.log(github)
    console.log(github.context)

    const {data} = await octokit.rest.pulls.get({
        owner: repoOwner,
        repo: repoName,
        pull_number: pullRequestNumber,
    });
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log(dateTime)

    octokit.rest.pulls.update({
        owner: repoOwner,
        repo: repoName,
        body: data.body + "\n the feature has been successfully merged on develop on the " + datetime,
        pull_number: pullRequestNumber,
    });
})();