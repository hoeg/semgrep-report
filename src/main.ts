import * as comments from './comments'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {promises as fs} from 'fs'

async function run(): Promise<void> {
  try {
    const report_path: string = core.getInput('report_path')
    const issue_number: number = +core.getInput('issue_number')
    const r: string = core.getInput('repo')
    const commitID: string = core.getInput("commit_id")

    const secret = core.getInput('github_secret')
    core.debug(`Ready to read report semgrep from ${report_path}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const octokit = github.getOctokit(secret)

    const content = await fs.readFile(report_path, 'utf-8')
    const params = comments.parseParams(content)

    for (const p of params) {
      let repository = r.split("/");
      let owner: string = repository[0];
      let repo: string = repository[1];
      core.debug(`create comment with: ${owner}, ${repo}, ${issue_number}, ${commitID} ${p['body']}, ${p['path']} ${p['start_line']} ${p['end_line']}`)
      octokit.rest.pulls.createReviewComment({
        owner: owner,
        repo: repo,
        pull_number: issue_number,
        commit_id: commitID,
        body: p['body'],
        path: p['path'],
        start_line: p['start_line'],
        line: p['end_line']
      })
    }
    //core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
