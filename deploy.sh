set -e
pnpm  docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:GISFSDE/GISFSDE.github.io.git master
cd D:\PROJECTS\MY\gisfsdeblog


cd /opt/nginx/ui/

