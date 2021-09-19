import os
import sys


class PyInstallerUtil:

    @staticmethod
    def load_from_resource(relative_path):
        pyinstaller_temp_folder = getattr(sys, '_MEIPASS', None)
        resources_folder = 'resources'
        if pyinstaller_temp_folder is None:
            # not running in pyinstaller bundle
            # assumes that the script is being run from 'server' directory
            return os.path.join(os.getcwd(), resources_folder, relative_path)
        else:
            return os.path.join(pyinstaller_temp_folder, resources_folder, relative_path)
