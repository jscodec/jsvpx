examples : examples/ogv-simple/index.html
	rm -rf ogv-simple/dist 
	cp -R node_modules/ogv/dist examples/ogv-simple 
	cp builds/ogv-decoder-video-vp8.js examples/ogv-simple/dist
	
	
