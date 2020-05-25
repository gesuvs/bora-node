#!/bin/bash
DIR="./bora-node"
EVENTOS="./eventos-service"
API_GATEWAY="./api-gateway"
UPLOAD="./upload-service"
USER="./user-service"
FILE=.log
ARRAYDIR=($EVENTOS $API_GATEWAY $UPLOAD $USER)
NEWARR=()

status() {
  for i in "${ARRAYDIR[@]}"; do
    com+=$(git status | grep ${i#./})
  done
  com=${com//modified:/""}
  for j in $com; do
    for k in "${ARRAYDIR[@]}"; do
      if [[ $j == *"${k#./}"* ]]; then
        NEWARR+=("$k")
      fi
    done
  done

  echo "${NEWARR[@]}" >.log

  for l in "${ARRAYDIR[@]}"; do
    if grep -r $l .log; then
      exit 0
    elif [ -f ".log" ]; then
      rm .log
      exit 0
    fi
  done
}

rmlogpush() {
  git config --global user.email "g_bernardo10@hotmail.com"
  git config --global user.name "GBernardo10"
  echo "Host github.com" >~/.ssh/config
  echo "  IdentityFile  $(pwd)/travis_key" >>~/.ssh/config
  chmod 400 travis_key
  echo "github.com ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==" >~/.ssh/known_hosts
  git remote set-url origin git@github.com:GBernardo10/bora-node.git
  git checkout feature/lerna
  git add .log
  git commit -m "deploy: rm log"
  git push origin feature/lerna --quiet
}

arquivo() {
  if [ -f $FILE ]; then
    if [[ -z $(grep '[^[:space:]]' $FILE) ]]; then
      echo "Empty file"
      rm $FILE
      rmlogpush
    fi
  else
    echo n existe
    exit 1
  fi
}


# for i in 1 2; do
#   BORA_TESTE=$(($BORA_TESTE + $i))
# done

# if [ $BORA_TESTE -gt 0 ]; then
#   echo existe
# else
#   echo n existe
# fi

pull() {
  cd $DIR
  git pull
}

clone() {
  git clone https://github.com/GBernardo10/bora-node
  cd $DIR
}

start() {
  if [ -d "$DIR" ]; then
    pull
  else
    clone
  fi
}

input="teste.log"
traefik() {
  if grep -r "Running" teste.log >info.log; then
    echo "positivo"
    if grep -r "Shutdown" teste.log >errors.log; then
      exit 1
    fi
  else
    cat teste.log >errors.log
    exit 1
  fi
}

ssh() {
  echo foi
  certdir="tls"
  host="localhost"

  if [ ! -f "$certdir/ca-key.pem" ]; then
    openssl genrsa -out "${certdir}/ca-key.pem" 4096
  fi

  openssl req -new -x509 -days 365 \
    -subj "/CN=Local CA" \
    -key "${certdir}/ca-key.pem" \
    -sha256 -out "${certdir}/ca.pem"

  if [ ! -f "${certdir}/key.pem" ]; then
    openssl genrsa -out "${certdir}/key.pem" 2048
  fi

  extfile="${certdir}/extfile"
  openssl req -subj "/CN=${host}" -new -key "${certdir}/key.pem" \
    -out "${certdir}/${host}.csr"
  echo "subjectAltName = IP:127.0.0.1,DNS:localhost" >${extfile}

  openssl x509 -req -days 365 \
    -in "${certdir}/${host}.csr" -extfile "${certdir}/extfile" \
    -CA "${certdir}/ca.pem" -CAkey "${certdir}/ca-key.pem" -CAcreateserial \
    -out "${certdir}/cert.pem"

  # cleanup
  if [ -f "${certdir}/${host}.csr" ]; then
    rm -f -- "${certdir}/${host}.csr"
  fi
  if [ -f "${extfile}" ]; then
    rm -f -- "${extfile}"
  fi

}

while test $# -gt 0; do
  case "$1" in
  -dev)
    status
    exit 0
    ;;
  -prod)
    arquivo
    exit 0
    ;;
  -ssh)
    ssh
    exit 0
    ;;
  *)
    echo "$1 is not a recognized flag!"
    exit 1
    ;;
  esac
done
