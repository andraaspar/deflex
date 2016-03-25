module.exports = function(grunt) {
	
grunt.initConfig((function() {
		
		var TEST_COUNT = 2;
		
		var config = {
			clean: {
				tests: ['tmp', 'build'],
				update: [
					'lib'
				]
			},
			copy: {
				update: {
					files: [{
						expand: true,
						cwd: 'bower_components/illa/src',
						dot: true,
						src: '**',
						dest: 'lib'
					}, {
						expand: true,
						cwd: 'bower_components/berek/src',
						dot: true,
						src: '**',
						dest: 'lib'
					}, {
						expand: true,
						cwd: 'bower_components/jquery-d-ts/src',
						dot: true,
						src: '**',
						dest: 'lib'
					}]
				}
			},
			kapocs: {
				tests: {
					assetTemplates: [{
						expand: true,
						cwd: 'tmp/asset_templates',
						dot: true,
						src: ['**'],
						dest: 'build'
					}],
					templates: [{
						expand: true,
						cwd: 'test/templates',
						dot: true,
						src: ['**'],
						dest: 'build'
					}]
				}
			},
			less: {
				tests: {
					files: {}
				}
			},
			shell: {
				typescriptTests: {
					command: ''
				},
				update: {
					command: [
						'bower prune',
						'bower update',
						'bower install'
					].join('&&')
				}
			}
		};
		
		for (var i = 1; i <= TEST_COUNT; i++) {
			var folderPath = 'tmp/asset_templates/test' + i;
			var jsPath = folderPath + '/script/test.js';
			var cssPath = folderPath + '/style/test.css';
			
			config.less.tests.files[cssPath] = 'test/test' + i + '/_style.less';
			
			config.shell.typescriptTests.command ? config.shell.typescriptTests.command += ' && ' : 0;
			config.shell.typescriptTests.command += '"./node_modules/.bin/tsc" "test/test' + i + '/Main.ts" --outFile "' + jsPath + '"';
		}
		
		return config;
	})());

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-kapocs');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('update', [
		'shell:update',
		'clean:update',
		'copy:update'
	]);
	grunt.registerTask('compile', [
		'clean:tests',
		'shell:typescriptTests',
		'less:tests',
		'kapocs:tests'
	]);
	grunt.registerTask('default', [
		'compile'
	]);
};