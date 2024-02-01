export function fix(suggestion: string, message: string): string {
  const comment = `Finding: ${message}\n\nConsider if\n`
  return comment.concat(
    '```suggestion\n',
    suggestion,
    '\n```\n',
    'fixes the issue.'
  )
}

export function finding(hit: string, message: string): string {
  const comment = `Finding: ${message}\n\n`
  return comment.concat('```\n', hit, '\n```')
}

type CommentParameters = {
  body: string
  path: string
  start_line: number
  end_line: number
}

export function parseParams(
  scanResult: string,
  srcBasePath: string
): CommentParameters[] {
  const params: CommentParameters[] = []
  const output = JSON.parse(scanResult)
  for (const result of output.results) {
    const message = result.extra.message
    const suggestion = result.extra.fix
    const hit = result.extra.lines
    let info = ''
    if (suggestion !== undefined && suggestion.length > 0) {
      info = fix(suggestion, message)
    } else {
      info = finding(hit, message)
    }
    let file = result.path
    if (file.startsWith(srcBasePath) && srcBasePath.length !== 0) {
      file = file.substring(srcBasePath.length)
      if (file.startsWith('/')) {
        file = file.substring(1)
      }
    }
    const startLine = result.start.line
    const endLine = result.end.line

    params.push({
      body: info,
      path: file,
      start_line: startLine,
      end_line: endLine
    })
  }
  return params
}
