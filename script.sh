FILE=".travis.yml"
if [ -e "$FILE" ]; then
  return
else
  wget https://raw.githubusercontent.com/vmware-archive/docker-machine-driver-vmwareappcatalyst/master/.travis.yml
fi
