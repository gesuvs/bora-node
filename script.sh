#DIR="./bora-node"
DIR="./bora-node"
pull() {
  cd $DIR
  git pull
}

clone(){
  git clone https://github.com/GBernardo10/bora-node
}

if [ -d "$DIR" ]; then
  pull
else
  clone
fi

start(){
  cd $DIR
  ls
}

start
