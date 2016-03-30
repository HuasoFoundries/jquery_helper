module.exports = function(grunt) {
    "use strict";


    var fs = require("fs"),
        spawnTest = function(done) {
            var testPaths = [].slice.call(arguments, 1),
                spawn = require("win-spawn");

            spawn("node", testPaths, { stdio: "inherit" })
                .on("close", function(code) {
                    done(code === 0);
                });
        },

        testsDir = "./test/node_smoke_tests/",
        nodeSmokeTests = ["babel:nodeSmokeTests"];

    // The concatenated file won't pass onevar
    // But our modules can

    grunt.initConfig({


        babel: {
            options: {
                sourceMap: "inline",
                retainLines: true
            },
            nodeSmokeTests: {
                files: {
                    "test/node_smoke_tests/lib/ensure_iterability.js": "test/node_smoke_tests/lib/ensure_iterability_es6.js"
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);




    fs.readdirSync(testsDir)
        .filter(function(testFilePath) {
            return fs.statSync(testsDir + testFilePath).isFile() &&
                /\.js$/.test(testFilePath);
        })
        .forEach(function(testFilePath) {
            var taskName = "node_" + testFilePath.replace(/\.js$/, "");

            grunt.registerTask(taskName, function() {
                spawnTest(this.async(), "test/node_smoke_tests/" + testFilePath);
            });

            nodeSmokeTests.push(taskName);
        });

    grunt.registerTask("test", nodeSmokeTests);
};
