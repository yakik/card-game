import os
import shutil
import sys

FILE_PATH = os.path.dirname(os.path.realpath(__file__))


def init_deploy():
    shutil.rmtree(os.path.join(FILE_PATH, 'backend', 'web'))


def build_frontend():
    os.system('cd frontend && npm run build')


def copy_build_folder():
    shutil.copytree(
        os.path.join(FILE_PATH, 'frontend', 'build'),
        os.path.join(FILE_PATH, 'backend', 'build'))

def main():
    init_deploy()
    build_frontend()
    copy_build_folder()

if __name__ == "__main__":
    main()