for f in $(ls tomerge)
do
 ffmpeg -i tomerge/$f -vn -c:a copy onlyaudio/$f.wav
done
