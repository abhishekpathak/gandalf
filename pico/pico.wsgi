import sys,site
site.addsitedir('/home/abhishek/.virtualenvs/travelibibo/lib/python2.7/site-packages')
ROOT_DIR = '/home/abhishek/dev/gandalf/'
sys.stdout = sys.stderr # sys.stdout access restricted by mod_wsgi
path = ROOT_DIR # import pico from this dir
path1 = ROOT_DIR + "pico/" # import pico from this dir
path2 = ROOT_DIR + "dashboard_engine/" # the modules you want to be usable by Pico
sys.path.insert(0, path)
sys.path.insert(0, path1)
sys.path.insert(0, path2)

import pico.server

# Set the WSGI application handler
application = pico.server.wsgi_app
