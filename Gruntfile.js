module.exports = function(grunt) {
	
	grunt.initConfig({
		_outJS: 'build/test1/script/test.js',
		_outCSS: 'build/test1/style/test.css',
		_outJS2: 'build/test2/script/test.js',
		_outCSS2: 'build/test2/style/test.css',
		
		clean: {
			test1: ['<%= _outJS %>', '<%= _outCSS %>'],
			test2: ['<%= _outJS2 %>', '<%= _outCSS2 %>']
		},
		less: {
			test1: {
				files: {
					'<%= _outCSS %>': 'test/test1/_style.less'
				}
			},
			test2: {
				files: {
					'<%= _outCSS2 %>': 'test/test2/_style.less'
				}
			}
		},
		typescript: {
			test1: {
				files: {
					'<%= _outJS %>': 'test/test1/Main.ts'
				}
			},
			test2: {
				files: {
					'<%= _outJS2 %>': 'test/test2/Main.ts'
				}
			}
		},
		sas: {
			update: {}
		},
		shell: {
			update: {
				command: [
					'bower prune',
					'bower install',
					'bower update'
				].join('&&')
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sas');

	grunt.registerTask('update', ['shell:update','sas:update']);
	grunt.registerTask('compile', ['clean:test1','typescript:test1','less:test1','clean:test2','typescript:test2','less:test2']);
	grunt.registerTask('default', ['compile']);
};