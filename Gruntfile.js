module.exports = function (grunt) {
	grunt.loadTasks('grunt_tasks');
	grunt.initConfig({
		build: {
			all: {
				dest: "dist/jquery.js",
				minimum: [
					"core",
					"selector"
				],

				// Exclude specified modules if the module matching the key is removed
				removeWith: {
					ajax: ["manipulation/_evalUrl", "event/ajax"],
					callbacks: ["deferred"],
					css: ["effects", "dimensions", "offset"],
					"css/showHide": ["effects"],
					deferred: {
						remove: ["ajax", "effects", "queue", "core/ready"],
						include: ["core/ready-no-deferred"]
					},
					sizzle: ["css/hiddenVisibleSelectors", "effects/animatedSelector"]
				}
			}
		}
	});





	grunt.registerTask('concates6', ['concat:hammer', 'concat:material']);

	grunt.registerTask('publish', ['concates6', 'jspmbuild']);



};
