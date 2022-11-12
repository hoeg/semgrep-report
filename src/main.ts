import * as core from '@actions/core'
import * as github from '@actions/github'
import * as comments from './comments'

async function run(): Promise<void> {
  try {
    const report_path: string = core.getInput("report_path")
    const issue_number: number = +core.getInput("issue_number")
    const owner: string = core.getInput("owner")
    const repo: string = core.getInput("repo")

    const secret = core.getInput('github_secret');
    core.debug(`Ready to read report semgrep from ${report_path}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const octokit = github.getOctokit(secret)
    
    const { promises: fs } = require('fs');
    let content = await fs.readFile(report_path, 'utf8');
    let params = comments.parseParams(content);

    for(let p of params){
      octokit.rest.pulls.createReviewComment({
        owner: owner,
        repo: repo,
        pull_number: issue_number,
        body: p["body"],
        path: p["path"],
        start_line: p["start_line"],
        line: p["end_line"]
      });
    }
    //core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
