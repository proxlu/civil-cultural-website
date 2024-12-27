# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------

project = 'ccp-doc'
copyright = '2020, Civil Cultural Project'
author = 'Civil Cultural Project'

# The full version, including alpha/beta/rc tags
release = '0.0.1'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
'rst2pdf.pdfbuilder',
'sphinx.ext.autosectionlabel'
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []

# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_rtd_theme'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

latex_additional_files = ['_static\cover.pdf','_static\docabout.pdf']

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# For adding a cover in the future and an about page to the doc
"""
latex_maketitle = r'''
\begin{titlepage}
\includepdf[fitpaper]{cover.pdf}
\includepdf[fitpaper]{docabout.pdf}
\end{titlepage}

'''
"""

# Remove 'view page source' link
html_show_sourcelink = False
latex_engine = 'xelatex'
latex_elements = {
'sphinxsetup': '',
'passoptionstopackages': r'\PassOptionsToPackage{table}{xcolor}',
'fontpkg': r'''
\setmainfont{Cambria}
\setsansfont{Microsoft Sans Serif}
\setmonofont{Courier New}
''',
'preamble': r'''
\usepackage{pdfpages}
\usepackage[titles]{tocloft}
\cftsetpnumwidth {1.25cm}\cftsetrmarg{1.5cm}
\setlength{\cftchapnumwidth}{0.75cm}
\setlength{\cftsecindent}{\cftchapnumwidth}
\setlength{\cftsecnumwidth}{1.25cm}
\usepackage{xcolor}
\usepackage{sectsty}
\sectionfont{\color{black}}  % sets colour of sections
\hypersetup{implicit=false, bookmarks=false}
\makeatletter
  \fancypagestyle{plain}{
    \fancyhf{}
    \fancyfoot[RE,RO]{{{Civil Cultural Project - For a better social and cultural life for all \href{https://civilcultural.wordpress.com/}{https://civilcultural.wordpress.com/}\hspace{.25cm}}\py@HeaderFamily\thepage}}
    \fancyfoot[LE, LO]{{\py@HeaderFamily\nouppercase{\rightmark}}}
    \fancyhead[LE,RO]{{\py@HeaderFamily \@title, \py@release}}
    \renewcommand{\headrulewidth}{0.4pt}
    \renewcommand{\footrulewidth}{0.4pt}
  }
  \fancypagestyle{normal}{
    \fancyhf{}
    \fancyfoot[RE,RO]{{{Civil Cultural Project - For a better social and cultural life for all \href{https://civilcultural.wordpress.com/}{https://civilcultural.wordpress.com/}\hspace{.25cm}}\py@HeaderFamily\thepage}}
    \fancyfoot[LE, LO]{{\py@HeaderFamily\nouppercase{\rightmark}}}
    \fancyhead[LE,RO]{{\py@HeaderFamily \@title, \py@release}}
    \renewcommand{\headrulewidth}{0.4pt}
    \renewcommand{\footrulewidth}{0.4pt}
  }
\makeatother
''',
'printindex': '\\footnotesize\\raggedright\\printindex',
'fncychap': r'\usepackage[Bjornstrup]{fncychap}',
'figure_align': 'H',
}

# Show referred URLs on footnote
#latex_show_urls = 'footnote'

# Add Python module names
add_module_names = False