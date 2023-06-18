import * as comments from './comments'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {existsSync as fileExists, promises as fs} from 'node:fs'

async function run(): Promise<void> {
  try {
    const report_path: string = core.getInput('report_path')
    const issue_number: number = github.context.issue.number
    const r: string = github.context.repo.repo
    const base = github.context.payload.pull_request?.base?.sha
    const head = github.context.payload.pull_request?.head?.sha

    const secret = core.getInput('github_secret')
    const octokit = github.getOctokit(secret)

    core.debug(`Ready to read report semgrep from ${report_path}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    if (!fileExists(report_path)) {
      core.setFailed(`${report_path} does not exist. Stopping action.`)
      return
    }
    const content = await fs.readFile(report_path, 'utf-8')
    core.debug(`Read report - parsing content`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    const params = comments.parseParams(content)

    const response = await octokit.rest.repos.compareCommitsWithBasehead({
      owner: github.context.repo.owner,
      repo: r,
      basehead: `${base}...${head}`
    })

    // Ensure that the request was successful.
    if (response.status !== 200) {
      core.setFailed(
        `The GitHub API for comparing the base and head commits for this ${github.context.eventName} event returned ${response.status}, expected 200. ` +
          "Please submit an issue on this action's GitHub repo."
      )
    }

    // Ensure that the head commit is ahead of the base commit.
    if (response.data.status !== 'ahead') {
      core.setFailed(
        `The head commit (${head}) for this ${github.context.eventName} event is not ahead of the base commit (${base}). Got ${response.data.status}.` +
          "Please submit an issue on this action's GitHub repo."
      )
    }

    const changedFiles = response.data.files
    if (changedFiles === undefined) {
      core.setFailed(`no files changed`)
      return
    }
    const filenames: string[] = []
    for (const f of changedFiles) {
      core.debug(`found file ${f.filename} -`)
      filenames.push(f.filename)
    }

    for (const p of params) {
      if (filenames.includes(p['path'])) {
        const repository = r.split('/')
        const owner: string = repository[0]
        const repo: string = repository[1]
        core.debug(
          `create comment with: owner: ${owner}, repo: ${repo}, issue_number: ${issue_number}, head: (${head}) finding info: ${p['body']}, ${p['path']} ${p['start_line']} ${p['end_line']}`
        )
        await octokit.rest.pulls.createReviewComment({
          owner,
          repo,
          pull_number: issue_number,
          commit_id: head,
          body: p['body'],
          path: p['path'],
          start_line: p['start_line'],
          line: p['end_line']
        })
      } else {
        /*
        await octokit.rest.issues.create({
          owner,
          repo,
          title,
          body: p['body']
        })*/
        core.info(
          `Path: ${p['path']} no found in ${changedFiles}. Create Issue for ${p['body']}`
        )
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Report failed: ${error.message} - ${error.stack}`)
    }
  }
}

run()
