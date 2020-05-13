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

arquivo() {
  if [ -f $FILE ]; then
    if [[ -z $(grep '[^[:space:]]' $FILE) ]]; then
      echo "Empty file"
      rm $FILE
      exit 0
    fi
  else
    echo n existe
    exit 1
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
  *)
    echo "$1 is not a recognized flag!"
    exit 1
    ;;
  esac
done

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
