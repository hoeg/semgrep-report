import * as core from '@actions/core'
import * as github from '@actions/github'
import {body} from './body'

async function run(): Promise<void> {
  try {
    const path: string = core.getInput("report_path")
    const issue_number: string = core.getInput("issue_number")
    const owner: string = core.getInput("owner")
    const repo: string = core.getInput("repo")

    const secret = core.getInput('github_secret');
    core.debug(`Ready to read report semgrep from ${path}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const { promises: fs } = require('fs');
    let content = await fs.readFile(path, 'utf8');

    if(content.length > 0) {
      const octokit = github.getOctokit(secret)
      let output = JSON.parse(content);
      for(let result of output.results){
        let fix = result.extra.fix
        let message = result.extra.message
        let file = result.path
        let startLine = result.start.line
        let endLine = result.end.line
        octokit.rest.pulls.createReviewComment({
          owner: owner,
          repo: "",
          pull_number: 1,
          body: "",
          commit_id: "",
          path: "",
          start_line: 1,
          line: 1
        });
      }
    }
    //core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function createBody(): string {
  return ""
}

function createFixBody(): string {
  return ""
}

run()
