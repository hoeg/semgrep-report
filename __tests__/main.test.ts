import * as comments from '../src/comments'
import {expect, test} from '@jest/globals'

test('create fix content', async () => {
  const input = `{
    "errors": [],
    "paths": {
        "_comment": "<add --verbose for a list of skipped paths>",
        "scanned": [
            ".terraform.lock.hcl",
            "backend.tf",
            "main.tf",
            "output.tf",
            "provider.tf"
        ]
    },
    "results": [{
      "check_id": "rules.deny_external_data",
      "end": {
          "col": 2,
          "line": 7,
          "offset": 131
      },
      "extra": {
          "fingerprint": "5f77218cfef45f15a0ae0be511e287928eddfbd443c218c02faf7ce1cffc0a6547f70dd5b2abba2a2173608a5604b31b75cb09ff3090867cc7430c77856a922f_0",
          "fix": "proposed fix",
          "is_ignored": false,
          "lines": "data \\"external\\" \\"test\\" {\\n  source = [\\"whoami\\"]\\n}",
          "message": "External data is not allowed.",
          "metadata": {},
          "metavars": {
              "$ANYTHING": {
                  "abstract_content": "test",
                  "end": {
                      "col": 22,
                      "line": 5,
                      "offset": 104
                  },
                  "start": {
                      "col": 18,
                      "line": 5,
                      "offset": 100
                  }
              }
          },
          "severity": "WARNING"
      },
      "path": "lunar-tech.tf",
      "start": {
          "col": 1,
          "line": 5,
          "offset": 83
      }
  }],
    "version": "0.120.0"
  }`
  const suggestion = ""
  const message = ""
  let res = comments.parseParams(input)
  expect(res.length).toBe(1)
  expect(res[0]["body"]).toBe("Finding: External data is not allowed.\n\nConsider if\n\`\`\`suggestion\nproposed fix\n\`\`\`\nfixes the issue.")
})

test('create finding content', async () => {
  const input = `{
    "errors": [],
    "paths": {
        "_comment": "<add --verbose for a list of skipped paths>",
        "scanned": [
            ".terraform.lock.hcl",
            "backend.tf",
            "main.tf",
            "output.tf",
            "provider.tf"
        ]
    },
    "results": [{
      "check_id": "rules.deny_external_data",
      "end": {
          "col": 2,
          "line": 7,
          "offset": 131
      },
      "extra": {
          "fingerprint": "5f77218cfef45f15a0ae0be511e287928eddfbd443c218c02faf7ce1cffc0a6547f70dd5b2abba2a2173608a5604b31b75cb09ff3090867cc7430c77856a922f_0",
          "is_ignored": false,
          "lines": "data \\"external\\" \\"test\\" {\\n  source = [\\"whoami\\"]\\n}",
          "message": "External data is not allowed.",
          "metadata": {},
          "metavars": {
              "$ANYTHING": {
                  "abstract_content": "test",
                  "end": {
                      "col": 22,
                      "line": 5,
                      "offset": 104
                  },
                  "start": {
                      "col": 18,
                      "line": 5,
                      "offset": 100
                  }
              }
          },
          "severity": "WARNING"
      },
      "path": "main.tf",
      "start": {
          "col": 1,
          "line": 5,
          "offset": 83
      }
  }],
    "version": "0.120.0"
  }`
  const suggestion = ""
  const message = ""
  let res = comments.parseParams(input)
  expect(res.length).toBe(1)
  expect(res[0]["body"]).toBe("Finding: External data is not allowed.\n\n\`\`\`\ndata \"external\" \"test\" {\n  source = [\"whoami\"]\n}\n\`\`\`")
})

test('create finding content', async () => {
  const input = `{
    "errors": [],
    "paths": {
        "_comment": "<add --verbose for a list of skipped paths>",
        "scanned": [
            ".terraform.lock.hcl",
            "backend.tf",
            "main.tf",
            "output.tf",
            "provider.tf"
        ]
    },
    "results": [{
      "check_id": "rules.deny_external_data",
      "end": {
          "col": 2,
          "line": 7,
          "offset": 131
      },
      "extra": {
          "fingerprint": "5f77218cfef45f15a0ae0be511e287928eddfbd443c218c02faf7ce1cffc0a6547f70dd5b2abba2a2173608a5604b31b75cb09ff3090867cc7430c77856a922f_0",
          "is_ignored": false,
          "lines": "data \\"external\\" \\"test\\" {\\n  source = [\\"whoami\\"]\\n}",
          "message": "External data is not allowed.",
          "metadata": {},
          "metavars": {
              "$ANYTHING": {
                  "abstract_content": "test",
                  "end": {
                      "col": 22,
                      "line": 5,
                      "offset": 104
                  },
                  "start": {
                      "col": 18,
                      "line": 5,
                      "offset": 100
                  }
              }
          },
          "severity": "WARNING"
      },
      "path": "main.tf",
      "start": {
          "col": 1,
          "line": 5,
          "offset": 83
      }
  },{
    "check_id": "rules.deny_external_data",
    "end": {
        "col": 2,
        "line": 7,
        "offset": 131
    },
    "extra": {
        "fingerprint": "5f77218cfef45f15a0ae0be511e287928eddfbd443c218c02faf7ce1cffc0a6547f70dd5b2abba2a2173608a5604b31b75cb09ff3090867cc7430c77856a922f_0",
        "is_ignored": false,
        "lines": "data \\"external\\" \\"test\\" {\\n  source = [\\"whoami\\"]\\n}",
        "message": "External data is not allowed.",
        "metadata": {},
        "metavars": {
            "$ANYTHING": {
                "abstract_content": "test",
                "end": {
                    "col": 22,
                    "line": 5,
                    "offset": 104
                },
                "start": {
                    "col": 18,
                    "line": 5,
                    "offset": 100
                }
            }
        },
        "severity": "WARNING"
    },
    "path": "main.tf",
    "start": {
        "col": 1,
        "line": 5,
        "offset": 83
    }
},{
  "check_id": "rules.deny_external_data",
  "end": {
      "col": 2,
      "line": 7,
      "offset": 131
  },
  "extra": {
      "fingerprint": "5f77218cfef45f15a0ae0be511e287928eddfbd443c218c02faf7ce1cffc0a6547f70dd5b2abba2a2173608a5604b31b75cb09ff3090867cc7430c77856a922f_0",
      "is_ignored": false,
      "lines": "data \\"external\\" \\"test\\" {\\n  source = [\\"whoami\\"]\\n}",
      "message": "External data is not allowed.",
      "metadata": {},
      "metavars": {
          "$ANYTHING": {
              "abstract_content": "test",
              "end": {
                  "col": 22,
                  "line": 5,
                  "offset": 104
              },
              "start": {
                  "col": 18,
                  "line": 5,
                  "offset": 100
              }
          }
      },
      "severity": "WARNING"
  },
  "path": "main.tf",
  "start": {
      "col": 1,
      "line": 5,
      "offset": 83
  }
}],
    "version": "0.120.0"
  }`
  const suggestion = ""
  const message = ""
  let res = comments.parseParams(input)
  expect(res.length).toBe(3)
})