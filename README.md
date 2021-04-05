先npm/cnpm install

然后 node main.js "文本路径"
会在audio目录下生成每行的mp3文件
然后执行 cd audio && ls | sort -n | xargs cat > ../audio.mp3
可获得在项目目录下获得一个audio.mp3

测试例子:
cnpm install && node main.js ./test.txt && cd audio && ls | sort -n | xargs cat > ../audio.mp3 && cd .. && open audio.mp3
