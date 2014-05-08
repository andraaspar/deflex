module.exports = function(grunt) {
	grunt.initConfig({
		_outJS: 'build/test1/script/test.js',
		_outCSS: 'build/test1/style/test.css',
		
		clean: {
			test1: ['<%= _outJS %>', '<%= _outCSS %>']
		},
		typescript: {
			test1: {
				files: {
					'<%= _outJS %>': 'test/test1/Main.ts'
				}
			}
		},
		less: {
			test1: {
				files: {
					'<%= _outCSS %>': 'test/test1/_style.less'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['clean','typescript','less']);
};