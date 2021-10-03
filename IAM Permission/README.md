# IAM Permission For Deploying A Serverless Function in Lambda

## Project Meta Data
Serverless Project Name *test* <br>
AWS Account ID *123456789* <br>
AWS Region *ap-south-1* <br>
Application Stage *testing* <br>

## Project Permission

- [x] Amazon API Gateway <br>
- [x] S3 (Simple Static Storage) <br>
- [x] Serverless Domain Manager <br>

```yml
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:List*",
        "cloudformation:Get*",
        "cloudformation:ValidateTemplate"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:CreateStack",
        "cloudformation:CreateUploadBucket",
        "cloudformation:DeleteStack",
        "cloudformation:Describe*",
        "cloudformation:UpdateStack"
      ],
      "Resource": [
        "arn:aws:cloudformation:ap-south-1:123456789:stack/test-testing/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "lambda:Get*",
        "lambda:List*",
        "lambda:CreateFunction"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:ListBucket",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:ListBucketVersions",
        "s3:PutAccelerateConfiguration",
        "s3:GetEncryptionConfiguration",
        "s3:PutEncryptionConfiguration",
        "s3:DeleteBucketPolicy"
      ],
      "Resource": [
        "arn:aws:s3:::test*serverlessdeploy*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::test*serverlessdeploy*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "lambda:AddPermission",
        "lambda:CreateAlias",
        "lambda:DeleteFunction",
        "lambda:InvokeFunction",
        "lambda:PublishVersion",
        "lambda:RemovePermission",
        "lambda:Update*"
      ],
      "Resource": [
        "arn:aws:lambda:ap-south-1:123456789:function:test-testing-*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudwatch:GetMetricStatistics"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DeleteLogGroup"
      ],
      "Resource": [
        "arn:aws:logs:ap-south-1:123456789:*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:ap-south-1:123456789:*"
      ],
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogStreams",
        "logs:DescribeLogGroups",
        "logs:FilterLogEvents"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "events:Put*",
        "events:Remove*",
        "events:Delete*"
      ],
      "Resource": [
        "arn:aws:events:ap-south-1:123456789:rule/test-testing-ap-south-1"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "events:DescribeRule"
      ],
      "Resource": [
        "arn:aws:events:ap-south-1:123456789:rule/test-testing-*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:PassRole"
      ],
      "Resource": [
        "arn:aws:iam::123456789:role/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:GetRole",
        "iam:CreateRole",
        "iam:PutRolePolicy",
        "iam:DeleteRolePolicy",
        "iam:DeleteRole"
      ],
      "Resource": [
        "arn:aws:iam::123456789:role/test-testing-ap-south-1-lambdaRole"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:ListBucket",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:ListBucketVersions",
        "s3:PutAccelerateConfiguration",
        "s3:GetEncryptionConfiguration",
        "s3:PutEncryptionConfiguration",
        "s3:DeleteBucketPolicy"
      ],
      "Resource": [
        "arn:aws:s3:::Testbucket"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:GET",
        "apigateway:POST",
        "apigateway:PUT",
        "apigateway:DELETE",
        "apigateway:PATCH"
      ],
      "Resource": [
        "arn:aws:apigateway:*::/apis*",
        "arn:aws:apigateway:*::/restapis*",
        "arn:aws:apigateway:*::/apikeys*",
        "arn:aws:apigateway:*::/usageplans*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "acm:ListCertificates"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:GET",
        "apigateway:DELETE"
      ],
      "Resource": [
        "arn:aws:apigateway:ap-south-1:123456789:/domainnames/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:GET",
        "apigateway:POST"
      ],
      "Resource": [
        "arn:aws:apigateway:ap-south-1:123456789:/domainnames/*/basepathmappings"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:PATCH"
      ],
      "Resource": [
        "arn:aws:apigateway:ap-south-1:123456789:/domainnames/*/basepathmapping"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "apigateway:POST"
      ],
      "Resource": [
        "arn:aws:apigateway:ap-south-1:123456789:/domainnames"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudformation:GET"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:UpdateDistribution"
      ],
      "Resource": [
        "*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:CreateServiceLinkedRole"
      ],
      "Resource": [
        "arn:aws:iam:::role/aws-service-role/ops.apigateway.amazonaws.com/AWSServiceRoleForAPIGateway"
      ]
    }
  ]
}
```

You can add this permissions in the IAM permission section.

You can use [this](https://open-sl.github.io/serverless-permission-generator/) to generate IAM Permissions for serverless function

You can also use [this](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8) to get all the permision associated with Serverless