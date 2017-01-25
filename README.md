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
9. Create CloudFront distribution manually. There's too much stuff here not available through the UI.
   Use the s3 url, **not** the S3 bucket to [preserve normal index.html behavior](https://emil.lerch.org/index.html-behavior-with-s3-and-cloudfront/)
   Compress Objects Automatically/Use Only US and Europe/Setup CNAMES/Use custom SSL Cert
10. Change DNS to point to CloudFront