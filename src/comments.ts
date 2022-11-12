import { stringify } from "querystring";

export function fix(suggestion: string, message: string): string {
  let comment = "Finding: "+ message + "\n\nConsider if"
  return comment.concat("\`\`\`suggestion\n", 
                        suggestion,
                        "\n\`\`\`\n",
                        "fixes the issue.")
}

export function finding(hit: string, message: string): string {
  let comment = "Finding: "+ message + "\n\n"
  return comment.concat("\`\`\`\n", hit, "\n\`\`\`")
}

type CommentParameters = {
  body: string;
  path: string;
  start_line: number;
  end_line: number;
}

export function parseParams(scanResult: string): CommentParameters[] {
  var params: CommentParameters[] = [];
  let output = JSON.parse(scanResult);
  for(let result of output.results){
    let message = result.extra.message
    let suggestion = result.extra.fix
    let hit = result.extra.lines
    let info = ""
    if(suggestion !== undefined && suggestion.length > 0) {
      info = fix(suggestion, message)
    }
    else {
      info = finding(hit, message)
    }
    let file = result.path
    let startLine = result.start.line
    let endLine = result.end.line

    params.push({
      "body": info,
      "path": file,
      "start_line": startLine,
      "end_line": endLine
    });
  }
  return params
}