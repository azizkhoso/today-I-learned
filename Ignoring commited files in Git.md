# Ignoring Tracked files in git

When you add a tracked or commited file in .gitignore, it is not ignored. It is tracked and every time you change it the changes are notified unlike ignored files.

To ignore tracked files, first add them in .gitignore then run following commands:

`git rm -r cached .` You made all tracked files untracked.

`git add .` You tracked all files, but not the ones in .gitignore

Now you have successfully ignored them.
