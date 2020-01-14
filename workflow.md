Workflow:

When you are ready to start on a new feature:
1. Go to the task board and move a task from the To Do column to the In Progress Column.
2. Convert the task to an issue.
3. Make a new branch (in GitHub Desktop) and name it according to the feature.
4. Make the code changes to implement the feature, committing to that branch. Only make changes relating to the feature.
5. Open a Pull Request, and in the description, reference the issue number it relates to. For example: "Implements #4". Github should automatically link the PR to the issue and move the task in the project board to the appropriate columns (magic!)
6. If there are changes requested upon review of the pull request, make the changes on the branch.
7. If there are no more changes to be made, merge it and delete the branch.

When you think of a feature or change that needs to be made:
1. Make sure it doesn't already exist in the To Do column. If it doesn't add it.
2. Keep the To Do column in order of priority/dependency. That way you can always take from the top.
3. If the task is dependent on another task (or more than one), call it out in the description and put it below its dependencies.
