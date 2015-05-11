#Load eMcellent Tester

Parsing adhoc M/MUMPS files by the standard is effective, though the standard is open to some interpretation.  To ensure the parser is properly functioning, we can load test it with as many files as possible and ensure that the output is identical to the input.

The load tester uses `mocha` to bulk load as many files as possible from a given directory, and attempts to parse/recompile them.

To begin, first edit the `config.json` file:

`
config.source: The directory to be parsed.  This directory will be recursively walked and all files subdirectories loaded.
`

`config.output: If a test fails, debugging content is dumped to this directory, stamped with the name of the file which failed`

`config.throttle: A limit to the number of files to parse.  If you have a large directory of files, incrementally stepping up the throttle is a good way to debug.  Leave it as zero for no throttle.`

Check out [OSEHRA's VistA-M](https://github.com/OSEHRA/VistA-M) codebase if you need some source files, this project was created in an attempt to successfully ingest and reproduce all of these files.

To run the test, execute the following command (you must have mocha installed):

`mocha load.js -R spec -t 300000`