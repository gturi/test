import webbrowser
from PyQt5.QtGui import QIcon
from PyQt5.QtWidgets import QApplication, QAction, QMenu, QSystemTrayIcon
from src.main import start_flask_app
from threading import Thread, Timer

if __name__ == '__main__':
    qtApp = QApplication([])
    qtApp.setQuitOnLastWindowClosed(False)

    def openBrowser():
        url = "http://127.0.0.1:5000/home"
        webbrowser.open_new_tab(url)

    # Open button
    openAction = QAction("Open")
    openAction.triggered.connect(openBrowser)

    # Quit button
    quit = QAction("Quit")
    quit.triggered.connect(qtApp.quit)

    # Add buttons to menu
    menu = QMenu()
    menu.addAction(openAction)
    menu.addAction(quit)

    # App icon
    icon = QIcon('resources/icon.png')

    # Adding item on the menu bar
    tray = QSystemTrayIcon()
    tray.setIcon(icon)
    tray.setVisible(True)

    # Adding options to the System Tray
    tray.setContextMenu(menu)

    # start flask application
    flaskThread = Thread(target=start_flask_app, daemon=True).start()

    # open the web browser after 1.25 seconds
    Timer(1.25, lambda: openBrowser()).start()

    qtApp.exec_()
