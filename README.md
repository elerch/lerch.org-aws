# lerch.org-aws
Infrastructure and deployment for lerch.org

Setup:

1. create-site-bucket
2. create-deployment-bucket
3. create-source-zip-on-s3
4. create-deployment-resources
5. add credentials to exiting IAM user
6. use credentials to setup an Amazon SNS integration in Github
7. test push
8. (optional) set retention policy on cloudwatch log
