printf '%q\n' "${PWD}/app-simulador-cat42"
cd "${PWD}/app-simulador-cat42"
git pull
yarn
yarn build

printf '%q\n' "${PWD}/cat42-server"
cd "${PWD}/cat42-server"
git pull
yarn
