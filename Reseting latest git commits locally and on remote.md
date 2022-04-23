# Reseting latest git commits locally and on remote

When you accidently push latest commits to your remote branch that contain unwanted code, you can reset them as follows.

Reset your latest commits locally.
`git reset --hard HEAD~2`

Now push changes to remote `forcefully`.
`git push origin -f`
