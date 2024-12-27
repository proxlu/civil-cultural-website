# ccp-doc
Civil Cultural Project documentation.

Install Anaconda, as per https://www.anaconda.com/products/individual.

First, install the proper latest Python version which will be used in our environment.

conda install -c anaconda python=3.8

Create a new Anaconda environment.

conda create --name ccp_env python

Activate the new Anaconda environment.

conda activate ccp_env

Initialize the new shell environment inside your desired shell, that is the shell you work as per your own choice. In Windows, I use Git Bash.

conda init

Install pip.

conda install pip

First install the requirements:

pip3 install -r requirements.txt

Then install MikTex, as per https://miktex.org/download.

Then install Perl (if you haven't before), as per https://www.activestate.com/products/perl/downloads/

To build the PDF, then simply use:

make.bat latexpdf LATEXOPTS="--halt-on-error" -f

To build the html files, use:

make.bat html