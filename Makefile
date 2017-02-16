build-release:
	rm -rf build 
	mkdir build  
	VERSION=`node -pe "require('./package.json').version"` && \
	browserify src/main.js -t [ envify purge --MODE global ] | \
	tee  build/flare-vpx-“$$VERSION".js 
	

	
