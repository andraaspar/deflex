module.exports = function(grunt) {
	
	var bowerDeps = Object.keys(grunt.file.readJSON('./bower.json').dependencies);
	var folders = ['lib', 'src'];
	var bowerLibFiles = (function() {
		var result = [];
		for (var i = 0; i < bowerDeps.length; i++) {
			for (var j = 0; j < folders.length; j++) {
				result.push({expand: true, cwd: 'bower_components/' + bowerDeps[i] + '/' + folders[j], src: ['**/*'], dest: 'lib/'});
			}
		}
		return result;
	})();
	
	grunt.initConfig({
		_outJS: 'build/test1/script/test.js',
		_outCSS: 'build/test1/style/test.css',
		
		clean: {
			collect_libs: ['lib/*'],
			test1: ['<%= _outJS %>', '<%= _outCSS %>']
		},
		copy: {
			collect_libs: {
				files: bowerLibFiles
			}
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('collect_libs', ['clean:collect_libs','copy:collect_libs']);
	grunt.registerTask('default', ['clean:test1','typescript:test1','less:test1']);
};