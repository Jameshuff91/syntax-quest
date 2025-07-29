import { Challenge } from './challenges';

export const cloudCliChallenges: Challenge[] = [
  {
    id: "cloud-101",
    title: "AWS CLI Basics",
    description: "Learn basic AWS CLI commands to interact with AWS services",
    starterCode: `# TODO: Configure AWS CLI with credentials
# TODO: List all S3 buckets
# TODO: Get current user information`,
    solutionCode: `# Configure AWS CLI with credentials
aws configure

# List all S3 buckets
aws s3 ls

# Get current user information
aws sts get-caller-identity`,
    hints: [
      {
        message: "AWS CLI follows the pattern: aws [service] [command]"
      },
      {
        message: "Use 'aws configure' to set up credentials",
        revealCode: `aws s3 ls`
      }
    ],
    tests: [
      {
        description: "Should use basic AWS CLI commands",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-102",
    title: "S3 Operations",
    description: "Perform common S3 operations using AWS CLI",
    starterCode: `# TODO: Create a new S3 bucket
# TODO: Upload a file to the bucket
# TODO: List contents of the bucket
# TODO: Download a file from the bucket`,
    solutionCode: `# Create a new S3 bucket
aws s3 mb s3://my-unique-bucket-name

# Upload a file to the bucket
aws s3 cp myfile.txt s3://my-unique-bucket-name/

# List contents of the bucket
aws s3 ls s3://my-unique-bucket-name/

# Download a file from the bucket
aws s3 cp s3://my-unique-bucket-name/myfile.txt ./downloaded.txt`,
    hints: [
      {
        message: "Use 's3 mb' to make bucket, 's3 cp' to copy files"
      },
      {
        message: "S3 URLs follow the format s3://bucket-name/path",
        revealCode: `aws s3 mb s3://my-unique-bucket-name`
      }
    ],
    tests: [
      {
        description: "Should perform S3 operations correctly",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-103",
    title: "EC2 Instance Management",
    description: "Manage EC2 instances using AWS CLI",
    starterCode: `# TODO: List all EC2 instances
# TODO: Start an instance with ID i-1234567890abcdef0
# TODO: Stop the same instance
# TODO: Get instance details`,
    solutionCode: `# List all EC2 instances
aws ec2 describe-instances

# Start an instance with ID i-1234567890abcdef0
aws ec2 start-instances --instance-ids i-1234567890abcdef0

# Stop the same instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Get instance details
aws ec2 describe-instances --instance-ids i-1234567890abcdef0`,
    hints: [
      {
        message: "EC2 commands use 'aws ec2' prefix"
      },
      {
        message: "Most commands accept --instance-ids parameter",
        revealCode: `aws ec2 describe-instances`
      }
    ],
    tests: [
      {
        description: "Should manage EC2 instances",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-104",
    title: "Google Cloud CLI Basics",
    description: "Learn basic gcloud commands for Google Cloud Platform",
    starterCode: `# TODO: Initialize gcloud and set default project
# TODO: List all compute instances
# TODO: List all storage buckets
# TODO: Get current configuration`,
    solutionCode: `# Initialize gcloud and set default project
gcloud init
gcloud config set project my-project-id

# List all compute instances
gcloud compute instances list

# List all storage buckets
gsutil ls

# Get current configuration
gcloud config list`,
    hints: [
      {
        message: "gcloud commands follow: gcloud [service] [resource] [command]"
      },
      {
        message: "Use gsutil for Google Cloud Storage operations",
        revealCode: `gcloud compute instances list`
      }
    ],
    tests: [
      {
        description: "Should use basic gcloud commands",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "easy",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-105",
    title: "GCS Operations",
    description: "Perform Google Cloud Storage operations using gsutil",
    starterCode: `# TODO: Create a new GCS bucket
# TODO: Upload multiple files to the bucket
# TODO: Make a file publicly accessible
# TODO: Sync a local directory with the bucket`,
    solutionCode: `# Create a new GCS bucket
gsutil mb gs://my-unique-bucket-name

# Upload multiple files to the bucket
gsutil cp *.txt gs://my-unique-bucket-name/

# Make a file publicly accessible
gsutil acl ch -u AllUsers:R gs://my-unique-bucket-name/public.txt

# Sync a local directory with the bucket
gsutil rsync -r ./mydir gs://my-unique-bucket-name/mydir`,
    hints: [
      {
        message: "gsutil uses gs:// URLs for bucket paths"
      },
      {
        message: "Use rsync for efficient directory synchronization",
        revealCode: `gsutil mb gs://my-unique-bucket-name`
      }
    ],
    tests: [
      {
        description: "Should perform GCS operations",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-106",
    title: "Container Registry Operations",
    description: "Work with container registries in both AWS and GCP",
    starterCode: `# TODO: Login to AWS ECR
# TODO: Tag a Docker image for ECR
# TODO: Push image to ECR
# TODO: Do the same for Google Container Registry`,
    solutionCode: `# AWS ECR Operations
# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com

# Tag a Docker image for ECR
docker tag myapp:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:latest

# Push image to ECR
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/myapp:latest

# Google Container Registry Operations
# Configure Docker for GCR
gcloud auth configure-docker

# Tag image for GCR
docker tag myapp:latest gcr.io/my-project/myapp:latest

# Push to GCR
docker push gcr.io/my-project/myapp:latest`,
    hints: [
      {
        message: "ECR requires authentication before pushing"
      },
      {
        message: "GCR uses gcr.io/[PROJECT-ID]/[IMAGE] format",
        revealCode: `aws ecr get-login-password --region us-east-1 | docker login`
      }
    ],
    tests: [
      {
        description: "Should work with container registries",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-107",
    title: "IAM and Service Accounts",
    description: "Manage IAM users and service accounts",
    starterCode: `# AWS:
# TODO: Create an IAM user
# TODO: Attach a policy to the user
# GCP:
# TODO: Create a service account
# TODO: Grant a role to the service account`,
    solutionCode: `# AWS IAM Operations
# Create an IAM user
aws iam create-user --user-name developer

# Attach a policy to the user
aws iam attach-user-policy --user-name developer --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

# GCP Service Account Operations
# Create a service account
gcloud iam service-accounts create my-service-account --display-name="My Service Account"

# Grant a role to the service account
gcloud projects add-iam-policy-binding my-project \
  --member="serviceAccount:my-service-account@my-project.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"`,
    hints: [
      {
        message: "IAM controls who can do what in your cloud account"
      },
      {
        message: "Service accounts are for applications, not humans",
        revealCode: `aws iam create-user --user-name developer`
      }
    ],
    tests: [
      {
        description: "Should manage IAM/service accounts",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-108",
    title: "Kubernetes Cluster Management",
    description: "Manage Kubernetes clusters in cloud environments",
    starterCode: `# AWS EKS:
# TODO: Create an EKS cluster
# TODO: Update kubeconfig
# GCP GKE:
# TODO: Create a GKE cluster
# TODO: Get cluster credentials`,
    solutionCode: `# AWS EKS Operations
# Create an EKS cluster
eksctl create cluster --name my-cluster --region us-east-1

# Update kubeconfig
aws eks update-kubeconfig --name my-cluster --region us-east-1

# GCP GKE Operations
# Create a GKE cluster
gcloud container clusters create my-cluster \
  --zone us-central1-a \
  --num-nodes 3

# Get cluster credentials
gcloud container clusters get-credentials my-cluster --zone us-central1-a`,
    hints: [
      {
        message: "EKS uses eksctl for easier cluster creation"
      },
      {
        message: "Always update kubeconfig to access your cluster",
        revealCode: `eksctl create cluster --name my-cluster`
      }
    ],
    tests: [
      {
        description: "Should manage Kubernetes clusters",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-109",
    title: "Cost Management Commands",
    description: "Monitor and manage cloud costs using CLI",
    starterCode: `# AWS:
# TODO: Get current month's cost
# TODO: Get cost by service
# GCP:
# TODO: List billing accounts
# TODO: Get current project's budget`,
    solutionCode: `# AWS Cost Management
# Get current month's cost
aws ce get-cost-and-usage \
  --time-period Start=$(date -u +%Y-%m-01),End=$(date -u +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics UnblendedCost

# Get cost by service
aws ce get-cost-and-usage \
  --time-period Start=$(date -u +%Y-%m-01),End=$(date -u +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics UnblendedCost \
  --group-by Type=DIMENSION,Key=SERVICE

# GCP Billing
# List billing accounts
gcloud billing accounts list

# Get current project's budget (requires billing API)
gcloud billing budgets list --billing-account=BILLING_ACCOUNT_ID`,
    hints: [
      {
        message: "Cost Explorer (ce) provides AWS cost data"
      },
      {
        message: "Always monitor costs to avoid surprises",
        revealCode: `aws ce get-cost-and-usage --time-period Start=$(date -u +%Y-%m-01)`
      }
    ],
    tests: [
      {
        description: "Should query cost information",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "medium",
    currentAttempts: 0,
    showSolution: false
  },
  {
    id: "cloud-110",
    title: "Multi-Cloud Resource Listing",
    description: "Create a script to list resources across AWS and GCP",
    starterCode: `#!/bin/bash
# TODO: Create a script that lists:
# - All EC2 instances (AWS)
# - All GCE instances (GCP)
# - All S3 buckets (AWS)
# - All GCS buckets (GCP)
# Format the output nicely`,
    solutionCode: `#!/bin/bash
echo "=== Multi-Cloud Resource Report ==="
echo

echo "AWS Resources:"
echo "--------------"
echo "EC2 Instances:"
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,InstanceType]' --output table

echo
echo "S3 Buckets:"
aws s3 ls

echo
echo "GCP Resources:"
echo "--------------"
echo "GCE Instances:"
gcloud compute instances list --format="table(name,status,machineType.scope(machineTypes))"

echo
echo "GCS Buckets:"
gsutil ls

echo
echo "=== Report Complete ==="`,
    hints: [
      {
        message: "Use --query with AWS CLI to filter output"
      },
      {
        message: "Use --format with gcloud for custom output",
        revealCode: `aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name]'`
      }
    ],
    tests: [
      {
        description: "Should create multi-cloud listing script",
        input: null,
        expected: true
      }
    ],
    realm: "cloudcli",
    difficulty: "hard",
    currentAttempts: 0,
    showSolution: false
  }
];