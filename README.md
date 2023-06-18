# Semgrep Reporting Action

Report your Semgrep findings back to the PR where they have been found.

## Add this action to your workflow

We show an example of how you can add this step to your workflow.
Note that you have to setup and run the Semgrep scanning yourself.
This step only parses the result and reports back to the PR that is being run.
Remember to only set 

```yaml
on:
  pull_request: {}
```

in your action as the action looks for comparison information using `github.context.payload.pull_request`.

```yaml
- name: Checkout
  uses: actions/checkout@v3
- name: Scan
  run: semgrep scan -f rules -l tf --json --output=semgrep.json .
- uses: hoeg/semgrep-report@v1
  with:
    github_secret: ${{secrets.GITHUB_TOKEN}}
    report_path: ./semgrep.json
```
