import os
import shutil
import sys

FILE_PATH = os.path.dirname(os.path.realpath(__file__))





def buildDocker():
    os.system('npm run build')
    os.system('docker build -t remote-games-frontend .')


def deploy():
    os.system('heroku container:login')
    os.system('heroku container:push --app card-game989-front web')
    os.system('heroku container:release --app card-game989-front web')


def main():
    buildDocker()
    deploy()


if __name__ == "__main__":
    main()