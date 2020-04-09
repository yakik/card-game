import os
import shutil
import sys

FILE_PATH = os.path.dirname(os.path.realpath(__file__))





def build_frontend():
    os.system('cd frontend && npm run build')


def copy_build_folder():
    shutil.copytree(
        os.path.join(FILE_PATH, 'frontend', 'build'),
        os.path.join(FILE_PATH, 'backend', 'build'))
    os.system('docker build -t remote-games .')

def deploy():
    os.system('heroku container:login')
    os.system('heroku container:push --app card-game989 web')
    os.system('heroku container:release --app card-game989 web')

def cleanup():
    shutil.rmtree(os.path.join(FILE_PATH, 'backend', 'build'))
    shutil.rmtree(os.path.join(FILE_PATH, 'frontend', 'build'))

def main():
    build_frontend()
    copy_build_folder()
    #deploy()
    #cleanup()

if __name__ == "__main__":
    main()